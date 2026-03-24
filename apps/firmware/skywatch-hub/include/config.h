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

// ── SPI — SX1276 LoRa module ──────────────────────────────────────
#define LORA_ENABLED      true  // Set false if no LoRa module attached
#define PIN_LORA_SCK      12    // SPI clock
#define PIN_LORA_MISO     13    // SPI data out (from SX1276)
#define PIN_LORA_MOSI     11    // SPI data in (to SX1276)
#define PIN_LORA_CS       10    // Chip select (NSS)
#define PIN_LORA_RST      14    // Reset
#define PIN_LORA_DIO0     15    // Interrupt — RX done / TX done

// LoRa radio parameters (868 MHz ISM band — South Africa / EU)
#define LORA_FREQUENCY    868E6       // 868 MHz (use 915E6 for US/AU)
#define LORA_BANDWIDTH    125E3       // 125 kHz (standard)
#define LORA_SPREAD_FACTOR 9          // SF9: ~5km range, ~1.7kbps
#define LORA_TX_POWER     17          // dBm (max 20 for SX1276)
#define LORA_CODING_RATE  5           // 4/5 coding rate
#define LORA_SYNC_WORD    0x34        // Private network sync word
#define LORA_PREAMBLE_LEN 8           // Standard preamble

// LoRa message types (single-byte header)
#define LORA_MSG_ALERT    0x01  // Detection alert (hub → remote)
#define LORA_MSG_ARM      0x02  // Arm/disarm command (hub → remote)
#define LORA_MSG_HEARTBEAT 0x03 // Heartbeat (bidirectional)
#define LORA_MSG_ACK      0x04  // Acknowledgment (remote → hub)
#define LORA_MSG_STATUS   0x05  // Status request/response

// ── Timing ─────────────────────────────────────────────────────────
#define HEARTBEAT_INTERVAL_MS  30000
#define LED_BLINK_MS           100    // MQTT activity LED flash duration
#define SERVO_MOVE_STEP_MS     20     // Smooth servo movement interval
#define LORA_HEARTBEAT_MS      60000  // LoRa heartbeat every 60s (airtime budget)
#define LORA_TX_TIMEOUT_MS     2000   // Max time to wait for TX complete
