# Upgrade Path A — Brushless Conversion with 3D-Printed Motor Mounts

**Recommended progression: [C](upgrade-path-c-brain-upgrade-brushed.md) → A (this) → [B](upgrade-path-b-new-frame-brushless.md)**
| [Purchasing tracker](upgrade-purchasing-tracker.md)

## Overview

**Do this after Path C is flying.** Reuses the existing X8-class plastic frame
(320mm diagonal) and the FC, GPS, receiver, and wiring from Path C. Replaces
geared brushed motors with brushless motors using custom 3D-printed adapter
mounts. Most engineering-intensive path but preserves the original airframe
for counter-UAS threat research continuity.

**Prerequisites from Path C:**
- INAV/Betaflight configured and tested
- ELRS receiver bound and working
- GPS lock verified
- Soldering skills proven on FC pads
- PID tuning experience on brushed setup

**What you learn here (needed for Path B):**
- 3D CAD design for functional drone parts
- Brushless motor wiring (3-phase) and ESC configuration
- DSHOT protocol setup
- Higher-current battery management (2S-3S)
- Vibration analysis and motor balancing

## Threat Classification After Upgrade

| Without AI tier | With AI tier |
|-----------------|--------------|
| Consumer (GPS + flight logs) | Commercial-lite (autonomous tracking) |

---

## Phase 1: Motor Mount Design and Prototyping

**Goal:** Design and print motor adapters that clip into the existing arm
housings and provide M2/M3 screw mounting for brushless motors.

### Component Role Map

| Component | Role | Why This Part |
|-----------|------|---------------|
| 3D-printed motor adapter (x4) | Converts clip-in cylindrical housing to flat plate with M3 bolt holes | Frame has no screw pattern for brushless motors |
| 1806 2400KV brushless motors (x4) | Replace FK130 geared brushed motors | 1806 is the right size class for 240mm/9" props on 2S-3S |
| 9x4.5" propellers (x4+spares) | Replace original 240mm press-fit props | Match motor shaft (M5 or self-tightening) |
| M3 x 6mm screws (x16) | Mount motors to 3D-printed adapters | Standard brushless motor mount screws |

### Design Constraints

```
Arm housing inner diameter: ~22-24mm (measure yours)
Motor mount bolt pattern: 16x16mm (standard for 1806 motors)
Required clearance: prop to arm body ~5mm minimum
Material: PETG or ABS (PLA too brittle for vibration)
Infill: 80-100% for mounting plate area
```

### Design TODO

- [ ] Measure arm housing inner diameter precisely (calipers)
- [ ] Measure arm housing clip mechanism depth and detents
- [ ] Design adapter in Fusion 360 / FreeCAD / TinkerCAD
  - Cylindrical base that clips into arm housing
  - Flat top plate with 16x16mm M3 bolt holes
  - Motor wire channel through adapter body
- [ ] Print test adapter in PETG (0.2mm layer, 100% infill on plate)
- [ ] Test fit in arm housing — check for wobble
- [ ] Mount motor and run at 50% throttle — check vibration
- [ ] Iterate design (expect 2-3 revisions)
- [ ] Print final set of 4 adapters + 2 spares

---

## Phase 2: Electronics Stack

**Goal:** Replace the all-in-one FC board with a proper flight controller
stack, ESC, GPS, and digital receiver.

### Component Role Map

| # | Component | Role | Replaces | Source | Est. Cost (ZAR) |
|---|-----------|------|----------|--------|-----------------|
| 1 | F405 V3 flight controller | Betaflight/INAV FC, blackbox logging, 20x20mm | Original SoC board | Temu (in cart) | R522 |
| 2 | 4-in-1 ESC 25-35A, 20x20mm | Motor speed control, DSHOT600 | Original MOSFETs + R010 | AliExpress | R250-400 |
| 3 | GY-NEO6MV2 GPS module | Position hold, return-to-home, waypoints | Nothing (new) | Temu (in cart) | R101 |
| 4 | ELRS 915MHz nano receiver | Long-range digital RC link | Original 2.4GHz proprietary | AliExpress | R150-250 |
| 5 | 915MHz T-type antenna | Receiver antenna | — | Temu (in cart) | R48 |
| 6 | 2S-3S LiPo 1300-2200mAh, XT30 | Power (higher voltage for brushless) | Original 1S 3.7V | AliExpress/local | R120-200 |
| 7 | XT30 connectors (3 pairs) | Battery connector standard | Original JST | Temu (in cart) | R72 |
| 8 | LiPo safety bag | Safe charging/storage | Nothing (new) | Temu (in cart) | R89 |
| 9 | M2/M3 rubber shock absorbers | FC vibration dampening | Nothing (new) | Temu (in cart) | R40 |
| 10 | Nylon spacers (100pcs) | FC stack mounting | Nothing (new) | Temu (in cart) | R22 |
| 11 | microSD card 8-32GB | Blackbox flight logging | Nothing (new) | Local | R80-150 |
| 12 | USB-C cable | FC configuration | — | Existing | R0 |
| 13 | PH2.0 connector kit (390pcs) | UART/peripheral wiring | Nothing (new) | Temu (in cart) | R103 |

### Electronics Build TODO

- [ ] Remove original all-in-one FC board from frame
- [ ] Strip all original wiring from arms and center cavity
- [ ] Install nylon standoffs in center cavity (20x20mm pattern)
- [ ] Mount 4-in-1 ESC on bottom standoffs
- [ ] Mount F405 FC on top standoffs (with rubber dampeners between)
- [ ] Solder ESC motor pads (4x 3-phase leads to motors)
- [ ] Solder XT30 battery pigtail to ESC power input
- [ ] Connect GPS to UART1 (TX/RX/5V/GND via PH2.0)
- [ ] Connect ELRS receiver to UART2 (TX/RX/5V/GND)
- [ ] Insert microSD card
- [ ] Connect to Betaflight Configurator via USB-C
- [ ] Flash INAV firmware (for GPS features) or Betaflight (for acro)
- [ ] Configure motor order and direction
- [ ] Calibrate accelerometer and gyro
- [ ] Set up GPS rescue (return-to-home)
- [ ] Bind ELRS receiver to transmitter
- [ ] Test arm/disarm on bench (props off)
- [ ] First hover test (outdoors, low altitude)

### Wiring Diagram

```
Battery ──XT30──> 4-in-1 ESC ──3-phase──> Motor 1 (front-right)
                   │            ──3-phase──> Motor 2 (rear-right)
                   │            ──3-phase──> Motor 3 (rear-left)
                   │            ──3-phase──> Motor 4 (front-left)
                   │
                   └──signal──> FC (20x20 stack)
                                 ├──UART1──> GPS (TX/RX/5V/GND)
                                 ├──UART2──> ELRS RX (TX/RX/5V/GND)
                                 └──USB-C──> Config PC
```

---

## Phase 3: FPV + Video (Optional)

**Goal:** Add live video feed and recording capability.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 14 | YSIDO FPV camera 1800TVL | Live pilot view camera | Temu (in cart) | R251 |
| 15 | VTX 25-400mW 5.8GHz, 20x20mm | Video transmitter | AliExpress | R150-250 |
| 16 | RHCP antenna (MMCX/U.FL) | VTX antenna | AliExpress | R40-60 |
| 17 | FPV goggles (budget) | Pilot display + DVR recording | AliExpress/local | R800-1500 |

### FPV Build TODO

- [ ] Mount FPV camera on frame nose (hot glue or 3D-printed bracket)
- [ ] Mount VTX on FC stack or frame body
- [ ] Connect camera video out to VTX video in
- [ ] Connect VTX power to ESC VBAT pads
- [ ] Route VTX antenna away from frame (zip tie to arm)
- [ ] Configure VTX channel and power via Betaflight OSD
- [ ] Test video feed on goggles
- [ ] Verify DVR recording works in goggles

---

## Phase 4: Onboard AI (Optional)

**Goal:** Add companion computer for autonomous behavior.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 18 | Raspberry Pi Zero 2W | Edge AI inference, MAVLink bridge | Local/AliExpress | R250-400 |
| 19 | Pi Camera Module 3 | AI object detection input | Local/AliExpress | R400-600 |
| 20 | 5V 3A BEC | Power RPi from flight battery | AliExpress | R30-60 |
| 21 | microSD 32GB (for RPi) | OS + AI model storage | Local | R80-150 |
| 22 | PMW3901 optical flow + VL53L1X | Indoor position hold without GPS | AliExpress | R150-250 |

### AI Build TODO

- [ ] Flash Raspberry Pi OS Lite to microSD
- [ ] Install YOLOv8n or MobileNet-SSD
- [ ] Connect RPi to FC via UART3 (MAVLink/MSP)
- [ ] Mount BEC, wire from battery to RPi 5V
- [ ] Mount RPi and camera on frame (3D-printed tray)
- [ ] Connect optical flow sensor via SPI/I2C
- [ ] Test AI inference framerate (target: 5+ FPS on RPi Zero 2W)
- [ ] Test MAVLink commands (arm, set mode, position hold)
- [ ] Test autonomous target following

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3D-printed mounts break under vibration | Motors detach mid-flight | PETG/ABS, 100% infill, test at full throttle before flying |
| Motor adapter wobble causes oscillation | Unstable flight, PID issues | Tight tolerances, test with FC tuning |
| Frame too heavy with brushless + battery | Won't fly or very short flight time | Weigh complete build before first flight, target <400g AUW |
| 1806 motors too powerful for plastic frame | Arm flex, prop strikes | Start with low throttle limit, consider 1306 motors |
| Prop clearance issues with adapter height | Props hit arms | Measure clearance before first flight |

## Total Estimated Cost (Path A)

| Phase | ZAR Estimate | Items from Temu Cart |
|-------|-------------|---------------------|
| Phase 1 (motors + 3D mounts) | R400-700 | — (motors from AliExpress, filament local) |
| Phase 2 (electronics) | R1,400-2,000 | R997 (FC, GPS, antenna, XT30, dampeners, spacers, PH2.0, LiPo bag) |
| Phase 3 (FPV) | R1,240-2,060 | R251 (camera) |
| Phase 4 (AI) | R910-1,460 | — |
| **Total all phases** | **R3,950-6,220** | |
