# Hardware Inventory & Expenses

Last updated: 2026-03-24

---

## Order 1 — Temu (Shipped / In Transit)

| Item | Qty | List Price (ZAR) | Paid (ZAR) | Status | Project Use |
|------|-----|-----------------|------------|--------|-------------|
| MP1584EN 3A DC-DC step-down buck converter | 1 | R29 | R29 | Shipped | Power: LiPo → 5V/3.3V for ESP32/servos |
| Multi-output power module (3.3V/5V/12V) | 1 | R26 | R26 | Shipped | Power distribution for prototyping |
| D-FLIFE 7-in-1 actuator module kit | 1 | R233 | R233 | Shipped | VTOL tilt-rotor servos (Phase B) |
| ICM-20948 9-axis IMU (accel/gyro/mag) | 1 | R49 | R45 | Shipped | Turret stabilization / drone attitude |
| ESP32-CAM + dev board | 1 | R304 | R183 | Shipped | Secondary camera node / visual mesh relay |
| 5× SG90 9g servos + PCA9685 16-ch PWM driver | 1 | R235 | R185 | Shipped | Turret pan/tilt control (I2C from ESP32) |
| **Order 1 subtotal** | | | **R701** | | |

## Order 2 — Temu (Shipped / In Transit)

| Item | Qty | List Price (ZAR) | Paid (ZAR) | Status | Project Use |
|------|-----|-----------------|------------|--------|-------------|
| 20pc double-sided PCB prototype boards (4 sizes) | 1 | R130 | R73 | Shipped | Solder companion boards, turret controller |
| MB102 breadboard power module + 830-point board | 1 | R108 | R87 | Shipped | Prototyping with 3.3V/5V rails |
| 20-pin Dupont jumper wires (M-M, M-F, F-F set) | 1 | R75 | R70 | Shipped | Breadboard and module wiring |
| 10pc AMS1117-3.3V LDO step-down modules | 1 | R54 | R50 | Shipped | 3.3V regulation for ESP32/LoRa |
| 328P V3 dev board (Arduino Nano clone, CH340) | 1 | R167 | R119 | Shipped | Servo PWM / sensor bridge / backup MCU |
| SX1276 LoRa module (868/915MHz) | 1 | R94 | R89 | Shipped | Mesh network radio (node 1) |
| **Order 2 subtotal** | | | **R488** | | |

## On Hand (Previously Owned)

| Item | Qty | Est. Value (ZAR) | Source | Project Use |
|------|-----|------------------|--------|-------------|
| ESP32-S3 SuperMini | 1+ | R80 | On hand | Mesh companion board brain |
| ESP32-C3 | 1+ | R50 | On hand | Lightweight mesh nodes |
| ESP32 expansion/breakout board | 1+ | R30 | On hand | Easy wiring for ESP32 modules |

---

## Expense Summary

| Category | Spent (ZAR) | Spent (USD ~) |
|----------|-------------|---------------|
| Order 1 — Temu | R701 | ~$39 |
| Order 2 — Temu | R488 | ~$27 |
| On hand (not counted) | R0 | — |
| **Total spent** | **R1,189** | **~$66** |

---

## Full Component Inventory by Function

### Microcontrollers
| Component | Qty | Ready? |
|-----------|-----|--------|
| ESP32-S3 SuperMini | 1+ | On hand |
| ESP32-C3 | 1+ | On hand |
| ESP32-CAM + dev board | 1 | In transit |
| 328P V3 Nano clone (ATmega328P) | 1 | In transit |

### Actuators & Motion
| Component | Qty | Ready? |
|-----------|-----|--------|
| SG90 9g micro servos | 5 | In transit |
| PCA9685 16-ch PWM servo driver (I2C) | 1 | In transit |
| D-FLIFE 7-in-1 actuator module | 1 | In transit |

### Sensors
| Component | Qty | Ready? |
|-----------|-----|--------|
| ICM-20948 9-axis IMU (accel/gyro/mag) | 1 | In transit |
| ESP32-CAM (OV2640 camera) | 1 | In transit |

### Radio / Communication
| Component | Qty | Ready? |
|-----------|-----|--------|
| SX1276 LoRa 868/915MHz | 1 | In transit |
| ESP32-S3 WiFi/BLE (built-in) | 1+ | On hand |
| ESP32-C3 WiFi/BLE (built-in) | 1+ | On hand |

### Power
| Component | Qty | Ready? |
|-----------|-----|--------|
| MP1584EN 3A adjustable buck converter | 1 | In transit |
| Multi-output power module (3.3/5/12V) | 1 | In transit |
| AMS1117-3.3V LDO modules | 10 | In transit |
| MB102 breadboard power module (3.3/5V) | 1 | In transit |

### Prototyping Supplies
| Component | Qty | Ready? |
|-----------|-----|--------|
| 830-point breadboard | 1 | In transit |
| Double-sided PCB boards (4 sizes) | 20 | In transit |
| Dupont jumper wires (M-M, M-F, F-F) | 1 set (60pc) | In transit |
| ESP32 expansion board | 1+ | On hand |

---

## Still Needed

| Item | Priority | Est. Cost (ZAR) | Notes |
|------|----------|-----------------|-------|
| SX1276 LoRa module (×1 more) | High | R90 | Need 2+ for mesh (drone + ground hub) |
| Resistor assortment kit | Medium | R20–40 | Pull-ups, voltage dividers, transistor circuits |
| NPN transistors (BC547/2N2222) | Medium | R10–20 | Audio PWM servo circuit |
| Capacitor assortment | Low | R20–30 | Decoupling for power modules |
| SMA antenna for LoRa | Medium | R20–40 | Range improvement for SX1276 |
| JST-SH / JST-PH connectors | Low | R20–30 | Clean wiring for permanent builds |
| Heat shrink tubing | Low | R15–20 | Wire insulation |

### Drone-Specific (Phase A — Not Yet Purchased)
| Item | Priority | Est. Cost (ZAR) | Notes |
|------|----------|-----------------|-------|
| 5" quad frame | High | R350–600 | TBS Source One or similar |
| Flight controller (F405/H743) | High | R400–800 | ArduPilot-compatible |
| 4-in-1 ESC (30A+) | High | R350–600 | Match FC stack |
| Motors ×4 (2306 1900KV) | High | R600–1000 | Balanced for quad + VTOL path |
| Props (5" tri-blade) | High | R80–150 | Buy plenty of spares |
| GPS module (u-blox M10) | High | R200–400 | Waypoint missions |
| 4S 1500mAh LiPo | High | R400–600 | XT60 connector |
| ELRS TX + RX | High | R950–1800 | RadioMaster + micro RX |
| **Drone subtotal** | | **R3,330–5,950** | |
