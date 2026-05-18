/**
 * SkyWatch Hub — ESP32-S3 Central Coordinator
 *
 * Phase 1 firmware for the hub node. Runs:
 *   1. WiFi Access Point (other nodes connect here)
 *   2. MQTT broker (TinyMqtt, lightweight embedded broker)
 *   3. PCA9685 servo controller for pan/tilt turret
 *   4. Detection event aggregation and logging
 *   5. LoRa gateway — bridges MQTT alerts to long-range radio (SX1276)
 *
 * Hardware: ESP32-S3, PCA9685, 2x SG90 servos, SX1276 LoRa, status LEDs.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <SPI.h>
#include <TinyMqtt.h>
#include <Adafruit_PWMServoDriver.h>
#include <ArduinoJson.h>
#include <LoRa.h>
#include "config.h"

// ── Globals ────────────────────────────────────────────────────────
MqttBroker broker(MQTT_PORT);
MqttClient hubClient(&broker);
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(PCA9685_ADDR);

int currentPan = PAN_CENTER_DEG;
int currentTilt = TILT_CENTER_DEG;
int targetPan = PAN_CENTER_DEG;
int targetTilt = TILT_CENTER_DEG;

unsigned long lastHeartbeatMs = 0;
unsigned long lastMqttLedMs = 0;
unsigned long lastServoStepMs = 0;
unsigned long lastLoraHeartbeatMs = 0;
uint32_t totalDetections = 0;
uint32_t connectedClients = 0;
bool loraReady = false;
uint32_t loraTxCount = 0;
uint32_t loraRxCount = 0;

// ── Forward declarations ───────────────────────────────────────────
void setupWifiAP();
void setupMqttBroker();
void setupServos();
void setupPins();
void setupLora();
void onHubMessage(const MqttClient *source, const Topic &topic, const char *payload, size_t length);
void handleDetection(const char *payload, size_t length);
void setServoAngle(uint8_t channel, int angle);
int angleToPulse(int angle);
void updateServos();
void publishHeartbeat();
void blinkMqttLed();
void loraSendAlert(uint32_t detectionId);
void loraSendArm(bool armed);
void loraSendHeartbeat();
void loraReceive();
void onLoraReceive(int packetSize);

// ════════════════════════════════════════════════════════════════════
// Setup
// ════════════════════════════════════════════════════════════════════

void setup() {
    Serial.begin(115200);
    Serial.println("\n[SkyWatch Hub] Booting...");
    Serial.printf("[SkyWatch Hub] Node ID: %s\n", NODE_ID);

    setupPins();
    setupWifiAP();
    setupMqttBroker();
    setupServos();
    setupLora();

    Serial.println("[SkyWatch Hub] Ready. Waiting for nodes...");
    Serial.printf("[SkyWatch Hub] WiFi AP: %s\n", WIFI_AP_SSID);
    Serial.printf("[SkyWatch Hub] MQTT broker on port %d\n", MQTT_PORT);
    if (loraReady) {
        Serial.printf("[SkyWatch Hub] LoRa gateway on %.0f MHz\n", LORA_FREQUENCY / 1E6);
    }
    digitalWrite(PIN_LED_STATUS, HIGH);
}

// ════════════════════════════════════════════════════════════════════
// Main loop
// ════════════════════════════════════════════════════════════════════

void loop() {
    unsigned long now = millis();

    broker.loop();
    hubClient.loop();

    // Smooth servo movement
    if (now - lastServoStepMs > SERVO_MOVE_STEP_MS) {
        lastServoStepMs = now;
        updateServos();
    }

    // Heartbeat
    if (now - lastHeartbeatMs > HEARTBEAT_INTERVAL_MS) {
        lastHeartbeatMs = now;
        publishHeartbeat();
    }

    // LoRa receive check + periodic heartbeat
    if (loraReady) {
        loraReceive();
        if (now - lastLoraHeartbeatMs > LORA_HEARTBEAT_MS) {
            lastLoraHeartbeatMs = now;
            loraSendHeartbeat();
        }
    }

    // MQTT activity LED auto-off
    if (lastMqttLedMs > 0 && now - lastMqttLedMs > LED_BLINK_MS) {
        digitalWrite(PIN_LED_MQTT, LOW);
        lastMqttLedMs = 0;
    }
}

// ════════════════════════════════════════════════════════════════════
// WiFi Access Point
// ════════════════════════════════════════════════════════════════════

void setupWifiAP() {
    WiFi.mode(WIFI_AP);
    WiFi.softAP(WIFI_AP_SSID, WIFI_AP_PASS, WIFI_AP_CHANNEL, 0, WIFI_AP_MAX_CONN);

    IPAddress ip = WiFi.softAPIP();
    Serial.printf("[WiFi AP] Started. IP: %s\n", ip.toString().c_str());
}

// ════════════════════════════════════════════════════════════════════
// MQTT Broker + Hub Client
// ════════════════════════════════════════════════════════════════════

void setupMqttBroker() {
    broker.begin();
    Serial.printf("[MQTT] Broker started on port %d\n", MQTT_PORT);

    hubClient.setCallback(onHubMessage);
    hubClient.subscribe(TOPIC_DETECTION_ALL);
    hubClient.subscribe(TOPIC_STATUS_ALL);
    hubClient.subscribe(TOPIC_ARMED_ALL);
    hubClient.subscribe(TOPIC_ALARM_ALL);
    Serial.println("[MQTT] Hub client subscribed to all topics.");
}

void onHubMessage(const MqttClient *source, const Topic &topic, const char *payload, size_t length) {
    blinkMqttLed();

    String topicStr = topic.c_str();
    Serial.printf("[MQTT] %s: %.*s\n", topicStr.c_str(), (int)length, payload);

    // Handle detection events — extract bearing and aim turret
    if (topicStr.indexOf("/detection") > 0) {
        handleDetection(payload, length);
    }
}

void handleDetection(const char *payload, size_t length) {
    totalDetections++;

    JsonDocument doc;
    char buf[512];
    size_t copyLen = min((size_t)511, length);
    memcpy(buf, payload, copyLen);
    buf[copyLen] = '\0';

    if (deserializeJson(doc, buf) != DeserializationError::Ok) {
        Serial.println("[DETECT] Failed to parse detection JSON");
        return;
    }

    Serial.printf("[DETECT] Detection #%u from node %s\n",
                  totalDetections,
                  doc["node_id"] | "unknown");

    // In Phase 1 with single camera, we sweep the turret to center.
    // Phase 2 adds bearing calculation from detection bounding box.
    // For now, trigger a simple scan pattern on detection.
    targetPan = random(PAN_MIN_DEG + 20, PAN_MAX_DEG - 20);
    targetTilt = random(TILT_MIN_DEG + 10, TILT_MAX_DEG - 10);

    // Forward trigger command to response relay
    JsonDocument cmdDoc;
    cmdDoc["command"] = "trigger";
    cmdDoc["source"] = NODE_ID;
    cmdDoc["detection_count"] = totalDetections;
    cmdDoc["timestamp"] = millis();

    char cmdBuf[256];
    serializeJson(cmdDoc, cmdBuf, sizeof(cmdBuf));

    // Publish to all relay nodes (wildcard not supported for publish,
    // so we target a specific node ID for now)
    hubClient.publish("command/relay-001/trigger", cmdBuf);

    // Bridge alert to LoRa for remote nodes beyond WiFi range
    if (loraReady) {
        loraSendAlert(totalDetections);
    }
}

// ════════════════════════════════════════════════════════════════════
// PCA9685 Servo Control
// ════════════════════════════════════════════════════════════════════

void setupServos() {
    Wire.begin(PIN_SDA, PIN_SCL);
    pwm.begin();
    pwm.setOscillatorFrequency(27000000);
    pwm.setPWMFreq(SERVO_FREQ_HZ);

    // Center both servos
    setServoAngle(SERVO_CH_PAN, PAN_CENTER_DEG);
    setServoAngle(SERVO_CH_TILT, TILT_CENTER_DEG);
    Serial.println("[Servo] PCA9685 initialized, servos centered.");
}

void setServoAngle(uint8_t channel, int angle) {
    int pulse = angleToPulse(angle);
    // Convert microseconds to PCA9685 tick count (4096 ticks per 20ms period)
    int tickCount = (int)((float)pulse / 20000.0f * 4096.0f);
    pwm.setPWM(channel, 0, tickCount);
}

int angleToPulse(int angle) {
    // Map 0-180° to SERVO_MIN_US - SERVO_MAX_US
    return map(angle, 0, 180, SERVO_MIN_US, SERVO_MAX_US);
}

void updateServos() {
    // Smooth step toward target (1° per step)
    bool moved = false;

    if (currentPan < targetPan) { currentPan++; moved = true; }
    else if (currentPan > targetPan) { currentPan--; moved = true; }

    if (currentTilt < targetTilt) { currentTilt++; moved = true; }
    else if (currentTilt > targetTilt) { currentTilt--; moved = true; }

    if (moved) {
        setServoAngle(SERVO_CH_PAN, currentPan);
        setServoAngle(SERVO_CH_TILT, currentTilt);
    }
}

// ════════════════════════════════════════════════════════════════════
// Heartbeat
// ════════════════════════════════════════════════════════════════════

void publishHeartbeat() {
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["type"] = "heartbeat";
    doc["role"] = "hub";
    doc["uptime_ms"] = millis();
    doc["total_detections"] = totalDetections;
    doc["connected_clients"] = WiFi.softAPgetStationNum();
    doc["pan_deg"] = currentPan;
    doc["tilt_deg"] = currentTilt;
    doc["free_heap"] = ESP.getFreeHeap();
    doc["lora_ready"] = loraReady;
    doc["lora_tx"] = loraTxCount;
    doc["lora_rx"] = loraRxCount;

    char buf[384];
    serializeJson(doc, buf, sizeof(buf));
    hubClient.publish("skywatch/hub-001/status", buf);

    Serial.printf("[HUB] Heartbeat: %u detections, %d clients, LoRa TX:%u RX:%u\n",
                  totalDetections, WiFi.softAPgetStationNum(), loraTxCount, loraRxCount);
}

// ════════════════════════════════════════════════════════════════════
// LoRa Gateway (SX1276 868 MHz)
// ════════════════════════════════════════════════════════════════════

void setupLora() {
    if (!LORA_ENABLED) {
        Serial.println("[LoRa] Disabled in config.");
        return;
    }

    // Configure SPI pins for SX1276
    SPI.begin(PIN_LORA_SCK, PIN_LORA_MISO, PIN_LORA_MOSI, PIN_LORA_CS);
    LoRa.setPins(PIN_LORA_CS, PIN_LORA_RST, PIN_LORA_DIO0);

    if (!LoRa.begin(LORA_FREQUENCY)) {
        Serial.println("[LoRa] Init FAILED — check wiring / module.");
        loraReady = false;
        return;
    }

    // Configure radio parameters
    LoRa.setSpreadingFactor(LORA_SPREAD_FACTOR);
    LoRa.setSignalBandwidth(LORA_BANDWIDTH);
    LoRa.setCodingRate4(LORA_CODING_RATE);
    LoRa.setTxPower(LORA_TX_POWER);
    LoRa.setSyncWord(LORA_SYNC_WORD);
    LoRa.setPreambleLength(LORA_PREAMBLE_LEN);
    LoRa.enableCrc();

    loraReady = true;
    Serial.printf("[LoRa] Ready. Freq=%.0fMHz SF=%d BW=%.0fkHz TxPwr=%ddBm\n",
                  LORA_FREQUENCY / 1E6, LORA_SPREAD_FACTOR,
                  LORA_BANDWIDTH / 1E3, LORA_TX_POWER);
}

/**
 * Send detection alert over LoRa.
 * Compact binary packet: [type(1)] [detection_id(4)] [pan(2)] [tilt(2)] [timestamp(4)]
 * Total: 13 bytes — minimal airtime.
 */
void loraSendAlert(uint32_t detectionId) {
    LoRa.beginPacket();
    LoRa.write(LORA_MSG_ALERT);
    LoRa.write((uint8_t *)&detectionId, 4);
    int16_t pan = (int16_t)currentPan;
    int16_t tilt = (int16_t)currentTilt;
    LoRa.write((uint8_t *)&pan, 2);
    LoRa.write((uint8_t *)&tilt, 2);
    uint32_t ts = millis();
    LoRa.write((uint8_t *)&ts, 4);
    LoRa.endPacket(true);  // async (non-blocking)

    loraTxCount++;
    Serial.printf("[LoRa TX] Alert #%u pan=%d tilt=%d\n", detectionId, pan, tilt);
}

/**
 * Send arm/disarm command over LoRa.
 * Packet: [type(1)] [armed(1)]
 */
void loraSendArm(bool armed) {
    LoRa.beginPacket();
    LoRa.write(LORA_MSG_ARM);
    LoRa.write(armed ? 1 : 0);
    LoRa.endPacket(true);

    loraTxCount++;
    Serial.printf("[LoRa TX] Arm=%s\n", armed ? "true" : "false");
}

/**
 * Send heartbeat over LoRa (low-frequency, saves airtime).
 * Packet: [type(1)] [uptime(4)] [detections(4)] [clients(1)]
 */
void loraSendHeartbeat() {
    LoRa.beginPacket();
    LoRa.write(LORA_MSG_HEARTBEAT);
    uint32_t uptime = millis();
    LoRa.write((uint8_t *)&uptime, 4);
    LoRa.write((uint8_t *)&totalDetections, 4);
    uint8_t clients = (uint8_t)WiFi.softAPgetStationNum();
    LoRa.write(clients);
    LoRa.endPacket(true);

    loraTxCount++;
    Serial.println("[LoRa TX] Heartbeat");
}

/**
 * Check for incoming LoRa packets from remote nodes.
 * Remote nodes send ACKs, status reports, and their own detections.
 */
void loraReceive() {
    int packetSize = LoRa.parsePacket();
    if (packetSize == 0) return;

    loraRxCount++;
    int rssi = LoRa.packetRssi();
    float snr = LoRa.packetSnr();

    uint8_t msgType = LoRa.read();
    Serial.printf("[LoRa RX] Type=0x%02X Size=%d RSSI=%d SNR=%.1f\n",
                  msgType, packetSize, rssi, snr);

    switch (msgType) {
        case LORA_MSG_ACK: {
            uint32_t ackedId;
            if (LoRa.available() >= 4) {
                LoRa.readBytes((uint8_t *)&ackedId, 4);
                Serial.printf("[LoRa RX] ACK for detection #%u\n", ackedId);
            }
            break;
        }
        case LORA_MSG_HEARTBEAT: {
            // Remote node heartbeat — publish to MQTT so local nodes see it
            JsonDocument doc;
            doc["source"] = "lora_remote";
            doc["rssi"] = rssi;
            doc["snr"] = snr;
            doc["type"] = "heartbeat";
            if (LoRa.available() >= 4) {
                uint32_t remoteUptime;
                LoRa.readBytes((uint8_t *)&remoteUptime, 4);
                doc["remote_uptime_ms"] = remoteUptime;
            }
            char buf[256];
            serializeJson(doc, buf, sizeof(buf));
            hubClient.publish("skywatch/lora-remote/status", buf);
            break;
        }
        case LORA_MSG_STATUS: {
            // Status response — log RSSI/SNR for link quality monitoring
            Serial.printf("[LoRa RX] Status from remote. Link: RSSI=%d SNR=%.1f\n", rssi, snr);
            break;
        }
        default:
            Serial.printf("[LoRa RX] Unknown message type 0x%02X\n", msgType);
            break;
    }

    blinkMqttLed();  // Reuse MQTT LED to indicate LoRa activity too
}

// ════════════════════════════════════════════════════════════════════
// GPIO / LEDs
// ════════════════════════════════════════════════════════════════════

void setupPins() {
    pinMode(PIN_LED_STATUS, OUTPUT);
    pinMode(PIN_LED_MQTT, OUTPUT);
    digitalWrite(PIN_LED_STATUS, LOW);
    digitalWrite(PIN_LED_MQTT, LOW);
}

void blinkMqttLed() {
    digitalWrite(PIN_LED_MQTT, HIGH);
    lastMqttLedMs = millis();
}
