# Upgrade Path B — New 5" Frame with Full Brushless Build

**Recommended progression: [C](upgrade-path-c-brain-upgrade-brushed.md) → [A](upgrade-path-a-brushless-3d-printed-mounts.md) → B (this)**
| [Purchasing tracker](upgrade-purchasing-tracker.md)

## Overview

**Do this last.** By now you've completed Path C (brain upgrade, INAV config,
GPS, ELRS) and Path A (brushless conversion, 3D printing, DSHOT, ESC tuning).
This build is pure assembly — you already know every skill required.

Abandons the original X8-class toy frame entirely. Builds a standard 5"
FPV racing/freestyle quad using a carbon fiber frame with proper brushless
motor mounts. Most online tutorials and community support available for
this path. Best flight performance.

**Prerequisites from Path C + A:**
- INAV/Betaflight configuration (from C)
- ELRS binding and GPS rescue setup (from C)
- Brushless motor wiring and DSHOT protocol (from A)
- ESC configuration and motor direction setup (from A)
- PID tuning on both brushed and brushless (from C + A)
- Battery management for multi-cell LiPo (from A)

**What makes this path easy after C + A:**
- No new software skills to learn — you already know INAV/Betaflight
- No new soldering techniques — same FC pads, same UART wiring
- Standard 5" frame = massive YouTube/forum community for troubleshooting
- Off-shelf parts only — no custom 3D mounts, no adapter design

## Threat Classification After Upgrade

| Without AI tier | With AI tier |
|-----------------|--------------|
| Consumer+ (GPS + FPV + flight logs) | Commercial-lite (autonomous tracking) |

---

## Phase 1: Frame and Motors

**Goal:** Assemble a proper 5" brushless quad frame with motors and props.

### Component Role Map

| # | Component | Role | Why This Part | Source | Est. Cost (ZAR) |
|---|-----------|------|---------------|--------|-----------------|
| 1 | 5" carbon fiber frame (e.g., Mark4 225mm) | Airframe with proper motor mounts | 30.5x30.5 or 20x20 FC mounting, M3 motor holes, proven design | Temu/AliExpress | R300-500 |
| 2 | 2205 2300KV brushless motors (x4) | Main propulsion | Standard 5" freestyle motor, massive community support | AliExpress | R300-600 |
| 3 | 5x4.5" tri-blade propellers (x8+) | Thrust generation | Standard 5" prop, buy lots — they break | AliExpress | R50-100 |
| 4 | M3 x 8mm screws (x16) | Mount motors to frame arms | Standard motor mount hardware | Included with frame |
| 5 | Battery strap (x2) | Secure LiPo to frame | Rubberized, non-slip | R20-40 |

### Frame Assembly TODO

- [ ] Unbox frame kit, inventory all carbon plates and hardware
- [ ] Assemble bottom plate + standoffs + top plate
- [ ] Mount motors to arm ends (M3 screws, verify rotation direction)
- [ ] Thread motor wires through arms toward center stack
- [ ] Check prop clearance and arm spacing
- [ ] Verify frame weight (target: 90-120g frame only)

---

## Phase 2: Electronics Stack

**Goal:** Install FC, ESC, GPS, and receiver. Standard FPV build.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 6 | F405 V3 flight controller (20x20 or 30.5x30.5) | Flight control, blackbox logging | Temu (in cart) | R522 |
| 7 | 4-in-1 ESC 30-35A (match FC mount size) | Motor speed control, DSHOT600 | AliExpress | R300-500 |
| 8 | GY-NEO6MV2 GPS module | Position, RTH, waypoints | Temu (in cart) | R101 |
| 9 | ELRS 915MHz nano receiver | Long-range digital RC | AliExpress | R150-250 |
| 10 | 915MHz T-type antenna | RX antenna | Temu (in cart) | R48 |
| 11 | 4S LiPo 1300-1500mAh, XT60 | Power (14.8V for 2205 motors) | Local RC shop/AliExpress | R250-450 |
| 12 | XT60 connectors (5 pairs) | Battery connector (5" standard is XT60) | AliExpress | R40-60 |
| 13 | LiPo safety bag | Safe charging/storage | Temu (in cart) | R89 |
| 14 | LiPo charger (balance charger) | Charge 4S batteries | Local/AliExpress | R300-600 |
| 15 | M2/M3 rubber shock absorbers | FC vibration dampening | Temu (in cart) | R40 |
| 16 | microSD card 8-32GB | Blackbox logging | Local | R80-150 |
| 17 | PH2.0 connector kit (390pcs) | UART/peripheral wiring | Temu (in cart) | R103 |

### Electronics Build TODO

- [ ] Mount 4-in-1 ESC to frame bottom (standoffs + M3 screws)
- [ ] Mount FC on top of ESC (standoffs + rubber dampeners)
- [ ] Solder motor wires to ESC pads (match motor order: M1-M4)
- [ ] Solder XT60 pigtail to ESC battery pads
- [ ] Solder GPS wires to FC UART1 pads (TX/RX/5V/GND)
- [ ] Solder ELRS receiver wires to FC UART2 pads
- [ ] Mount GPS module on top of frame (raised on standoff or GPS mount)
- [ ] Mount ELRS antenna (T-antenna zip-tied to rear arm)
- [ ] Insert microSD card
- [ ] Connect USB-C to Betaflight Configurator
- [ ] Flash INAV firmware (for GPS) or Betaflight (for freestyle)
- [ ] Configure motor order and spin direction
- [ ] Calibrate accelerometer
- [ ] Set up GPS rescue, failsafe, arm/disarm switches
- [ ] Bind ELRS receiver to transmitter
- [ ] Bench test: arm, spin motors briefly (no props)
- [ ] Prop on, first hover (outdoors, open field)

### Wiring Diagram

```
4S LiPo ──XT60──> 4-in-1 ESC (30.5x30.5 or 20x20)
                   ├──3-phase──> Motor 1 (FR, CW)
                   ├──3-phase──> Motor 2 (RR, CCW)
                   ├──3-phase──> Motor 3 (RL, CW)
                   ├──3-phase──> Motor 4 (FL, CCW)
                   └──signal──> FC
                                 ├──UART1──> GPS
                                 ├──UART2──> ELRS RX
                                 ├──UART3──> (reserved for VTX/AI)
                                 └──USB-C──> Config PC
```

### Key Difference from Path A

This path uses **XT60** connectors (not XT30) because 5" quads on 4S draw
20-30A continuous. XT30 is rated for 30A burst only. The XT30 connectors
from your Temu cart are still useful for Phase 4 AI (powering the companion
computer BEC) but not for the main battery.

---

## Phase 3: FPV + Video

**Goal:** Full FPV flying capability with video recording.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 18 | YSIDO FPV camera 1800TVL | Live pilot view | Temu (in cart) | R251 |
| 19 | VTX 25-800mW 5.8GHz | Video transmitter (higher power for 5" range) | AliExpress | R200-350 |
| 20 | RHCP antenna (SMA/MMCX) | VTX antenna | AliExpress | R40-80 |
| 21 | FPV goggles | Pilot display + DVR | AliExpress/local | R800-1500 |
| 22 | Action camera mount | GoPro/Caddx mount on top plate | 3D print or buy | R0-50 |
| 23 | Action camera (optional) | HD recording | Local/AliExpress | R1,500-4,000 |

### FPV Build TODO

- [ ] Mount FPV camera in frame's front camera mount (tilt 20-35 degrees)
- [ ] Mount VTX to frame (stack or side-mount with double-sided tape)
- [ ] Solder camera video to VTX input
- [ ] Solder VTX power to ESC VBAT pads
- [ ] Mount antenna on rear of frame (away from carbon fiber)
- [ ] Configure VTX channel/power via Betaflight OSD
- [ ] Test video reception on goggles at various distances
- [ ] Test DVR recording quality
- [ ] (Optional) Mount action camera on top plate

---

## Phase 4: Onboard AI (Optional)

**Goal:** Companion computer for autonomous flight and target tracking.

### Component Role Map

| # | Component | Role | Source | Est. Cost (ZAR) |
|---|-----------|------|--------|-----------------|
| 24 | Raspberry Pi Zero 2W or Pi 5 | AI inference, MAVLink | Local/AliExpress | R250-1,200 |
| 25 | Pi Camera Module 3 | Detection input | Local/AliExpress | R400-600 |
| 26 | 5V 3A BEC | Power RPi from 4S battery | AliExpress | R30-60 |
| 27 | microSD 32-64GB (for RPi) | OS + AI models | Local | R80-200 |
| 28 | PMW3901 optical flow + VL53L1X | Indoor position hold | AliExpress | R150-250 |
| 29 | 3D-printed RPi mount | Secure RPi to frame top plate | 3D print | R0-20 |
| 30 | XT30 pigtail for BEC | Power tap for companion computer | Temu (in cart) | R0 (from kit) |

### AI Build TODO

- [ ] Flash RPi OS Lite, install YOLOv8n/MobileNet
- [ ] Wire BEC: tap from ESC VBAT to 5V BEC to RPi
- [ ] Connect RPi UART to FC UART3 (MAVLink/MSP bridge)
- [ ] Mount RPi + camera on frame top plate
- [ ] Connect optical flow sensor (SPI/I2C)
- [ ] Test inference speed (target: 10+ FPS on Pi 5, 5+ on Zero 2W)
- [ ] Test MAVLink control (mode switching, position hold)
- [ ] Test autonomous target tracking
- [ ] Test GPS waypoint missions triggered by companion computer

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| 4S LiPo fire during charging | Safety hazard | Always charge in LiPo bag, never unattended |
| Motor/prop failure at high speed | Crash, component damage | Start with low rates, fly over grass |
| Carbon fiber interferes with GPS | Poor position hold | Mount GPS on raised mast, away from frame |
| Overweight with AI payload | Short flight time, poor handling | Use Pi Zero 2W (10g) not Pi 5 (50g+) |
| ELRS range exceeds visual line of sight | Legal/safety issue | Set max distance in INAV, use GPS rescue |

## What Happens to the Original Frame

The X8-class toy frame and its FK130 geared motors become a **reference
specimen** for the counter-UAS research project:
- Baseline threat tier for comparison
- Forensic teardown training aid
- Display/documentation piece

---

## Total Estimated Cost (Path B)

| Phase | ZAR Estimate | Items from Temu Cart |
|-------|-------------|---------------------|
| Phase 1 (frame + motors) | R650-1,240 | — |
| Phase 2 (electronics) | R2,000-3,100 | R903 (FC, GPS, antenna, dampeners, PH2.0, LiPo bag) |
| Phase 3 (FPV) | R1,290-2,230 | R251 (camera) |
| Phase 4 (AI) | R910-2,330 | — |
| **Total all phases** | **R4,850-8,900** | |

### Comparison to Path A

| Factor | Path A (3D mounts) | Path B (new frame) |
|--------|-------------------|-------------------|
| Frame cost | R0 (reuse) | R300-500 |
| Motor class | 1806 (smaller, 2S-3S) | 2205 (standard 5", 4S) |
| Flight performance | Moderate | Excellent |
| Weight budget | Tight (~400g max) | Generous (~600-700g) |
| Build complexity | High (3D design) | Medium (standard) |
| Community support | Minimal (custom) | Massive (standard 5" build) |
| Repairability | Custom parts needed | Standard off-shelf parts |
| AI payload capacity | Limited | Good |
| Total cost | R3,950-6,220 | R4,850-8,900 |
