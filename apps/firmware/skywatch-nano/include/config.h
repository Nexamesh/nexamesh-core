#pragma once

// ── Node identity ──────────────────────────────────────────────────
#ifndef NODE_ID
#define NODE_ID "nano-001"
#endif

// ── WiFi (connects to Hub AP) ──────────────────────────────────────
#ifndef WIFI_SSID
#define WIFI_SSID "SkyWatch-Hub"
#endif
#ifndef WIFI_PASS
#define WIFI_PASS "phoenix2026"
#endif

// ── MQTT ───────────────────────────────────────────────────────────
#ifndef MQTT_BROKER
#define MQTT_BROKER "192.168.4.1"
#endif
#define MQTT_PORT 1883

// Topic templates — node_id substituted at runtime
#define TOPIC_DETECTION "skywatch/" NODE_ID "/detection"
#define TOPIC_STATUS    "skywatch/" NODE_ID "/status"
#define TOPIC_ARMED     "skywatch/" NODE_ID "/armed"
#define TOPIC_CMD_ARM   "command/" NODE_ID "/arm"
#define TOPIC_CMD_CFG   "command/" NODE_ID "/config"

// ── GPIO pins (ESP32-CAM, no SD card) ──────────────────────────────
#define PIN_BUZZER       12   // NPN transistor → active buzzer
#define PIN_LED_BEACON   13   // 220Ω → alarm LED
#define PIN_BTN_ARM      14   // Pushbutton (active LOW, 10kΩ pull-up)
#define PIN_LED_STATUS   15   // 220Ω → status LED
#define PIN_FLASH_LED     4   // Built-in flash (do not reassign)

// ── Camera settings ────────────────────────────────────────────────
#define CAM_FRAME_SIZE   FRAMESIZE_QVGA   // 320x240
#define CAM_JPEG_QUALITY 12                // 0-63 (lower = better)
#define CAM_FB_COUNT     2                 // Frame buffer count (PSRAM)

// ── Detection settings ─────────────────────────────────────────────
#define DETECT_THRESHOLD     30     // Frame-diff pixel threshold (0-255)
#define DETECT_MIN_AREA      500    // Minimum changed pixels to trigger
#define DETECT_COOLDOWN_MS   3000   // Min ms between detections

// ── Timing ─────────────────────────────────────────────────────────
#define HEARTBEAT_INTERVAL_MS  30000  // Status heartbeat every 30s
#define DEBOUNCE_MS            200    // Button debounce
#define MQTT_RECONNECT_MS      5000   // MQTT reconnect backoff
#define WIFI_RECONNECT_MS      10000  // WiFi reconnect backoff

// ── MJPEG stream ───────────────────────────────────────────────────
#define STREAM_PORT 81   // HTTP MJPEG stream on :81
