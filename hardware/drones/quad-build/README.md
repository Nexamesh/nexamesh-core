# Phoenix Quad — Test Target Drone Build

A 5" FPV-class quadcopter that serves as a **threat simulation target** for
the PhoenixRooivalk counter-UAS detection and tracking system. Built from
commodity parts, with an ESP32 companion board for mesh network integration.

Phase A = Quad (this doc). Phase B = VTOL conversion (future doc).

---

## Design Goals

| Goal | Requirement |
|------|-------------|
| Primary role | Repeatable autonomous test target for detector/turret |
| Secondary role | Cooperative mesh node (ESP32 companion) |
| Flight time | 8–12 min (enough for test patterns) |
| Range | 500m visual line of sight |
| GPS waypoints | Autonomous mission replay (ArduPilot) |
| Budget target | < R5,000 (~$275) for airframe + electronics |
| Repairability | Common 5" parts, field-swappable arms |
| Future path | VTOL conversion with tilt-rotor or wing kit |

---

## Bill of Materials

### Frame

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| Frame kit | 5" (220mm) freestyle frame, true-X or squished-X | R350–600 | Source F5 / Alien / TBS Source One (open source) |
| Spare arms | 2× replacement arms | R80–150 | Match frame brand |

### Flight Controller + ESC Stack

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| Flight controller | STM32 F4/F7/H7, ArduPilot-compatible | R400–800 | SpeedyBee F405 V4 or Matek H743 Slim |
| 4-in-1 ESC | 30A+ BLHeli_32 or AM32 | R350–600 | Match FC stack size (20×20 or 30.5×30.5) |
| GPS module | u-blox M10 with compass | R200–400 | BN-880 or Matek M10Q |
| Buzzer | 5V active buzzer | R20 | For lost-model alarm |

**Why ArduPilot over Betaflight?** ArduPilot supports autonomous GPS waypoint
missions out of the box. Betaflight is manual-only. For repeatable test
patterns, ArduPilot is required.

### Motors + Props

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| Motors (×4) | 2306 1700–2400KV brushless | R600–1000 | Lower KV = more efficient, higher KV = more agile |
| Props (×8) | 5" tri-blade (5×4.3×3 or 51466) | R80–150 | Buy spares, they break |
| Prop nuts | M5 self-lock (if not included) | R20 | CW + CCW pair |

**KV selection:**
- 1700–1900KV: Longer flight time, smoother tracking patterns, better for VTOL conversion later
- 2200–2400KV: More agile, realistic threat simulation, shorter flight

Recommendation: **1900KV** — good balance, still converts to VTOL.

### Power

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| Battery | 4S 1500–1800mAh LiPo | R400–600 | XT60 connector |
| Battery strap | 200mm rubberised | R30 | |
| Charger | Balance charger (if you don't have one) | R300–600 | ToolkitRC M6 or iSDT Q6 |
| XT60 pigtails | 2× for wiring | R30 | |

### Radio Control

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| TX (transmitter) | ExpressLRS-compatible | R800–1500 | RadioMaster Pocket / Zorro / Boxer |
| RX (receiver) | ELRS 2.4GHz micro RX | R150–300 | BetaFPV Nano / HappyModel EP1 |

**Why ExpressLRS?** Open-source, low latency (~2ms), long range (10km+),
future-proof. The existing FlySky GT3B pistol grip is 3-channel only — not
enough for a quad (needs 8+ channels for flight modes, arming, GPS return).

### ESP32 Companion Board (Mesh Integration)

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| ESP32-S3 SuperMini | WiFi + BLE companion | R80 | Same as hub/relay nodes |
| SX1276 LoRa module | 868/915MHz LoRa radio | R60 | Mesh comms with ground station |
| UART cable | JST-SH 4pin | R15 | FC UART → ESP32 |

The ESP32 connects to the FC via MAVLink (UART) and bridges telemetry to the
PhoenixRooivalk mesh network. It can:
- Report GPS position to the ground station
- Receive mission commands over LoRa
- Act as a "cooperative threat" that intentionally broadcasts for detector testing
- Simulate a "non-cooperative threat" by going radio-silent (LoRa off)

### FPV (Optional — Phase A.2)

| Part | Spec | Est. Cost (ZAR) | Notes |
|------|------|-----------------|-------|
| Camera | Micro FPV cam (Caddx Ratel 2 / RunCam) | R250–400 | Analog or DJI depending on goggles |
| VTX | 25–600mW video transmitter | R200–400 | Analog: TBS Unify. Digital: Vista/O3 Air Unit |
| Goggles | FPV goggles | R800–3000+ | Analog: EV800D budget. Digital: DJI Goggles |
| Antenna | RHCP SMA | R60 | LoLLipop or Foxeer Lollipop |

FPV is optional for Phase A — autonomous GPS missions don't require it. Add
later for manual flying and pilot training.

---

## Budget Summary

| Category | Min (ZAR) | Max (ZAR) |
|----------|-----------|-----------|
| Frame | 350 | 600 |
| FC + ESC stack | 750 | 1,400 |
| GPS | 200 | 400 |
| Motors (×4) | 600 | 1,000 |
| Props + nuts | 100 | 170 |
| Battery | 400 | 600 |
| Charger | 300 | 600 |
| Radio TX + RX | 950 | 1,800 |
| ESP32 companion | 155 | 155 |
| **Total (no FPV)** | **R3,805** | **R6,725** |
| FPV add-on | 1,310 | 3,860 |
| **Total (with FPV)** | **R5,115** | **R10,585** |

---

## Wiring Diagram

```text
Battery (4S LiPo)
  │
  ├── XT60 ──► 4-in-1 ESC ──► Motor 1 (front-left)
  │                        ──► Motor 2 (front-right)
  │                        ──► Motor 3 (rear-left)
  │                        ──► Motor 4 (rear-right)
  │
  ├── ESC 5V BEC ──► Flight Controller (FC)
  │                    ├── UART1 ──► ELRS Receiver (CRSF protocol)
  │                    ├── UART2 ──► GPS Module (u-blox)
  │                    ├── UART3 ──► ESP32-S3 (MAVLink telemetry)
  │                    ├── I2C ───► GPS compass (HMC5883L)
  │                    └── Buzzer pin ──► Active buzzer
  │
  └── ESC 5V BEC (or separate regulator) ──► ESP32-S3
                                                ├── SPI ──► SX1276 LoRa
                                                └── UART ──► FC (MAVLink)
```

---

## Firmware Setup

### Flight Controller — ArduPilot

1. Flash ArduCopter 4.5+ via [ArduPilot firmware server](https://firmware.ardupilot.org/)
2. Connect via Mission Planner or QGroundControl
3. Key parameters:
   ```
   FRAME_CLASS = 1          (Quad)
   FRAME_TYPE  = 1          (X layout)
   MOT_PWM_TYPE = 6         (DShot600)
   SERIAL1_PROTOCOL = 23    (RCIN — ELRS CRSF)
   SERIAL2_PROTOCOL = 5     (GPS)
   SERIAL3_PROTOCOL = 2     (MAVLink2 — ESP32 companion)
   SERIAL3_BAUD = 57        (57600 baud)
   GPS_TYPE = 1             (Auto-detect)
   ARMING_CHECK = 1         (All checks enabled)
   FS_THR_ENABLE = 1        (Failsafe: RTL on signal loss)
   ```

### ESC — BLHeli_32 / AM32

1. Flash via BLHeli configurator (USB passthrough from FC)
2. Set motor direction (props-in or props-out, match ArduPilot motor map)
3. Enable DShot600 bidirectional (for RPM telemetry)

### ESP32 Companion — PhoenixRooivalk Mesh

Firmware lives in `hardware/drones/quad-build/firmware/companion/` (to be created).

Core functions:
- MAVLink parser on UART (receives GPS, attitude, battery, flight mode)
- LoRa mesh relay (forwards telemetry to ground hub)
- Mode switch:
  - **Cooperative**: Broadcasts position + ID (for testing detection + tracking)
  - **Silent**: LoRa off, WiFi off (for testing passive detection only)
  - **Spoof**: Broadcasts fake position (for testing spoofing detection)
- Ground command reception (start/stop mission, RTL, mode switch)

---

## Test Mission Profiles

Pre-programmed GPS waypoint missions for repeatable detector testing:

### Mission 1 — Straight Approach
```
Takeoff → 50m alt → Fly straight toward turret at 5 m/s → Hover at 20m → RTL
```
Tests: Detection range, lock-on time, tracking stability

### Mission 2 — Orbit
```
Takeoff → 50m alt → Circle turret at 30m radius, 3 m/s → RTL
```
Tests: Continuous tracking, pan servo limits, prediction accuracy

### Mission 3 — Zigzag Evasion
```
Takeoff → 30m alt → Approach with random lateral offsets every 3s → RTL
```
Tests: Tracker responsiveness, PID recovery, Kalman filter performance

### Mission 4 — Multi-Altitude
```
Takeoff → Climb to 100m → Descend to 10m in steps (100/50/30/10) → Hover 10s each → RTL
```
Tests: Detection at various altitudes, camera tilt range, size estimation

### Mission 5 — Pop-Up
```
Takeoff → Fly to 200m distance at 5m alt (below treeline) → Rapid climb to 50m → Hover → RTL
```
Tests: Surprise detection, alert latency, time-to-lock

---

## Build Phases

### Phase A.1 — Basic Quad (Weeks 1–2)
- [ ] Order parts (BOM above)
- [ ] Assemble frame + motors
- [ ] Solder ESC→FC stack
- [ ] Flash ArduCopter
- [ ] Bind ELRS TX/RX
- [ ] Maiden flight (manual stabilize mode)
- [ ] PID tune (autotune in ArduPilot)
- [ ] GPS test (loiter mode, RTL)

### Phase A.2 — Mesh Integration (Weeks 3–4)
- [ ] Wire ESP32 companion to FC UART3
- [ ] Flash companion firmware (MAVLink → LoRa bridge)
- [ ] Verify telemetry on ground hub
- [ ] Test cooperative/silent mode switching
- [ ] Run Mission 1 while turret tracks

### Phase A.3 — Autonomous Test Missions (Weeks 4–6)
- [ ] Program waypoint missions in Mission Planner
- [ ] Upload missions to FC via companion (LoRa)
- [ ] Run all 5 test profiles
- [ ] Log detector performance per mission
- [ ] Compare detection rates: cooperative vs silent vs spoof

### Phase A.4 — FPV (Optional)
- [ ] Add FPV camera + VTX
- [ ] Manual flight testing with goggles
- [ ] Pilot training for realistic threat simulation

---

## VTOL Conversion Path (Phase B — Future)

The 5" quad frame is chosen to allow future VTOL conversion:

| Approach | Complexity | Cost | Notes |
|----------|-----------|------|-------|
| **Bolt-on wing kit** | Low | R500–1000 | 3D-printed wings clip to frame, quad motors tilt |
| **Tilt-rotor conversion** | Medium | R1000–2000 | Front motors on servos (D-FLife 7-in-1 fits here), rear stays fixed |
| **Dedicated VTOL frame** | High | R2000–4000 | New frame, reuse FC/motors/ESCs/companion |

The **1900KV motor recommendation** above specifically accounts for VTOL — lower
KV gives better efficiency in forward flight. The ArduPilot FC supports
QuadPlane mode natively — same firmware, just different FRAME_CLASS parameter.

When you're ready for Phase B, the D-FLife 7-in-1 actuators make sense for
tilt-rotor control — high torque, fast response, brushless reliability for
continuous tilting under prop load.

---

## Safety

- **Always arm with propellers clear** — ArduPilot arming checks enforce this
- **Failsafe RTL** is mandatory — signal loss = automatic return home
- **Geofence** enabled — configurable radius/altitude ceiling
- **Low battery RTL** — triggers at 20% remaining
- **ESP32 companion has no flight authority** — telemetry only, cannot send
  commands to the FC that override pilot input
- **Test in open area** — minimum 50m from people/structures for autonomous missions
- Follow local drone regulations (SACAA in South Africa: sub-7kg, VLOS, < 120m AGL)
