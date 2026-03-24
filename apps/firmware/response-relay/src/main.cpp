/**
 * Response Relay — ESP32-C3 Safe Actuation Node
 *
 * Phase 1 firmware for the response relay. Receives trigger commands
 * via MQTT and drives safe demo outputs (relay → LED/lamp, buzzer).
 * Physical arm/disarm switch prevents accidental activation.
 *
 * Hardware: ESP32-C3, relay module, LEDs, buzzer, pushbutton.
 * Safety:   No launcher or harmful hardware. Relay drives dummy load only.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "config.h"

// ── Globals ────────────────────────────────────────────────────────
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

bool armed = false;  // Start disarmed for safety
bool relayActive = false;
bool lastButtonState = HIGH;

unsigned long relayOnMs = 0;
unsigned long lastTriggerMs = 0;
unsigned long lastHeartbeatMs = 0;
unsigned long lastMqttAttemptMs = 0;
unsigned long lastWifiAttemptMs = 0;
unsigned long lastButtonCheckMs = 0;
uint32_t triggerCount = 0;

// ── Forward declarations ───────────────────────────────────────────
void setupPins();
void setupWifi();
void setupMqtt();
void onMqttMessage(char *topic, byte *payload, unsigned int length);
void handleTrigger(const char *payload, size_t length);
void activateRelay();
void deactivateRelay();
void publishHeartbeat();
void publishArmedState();
void publishAlarm();
void checkButton();
void setRelay(bool on);

// ════════════════════════════════════════════════════════════════════
// Setup
// ════════════════════════════════════════════════════════════════════

void setup() {
    Serial.begin(115200);
    Serial.println("\n[Response Relay] Booting...");
    Serial.printf("[Response Relay] Node ID: %s\n", NODE_ID);

    setupPins();
    setupWifi();
    setupMqtt();

    Serial.println("[Response Relay] Ready. DISARMED by default.");
    Serial.println("[Response Relay] Press arm button or send MQTT arm command.");
}

// ════════════════════════════════════════════════════════════════════
// Main loop
// ════════════════════════════════════════════════════════════════════

void loop() {
    unsigned long now = millis();

    // WiFi reconnect
    if (WiFi.status() != WL_CONNECTED) {
        digitalWrite(PIN_LED_STATUS, LOW);
        if (now - lastWifiAttemptMs > WIFI_RECONNECT_MS) {
            lastWifiAttemptMs = now;
            Serial.println("[WiFi] Reconnecting...");
            WiFi.begin(WIFI_SSID, WIFI_PASS);
        }
        return;
    }

    // MQTT reconnect
    if (!mqtt.connected()) {
        if (now - lastMqttAttemptMs > MQTT_RECONNECT_MS) {
            lastMqttAttemptMs = now;
            Serial.println("[MQTT] Connecting...");
            if (mqtt.connect(NODE_ID)) {
                Serial.println("[MQTT] Connected.");
                mqtt.subscribe(TOPIC_CMD_TRIG);
                mqtt.subscribe(TOPIC_CMD_ARM);
                mqtt.subscribe(TOPIC_CMD_CFG);
                publishArmedState();
                publishHeartbeat();
            }
        }
    }
    mqtt.loop();

    // Check arm/disarm button
    checkButton();

    // Auto-deactivate relay after pulse duration
    if (relayActive && (now - relayOnMs > RELAY_PULSE_MS)) {
        deactivateRelay();
    }

    // Heartbeat
    if (now - lastHeartbeatMs > HEARTBEAT_INTERVAL_MS) {
        lastHeartbeatMs = now;
        publishHeartbeat();
    }

    // Status LED: solid = connected, blink = connected + armed
    if (armed) {
        digitalWrite(PIN_LED_STATUS, (now / 300) % 2);
    } else {
        digitalWrite(PIN_LED_STATUS, mqtt.connected() ? HIGH : LOW);
    }

    // Armed LED
    digitalWrite(PIN_LED_ARMED, armed ? HIGH : LOW);
}

// ════════════════════════════════════════════════════════════════════
// GPIO setup
// ════════════════════════════════════════════════════════════════════

void setupPins() {
    pinMode(PIN_RELAY, OUTPUT);
    pinMode(PIN_LED_ARMED, OUTPUT);
    pinMode(PIN_LED_STATUS, OUTPUT);
    pinMode(PIN_BUZZER, OUTPUT);
    pinMode(PIN_BTN_ARM, INPUT_PULLUP);

    // Ensure relay is OFF at boot
    setRelay(false);
    digitalWrite(PIN_LED_ARMED, LOW);
    digitalWrite(PIN_LED_STATUS, LOW);
    digitalWrite(PIN_BUZZER, LOW);
}

// ════════════════════════════════════════════════════════════════════
// WiFi
// ════════════════════════════════════════════════════════════════════

void setupWifi() {
    Serial.printf("[WiFi] Connecting to %s\n", WIFI_SSID);
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASS);

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("\n[WiFi] Connected. IP: %s\n", WiFi.localIP().toString().c_str());
    } else {
        Serial.println("\n[WiFi] Failed. Will retry in loop.");
    }
}

// ════════════════════════════════════════════════════════════════════
// MQTT
// ════════════════════════════════════════════════════════════════════

void setupMqtt() {
    mqtt.setServer(MQTT_BROKER, MQTT_PORT);
    mqtt.setCallback(onMqttMessage);
    mqtt.setBufferSize(512);
}

void onMqttMessage(char *topic, byte *payload, unsigned int length) {
    char msg[256];
    size_t copyLen = min((unsigned int)255, length);
    memcpy(msg, payload, copyLen);
    msg[copyLen] = '\0';

    Serial.printf("[MQTT] %s: %s\n", topic, msg);

    if (strcmp(topic, TOPIC_CMD_TRIG) == 0) {
        handleTrigger(msg, copyLen);
    } else if (strcmp(topic, TOPIC_CMD_ARM) == 0) {
        JsonDocument doc;
        if (deserializeJson(doc, msg) == DeserializationError::Ok) {
            if (doc.containsKey("armed")) {
                armed = doc["armed"].as<bool>();
                Serial.printf("[ARM] Remote set armed=%s\n", armed ? "true" : "false");
                publishArmedState();
                if (!armed) {
                    deactivateRelay();
                }
            }
        }
    }
}

void handleTrigger(const char *payload, size_t length) {
    unsigned long now = millis();

    if (!armed) {
        Serial.println("[TRIGGER] Ignored — not armed.");
        return;
    }

    if (now - lastTriggerMs < RELAY_COOLDOWN_MS) {
        Serial.println("[TRIGGER] Ignored — cooldown active.");
        return;
    }

    Serial.println("[TRIGGER] Activating relay!");
    lastTriggerMs = now;
    triggerCount++;
    activateRelay();
    publishAlarm();
}

// ════════════════════════════════════════════════════════════════════
// Relay control
// ════════════════════════════════════════════════════════════════════

void setRelay(bool on) {
    if (RELAY_ACTIVE_LOW) {
        digitalWrite(PIN_RELAY, on ? LOW : HIGH);
    } else {
        digitalWrite(PIN_RELAY, on ? HIGH : LOW);
    }
}

void activateRelay() {
    relayActive = true;
    relayOnMs = millis();
    setRelay(true);
    digitalWrite(PIN_BUZZER, HIGH);
    Serial.printf("[RELAY] ON (pulse %dms)\n", RELAY_PULSE_MS);
}

void deactivateRelay() {
    if (!relayActive) return;
    relayActive = false;
    setRelay(false);
    digitalWrite(PIN_BUZZER, LOW);
    Serial.println("[RELAY] OFF");
}

// ════════════════════════════════════════════════════════════════════
// MQTT Publishing
// ════════════════════════════════════════════════════════════════════

void publishHeartbeat() {
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["type"] = "heartbeat";
    doc["role"] = "relay";
    doc["uptime_ms"] = millis();
    doc["armed"] = armed;
    doc["relay_active"] = relayActive;
    doc["trigger_count"] = triggerCount;
    doc["wifi_rssi"] = WiFi.RSSI();
    doc["free_heap"] = ESP.getFreeHeap();

    char buf[256];
    serializeJson(doc, buf, sizeof(buf));
    mqtt.publish(TOPIC_STATUS, buf);
}

void publishArmedState() {
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["armed"] = armed;
    doc["timestamp"] = millis();

    char buf[128];
    serializeJson(doc, buf, sizeof(buf));
    mqtt.publish(TOPIC_ARMED, buf, true);  // retained
}

void publishAlarm() {
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["event"] = "relay_activated";
    doc["trigger_count"] = triggerCount;
    doc["timestamp"] = millis();

    char buf[256];
    serializeJson(doc, buf, sizeof(buf));
    mqtt.publish(TOPIC_ALARM, buf);
}

// ════════════════════════════════════════════════════════════════════
// Button handling
// ════════════════════════════════════════════════════════════════════

void checkButton() {
    unsigned long now = millis();
    if (now - lastButtonCheckMs < DEBOUNCE_MS) return;
    lastButtonCheckMs = now;

    bool currentState = digitalRead(PIN_BTN_ARM);
    if (currentState == LOW && lastButtonState == HIGH) {
        armed = !armed;
        Serial.printf("[ARM] Button toggled, armed=%s\n", armed ? "true" : "false");
        publishArmedState();

        // Short beep to confirm
        digitalWrite(PIN_BUZZER, HIGH);
        delay(100);
        digitalWrite(PIN_BUZZER, LOW);

        if (!armed) {
            deactivateRelay();
        }
    }
    lastButtonState = currentState;
}
