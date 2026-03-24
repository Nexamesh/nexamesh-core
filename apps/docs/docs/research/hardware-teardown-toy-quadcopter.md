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

## Relevance to Phoenix Rooivalk

This teardown establishes the **baseline** for drone threat classification.
The threat simulator should model this tier as the simplest case:
- Detectable via basic RF scanning (2.4 GHz proprietary protocol)
- No autonomous behavior to model
- No evidence recovery workflow needed (nothing to recover)
- Countermeasure: simple RF jamming causes immediate loss of control

Higher threat tiers (consumer GPS drones, commercial platforms, military UAS)
add progressively more storage, autonomy, and forensic complexity as documented
in `storage-technologies-counter-uas-threat-assessment.md`.
