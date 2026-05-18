# Upgrade Path C — Brain Upgrade Only (Keep Brushed Motors)

**Recommended progression: C (this) → [A](upgrade-path-a-brushless-3d-printed-mounts.md) → [B](upgrade-path-b-new-frame-brushless.md)**
| [Purchasing tracker](upgrade-purchasing-tracker.md)

## Overview

**Start here.** Cheapest and fastest path. Keeps the existing X8-class frame,
geared FK130 brushed motors, and original props. Only replaces the all-in-one
flight controller board with a proper FC, adds GPS, digital receiver, and
blackbox logging. Immediately useful for counter-UAS threat research.

**Key advantage:** No motor mount redesign, no frame change, no prop change.
The geared brushed motors keep working exactly as they did — they just get
smarter control electronics.

**What you learn here (needed for Path A and B):**
- INAV/Betaflight Configurator setup
- ELRS receiver binding and configuration
- PID tuning fundamentals
- GPS rescue and failsafe configuration
- Soldering FC pads and UART wiring
- Blackbox log analysis

## Threat Classification After Upgrade

| Without AI tier | With AI tier |
|-----------------|--------------|
| Consumer (GPS + flight logs) | Commercial-lite (autonomous tracking) |

---

## Phase 1: FC Swap + GPS + Digital Receiver

**Goal:** Replace the all-in-one FC board. Add GPS, blackbox logging, and
ELRS receiver. Keep brushed motors on their existing geared drive.

### Component Role Map

| # | Component | Role | Why This Part | Replaces | Source | Est. Cost (ZAR) |
|---|-----------|------|---------------|----------|--------|-----------------|
| 1 | F405 V3 flight controller | Betaflight/INAV, blackbox, OSD | 20x20mm fits center cavity, microSD slot, multiple UARTs | Original SoC board | Temu (in cart) | R522 |
| 2 | Brushed ESC module (4-channel) | PWM motor control for existing brushed motors | Must output PWM (not DSHOT) for brushed motors | Original MOSFETs | AliExpress | R40-80 |
| 3 | GY-NEO6MV2 GPS module | Position hold, RTH, waypoint logging | UART interface, cheap, proven | Nothing (new) | Temu (in cart) | R101 |
| 4 | ELRS 915MHz nano receiver | Long-range digital RC link, telemetry | 915MHz for SA, replaces toy 2.4GHz | Original 2.4GHz proprietary | AliExpress | R150-250 |
| 5 | 915MHz T-type antenna (IPEX) | ELRS receiver antenna | Matches 915MHz receiver | — | Temu (in cart) | R48 |
| 6 | 2S LiPo 1000-1500mAh, XT30 | More capacity than original 1S | Higher voltage OK — FC has 5V BEC, brushed motors tolerate 2S via ESC PWM duty cycle | Original 1S 3.7V | AliExpress/local | R100-180 |
| 7 | XT30 connectors (3 pairs) | Standardized battery connector | Reliable, rated for brushed current draw | Original JST | Temu (in cart) | R72 |
| 8 | PH2.0 connector kit (390pcs) | UART wiring for GPS/RX/VTX | Standard micro-quad connector | — | Temu (in cart) | R103 |
| 9 | LiPo safety bag | Charging/storage safety | Non-negotiable for any LiPo | — | Temu (in cart) | R89 |
| 10 | M2/M3 rubber shock absorbers | FC vibration dampening | Reduces gyro noise from geared motors | — | Temu (in cart) | R40 |
| 11 | Nylon spacers (100pcs) | FC stack mounting in center cavity | M2 standoffs for 20x20mm | — | Temu (in cart) | R22 |
| 12 | microSD card 8-32GB | Blackbox flight logging | High endurance preferred | — | Local | R80-150 |

### Critical Note: Brushed ESC Selection

The F405 FC outputs **DSHOT/PWM motor signals**. Your original brushed motors
need simple **PWM duty-cycle control** (0-100% power, two wires per motor).

Options:
1. **4x individual brushed ESC modules** — small MOSFET boards, one per motor,
   connected to FC motor output pads. Search AliExpress for "brushed ESC
   drone" or "1S-2S brushed motor driver"
2. **Reuse the original MOSFET section** — desolder the 4 MOSFETs + R010
   resistors from the original all-in-one board and wire them to the FC
   motor outputs. Advanced soldering required.
3. **Use the FC's built-in motor outputs** — some F4/F7 FCs can drive brushed
   motors directly if they have onboard MOSFETs. Check the F405 V3 specs.
   Most FPV FCs do NOT support this.

**Recommended:** Option 1 — buy 4 small brushed ESC modules. Cleanest solution.

### Phase 1 Build TODO

- [ ] Remove original all-in-one FC board from center cavity
- [ ] Label and photograph all original wiring before cutting
- [ ] Keep original motor wires intact (red/black pairs to each arm)
- [ ] Install nylon standoffs in center cavity (drill 4x M2 holes if needed)
- [ ] Mount FC on standoffs with rubber dampeners
- [ ] Wire brushed ESC modules:
  - FC motor output 1 → ESC module 1 → Motor 1 (red/black)
  - FC motor output 2 → ESC module 2 → Motor 2 (red/black)
  - FC motor output 3 → ESC module 3 → Motor 3 (red/black)
  - FC motor output 4 → ESC module 4 → Motor 4 (red/black)
- [ ] Wire XT30 battery input to ESC power bus
- [ ] Wire 5V BEC output from FC/ESC to GPS and receiver
- [ ] Connect GPS to FC UART1 (TX/RX/5V/GND via PH2.0)
- [ ] Connect ELRS receiver to FC UART2 (TX/RX/5V/GND)
- [ ] Mount GPS module on top of frame (double-sided tape or bracket)
- [ ] Route ELRS antenna out rear of frame
- [ ] Insert microSD card
- [ ] Connect USB-C to Betaflight Configurator
- [ ] Flash INAV firmware (required for GPS features on brushed)
- [ ] Configure: motor protocol = PWM (not DSHOT)
- [ ] Configure: motor mixing = QuadX
- [ ] Calibrate accelerometer and gyro
- [ ] Set motor output range (test each motor spins correctly)
- [ ] Set up GPS rescue (return-to-home) and failsafe
- [ ] Bind ELRS receiver to transmitter
- [ ] Bench test: arm, verify all 4 motors spin correct direction
- [ ] Test GPS lock (outdoors, wait for 8+ satellites)
- [ ] First test flight (outdoors, low altitude, GPS mode)

### Wiring Diagram

```
2S LiPo ──XT30──> Power bus ──> ESC module 1 ──PWM──> Motor 1 (FR)
                   │              ESC module 2 ──PWM──> Motor 2 (RR)
                   │              ESC module 3 ──PWM──> Motor 3 (RL)
                   │              ESC module 4 ──PWM──> Motor 4 (FL)
                   │
                   └──5V BEC──> FC (20x20)
                                 ├──UART1──> GPS (TX/RX/5V/GND)
                                 ├──UART2──> ELRS RX (TX/RX/5V/GND)
                                 ├──Motor1──> ESC module 1 signal
                                 ├──Motor2──> ESC module 2 signal
                                 ├──Motor3──> ESC module 3 signal
                                 ├──Motor4──> ESC module 4 signal
                                 └──USB-C──> Config PC
```

---

## Phase 2: FPV + Video

**Goal:** Add live video and onboard recording.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 13 | YSIDO FPV camera 1800TVL | Live pilot view camera | Temu (in cart) | R251 |
| 14 | VTX 25-200mW 5.8GHz | Video transmitter (low power OK for brushed range) | AliExpress | R100-200 |
| 15 | RHCP antenna (U.FL/MMCX) | VTX antenna | AliExpress | R40-60 |
| 16 | FPV goggles (budget) | Pilot display + DVR recording | AliExpress/local | R800-1500 |

### FPV Build TODO

- [ ] Mount FPV camera on frame nose
- [ ] Mount VTX in center cavity (on FC stack or alongside)
- [ ] Solder camera video to VTX input
- [ ] Connect VTX power to 5V BEC or battery bus (check VTX voltage range)
- [ ] Route antenna away from frame body
- [ ] Configure VTX channel via Betaflight OSD (if supported) or VTX buttons
- [ ] Test video at 25m, 50m, 100m
- [ ] Verify DVR recording in goggles

---

## Phase 3: Onboard AI (Optional)

**Goal:** Add companion computer for autonomous behavior. This is where the
counter-UAS research value really jumps.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 17 | Raspberry Pi Zero 2W | AI inference, MAVLink bridge | Local/AliExpress | R250-400 |
| 18 | Pi Camera Module 3 or OV2640 | Detection camera | Local/AliExpress | R200-600 |
| 19 | 5V 2A BEC (separate from FC) | Dedicated RPi power | AliExpress | R30-60 |
| 20 | microSD 32GB (for RPi) | OS + AI model storage | Local | R80-150 |
| 21 | PMW3901 optical flow + VL53L1X | Indoor position hold without GPS | AliExpress | R150-250 |

### AI Build TODO

- [ ] Flash RPi OS Lite to microSD
- [ ] Install YOLOv8n or MobileNet-SSD (pre-trained drone detection model)
- [ ] Wire separate BEC from battery to RPi 5V input
- [ ] Connect RPi UART TX/RX to FC UART3 (MAVLink bridge)
- [ ] Mount RPi on frame (double-sided tape or 3D-printed tray)
- [ ] Mount camera (CSI ribbon or USB)
- [ ] Connect optical flow sensor (I2C)
- [ ] Test inference speed (target: 5+ FPS)
- [ ] Test MAVLink position hold via companion
- [ ] Test autonomous target following

### Weight Budget Check

This is the critical constraint for Path C. The original frame was designed
for ~200-250g all-up weight with 1S battery.

| Component | Weight |
|-----------|--------|
| Frame + motors + gears + props (original) | ~180g |
| FC + ESC modules + wiring | ~25g |
| GPS module | ~10g |
| ELRS receiver + antenna | ~5g |
| 2S 1000mAh LiPo | ~55g |
| FPV camera + VTX + antenna (Phase 2) | ~20g |
| RPi Zero 2W + camera + BEC (Phase 3) | ~25g |
| **Total with all phases** | **~320g** |

Original toy flew at ~200g. At 320g you lose ~35% flight time and agility.
Brushed motors on geared drive should still generate enough thrust, but
expect 3-5 minute flights instead of 5-8.

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| FC doesn't support PWM for brushed motors | Motors won't spin | Verify INAV brushed motor support before buying FC |
| 2S voltage burns out brushed motors | Motor failure | ESC duty-cycle limits voltage; test one motor first |
| Geared drive vibration overwhelms gyro | Unstable flight | Rubber dampeners, FC soft mounting, gyro LPF filter |
| GPS + RPi weight exceeds frame capacity | Won't fly / very short flights | Phase components gradually, weigh before each flight |
| Brushed motors wear out faster under load | Motor replacement needed | Keep spare FK130 motors, they're cheap |

---

## Why Path C for Counter-UAS Research

Path C is the most directly useful for NexaMesh threat modeling:

1. **Fastest to fly** — No frame redesign, no motor mount CAD, no new props.
   Swap the brain, wire it up, configure, fly.
2. **Preserves the threat profile** — Same acoustic and visual signature as
   the original toy drone, but now with GPS logging and digital comms.
   This models the real-world scenario of a modified toy drone.
3. **Forensic research value** — The blackbox logs, GPS tracks, and (with
   Phase 3) AI inference logs create the exact evidence chain that
   NexaMesh's evidence system needs to process.
4. **Cheapest path to data** — You get flight logs and GPS data for under
   R1,500 total (Phase 1 only).

---

## Total Estimated Cost (Path C)

| Phase | ZAR Estimate | Items from Temu Cart |
|-------|-------------|---------------------|
| Phase 1 (FC + GPS + RX) | R1,200-1,800 | R997 (FC, GPS, antenna, XT30, dampeners, spacers, PH2.0, LiPo bag) |
| Phase 2 (FPV) | R1,190-2,010 | R251 (camera) |
| Phase 3 (AI) | R710-1,460 | — |
| **Total all phases** | **R3,100-5,270** | |

### Comparison to Other Paths

| Factor | Path A (3D mounts) | Path B (new frame) | Path C (brain only) |
|--------|-------------------|-------------------|-------------------|
| Frame | Keep (modified) | New carbon fiber | Keep (unmodified) |
| Motors | Brushless 1806 | Brushless 2205 | Brushed FK130 (original) |
| Props | New (9") | New (5") | Original (9.4") |
| Flight performance | Good | Excellent | Same as stock |
| Time to first flight | Weeks (3D iteration) | Days (standard build) | Hours (wire + configure) |
| Total cost | R3,950-6,220 | R4,850-8,900 | R3,100-5,270 |
| Research value | High | High | Highest (modified toy threat model) |
| Engineering challenge | High | Medium | Low |
