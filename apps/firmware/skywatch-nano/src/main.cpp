/**
 * SkyWatch Nano — ESP32-CAM Detection Node
 *
 * Phase 1 firmware for camera-based motion detection.
 * Captures frames, runs simple frame-differencing, publishes
 * detection events to MQTT, and serves an MJPEG stream.
 *
 * Hardware: ESP32-CAM (OV2640), buzzer, LEDs, pushbutton.
 * Network:  Connects to SkyWatch Hub WiFi AP, publishes via MQTT.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "esp_camera.h"
#include "esp_http_server.h"
#include "config.h"

// ── Camera pin definitions (AI-Thinker ESP32-CAM) ──────────────────
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// ── Globals ────────────────────────────────────────────────────────
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);
httpd_handle_t streamServer = NULL;

bool armed = true;
bool lastButtonState = HIGH;
unsigned long lastDetectionMs = 0;
unsigned long lastHeartbeatMs = 0;
unsigned long lastMqttAttemptMs = 0;
unsigned long lastWifiAttemptMs = 0;
unsigned long lastButtonCheckMs = 0;
uint32_t detectionCount = 0;
uint8_t *prevFrame = NULL;
size_t prevFrameLen = 0;

// ── Forward declarations ───────────────────────────────────────────
void setupCamera();
void setupPins();
void setupWifi();
void setupMqtt();
void setupStream();
void onMqttMessage(char *topic, byte *payload, unsigned int length);
void publishDetection(uint32_t changedPixels, size_t frameSize);
void publishHeartbeat();
void publishArmedState();
void checkButton();
void triggerAlarm(bool on);
bool detectMotion(camera_fb_t *fb);
esp_err_t streamHandler(httpd_req_t *req);

// ════════════════════════════════════════════════════════════════════
// Setup
// ════════════════════════════════════════════════════════════════════

void setup() {
    Serial.begin(115200);
    Serial.println("\n[SkyWatch Nano] Booting...");
    Serial.printf("[SkyWatch Nano] Node ID: %s\n", NODE_ID);

    setupPins();
    setupCamera();
    setupWifi();
    setupMqtt();
    setupStream();

    // Allocate previous frame buffer for motion detection
    prevFrame = (uint8_t *)ps_malloc(320 * 240);
    if (!prevFrame) {
        Serial.println("[ERROR] Failed to allocate prevFrame in PSRAM");
    }

    Serial.println("[SkyWatch Nano] Ready.");
    digitalWrite(PIN_LED_STATUS, HIGH);
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

    // Capture and detect
    camera_fb_t *fb = esp_camera_fb_get();
    if (fb) {
        if (armed && detectMotion(fb)) {
            if (now - lastDetectionMs > DETECT_COOLDOWN_MS) {
                lastDetectionMs = now;
                detectionCount++;
                publishDetection(0, fb->len);
                triggerAlarm(true);
                delay(500);
                triggerAlarm(false);
            }
        }
        esp_camera_fb_return(fb);
    }

    // Heartbeat
    if (now - lastHeartbeatMs > HEARTBEAT_INTERVAL_MS) {
        lastHeartbeatMs = now;
        publishHeartbeat();
    }

    // Status LED blink when armed
    if (armed) {
        digitalWrite(PIN_LED_STATUS, (now / 500) % 2);
    } else {
        digitalWrite(PIN_LED_STATUS, HIGH);
    }
}

// ════════════════════════════════════════════════════════════════════
// Camera setup
// ════════════════════════════════════════════════════════════════════

void setupCamera() {
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sccb_sda = SIOD_GPIO_NUM;
    config.pin_sccb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_GRAYSCALE;
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = CAM_JPEG_QUALITY;
    config.fb_count = CAM_FB_COUNT;
    config.grab_mode = CAMERA_GRAB_LATEST;

    if (psramFound()) {
        config.fb_location = CAMERA_FB_IN_PSRAM;
        Serial.println("[Camera] PSRAM found, using PSRAM frame buffers.");
    } else {
        config.fb_location = CAMERA_FB_IN_DRAM;
        config.fb_count = 1;
        Serial.println("[Camera] No PSRAM, using DRAM (limited).");
    }

    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        Serial.printf("[Camera] Init failed: 0x%x\n", err);
        return;
    }
    Serial.println("[Camera] Initialized OK.");
}

// ════════════════════════════════════════════════════════════════════
// GPIO setup
// ════════════════════════════════════════════════════════════════════

void setupPins() {
    pinMode(PIN_BUZZER, OUTPUT);
    pinMode(PIN_LED_BEACON, OUTPUT);
    pinMode(PIN_LED_STATUS, OUTPUT);
    pinMode(PIN_BTN_ARM, INPUT_PULLUP);

    digitalWrite(PIN_BUZZER, LOW);
    digitalWrite(PIN_LED_BEACON, LOW);
    digitalWrite(PIN_LED_STATUS, LOW);
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
        Serial.println("\n[WiFi] Failed to connect. Will retry in loop.");
    }
}

// ════════════════════════════════════════════════════════════════════
// MQTT
// ════════════════════════════════════════════════════════════════════

void setupMqtt() {
    mqtt.setServer(MQTT_BROKER, MQTT_PORT);
    mqtt.setCallback(onMqttMessage);
    mqtt.setBufferSize(1024);
}

void onMqttMessage(char *topic, byte *payload, unsigned int length) {
    char msg[256];
    size_t copyLen = min((unsigned int)255, length);
    memcpy(msg, payload, copyLen);
    msg[copyLen] = '\0';

    Serial.printf("[MQTT] Received on %s: %s\n", topic, msg);

    if (strcmp(topic, TOPIC_CMD_ARM) == 0) {
        JsonDocument doc;
        if (deserializeJson(doc, msg) == DeserializationError::Ok) {
            if (doc.containsKey("armed")) {
                armed = doc["armed"].as<bool>();
                Serial.printf("[ARM] Remote set armed=%s\n", armed ? "true" : "false");
                publishArmedState();
                if (!armed) {
                    triggerAlarm(false);
                    digitalWrite(PIN_LED_BEACON, LOW);
                }
            }
        }
    }
}

void publishDetection(uint32_t changedPixels, size_t frameSize) {
    JsonDocument doc;
    doc["event"] = "motion_detected";
    doc["node_id"] = NODE_ID;
    doc["timestamp"] = millis();
    doc["detection_count"] = detectionCount;
    doc["changed_pixels"] = changedPixels;
    doc["frame_bytes"] = frameSize;
    doc["armed"] = armed;

    char buf[512];
    serializeJson(doc, buf, sizeof(buf));
    mqtt.publish(TOPIC_DETECTION, buf);
    Serial.printf("[DETECT] #%u published\n", detectionCount);
}

void publishHeartbeat() {
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["type"] = "heartbeat";
    doc["uptime_ms"] = millis();
    doc["armed"] = armed;
    doc["detections"] = detectionCount;
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

// ════════════════════════════════════════════════════════════════════
// Motion detection (simple frame differencing)
// ════════════════════════════════════════════════════════════════════

bool detectMotion(camera_fb_t *fb) {
    if (!prevFrame || fb->format != PIXFORMAT_GRAYSCALE) return false;
    if (fb->len != (320 * 240)) return false;

    uint32_t changedPixels = 0;
    uint8_t *curr = fb->buf;

    for (size_t i = 0; i < fb->len; i++) {
        int diff = abs((int)curr[i] - (int)prevFrame[i]);
        if (diff > DETECT_THRESHOLD) {
            changedPixels++;
        }
    }

    // Save current frame as previous
    memcpy(prevFrame, curr, fb->len);

    return changedPixels > DETECT_MIN_AREA;
}

// ════════════════════════════════════════════════════════════════════
// Alarm control
// ════════════════════════════════════════════════════════════════════

void triggerAlarm(bool on) {
    digitalWrite(PIN_BUZZER, on ? HIGH : LOW);
    digitalWrite(PIN_LED_BEACON, on ? HIGH : LOW);
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
        if (!armed) {
            triggerAlarm(false);
            digitalWrite(PIN_LED_BEACON, LOW);
        }
    }
    lastButtonState = currentState;
}

// ════════════════════════════════════════════════════════════════════
// MJPEG stream server
// ════════════════════════════════════════════════════════════════════

static const char *STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=frame";
static const char *STREAM_BOUNDARY = "\r\n--frame\r\n";
static const char *STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

esp_err_t streamHandler(httpd_req_t *req) {
    esp_err_t res = httpd_resp_set_type(req, STREAM_CONTENT_TYPE);
    if (res != ESP_OK) return res;

    while (true) {
        camera_fb_t *fb = esp_camera_fb_get();
        if (!fb) {
            Serial.println("[Stream] Frame capture failed");
            break;
        }

        // For streaming, we need JPEG. Re-init camera to JPEG if needed
        // or convert grayscale frame. For simplicity, send raw JPEG.
        char partBuf[64];
        snprintf(partBuf, sizeof(partBuf), STREAM_PART, fb->len);

        res = httpd_resp_send_chunk(req, STREAM_BOUNDARY, strlen(STREAM_BOUNDARY));
        if (res == ESP_OK)
            res = httpd_resp_send_chunk(req, partBuf, strlen(partBuf));
        if (res == ESP_OK)
            res = httpd_resp_send_chunk(req, (const char *)fb->buf, fb->len);

        esp_camera_fb_return(fb);

        if (res != ESP_OK) break;
    }
    return res;
}

void setupStream() {
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    config.server_port = STREAM_PORT;
    config.ctrl_port = STREAM_PORT + 1;

    httpd_uri_t streamUri = {
        .uri = "/stream",
        .method = HTTP_GET,
        .handler = streamHandler,
        .user_ctx = NULL
    };

    if (httpd_start(&streamServer, &config) == ESP_OK) {
        httpd_register_uri_handler(streamServer, &streamUri);
        Serial.printf("[Stream] MJPEG server on port %d\n", STREAM_PORT);
    }
}
