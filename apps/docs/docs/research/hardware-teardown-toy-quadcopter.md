# Hardware Teardown: Budget Toy-Grade Quadcopter (Syma X8-Class)

## Overview

Physical teardown of a budget consumer quadcopter for counter-UAS threat
classification purposes. This represents the **lowest threat tier** in the
drone threat spectrum.

**Actual measurements:** 320mm motor-to-motor diagonal, 240mm (~9.4") propellers,
geared brushed drive system. Larger than initially assumed (X8-class, not
X5-class).

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
- Geared drive (not direct), no ESC firmware to extract

### Motors and Drive System

- **Motor type:** FK130-class brushed DC motor (part number 32-4129-38)
- **Motor can:** ~20mm diameter x ~27mm long — significantly larger than 8520
  coreless motors found in smaller toy quads
- **Drive:** Geared — motor has a small pinion gear that meshes with a ~25mm
  spur gear. Prop shaft is on the spur gear, not the motor shaft directly
- **Prop mounting:** Press-fit over spur gear shaft (no screw or nut)
- **Motor mounting:** Clip-in cylindrical housing in each arm — no screw
  holes or bolt pattern for direct motor replacement

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

## Internal Upgrade Paths

Three upgrade approaches are documented, each with its own detailed
roadmap, component list, and build checklist:

| Path | Approach | Frame | Cost | Complexity |
|------|----------|-------|------|------------|
| [Path A](upgrade-path-a-brushless-3d-printed-mounts.md) | 3D-print motor adapters for brushless on existing frame | Keep X8 frame | Medium | High (CAD + print + iterate) |
| [Path B](upgrade-path-b-new-frame-brushless.md) | New 5" carbon frame with full brushless build | New frame | Higher | Medium (standard FPV build) |
| [Path C](upgrade-path-c-brain-upgrade-brushed.md) | Keep brushed geared motors, upgrade brain only | Keep X8 frame | Lowest | Low (FC swap + wiring) |

### Frame Measurements (Actual)

| Parameter | Measurement |
|-----------|-------------|
| Motor-to-motor diagonal | 320mm |
| Propeller diameter | 240mm (~9.4") |
| Motor type | FK130-class brushed, geared drive |
| Motor can | ~20mm dia x ~27mm long |
| Pinion/spur gear ratio | Small pinion to ~25mm spur gear |
| Prop mounting | Press-fit over spur gear shaft |
| Motor mounting | Clip-in cylindrical housing (no bolt pattern) |
| Battery | 1S 3.7V LiPo (original) |

### Decision Guide

- **Path A** if: You have a 3D printer and want the engineering challenge of
  fitting brushless motors into the existing frame. Most educational, most
  iteration required.
- **Path B** if: You want the best flight performance and don't care about
  preserving the original frame. Standard FPV build path, most online
  tutorials available.
- **Path C** if: You want the fastest, cheapest route to GPS + logging +
  digital control. Keeps the geared brushed motors working. Best for
  immediate counter-UAS research needs.

All three paths share common electronics (FC, GPS, receiver, battery
connector). The difference is motors, ESC type, frame, and props.

## Relevance to Phoenix Rooivalk

This teardown and upgrade path establishes the full spectrum for drone threat
classification. The threat simulator should model these tiers:

- **Stock (toy):** Detectable via basic RF scanning, simple RF jamming defeats
- **Path C (brain upgrade):** Flight logs recoverable, GPS waypoints reveal
  intent, ELRS harder to jam than toy protocol
- **Path A/B (brushless):** Higher performance, FPV video evidence recoverable,
  pilot location traceable via VTX signal
- **Any path + AI tier:** Autonomous behavior, forensic goldmine if captured
  (model weights, inference logs, detection history)

Each path maps to progressively more complex detection and countermeasure
requirements in the Phoenix Rooivalk system. See
`storage-technologies-counter-uas-threat-assessment.md` for the storage
forensics perspective.
