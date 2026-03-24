# Firmware — Claude Code Context

## Overview

ESP32 firmware for the Phase 1 three-node demo stack. PlatformIO projects using
Arduino framework, targeting ESP32-CAM, ESP32-S3, and ESP32-C3.

## Structure

```text
apps/firmware/
  skywatch-nano/     # ESP32-CAM — camera + detection + MQTT publish
  skywatch-hub/      # ESP32-S3 — WiFi AP + MQTT broker + PCA9685 turret
  response-relay/    # ESP32-C3 — MQTT subscribe + relay/LED actuation
```

## Build & Flash

Requires PlatformIO CLI or PlatformIO IDE extension.

```bash
# Build all
cd apps/firmware/skywatch-nano && pio run
cd apps/firmware/skywatch-hub && pio run
cd apps/firmware/response-relay && pio run

# Flash (connect board via USB)
cd apps/firmware/skywatch-nano && pio run -t upload
cd apps/firmware/skywatch-hub && pio run -t upload
cd apps/firmware/response-relay && pio run -t upload

# Serial monitor
pio device monitor -b 115200
```

## MQTT Topics

```text
skywatch/{node_id}/detection    # Detection events (CAM → Hub)
skywatch/{node_id}/status       # Heartbeat (All → Hub)
skywatch/{node_id}/armed        # Arm state changes (All → Hub)
command/{node_id}/aim           # Pan/tilt command (Hub → Turret)
command/{node_id}/trigger       # Relay activation (Hub → Relay)
command/{node_id}/arm           # Arm/disarm (Hub → Any)
alarm/{node_id}/activated       # Alarm fired (Relay → Hub)
```

## Hardware

See `apps/docs/docs/technical/hardware/phase1/wiring-diagrams.md` for full
wiring reference.
