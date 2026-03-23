/**
 * SkyWatch Hub — ESP32-S3 Central Coordinator
 *
 * Phase 1 firmware for the hub node. Runs:
 *   1. WiFi Access Point (other nodes connect here)
 *   2. MQTT broker (TinyMqtt, lightweight embedded broker)
 *   3. PCA9685 servo controller for pan/tilt turret
 *   4. Detection event aggregation and logging
 *
 * Hardware: ESP32-S3, PCA9685, 2x SG90 servos, status LEDs.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <TinyMqtt.h>
#include <Adafruit_PWMServoDriver.h>
#include <ArduinoJson.h>
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
uint32_t totalDetections = 0;
uint32_t connectedClients = 0;

// ── Forward declarations ───────────────────────────────────────────
void setupWifiAP();
void setupMqttBroker();
void setupServos();
void setupPins();
void onHubMessage(const MqttClient *source, const Topic &topic, const char *payload, size_t length);
void handleDetection(const char *payload, size_t length);
void setServoAngle(uint8_t channel, int angle);
int angleToPulse(int angle);
void updateServos();
void publishHeartbeat();
void blinkMqttLed();

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

    Serial.println("[SkyWatch Hub] Ready. Waiting for nodes...");
    Serial.printf("[SkyWatch Hub] WiFi AP: %s\n", WIFI_AP_SSID);
    Serial.printf("[SkyWatch Hub] MQTT broker on port %d\n", MQTT_PORT);
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

    char buf[256];
    serializeJson(doc, buf, sizeof(buf));
    hubClient.publish("skywatch/hub-001/status", buf);

    Serial.printf("[HUB] Heartbeat: %u detections, %d clients\n",
                  totalDetections, WiFi.softAPgetStationNum());
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
