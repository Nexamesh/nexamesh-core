---
id: phase1-drone-net-launcher
title: "Drone Net Launcher — Air-to-Air Intercept Node"
sidebar_label: Drone Net Launcher
sidebar_position: 6
description:
  Phase 1A build guide for a drone-mounted ESP32-C3 net launcher node. Receives
  arm/fire commands from the ground station over WiFi. Two deployment options -
  gas-ignition pressure (high velocity) or spring-loaded servo release (simple).
  Human-in-the-loop only.
difficulty: intermediate
estimated_reading_time: 8
points: 15
tags:
  - hardware
  - phase-1
  - esp32
  - drone
  - net-launcher
  - actuation
  - safety
  - air-to-air
phase: ["seed"]
prerequisites: ["phase1-hardware-overview", "phase1-trigger-node"]
---

# Drone Net Launcher — Air-to-Air Intercept Node

A drone-mounted ESP32-C3 node that receives arm/fire commands from the ground
station and deploys a capture net. Two deployment mechanisms are documented:

1. **Gas ignition** (current prototype) — a sealed gas container is ignited
   electronically, and the rapid pressure build-up ejects the net at high
   velocity.
2. **Spring-loaded servo release** (simple alternative) — a compression spring
   held by a servo-latched pin ejects the net at lower velocity.

**Single shot, human-in-the-loop only.**

---

## What It Proves

> **Ground command → Airborne actuation → Net deployment**, extending the
> detect-decide-act chain into the air domain.

The ground station (Turret Tracker + SkyWatch) identifies and tracks a target
drone. The operator arms the intercept drone, maneuvers it into position, and
commands fire. The net deploys — proving the full air-to-air engagement loop
without any autonomous firing.

---

## Why ESP32-C3

| Factor          | ESP32-C3                          | ESP32-S (30-pin)        |
| --------------- | --------------------------------- | ----------------------- |
| Weight          | ~5g (bare module)                 | ~10-15g                 |
| Core            | RISC-V single-core (160MHz)      | Xtensa dual-core        |
| WiFi            | 802.11 b/g/n                     | Same                    |
| BLE             | 5.0 (backup comms)               | 4.2                     |
| GPIO            | 15 usable — plenty for 1 servo   | 25+ usable              |
| Power draw      | ~80mA active WiFi                | ~160mA active WiFi      |
| Cost            | ~$3-4                            | ~$5-8                   |
| **Verdict**     | **Best for drone (light, low power)** | Better for ground station |

Every gram matters on a drone. The C3's lower weight and power draw make it the
right choice for an airborne node.

---

## Bill of Materials — Drone Node

### Common Components (Both Options)

| Component          | Part                            | Specification                                | Est. Cost |
| ------------------ | ------------------------------- | -------------------------------------------- | --------- |
| Compute            | ESP32-C3 SuperMini              | RISC-V, WiFi + BLE 5.0                      | $3–4      |
| Power regulator    | Mini buck (MP2307 or AMS1117)   | Drone battery voltage → 3.3V for ESP32      | $1–2      |
| Arm switch         | Micro toggle (SPST)             | Physical master arm on drone frame           | $0.50     |
| Status LED         | 3mm red/green                   | Armed/safe visible from ground               | $0.50     |
| Net assembly       | Lightweight mesh net            | ~1m², nylon or polyester, corner weights     | $5        |
| Corner weights     | Fishing sinkers or steel nuts   | 4× ~10-15g each                              | $2        |
| Wiring             | Silicone wire (26AWG), JST-XH   | Lightweight, heat-resistant                  | $2        |

### Option A — Gas Ignition (Current Prototype)

| Component          | Part                            | Specification                                | Est. Cost |
| ------------------ | ------------------------------- | -------------------------------------------- | --------- |
| Igniter driver     | IRLZ44N MOSFET module           | Logic-level gate, handles igniter current    | $2        |
| Igniter element    | Nichrome wire or e-match        | Resistive heating element to ignite gas      | $1–3      |
| Gas container      | Sealed pressure vessel          | Gas-filled, ignites for pressure build-up    | $3–8      |
| Barrel / tube      | PVC or aluminium tube           | Directs gas pressure to eject net            | $2–5      |
| Burst disc / seal  | Thin membrane or foil cap       | Contains gas until ignition pressure reached | $1–2      |
| Pull-down resistor | 10kΩ                            | MOSFET gate safety (prevents floating pin)   | $0.10     |
| **Option A total** |                                 |                                              | **$23–35**|

### Option B — Spring-Loaded Servo Release (Simple Alternative)

| Component          | Part                            | Specification                                | Est. Cost |
| ------------------ | ------------------------------- | -------------------------------------------- | --------- |
| Trigger servo      | SG90 micro servo                | Pin-pull release mechanism                   | $2        |
| Spring mechanism   | Compression spring or bungee    | Deployment force for net ejection            | $2–3      |
| Release housing    | 3D-printed or lightweight tube  | Holds net + spring, servo-latched lid        | $2–5      |
| **Option B total** |                                 |                                              | **$20–28**|

### Weight Budget

| Component                  | Option A (Gas) | Option B (Spring) |
| -------------------------- | -------------- | ----------------- |
| ESP32-C3 module            | 5g             | 5g                |
| Actuator (MOSFET / servo)  | 8g             | 9g                |
| Buck converter             | 3g             | 3g                |
| Wiring + switch            | 5g             | 5g                |
| Launcher (gas / spring)    | 50-100g        | 30-50g            |
| Net (1m² nylon)            | 20-30g         | 20-30g            |
| Corner weights             | 40-60g         | 40-60g            |
| **Total payload**          | **~131-211g**  | **~112-162g**     |

Most consumer drones (250mm+) can carry 150-300g payload. Option B fits a 250mm
frame; Option A is better suited for a 450mm+ platform with 4S power for
sufficient thrust margin.

---

## Architecture

```text
  ┌──────────────────────────────────────────────────────────────┐
  │                  Drone Net Launcher Node                      │
  │                                                              │
  │   Drone Battery ──┬── Mini Buck ── 3.3V ── ESP32-C3          │
  │                   │                         │                 │
  │                   │                  GPIO ── Micro toggle (arm)│
  │                   │                  GPIO ── Green LED (armed) │
  │                   │                  GPIO ── Red LED (safe)    │
  │                   │                  GPIO ── MOSFET gate       │
  │                   │                                           │
  │                   │    ┌─────────────────────────────┐        │
  │                   │    │ MOSFET (IRLZ44N)            │        │
  │                   └────┤ Drain ── Igniter element    │        │
  │                        │ Source ── GND               │        │
  │                        └─────────────────────────────┘        │
  │                                                              │
  │                    ┌──────────────────────────┐              │
  │                    │   Launch Tube             │              │
  │                    │                          │              │
  │                    │   ┌── Net (folded) ──┐   │              │
  │                    │   │  corner weights   │   │              │
  │                    │   └──────────────────┘   │              │
  │                    │   ┌── Burst disc ────┐   │              │
  │                    │   └──────────────────┘   │              │
  │                    │   ┌── Gas container ─┐   │              │
  │                    │   │  + igniter wire   │   │              │
  │                    │   └──────────────────┘   │              │
  │                    └──────────────────────────┘              │
  │                                                              │
  │   WiFi ◄── ARM / FIRE commands from ground station           │
  └──────────────────────────────────────────────────────────────┘

  Ground Station (ESP32-S)                    Drone (ESP32-C3)
  ┌───────────────────┐    WiFi (2.4GHz)    ┌───────────────────┐
  │ SkyWatch detect   │ ─────────────────── │ Net Launcher      │
  │ Turret track      │    ARM / FIRE cmd   │ Gas ignition      │
  │ Operator console  │ ◄───────────────── │ Status heartbeat  │
  └───────────────────┘    Status / ACK     └───────────────────┘
```

---

## Deployment Mechanisms

Two options are documented. Choose based on your risk tolerance, drone platform,
and engagement range requirements.

### Mechanism Comparison

| Mechanism             | Ejection Velocity  | Weight  | Complexity | Range   | Reloadable          |
| --------------------- | ------------------ | ------- | ---------- | ------- | ------------------- |
| **A: Gas ignition**   | **High (50+ m/s)** | Medium  | Medium     | 15-30m  | Yes (new container) |
| **B: Spring + servo** | Low (5-10 m/s)     | Low     | Low        | 3-8m    | Yes (reset spring)  |
| CO2 cartridge         | Medium (20-30 m/s) | Medium  | Medium     | 10-20m  | Yes (new cartridge) |
| Compressed air tank   | Medium (20-40 m/s) | High    | Medium     | 10-25m  | Yes (refill)        |

---

### Option A — Gas Ignition Pressure (Current Prototype)

The current prototype uses a **sealed gas container that is ignited
electronically**. The rapid combustion creates a pressure pulse that ejects the
net at high velocity through a launch tube.

#### How It Works

1. **Gas container** is sealed and mounted at the base of the launch tube.
2. **Nichrome wire or e-match igniter** is embedded in or adjacent to the gas
   container, wired through a MOSFET to the drone battery.
3. **Net is folded** above a burst disc / foil seal that separates it from the
   gas chamber.
4. On `FIRE` command: ESP32 drives MOSFET gate HIGH → current flows through
   igniter → gas ignites → pressure builds → burst disc ruptures → net is
   ejected at high velocity → corner weights spread the net in flight.

#### Sequence Timing

```text
  FIRE cmd ──▶ MOSFET ON ──▶ Igniter heats ──▶ Gas ignites ──▶ Pressure builds
   t=0ms         t=1ms         t=5-20ms          t=20-50ms

  ──▶ Burst disc ruptures ──▶ Net ejects ──▶ Net spreads
        t=30-80ms               t=50-100ms     t=100-300ms
```

Total time from command to net deployment: **< 100ms** (much faster than
spring-based or CO2 systems).

#### Gas Container Considerations

- **Container material**: must withstand storage pressure but rupture/vent
  predictably when ignited. Prototype uses thin-wall sealed containers.
- **Gas selection**: the gas must be commercially available, storable, and
  produce sufficient pressure on ignition without excessive blast or shrapnel.
- **Burst disc calibration**: the burst disc must hold during storage and transit
  but rupture cleanly at the designed ignition pressure. Too strong = squib
  (no deployment). Too weak = premature rupture.
- **Igniter reliability**: nichrome wire is simple and reliable but requires
  sufficient current (~1-3A for 50-200ms). E-matches are more consistent but
  single-use. Both work from a LiPo via MOSFET.

:::danger
**Gas ignition is an energetic event.** Unlike spring or servo mechanisms, this
system produces heat, pressure, and potentially flame. All testing must be done
outdoors, away from people, with the operator behind cover. Eye and ear
protection required. Never point the launch tube at anything you don't intend to
hit.
:::

:::warning
**Regulatory note:** Depending on jurisdiction, gas-ignition launchers may be
classified as pyrotechnic devices. Check local regulations before building,
testing, or transporting. This documentation is for a **simulation and training
platform** — always comply with applicable laws.
:::

---

### Option B — Spring-Loaded Servo Release (Simple Alternative)

A lower-risk, lower-velocity alternative suitable for close-range intercepts or
initial bench testing.

#### How It Works

1. **Net is folded** into a lightweight canister (3D-printed tube or PVC cap).
2. **Compression spring** sits beneath the folded net.
3. **Servo arm holds a retaining pin** that keeps the spring compressed.
4. On `FIRE` command: servo rotates 90° → pin withdraws → spring pushes net
   out → corner weights spread the net in flight.

#### Advantages Over Gas Ignition

- No energetics — safe for indoor bench testing and demos
- No consumables — spring resets, no new gas containers needed
- No regulatory concerns — purely mechanical
- Simpler wiring — servo signal wire only, no MOSFET or igniter circuit
- Lighter total weight (~112-162g vs ~131-211g)

#### Limitations

- Much lower ejection velocity (5-10 m/s vs 50+ m/s)
- Shorter effective range (3-8m vs 15-30m)
- Requires closer intercept approach — harder operationally
- Spring force limited by canister size and drone payload capacity

---

## Safety Architecture

The drone node inherits and extends the Trigger Node safety model. Airborne
actuation demands **stricter** safety than ground-based — especially for Option A
(gas ignition), where an accidental ignition cannot be undone.

### Safety Chain (All Must Pass — Both Options)

1. **Physical arm switch** — micro toggle on the drone frame. Must be set before
   takeoff. Pilot physically confirms arming. **For Option A, this switch gates
   power to the MOSFET circuit** — when disarmed, the igniter has no electrical
   path regardless of software state.
2. **Software arm state** — firmware mirrors physical switch. Cannot be armed by
   software alone.
3. **Ground station ARM command** — two-stage: ground sends `ARM`, drone ACKs.
   Separate `FIRE` command required afterward.
4. **Pre-shared token auth** — `Authorization: Bearer <token>` on all commands.
5. **Heartbeat watchdog** — drone expects heartbeat from ground station every
   500ms. If 3 consecutive heartbeats are missed (1.5s), the node reverts to
   **SAFE** state. Loss of comms = safe, not fire.
6. **Output pull-down** — a 10kΩ pull-down resistor on the MOSFET gate (Option
   A) or servo signal pin (Option B) ensures the actuator stays OFF if the ESP32
   reboots, crashes, or enters an undefined GPIO state.
7. **Single-shot lockout** — once fired, the node enters SPENT state. Cannot
   re-arm without physical reload and power cycle.
8. **Altitude/orientation guard** (Phase 1B) — future: IMU checks that drone is
   in a reasonable flight attitude before allowing fire.

### Option A — Ignition-Specific Safety

Because gas ignition is an energetic event, these additional precautions apply
beyond the standard safety chain:

| Hazard                  | Mitigation                                            |
| ----------------------- | ----------------------------------------------------- |
| Accidental ignition     | Physical switch gates MOSFET power; pull-down on gate |
| ESP32 crash / reboot    | Pull-down resistor defaults gate LOW (igniter off)    |
| Static discharge        | Shielded igniter leads, twisted pair wiring           |
| Heat near gas container | Igniter leads routed away from container until ready  |
| Overpressure            | Burst disc sized for expected pressure; vent holes    |
| Container rupture       | Launch tube contains fragments; tube aimed downward   |
| Post-fire hot surfaces  | SPENT state prevents handling; cool-down period noted |
| RF-induced ignition     | Igniter leads kept short; MOSFET off = no current path|

### State Machine

```text
  POWER ON
     │
     ▼
  ┌──────┐   physical switch ON    ┌────────┐
  │ SAFE │ ───────────────────────▶│ ARMED  │
  │      │◀─────────────────────── │(local) │
  └──────┘   switch OFF / timeout  └────┬───┘
                                        │ ground ARM cmd + token
                                        ▼
                                   ┌─────────┐
                                   │ ARMED   │
                                   │(remote) │
                                   └────┬────┘
                                        │ ground FIRE cmd + token
                                        ▼
                                   ┌─────────┐
                                   │ FIRING  │ ── igniter / servo actuates
                                   └────┬────┘
                                        │
                                        ▼
                                   ┌─────────┐
                                   │  SPENT  │ ── lockout until reload + reboot
                                   └─────────┘

  Any state ──(heartbeat timeout)──▶ SAFE
  Any state ──(physical switch OFF)──▶ SAFE
```

---

## Communication Protocol

### Ground → Drone

| Endpoint      | Method | Purpose                        | Auth Required |
| ------------- | ------ | ------------------------------ | ------------- |
| `POST /arm`   | POST   | Transition to ARMED (remote)   | Bearer token  |
| `POST /fire`  | POST   | Deploy net                     | Bearer token  |
| `POST /safe`  | POST   | Force return to SAFE           | Bearer token  |
| `GET /status` | GET    | Query current state            | Bearer token  |

### Drone → Ground

| Message     | Interval | Content                              |
| ----------- | -------- | ------------------------------------ |
| Heartbeat   | 200ms    | `{ state, battery_v, uptime_ms }`    |
| ACK         | On event | `{ cmd, result, timestamp }`         |
| FIRED       | Once     | `{ timestamp, state: "spent" }`      |

### Example Flow

```text
Ground                              Drone
  │                                   │
  │──── POST /arm (token) ──────────▶│
  │◀─── 200 { state: "armed" } ─────│
  │                                   │
  │   ... operator maneuvers drone ... │
  │                                   │
  │──── POST /fire (token) ─────────▶│
  │◀─── 200 { state: "firing" } ────│
  │                                   │ ── servo actuates
  │◀─── FIRED { state: "spent" } ───│
  │                                   │
```

---

## Build Steps

### Step 1 — Power

1. Identify drone battery voltage (typically 3S LiPo = 11.1V nominal).
2. Connect mini buck converter input to drone battery pads or XT30 pigtail.
3. Adjust output to 3.3V (ESP32-C3 is 3.3V native — no 5V needed).
4. Verify voltage under load before connecting the C3.

### Step 2 — ESP32-C3 Setup

1. Flash with Arduino IDE or ESP-IDF (C3 uses RISC-V toolchain).
2. Configure WiFi credentials (hardcoded for demo, move to BLE provisioning in
   Phase 1B).
3. Set up HTTP server with `/arm`, `/fire`, `/safe`, `/status` endpoints.
4. Implement heartbeat broadcast (UDP or HTTP POST to ground station IP).

### Step 3 — Arm/Disarm Circuit

1. Wire micro toggle between GPIO pin and GND (enable internal pull-up).
2. Wire green LED (+ 220Ω resistor) to armed GPIO.
3. Wire red LED (+ 220Ω resistor) to safe GPIO.
4. Firmware reads switch on boot and on interrupt — physical switch always wins.

### Step 4A — Gas Ignition Trigger (Option A)

1. IRLZ44N MOSFET: source → GND, gate → ESP32-C3 GPIO (e.g., GPIO 4).
2. **10kΩ pull-down resistor** between gate and GND (critical safety).
3. Nichrome wire / e-match: one lead → drone battery positive (through arm
   switch), other lead → MOSFET drain.
4. Physical arm switch in series with the battery-to-igniter path — when OFF, no
   current can reach the igniter regardless of MOSFET state.
5. Test with a multimeter: confirm 0V across igniter when arm switch OFF, and 0V
   when MOSFET gate LOW (even with arm switch ON).

### Step 4B — Servo Trigger (Option B)

1. SG90 signal wire → ESP32-C3 GPIO (e.g., GPIO 4).
2. SG90 power → 3.3V rail (SG90 operates 4.8-6V but will work at reduced torque
   for a pin pull; alternatively tap 5V from a separate regulator).
3. Neutral position: servo arm holds retaining pin in place.
4. Fire position: servo rotates 90° → pin withdraws → spring releases.
5. After fire: servo returns to neutral, but node enters SPENT state regardless.

### Step 5A — Gas Launch Tube Assembly (Option A)

1. **Launch tube**: PVC or aluminium tube, ~50mm diameter, ~120mm long. Open at
   the top (net exit), sealed at the bottom (gas chamber).
2. **Gas container**: mounted at the tube base with igniter element inserted.
3. **Burst disc**: foil or thin membrane between gas chamber and net cavity.
   Must hold during handling but rupture cleanly at ignition pressure.
4. **Net folding**: fold net accordion-style with corner weights on the outside,
   packed above the burst disc.
5. **Mounting**: secure tube to drone undercarriage pointing downward. Use metal
   hose clamps or a 3D-printed cradle bolted to the frame.

### Step 5B — Spring Canister Assembly (Option B)

1. **Canister**: lightweight tube (PVC cap, 3D print, or cardboard for
   prototype). ~50mm diameter, ~80mm tall.
2. **Spring**: compression spring at the bottom, 20-30mm travel, moderate force.
3. **Net folding**: fold net accordion-style with corner weights on the outside.
4. **Retaining pin**: wire or thin dowel through canister wall, held by servo
   arm.
5. **Mounting**: zip-tie or velcro-strap canister to drone undercarriage,
   pointing downward.

### Step 6 — Integration Test

1. **Bench test (no propellers)**: power drone electronics, test full ARM → FIRE
   sequence. For Option A: **outdoor only, behind cover**. For Option B: can be
   done on a bench indoors.
2. **Heartbeat test**: disconnect ground station WiFi → verify drone reverts to
   SAFE within 1.5s.
3. **Auth test**: send FIRE without token → verify 403 rejection.
4. **Lockout test**: after firing, attempt re-arm → verify refusal.
5. **Static fire test** (Option A only): mount launch tube in a fixed jig
   (not on drone), fire into a safe backstop. Measure ejection velocity and net
   spread. Inspect tube and gas chamber for damage.
6. **Hover test**: arm drone (propellers on, tethered or low hover), fire net
   into open area. For Option A: tethered hover strongly recommended for first
   flight fire — recoil may affect drone stability.

---

## Acceptance Criteria

- [ ] ESP32-C3 connects to ground station WiFi and sends heartbeats
- [ ] Physical arm switch must be ON before any remote arming
- [ ] Two-stage arm: ground ARM command required before FIRE is accepted
- [ ] Bearer token authentication on all command endpoints
- [ ] Heartbeat watchdog reverts to SAFE on comms loss (≤1.5s)
- [ ] Actuator fires on FIRE command (MOSFET ignition or servo release)
- [ ] Net ejects from launch tube / canister on actuation
- [ ] Single-shot lockout: SPENT state after firing, no re-arm without reload
- [ ] All commands and state transitions are logged with timestamps
- [ ] Total payload weight ≤ 200g (Option B) or ≤ 250g (Option A)
- [ ] Net deploys and spreads to ≥ 0.5m² in bench test
- [ ] (Option A) Static fire test passed: tube intact, no shrapnel, net ejects cleanly
- [ ] (Option A) MOSFET gate reads 0V when arm switch OFF (multimeter verified)
- [ ] (Option A) Pull-down resistor installed and verified on MOSFET gate

---

## Node Assignment Summary

With the drone net launcher, the Phase 1 ESP32 fleet becomes:

| Node               | Board        | Location       | Role                        |
| ------------------ | ------------ | -------------- | --------------------------- |
| Turret Tracker     | ESP32-S (30) | Ground station | Pan/tilt camera tracking    |
| Trigger Node       | ESP32-DevKitC| Ground station | Safe actuation demo (LED)   |
| **Drone Launcher** | **ESP32-C3** | **On drone**   | **Net deployment trigger**  |
| 38-pin expansion   | ESP32 (38)   | Ground station | Sensor breakout (Phase 1B)  |

---

## Drone Platform Requirements

The host drone must meet these minimums:

| Requirement        | Minimum                         | Recommended              |
| ------------------ | ------------------------------- | ------------------------ |
| Frame size         | 250mm (racing quad)             | 450mm+ (payload quad)    |
| Payload capacity   | 150g                            | 300g+                    |
| Flight time (loaded)| 3-5 min                        | 8-12 min                 |
| Battery            | 3S 1500mAh LiPo                | 4S 2200mAh+ LiPo        |
| FC firmware        | Any (Betaflight, ArduPilot, iNav) | ArduPilot (waypoint support) |
| Mounting points    | Zip-tie to frame                | Dedicated payload rail   |

:::caution
The net launcher is **additional payload** on the drone. Always verify your
drone's thrust-to-weight ratio remains above 2:1 after mounting the launcher.
Below 2:1 the drone becomes sluggish and difficult to maneuver for intercept.
:::

---

## Leave for Later (Intentionally)

| Item                                    | Why                                          |
| --------------------------------------- | -------------------------------------------- |
| Autonomous fire (no human command)      | Phase 1 is human-in-the-loop only            |
| IMU-based attitude guard                | Requires accelerometer integration (Phase 1B)|
| Multi-shot / reload mechanism           | Single-shot proves the concept               |
| GPS-based engagement envelope           | Phase 2 with ArduPilot integration           |
| Encrypted comms (TLS/DTLS)             | Phase 1B; PSK token is sufficient for demo   |
| FPV camera feed integration             | Separate system; not part of launcher node   |
| Automated lead calculation              | Phase 2; operator eyeballs it for now        |

---

## Upgrade Path

| From (Phase 1A)                 | To (Phase 1B+)                                     |
| ------------------------------- | -------------------------------------------------- |
| WiFi HTTP commands              | MQTT with TLS for lower latency                    |
| Pre-shared token                | Mutual TLS or challenge-response                   |
| Single-shot (gas or spring)     | Multi-shot carousel with reloadable chambers       |
| Manual operator aiming          | Automated lead calculation from Turret Tracker data|
| No telemetry beyond heartbeat   | Full telemetry: GPS, altitude, attitude, battery   |
| ESP32-C3 WiFi only              | ESP32-C6 (WiFi 6 + Thread/802.15.4 mesh)          |
| Nylon prototype net             | Kevlar net per [manufacturing guide](../kevlar-net-manufacturing) |
