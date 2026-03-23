#pragma once

// ── Node identity ──────────────────────────────────────────────────
#ifndef NODE_ID
#define NODE_ID "relay-001"
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

// Topics
#define TOPIC_STATUS     "skywatch/" NODE_ID "/status"
#define TOPIC_ARMED      "skywatch/" NODE_ID "/armed"
#define TOPIC_ALARM      "alarm/" NODE_ID "/activated"
#define TOPIC_CMD_TRIG   "command/" NODE_ID "/trigger"
#define TOPIC_CMD_ARM    "command/" NODE_ID "/arm"
#define TOPIC_CMD_CFG    "command/" NODE_ID "/config"

// ── GPIO pins (ESP32-C3) ──────────────────────────────────────────
#define PIN_RELAY         4    // Relay module IN (active LOW)
#define PIN_LED_ARMED     5    // Red LED — armed status
#define PIN_BTN_ARM       6    // Arm/disarm pushbutton (active LOW)
#define PIN_LED_STATUS    7    // Green LED — connection status
#define PIN_BUZZER       10    // NPN → buzzer (optional)

// ── Relay behaviour ────────────────────────────────────────────────
#define RELAY_ACTIVE_LOW  true   // Most relay modules are active LOW
#define RELAY_PULSE_MS    2000   // How long relay stays on per trigger
#define RELAY_COOLDOWN_MS 5000   // Min time between triggers

// ── Timing ─────────────────────────────────────────────────────────
#define HEARTBEAT_INTERVAL_MS  30000
#define DEBOUNCE_MS            200
#define MQTT_RECONNECT_MS      5000
#define WIFI_RECONNECT_MS      10000
