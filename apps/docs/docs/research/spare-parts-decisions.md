# Spare Parts — Component Decisions

Mechanical/electronic decision records for each salvaged component. Documents
the reasoning behind keep, harvest, repurpose, or toss decisions.

**Cross-reference:** [Spare Parts Bin Inventory](./spare-parts-bin.md)

---

## Decision Format

Each entry follows this structure:

- **Use for:** Primary intended use case(s)
- **Scrap for:** Components worth harvesting if the unit itself isn't kept whole
- **Toss?:** Yes/no and why
- **Decision:** Final verdict with reasoning

---

## SPD-01: Cudy WR3000 WiFi 6 Router

**Status:** Keep — use as-is

**Use for:**
- Flash OpenWrt and deploy as dedicated ground station router for drone ops
- WiFi 6 (802.11ax) gives better range and throughput for FPV relay or MAVLink
  telemetry forwarding
- Portable VPN gateway for field work
- Mesh node for extended coverage at test sites

**Scrap for:**
- N/A — far more valuable intact and working

**Toss?** No. This is a current-generation WiFi 6 router with excellent OpenWrt
support. Retail value ~R800+.

**Decision:** Keep intact. Flash OpenWrt when needed for ground station role.
Can serve double duty as a home lab router in the meantime.

---

## SPD-02: Older MT7615DN WiFi Router

**Status:** Keep — limited use

**Use for:**
- Backup router if the Cudy dies
- OpenWrt experimentation/learning without risking the better router
- 2.4GHz antenna donor (SMA/RP-SMA connector)

**Scrap for:**
- External 2.4GHz antenna(s) — useful for RF projects, worth keeping
- Heatsinks (if any) — marginal value

**Toss?** No, but only because the antenna is useful and it costs nothing to
store. If space becomes an issue, salvage the antenna and toss the rest.

**Decision:** Keep on shelf as backup. Low priority.

---

## SPD-03: PS4 DualShock 4 (JDM-011)

**Status:** Keep — multi-project use

**Use for:**
- Manual override controller for drone via Bluetooth HID → RPi companion
  computer. Dual analog sticks map to throttle/yaw + pitch/roll naturally.
- Ground rover controller (paired with hoverboard motors, SPD-04)
- General robotics input device
- Gaming (its original purpose)

**Scrap for:**
- N/A — worth far more as a working controller
- If it ever dies: analog stick modules (Alps RKJXV), IMU (accelerometer +
  gyro), Bluetooth module, touchpad, vibration motors

**Toss?** Absolutely not. A working DualShock 4 is R600-900 retail.

**Decision:** Keep intact. Use as primary manual control input for any
RC/robotics project. Well-supported in Linux/Python (ds4drv, pygame, evdev).

---

## SPD-04a: Hoverboard Controller Board (Intact Unit)

**Status:** Keep — do not strip

**Use for:**
- Dual brushless DC motor controller for ground rover / robot platform
- Reflash with open-source FOC firmware
  (EFeru/hoverboard-firmware-hack-FOC) for proper torque control, UART/I2C
  command interface, and speed feedback
- Drives both hub motors (SPD-04c) from a single board
- Built-in current sensing, hall sensor decoding, and 36V power path
- Electric go-kart, CNC table drive, conveyor system

**Scrap for:**
- N/A — designated "keep intact" unit. Use SPD-04b for harvesting.

**Toss?** No. A working hoverboard controller with open-source firmware support
is worth R300-500. Combined with the hub motors it's a complete drive system.

**Decision:** Keep intact. Do NOT desolder anything. This board + two hub motors
= a complete ground vehicle drivetrain. Flash FOC firmware when ready to build
the rover.

---

## SPD-04b: Hoverboard Controller Board (Harvest Unit)

**Status:** Keep — designated parts donor

**Use for:**
- Component harvesting only (see "Scrap for" below)
- Practice desoldering SMD power components if you're building that skill

**Scrap for:**
- **Power MOSFETs (6-8x):** CLN89 or similar, D-PAK package, 60-100V 30A+.
  Easy to desolder with wide chisel tip or hot air. These are R15-30 each
  retail. Useful for custom H-bridges, motor drivers, DC-DC converters, e-bike
  controllers, high-side/low-side switching.
- **Current sense resistors (4x):** R004 (4mΩ) and R010 (10mΩ) precision
  shunts. Annoying to source individually. Essential for any motor current
  monitoring or battery coulomb counting.
- **Electrolytic caps (2-4x):** 220uF 35-50V. Standard power rail filtering.
  Always useful to have spares.
- **JST-XH connectors (6+):** 2.54mm pitch, through-hole. Easy to desolder,
  directly reusable in any project wiring.
- **STM32/GD32 MCU:** Only if you have hot air and want the QFP-48 chip.
  GD32F130 is a capable ARM Cortex-M3. Low priority — dev boards are cheap.

**Toss?** The bare PCB after harvesting, yes. The components themselves, no.

**Decision:** Harvest in this order of priority: MOSFETs first (highest value),
then current sense resistors, then connectors, then caps. Toss the stripped
board.

---

## SPD-04c: Hoverboard Hub Motors (x2)

**Status:** Keep — high value

**Use for:**
- Ground rover / autonomous patrol platform (with SPD-04a controller)
- Electric skateboard or go-kart build
- Belt grinder or bench lathe spindle drive (high torque at low RPM)
- Conveyor or turntable drive
- Counter-UAS ground station on wheels

**Scrap for:**
- Neodymium magnets (if motor ever dies) — strong ring magnets, useful for
  magnetic mounts, sensors, generators
- Copper windings — scrap copper value only, not worth it unless motor is dead

**Toss?** No. Most valuable items in the entire spare parts bin. ~R500-700 each
retail for replacement hub motors.

**Decision:** Keep both. Store upright to avoid flat-spotting tyres. Pair with
SPD-04a controller board for a complete drive system.

---

## SPD-05: USB Wall Charger PCB

**Status:** Keep — bench tool

**Use for:**
- Bench 5V supply for ESP32, Arduino, RPi Zero, any USB-powered dev board
- Quick phone/device charging at the workbench

**Scrap for:**
- N/A — more useful intact. Components (switching transistor, transformer,
  diodes) are application-specific and not worth harvesting.

**Toss?** No, but **safety note:** this is a bare PCB that handles mains AC.
Mount it in an enclosure or at minimum wrap exposed mains traces with kapton
tape before use.

**Decision:** Keep. Mount safely. Use as bench supply.

---

## SPD-06: 1S-to-5V USB Boost Converter

**Status:** Keep — field power tool

**Use for:**
- Power a RPi Zero 2W from a single LiPo cell for field testing the AI
  companion computer tier
- Portable USB power from any 3.7V LiPo — cameras, sensors, LED strips
- Emergency phone charging from a salvaged laptop cell

**Scrap for:**
- N/A — it's a R15 module, not worth stripping

**Toss?** No. Tiny, useful, costs nothing to store.

**Decision:** Keep in parts bin. Label the max current rating if known (~1A
typical for these modules).

---

## SPD-07: Tuya WR3E WiFi Module (RTL8710BN)

**Status:** Keep — IoT building block

**Use for:**
- Reflash with LibreTiny or OpenBeken firmware to break free of Tuya cloud
- UART-to-WiFi bridge for drone telemetry (lightweight alternative to ESP32)
- IoT sensor node: temperature, humidity, door/window sensor
- Smart home relay control, LED dimmer
- WiFi-based presence detection

**Scrap for:**
- N/A — it IS the component. Nothing to harvest from a module this small.

**Toss?** No. Equivalent to a R30-50 ESP-01 but with better firmware options
via LibreTiny.

**Decision:** Keep in anti-static bag. Flash LibreTiny when you have a specific
use case. Most likely deployment: smart home sensor or telemetry bridge.

---

## SPD-08: Laptop 56K Modem Card

**Status:** Toss

**Use for:**
- Nothing. Dial-up is extinct. No PSTN line to connect to. No software supports
  it. Cannot be repurposed as a different interface.

**Scrap for:**
- Nothing worth the effort. The RJ-11 jack is obsolete. The DAA (data access
  arrangement) IC is application-specific. No useful passives.

**Toss?** **Yes.** Zero use cases across any project category.

**Decision:** E-waste recycling bin.

---

## SPD-09: Fanhar Relay Module

**Status:** Keep — home automation

**Use for:**
- Home automation: switching irrigation pumps, grow lights, fans, heaters
- Garage door opener interface
- Any project needing microcontroller-controlled mains or high-current DC
  switching
- Opto-isolated input is safe to drive from 3.3V logic (ESP32, RPi GPIO)

**Scrap for:**
- N/A — it's a R20 module and more useful intact

**Toss?** No. Not useful for drone projects (too heavy, wrong use case) but
very useful for home/garden automation.

**Decision:** Keep in parts bin. First likely use: irrigation or lighting
control.

---

## SPD-10: Tactile Push Button Breakout

**Status:** Keep — parts bin filler

**Use for:**
- Breadboard prototyping: reset buttons, mode selectors, boot pin triggers
- Quick input for any microcontroller project

**Scrap for:**
- The tactile switch itself if the breakout PCB is too big for your application
  (just snip it off)

**Toss?** No, but only because it's tiny and costs nothing to store. Zero
monetary value.

**Decision:** Keep in small parts drawer. Will get used eventually on some
breadboard project.

---

## SPD-11: Parrot Minikit+ Complete Unit (MPP_MB_07)

**Status:** Keep intact — more valuable as a unit than as parts

> **Note:** This was associated with a Parrot drone that has been stolen. The
> Minikit+ itself (Bluetooth car kit) is still here and fully functional.

**Use for:**
- **Bluetooth serial bridge (SPP):** CSR BlueCore5 supports Serial Port
  Profile. Use as a wireless UART bridge for microcontroller projects — pair
  with phone or laptop, stream serial data over BT 2.1 at ~10m range.
- **Acoustic drone detection sensor:** The MEMS microphone + amplifier chain is
  already filtered for voice frequencies. Propeller noise signatures
  (100-8000Hz) fall within this range. Feed audio to a RPi for real-time FFT
  analysis of drone acoustic signatures.
- **Hands-free intercom:** Use as-is for workshop/garage comms paired with a
  phone.
- **BT audio sink:** Stream music/audio from phone to any amp via speaker
  output pads.
- **Enclosure design reference:** The button membrane with integrated light
  pipes and visor clip mechanism are excellent physical design references for
  3D-printed housings.

**Scrap for (only if it dies):**
- MEMS microphone — useful standalone for any audio sensing project
- Class D speaker amplifier IC — can drive small speakers from line-level input
- CSR BlueCore5 module — Bluetooth radio, but hard to reuse without the full
  circuit
- Status LEDs — generic, not worth the effort
- Light pipe / button membrane — design reference, keep regardless

**Toss?** No. Fully functional Bluetooth device with multiple reuse paths. The
acoustic detection angle makes it directly relevant to Rooivalk.

**Decision:** Keep as a complete unit. Do not disassemble. Store in anti-static
bag. Most promising use: acoustic drone detection sensor feeding audio to the
detector app's ML pipeline.

---

## SPD-12: Bluetooth Audio Receiver Module

**Status:** Keep

**Use for:**
- Portable Bluetooth speaker build: pair with a salvaged speaker driver + amp
  + power bank
- Workshop audio: stream music from phone to bench speakers
- Audio input for any amplifier that only has wired inputs

**Scrap for:**
- N/A — it's already a minimal module

**Toss?** No. Small, useful, and BT audio receivers are handy to have around.

**Decision:** Keep in anti-static bag. Use when building a Bluetooth speaker or
adding wireless audio to existing speakers.

---

## SPD-13: LED Driver / Voltage Doubler Tiny PCB

**Status:** Toss

**Use for:**
- Driving white LEDs from low voltage (charge pump doubles input voltage).
  Extremely niche application.

**Scrap for:**
- Nothing. The charge pump IC is unmarked and the passives are too small to be
  worth desoldering.

**Toss?** **Yes.** A new charge pump module is R5 if you ever need one, and
you'd know the specs.

**Decision:** E-waste recycling bin.

---

## SPD-14: Piezo Buzzer (from RC Toy Board)

**Status:** Keep — desolder and bin

**Use for:**
- Lost-model alarm on any drone build
- Status beeper (boot confirmation, low battery warning, error codes)
- Audible alert on any microcontroller project
- Morse code practice oscillator

**Scrap for:**
- N/A — the buzzer IS the salvaged part. The rest of the RC toy board is
  e-waste after removing this.

**Toss?** No. Piezo buzzers are useful and this one is free.

**Decision:** Desolder from the good RC toy board (two wires, 5 seconds).
Label the frequency if you can measure it. Toss the stripped RC board. The
second RC board (burnt IC + blown cap) goes straight to e-waste — don't bother
removing its buzzer since it may be damaged.

---

## SPD-15: Panasonic Washing Machine Button Panel PCB

**Status:** Toss

> Part number A4274008084. Brown phenolic PCB with three rocker/push switches,
> ribbon cable, R13x resistors, CN connectors. From a Panasonic washing machine
> control panel.

**Use for:**
- Nothing practical. The switches are a proprietary form factor moulded to fit
  a specific washing machine fascia. They won't mount in any standard enclosure
  or breadboard setup.

**Scrap for:**
- The rocker switches — but they're non-standard shape/mounting, designed for a
  specific plastic housing that you don't have. Standard panel-mount rockers are
  R5 each.
- SMD resistors (R13x series) — generic, not worth desoldering from phenolic
  board.
- Ribbon cable — proprietary pitch and length. Useless without the matching
  connector on the main washer board.

**Toss?** **Yes.** Proprietary form factor throughout. Even the switches can't
be reused without their matching housing. No components worth the desoldering
effort.

**Decision:** E-waste recycling bin. Don't strip anything.

---

## SPD-16: LG TV T-Con (Timing Controller) Board

**Status:** Toss

> Board number EAX36987601. Green PCB with two large Panasonic MN-series QFP
> ICs (MN1 804 RT1, made in Japan), FPC connector, LVDS edge connectors,
> serial data/clock lines (SDAT, SCLK), small electrolytics. Converts main
> board LVDS signal into LCD panel row/column driver signals.

**Use for:**
- Nothing. A T-Con board is entirely application-specific — it converts a
  particular LVDS timing format into signals for a matched LCD panel. Without
  the exact panel and main board, it does nothing. Cannot be reprogrammed or
  repurposed.

**Scrap for:**
- **Panasonic MN-series ICs** — proprietary display timing controllers with no
  public datasheet. Cannot be reflashed or reused for any other purpose.
  Desoldering QFP-128+ packages without hot air is destructive, and even with
  hot air, the chips are worthless.
- **FPC connector** — panel-specific pin count and pitch. New FPC connectors of
  any standard size are R3.
- **Small electrolytic caps (x2)** — likely 10-47uF, low voltage. Worth less
  than the solder to remove them.
- **Edge connectors** — moulded for a specific LVDS ribbon. Not a standard
  pinout.
- **SMD passives** — dozens of tiny resistors and caps, all generic and not
  worth harvesting.

**Toss?** **Yes.** Every component on this board is either proprietary
(the ICs, connectors) or too cheap to justify desoldering (passives, caps).
The board itself is lead-free and RoHS — safe for e-waste recycling.

**Decision:** E-waste recycling bin. Zero salvage value.

---

## Summary of Decisions

| # | Component | Decision | Action Required |
|---|-----------|----------|-----------------|
| 01 | Cudy WR3000 | Keep intact | Flash OpenWrt when ready |
| 02 | MT7615DN Router | Keep (low priority) | Salvage antenna if space needed |
| 03 | PS4 DualShock 4 | Keep intact | None — ready to use |
| 04a | Hoverboard Board (intact) | Keep intact | Flash FOC firmware when building rover |
| 04b | Hoverboard Board (harvest) | Strip for parts | Desolder MOSFETs, shunts, caps, connectors |
| 04c | Hub Motors x2 | Keep | Store upright |
| 05 | USB Charger PCB | Keep | Mount in enclosure for safety |
| 06 | Boost Converter | Keep | Label current rating |
| 07 | WR3E WiFi Module | Keep | Flash LibreTiny when needed |
| 08 | 56K Modem | **Toss** | E-waste bin |
| 09 | Relay Module | Keep | Use for home automation |
| 10 | Button Breakout | Keep | Small parts drawer |
| 11 | Parrot Minikit+ | Keep intact | Anti-static bag, test acoustic detection |
| 12 | BT Audio Receiver | Keep | Anti-static bag |
| 13 | LED Driver | **Toss** | E-waste bin |
| 14 | Piezo Buzzer | Keep | Desolder from RC board, toss board |
| 15 | Washing Machine Button Panel | **Toss** | E-waste bin — proprietary form factor |
| 16 | LG TV T-Con Board | **Toss** | E-waste bin — zero salvage value |
