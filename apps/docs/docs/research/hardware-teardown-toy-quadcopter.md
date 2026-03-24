# Hardware Teardown: Budget Toy-Grade Quadcopter (Syma X5-Class)

## Overview

Physical teardown of a budget consumer quadcopter for counter-UAS threat
classification purposes. This represents the **lowest threat tier** in the
drone threat spectrum.

## Identified Components

### Flight Controller PCB (Single Board)

All-in-one design on a single yellow/gold PCB. No separate ESCs, GPS, or
companion computer. Everything integrated onto one board.

### FBM320 Barometric Pressure Sensor (Green Module)

- **Manufacturer:** Formosa Microsystems
- **Function:** Measures atmospheric pressure to calculate altitude
- **Purpose:** Enables "altitude hold" mode — drone maintains set height
  without constant throttle input from operator
- **Accuracy:** Typical +/- 1m altitude resolution
- **Note:** This is the most advanced sensor on the board. No GPS, no optical
  flow, no IMU beyond basic gyro

### Motor Driver MOSFETs (4x, with R010 Current Sense Resistors)

- Four MOSFET driver circuits, one per brushed motor
- **R010 markings** on nearby resistors = 0.01 ohm current sense resistors
  for overcurrent protection
- Brushed motors (not brushless) — confirms toy-grade classification
- Direct drive, no ESC firmware to extract

### Main SoC / Flight Controller IC

- Central black IC handles: 6-axis gyro/accelerometer reading, PID control
  loop, motor mixing, 2.4 GHz RF receiver
- Likely a proprietary Chinese SoC (common: Beken BK2461, Nuvoton Mini51,
  or similar)
- Contains minimal onboard flash (calibration data, binding info only)
- **No extractable flight logs, no GPS tracks, no waypoints**

### Wiring

| Wire Color   | Purpose                    |
| ------------ | -------------------------- |
| Red (thick)  | Motor power (+)            |
| Black (thick)| Motor power (-)            |
| White (thin) | LED power / camera trigger |
| Blue (thin)  | LED control / aux          |

Four pairs of red/black motor wires route to the four arms.

## Storage Assessment

**No removable storage.** No microSD slot, no eMMC worth extracting.

The only persistent storage is a few KB of flash inside the main SoC,
containing:
- Gyro calibration offsets
- RC transmitter binding/pairing data
- Possibly trim settings

**Forensic intelligence value: Near zero.** No flight path data, no video,
no mission planning, no network logs, no firmware worth analyzing.

## Counter-UAS Threat Classification

| Parameter            | Assessment                          |
| -------------------- | ----------------------------------- |
| **Threat tier**      | Minimal (toy-grade)                 |
| **Autonomy**         | None — pure manual RF control       |
| **RF protocol**      | 2.4 GHz proprietary (not WiFi)     |
| **Range**            | 50-100m typical                     |
| **Payload capacity** | Negligible (<50g)                   |
| **Flight time**      | 5-8 minutes                         |
| **Navigation**       | None — barometric altitude hold only|
| **Onboard recording**| None (camera models save to microSD in camera module, not FC) |
| **Anti-forensics**   | None                                |
| **Detection method** | RF signature, visual, acoustic      |
| **Countermeasure**   | Basic RF jamming sufficient         |

## Comparison to Higher Threat Tiers

| Feature        | This Drone (Toy) | Consumer (DJI) | Commercial/Military |
| -------------- | ---------------- | -------------- | ------------------- |
| GPS            | No               | Yes            | Yes + RTK           |
| Flight logs    | No               | Encrypted DAT  | Custom formats      |
| Storage        | None             | microSD + eMMC | NVMe + eMMC         |
| Autonomy       | None             | Waypoint       | Full autonomous     |
| Onboard AI     | None             | Obstacle avoid | Target recognition  |
| Anti-forensics | None             | Encrypted logs | Crypto erase        |
| Forensic value | Near zero        | High           | Very high           |

## Internal Upgrade: Component List

Reuses the existing plastic X-frame and motor mounts. Replaces all internals
to move from toy-grade to a research-capable platform with GPS, logging,
storage, and optional onboard AI.

### Upgrade Tier 1 — GPS + Flight Logging (Consumer-Grade Equivalent)

Swap the all-in-one FC for a proper stack with blackbox logging and GPS.

| # | Component | Spec | Replace | Est. Cost |
|---|-----------|------|---------|-----------|
| 1 | Flight controller | Betaflight F405 or F722 with microSD blackbox slot, 20x20mm mounting | Original SoC board | $18-30 |
| 2 | IMU / gyro | Onboard FC (MPU6050 or BMI270, included on F4/F7 boards) | Original gyro in SoC | included |
| 3 | Barometric sensor | BMP280 (SPI, usually onboard F4/F7 FCs) | FBM320 | included |
| 4 | GPS module | BN-220 or Beitian BN-880 (GPS+GLONASS, UART) | Nothing (new) | $8-12 |
| 5 | 4-in-1 ESC | 20x20mm, 12A, BLHeli_S or AM32, DSHOT600 | Original MOSFETs + R010 | $12-18 |
| 6 | Brushless motors | 1103 or 1204 (7000-11000KV), fits 65-75mm props | Original 8520 brushed | $16-24 (x4) |
| 7 | Propellers | 65mm tri-blade, matching motor shaft (1.5mm or press-fit) | Original props | $3-5 |
| 8 | Battery | 2S 7.4V 450-650mAh LiPo, XT30 connector | Original 1S 3.7V | $8-12 |
| 9 | microSD card | 8-32GB, high endurance (Samsung PRO Endurance) | Nothing (new) | $5-8 |
| 10 | RC receiver | ExpressLRS (ELRS) 2.4GHz nano receiver (e.g., BetaFPV ELRS Lite) | Original proprietary RF | $12-15 |
| 11 | RC transmitter | RadioMaster Pocket or Zorro (ELRS compatible) | Original toy TX | $50-80 |
| 12 | Wiring harness | 26AWG silicone, JST-SH connectors for FC stack | Original wiring | $3-5 |
| 13 | XT30 connector + pigtail | Battery connector | Original JST | $2 |
| 14 | Mounting hardware | M2 standoffs (20x20mm stack), vibration dampeners, nylon bolts | Original screws | $3-5 |
| 15 | USB-C cable | For FC configuration via Betaflight Configurator | — | $2 |

**Tier 1 total: ~$142-216** (including new transmitter)
**Without transmitter: ~$92-136**

**What this adds:**
- GPS position hold, return-to-home, waypoint missions (via INAV firmware)
- Full blackbox flight logging to microSD (forensically recoverable)
- Telemetry back to transmitter (battery, GPS coords, altitude)
- Digital motor protocol (DSHOT) — cleaner control, more power
- Longer range (~1-2km with ELRS vs 50-100m stock)

### Upgrade Tier 2 — FPV + Video Recording

Add live video and onboard recording on top of Tier 1.

| # | Component | Spec | Est. Cost |
|---|-----------|------|-----------|
| 16 | FPV camera | Caddx Ant Nano or Runcam Nano 4 (1200TVL, 1.8mm lens) | $12-18 |
| 17 | Video transmitter (VTX) | 20x20mm, 25-400mW, 5.8GHz (e.g., Rush Tiny Tank) | $15-22 |
| 18 | VTX antenna | RHCP pigtail antenna (MMCX or U.FL) | $4-6 |
| 19 | FPV goggles | Eachine EV800D or Skyzone Cobra (budget) | $50-80 |
| 20 | DVR module | Onboard in goggles (records received video to microSD) | included |
| 21 | Action camera (optional) | Caddx Peanut or Insta360 GO 3S (~25g, records HD to onboard storage) | $80-130 |

**Tier 2 adds: ~$81-256**

**What this adds:**
- Real-time pilot view (FPV) — fly beyond visual line of sight
- DVR recording of flights (in goggles and/or onboard)
- Onboard HD recording with action camera (microSD in camera)
- Video evidence becomes forensically recoverable

### Upgrade Tier 3 — Onboard AI + Companion Computer

Add edge computing for autonomous behavior. This is where it gets
research-relevant for counter-UAS threat modeling.

| # | Component | Spec | Est. Cost |
|---|-----------|------|-----------|
| 22 | Companion computer | ESP32-S3 (basic) or Raspberry Pi Zero 2W (full Linux) | $5-15 |
| 23 | Camera for AI | OV2640 (ESP32) or Pi Camera Module 3 (RPi) | $5-25 |
| 24 | Storage for AI | 16-32GB microSD in companion computer | $5-8 |
| 25 | Optical flow sensor | PMW3901 + VL53L1X (position hold without GPS, indoor capable) | $12-18 |
| 26 | MAVLink bridge | UART connection FC <-> companion (wiring only, MSP or MAVLink protocol) | $0 (wires) |
| 27 | BEC / voltage regulator | 5V 2A BEC to power companion from 2S battery | $3-5 |
| 28 | WiFi antenna (optional) | External 2.4GHz antenna for ESP32/RPi (telemetry/video stream) | $2-3 |

**Tier 3 adds: ~$32-74**

**What this adds:**
- Onboard object detection (YOLOv8n or MobileNet-SSD on RPi Zero 2W)
- Autonomous target following / tracking
- WiFi-based telemetry and video streaming
- Onboard data logging with timestamps
- Dramatically increased forensic value — AI inference logs, detection
  history, stored model weights reveal capabilities and intent

### Upgrade Tier 3+ — Advanced Autonomy (Optional)

| # | Component | Spec | Est. Cost |
|---|-----------|------|-----------|
| 29 | Companion computer | Raspberry Pi 5 or NVIDIA Jetson Orin Nano (requires larger frame) | $60-200 |
| 30 | NVMe storage | M.2 2230 256GB-1TB (via Pi 5 HAT or Jetson) | $25-60 |
| 31 | LiDAR | TFmini-S (12m range, lightweight obstacle avoidance) | $25-35 |
| 32 | 4G/LTE modem | SIM7600 module (beyond-RF-range command and control) | $20-30 |
| 33 | Larger battery | 3S-4S 850-1300mAh (needs frame upgrade for weight) | $12-20 |

**Tier 3+ adds: ~$142-345** (likely requires frame upgrade too)

**What this adds:**
- Full autonomous missions without operator input
- LTE command link — no RF signature to detect/jam
- LiDAR obstacle avoidance
- NVMe storage for large AI models and multi-hour recording
- Highest forensic value — full mission logs, AI model analysis,
  communication logs

### Complete Upgrade Summary

| Tier | Total Added Cost | Threat Classification | Forensic Value | Key Capability Gained |
|------|-----------------|----------------------|----------------|----------------------|
| Stock | $0 | Toy/Minimal | Near zero | Baseline |
| Tier 1 | ~$92-136 | Consumer | High | GPS, flight logs, waypoints |
| Tier 1+2 | ~$173-392 | Consumer+ | High | FPV, video recording |
| Tier 1+2+3 | ~$205-466 | Commercial-lite | Very high | Onboard AI, autonomous tracking |
| Tier 1+2+3+ | ~$347-811 | Near-military | Maximum | Full autonomy, LTE C2, NVMe |

### Wiring Changes Per Tier

**Tier 1** — Complete rewire. The original all-in-one board is removed entirely.
New wiring:
```
Battery ──XT30──> 4-in-1 ESC ──signal──> FC (20x20 stack)
                   └──> Motor 1-4 (3-phase each)
FC ──UART1──> GPS (TX/RX/5V/GND)
FC ──UART2──> ELRS Receiver (TX/RX/5V/GND)
```

**Tier 2** — Add to Tier 1:
```
FC ──5V/GND──> FPV Camera ──video──> VTX ──RF──> antenna
ESC ──VBAT──> VTX (direct battery voltage for power)
```

**Tier 3** — Add to Tier 2:
```
FC ──UART3──> Companion Computer (MAVLink/MSP)
BEC ──5V/2A──> Companion Computer
Companion ──CSI/USB──> AI Camera
Companion ──I2C/SPI──> Optical Flow + ToF sensor
```

### Frame Compatibility Notes

The existing Syma X5-class frame has:
- **Motor mounts:** 8.5mm diameter holes — fit 8520 brushed or 1103/1104
  brushless with adapter rings or hot glue
- **Center cavity:** ~45x45mm — fits 20x20mm FC stack with room for GPS
  module alongside
- **Prop clearance:** 65-75mm propellers max
- **Weight capacity:** ~80-120g total (frame + internals + battery)
- **Limitation:** Tier 3+ (Jetson/Pi 5 + NVMe + LiDAR) will exceed this
  frame's weight budget. Requires frame upgrade to 180-250mm class.

## Relevance to Phoenix Rooivalk

This teardown and upgrade path establishes the full spectrum for drone threat
classification. The threat simulator should model these tiers:

- **Stock (toy):** Detectable via basic RF scanning, simple RF jamming defeats
- **Tier 1 (GPS):** Flight logs recoverable, waypoints reveal intent, ELRS
  harder to jam than toy protocol
- **Tier 2 (FPV):** Video evidence recoverable, pilot location potentially
  traceable via VTX signal
- **Tier 3 (AI):** Autonomous behavior, forensic goldmine if captured (model
  weights, inference logs, detection history)
- **Tier 3+ (full autonomy):** LTE C2 defeats RF jamming, NVMe storage
  contains extensive operational data, requires advanced countermeasures

Each tier maps to progressively more complex detection and countermeasure
requirements in the Phoenix Rooivalk system. See
`storage-technologies-counter-uas-threat-assessment.md` for the storage
forensics perspective.
