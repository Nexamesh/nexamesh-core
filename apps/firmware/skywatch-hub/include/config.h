#pragma once

// ── Node identity ──────────────────────────────────────────────────
#ifndef NODE_ID
#define NODE_ID "hub-001"
#endif

// ── WiFi AP settings ───────────────────────────────────────────────
#ifndef WIFI_AP_SSID
#define WIFI_AP_SSID "SkyWatch-Hub"
#endif
#ifndef WIFI_AP_PASS
#define WIFI_AP_PASS "phoenix2026"
#endif
#define WIFI_AP_CHANNEL   6
#define WIFI_AP_MAX_CONN  4
#define WIFI_AP_IP        "192.168.4.1"

// ── MQTT broker (runs on this device) ──────────────────────────────
#define MQTT_PORT 1883

// ── MQTT topics to subscribe ───────────────────────────────────────
#define TOPIC_DETECTION_ALL  "skywatch/+/detection"
#define TOPIC_STATUS_ALL     "skywatch/+/status"
#define TOPIC_ARMED_ALL      "skywatch/+/armed"
#define TOPIC_ALARM_ALL      "alarm/+/activated"

// ── I2C — PCA9685 servo driver ─────────────────────────────────────
#define PIN_SDA           8
#define PIN_SCL           9
#define PCA9685_ADDR      0x40
#define SERVO_FREQ_HZ     50    // Standard servo PWM frequency

// ── Servo channels ─────────────────────────────────────────────────
#define SERVO_CH_PAN      0     // PCA9685 channel 0 = yaw
#define SERVO_CH_TILT     1     // PCA9685 channel 1 = pitch

// Servo pulse widths (microseconds) for SG90
#define SERVO_MIN_US      500   // 0°
#define SERVO_MAX_US      2400  // 180°
#define SERVO_CENTER_US   1450  // ~90° center

// Angle limits
#define PAN_MIN_DEG       0
#define PAN_MAX_DEG       180
#define PAN_CENTER_DEG    90
#define TILT_MIN_DEG      30    // Don't tilt below 30° (mechanical limit)
#define TILT_MAX_DEG      150
#define TILT_CENTER_DEG   90

// ── GPIO pins ──────────────────────────────────────────────────────
#define PIN_LED_STATUS    2     // Blue LED — hub active
#define PIN_LED_MQTT      3     // Green LED — blinks on MQTT message

// ── Timing ─────────────────────────────────────────────────────────
#define HEARTBEAT_INTERVAL_MS  30000
#define LED_BLINK_MS           100    // MQTT activity LED flash duration
#define SERVO_MOVE_STEP_MS     20     // Smooth servo movement interval
