---
id: phase1-drone-net-launcher
title: "Drone Net Launcher — Air-to-Air Intercept Node"
sidebar_label: Drone Net Launcher
sidebar_position: 6
description:
  Phase 1A build guide for a drone-mounted ESP32-C3 net launcher node. Receives
  arm/fire commands from the ground station over WiFi. Spring-loaded deployment
  with servo pin release. Human-in-the-loop only.
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
station and deploys a lightweight capture net via spring-loaded release. **Single
shot, human-in-the-loop only.**

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

| Component        | Part                            | Specification                          | Est. Cost |
| ---------------- | ------------------------------- | -------------------------------------- | --------- |
| Compute          | ESP32-C3 SuperMini              | RISC-V, WiFi + BLE 5.0                | $3–4      |
| Trigger servo    | SG90 micro servo                | Pin-pull release mechanism             | $2        |
| Power regulator  | Mini buck (MP2307 or AMS1117)   | Drone battery voltage → 3.3V          | $1–2      |
| Arm switch       | Micro toggle (SPST)             | Physical master arm on drone frame     | $0.50     |
| Status LED       | 3mm red/green                   | Armed/safe visible from ground         | $0.50     |
| Net assembly     | Lightweight mesh net            | ~1m², nylon or polyester, corner weights | $5       |
| Corner weights   | Fishing sinkers or steel nuts   | 4× ~10-15g each                        | $2        |
| Spring mechanism | Compression spring or bungee    | Deployment force for net ejection      | $2–3      |
| Release housing  | 3D-printed or lightweight tube  | Holds net + spring, servo-latched lid  | $2–5      |
| Wiring           | Silicone wire (26AWG), JST-XH   | Lightweight, flexible                  | $2        |
| **Total**        |                                 |                                        | **$20–30**|

### Weight Budget

| Component          | Weight   |
| ------------------ | -------- |
| ESP32-C3 module    | 5g       |
| SG90 servo         | 9g       |
| Buck converter     | 3g       |
| Wiring + switch    | 5g       |
| Net (1m² nylon)    | 20-30g   |
| Corner weights     | 40-60g   |
| Spring + housing   | 30-50g   |
| **Total payload**  | **~112-162g** |

Most consumer drones (250mm+) can carry 150-300g payload. A 250mm racing quad
can handle the lower end; a 450mm+ platform handles it comfortably.

---

## Architecture

```text
  ┌──────────────────────────────────────────────────────────────┐
  │                  Drone Net Launcher Node                      │
  │                                                              │
  │   Drone Battery ── Mini Buck ── 3.3V ── ESP32-C3             │
  │                                          │                    │
  │                                   GPIO ── Micro toggle (arm)  │
  │                                   GPIO ── Green LED (armed)   │
  │                                   GPIO ── Red LED (safe)      │
  │                                   GPIO ── SG90 signal         │
  │                                                              │
  │                    ┌──────────────────────────┐              │
  │                    │   Net Canister            │              │
  │                    │                          │              │
  │                    │   ┌── Spring ──┐         │              │
  │                    │   │   Net      │         │              │
  │                    │   │  (folded)  │         │              │
  │                    │   └────────────┘         │              │
  │                    │        ▲                  │              │
  │                    │   Servo pin (latch)       │              │
  │                    └──────────────────────────┘              │
  │                                                              │
  │   WiFi ◄── ARM / FIRE commands from ground station           │
  └──────────────────────────────────────────────────────────────┘

  Ground Station (ESP32-S)                    Drone (ESP32-C3)
  ┌───────────────────┐    WiFi (2.4GHz)    ┌───────────────────┐
  │ SkyWatch detect   │ ─────────────────── │ Net Launcher      │
  │ Turret track      │    ARM / FIRE cmd   │ Servo release     │
  │ Operator console  │ ◄───────────────── │ Status heartbeat  │
  └───────────────────┘    Status / ACK     └───────────────────┘
```

---

## Deployment Mechanism — Spring-Loaded Pin Release

The simplest reliable mechanism for a first prototype:

1. **Net is folded** into a lightweight canister (3D-printed tube or PVC cap).
2. **Compression spring** sits beneath the folded net.
3. **Servo arm holds a retaining pin** that keeps the spring compressed.
4. On `FIRE` command: servo rotates → pin withdraws → spring pushes net out →
   corner weights spread the net in flight.

### Why Spring + Servo (Not Solenoid or CO2)

| Mechanism      | Weight | Reliability | Complexity | Drone-suitable |
| -------------- | ------ | ----------- | ---------- | -------------- |
| **Spring + servo** | Low | High       | Low        | **Yes**        |
| CO2 cartridge  | Medium | Medium      | Medium     | Marginal       |
| Solenoid       | Medium | High        | Medium     | Marginal       |
| Pyrotechnic    | Low    | High        | High       | No (regulatory)|

Spring + servo wins: no consumables, no high-current draw, no regulatory issues,
reloadable.

---

## Safety Architecture

The drone node inherits and extends the Trigger Node safety model. Airborne
actuation demands **stricter** safety than ground-based:

### Safety Chain (All Must Pass)

1. **Physical arm switch** — micro toggle on the drone frame. Must be set before
   takeoff. Pilot physically confirms arming.
2. **Software arm state** — firmware mirrors physical switch. Cannot be armed by
   software alone.
3. **Ground station ARM command** — two-stage: ground sends `ARM`, drone ACKs.
   Separate `FIRE` command required afterward.
4. **Pre-shared token auth** — `Authorization: Bearer <token>` on all commands.
5. **Heartbeat watchdog** — drone expects heartbeat from ground station every
   500ms. If 3 consecutive heartbeats are missed (1.5s), the node reverts to
   **SAFE** state. Loss of comms = safe, not fire.
6. **Single-shot lockout** — once fired, the node enters SPENT state. Cannot
   re-arm without physical reload and power cycle.
7. **Altitude/orientation guard** (Phase 1B) — future: IMU checks that drone is
   in a reasonable flight attitude before allowing fire.

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
                                   │ FIRING  │ ── servo release (200ms pulse)
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

### Step 4 — Servo Trigger

1. SG90 signal wire → ESP32-C3 GPIO (e.g., GPIO 4).
2. SG90 power → 3.3V rail (SG90 operates 4.8-6V but will work at reduced torque
   for a pin pull; alternatively tap 5V from a separate regulator).
3. Neutral position: servo arm holds retaining pin in place.
4. Fire position: servo rotates 90° → pin withdraws → spring releases.
5. After fire: servo returns to neutral, but node enters SPENT state regardless.

### Step 5 — Net Canister Assembly

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
   sequence. Verify servo actuates, net ejects.
2. **Heartbeat test**: disconnect ground station WiFi → verify drone reverts to
   SAFE within 1.5s.
3. **Auth test**: send FIRE without token → verify 403 rejection.
4. **Lockout test**: after firing, attempt re-arm → verify refusal.
5. **Hover test**: arm drone (propellers on, tethered or low hover), fire net
   into open area.

---

## Acceptance Criteria

- [ ] ESP32-C3 connects to ground station WiFi and sends heartbeats
- [ ] Physical arm switch must be ON before any remote arming
- [ ] Two-stage arm: ground ARM command required before FIRE is accepted
- [ ] Bearer token authentication on all command endpoints
- [ ] Heartbeat watchdog reverts to SAFE on comms loss (≤1.5s)
- [ ] Servo actuates on FIRE, deploying the net from the canister
- [ ] Single-shot lockout: SPENT state after firing, no re-arm without reload
- [ ] All commands and state transitions are logged with timestamps
- [ ] Total payload weight ≤ 200g (including net and housing)
- [ ] Net deploys and spreads to ≥ 0.5m² in bench drop test

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
| Spring-loaded single shot       | CO2-assisted multi-shot carousel                   |
| Manual operator aiming          | Automated lead calculation from Turret Tracker data|
| No telemetry beyond heartbeat   | Full telemetry: GPS, altitude, attitude, battery   |
| ESP32-C3 WiFi only              | ESP32-C6 (WiFi 6 + Thread/802.15.4 mesh)          |
| Nylon prototype net             | Kevlar net per [manufacturing guide](../kevlar-net-manufacturing) |
