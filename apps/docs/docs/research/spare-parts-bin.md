# Spare Parts Bin — Identified Components Inventory

Catalogue of salvaged components identified from around the workshop. Assessed
for usefulness across **all projects** — not just Phoenix Rooivalk drone builds.

> **Note:** The Parrot Minikit+ was associated with a Parrot drone that has been
> stolen. The toy quadcopter (X8-class, 320mm diagonal) for upgrade paths A/B/C
> is still available.

**Decision records:** See [Spare Parts Decisions](./spare-parts-decisions.md) for
detailed keep/scrap/toss reasoning on each component.

**Legend:**
- **Rooivalk** = Drone upgrade paths (A/B/C) and counter-UAS platform
- **IoT/Smart Home** = ESP32, Tuya, Home Assistant, sensor networks
- **Networking** = Ground stations, mesh networks, lab infrastructure
- **Audio/Media** = Bluetooth speakers, media projects
- **Robotics/EV** = Ground vehicles, rovers, electric builds
- **General Electronics** = Bench tools, prototyping, learning

---

## Master Inventory Table

| # | Component | Qty | Description | Condition | Useful For | Rooivalk? | Keep/Toss |
|---|-----------|-----|-------------|-----------|------------|-----------|-----------|
| 1 | Cudy WR3000 WiFi 6 Router | 1 | MediaTek MT7981B SoC, WiFi 6, dual-band, OpenWrt compatible | Working | Ground station networking, mesh relay, OpenWrt lab, VPN endpoint | Yes — ground station | **Keep** |
| 2 | Older MT7615DN WiFi Router | 1 | MediaTek MT7615DN chipset, 2.4/5GHz, larger form factor | Working | Backup router, 2.4GHz antenna donor, OpenWrt experiments | Marginal — antenna salvage | **Keep (antennas)** |
| 3 | PS4 DualShock 4 (JDM-011) | 1 | Sony CUH-ZCT1U controller, Bluetooth + USB, analog sticks, IMU | Working | Gaming, DIY RC controller (analog sticks), Bluetooth HID input | Yes — manual override controller | **Keep** |
| 4a | Hoverboard Controller Board (intact) | 1 | Blue PCB, dual 3-phase BLDC driver, STM32/GD32 MCU, power MOSFETs, hall sensor inputs, JST-XH connectors, 36V rated | Working | Dual BLDC motor controller — robot platform, electric go-kart, belt grinder, CNC spindle driver. Reflashable with open-source FOC firmware | Yes — ground rover platform | **Keep (intact)** |
| 4b | Hoverboard Controller Board (harvest) | 1 | Same as 4a — designated for component salvage | Working | MOSFET harvesting, current sense resistors, capacitors, connectors | Parts donor | **Keep (harvest)** |
| 4c | Hoverboard Hub Motors | 2 | 36V 250-350W brushless DC hub motors, ~6.5" wheel with tyre | Working | Electric skateboard, go-kart, robot rover, belt grinder, lathe spindle. Most valuable items in the bin (~R500+ each) | Yes — ground rover | **Keep** |
| 4d | Hoverboard Power MOSFETs (from 4b) | 6-8 | CLN89 or similar N-channel D-PAK, 60-100V 30A+ rated | Harvestable | High-current switching: motor drivers, DC-DC converters, power supplies, e-bike controllers | Yes — custom ESC builds | **Harvest** |
| 4e | Hoverboard Current Sense Resistors (from 4b) | 4+ | R004/R010 low-ohm precision shunt resistors | Harvestable | Motor/battery current monitoring on any power project | Yes — current sensing | **Harvest** |
| 4f | Hoverboard Electrolytic Caps (from 4b) | 2-4 | 220uF 35-50V rated | Harvestable | Power supply filtering on any 12-36V project | General use | **Harvest** |
| 4g | Hoverboard JST-XH Connectors (from 4b) | 6+ | 2.54mm pitch, multi-pin, through-hole, white | Harvestable | Reusable connectors for any project wiring | General use | **Harvest** |
| 5 | USB Wall Charger PCB | 1 | 5V USB-A output, mains AC input, bare PCB (no enclosure) | Working | Bench 5V supply, powering dev boards, phone charging | Indirect — bench power | **Keep** |
| 6 | 1S-to-5V USB Boost Converter | 1 | Small PCB, single-cell LiPo input, 5V USB output, ~1A | Working | Portable RPi power testing, field USB charging from LiPo | Yes — field power for companion computer | **Keep** |
| 7 | Tuya WR3E WiFi Module | 1 | RTL8710BN-based, 2.4GHz WiFi, reflashable (LibreTiny/ESPHome) | Working | IoT sensor nodes, WiFi telemetry bridge, smart home devices | Yes — lightweight WiFi telemetry | **Keep** |
| 8 | Laptop 56K Modem Card | 1 | Mini-PCIe dial-up modem, RJ-11 jack | Unknown | Nothing — obsolete technology, no modern use | No | **Toss** |
| 9 | Fanhar Relay Module | 1 | Single-channel 5V relay, opto-isolated, screw terminals | Working | Home automation, irrigation control, power switching circuits | No (too heavy for drone) | **Keep** |
| 10 | Tactile Push Button Breakout | 1 | Small PCB with single tactile switch, 2-pin header | Working | Prototyping reset/boot buttons, breadboard projects | Marginal — parts bin filler | **Keep** |
| 11 | Parrot Minikit+ Complete Unit (MPP_MB_07) | 1 | Bluetooth 2.1+EDR car kit — CSR BlueCore5 MCU, MEMS mic, Class D speaker amp, status LEDs, clip mount, button membrane with light pipes. Fully intact | Working | Bluetooth audio sink/source, hands-free intercom, voice-activated trigger, BT serial bridge (SPP profile), MEMS mic for acoustic detection | Yes — acoustic drone detection sensor, BT serial bridge | **Keep** |
| 12 | Bluetooth Audio Receiver Module | 1 | Small PCB, BT audio sink, 3.5mm or solder pad output | Working | Portable Bluetooth speaker builds, audio streaming to amp | No | **Keep** |
| 13 | LED Driver / Voltage Doubler Tiny PCB | 1 | Charge-pump circuit, ~10mm PCB, likely white LED backlight driver | Unknown | Very limited — niche LED driving only | No | **Toss** |
| 14 | Piezo Buzzer (from RC toy board) | 1 | Through-hole piezo disc, salvaged from toy car controller | Working | Lost-model alarm, status beeper, audible alerts | Yes — lost-model buzzer | **Keep** |
| 15 | Panasonic Washing Machine Button Panel | 1 | Part A4274008084, 3x rocker switches, phenolic PCB, ribbon cable | Unknown | Nothing — proprietary form factor | No | **Toss** |
| 16 | LG TV T-Con Board | 1 | EAX36987601, Panasonic MN-series QFP ICs, LVDS timing controller | Unknown | Nothing — proprietary display controller | No | **Toss** |
| 17 | ZyXEL CB71 Gateway | 1 | EMG2926-T50C, dual-band WiFi 5, 4x LAN + 1x WAN, 12V/1.5A | Working | Managed switch (4 LAN ports), backup router, OpenWrt (limited) | Marginal — LAN switch | **Keep (test first)** |
| 18 | D-Link DSL-2640U | 1 | ADSL2+ modem/router, 802.11n, FW v2.01, very old | Working | Nothing — ADSL-only, ancient, slow | No | **Toss** |
| 19 | Huawei B315s-936 | 1 | 4G LTE Cat 4 router, SIM slot, WiFi, 12V/1A, IMEI on label | Working | Mobile internet anywhere, field data link, backup WAN, portable hotspot | Yes — 4G field link for ground station | **Keep** |
| 20a | Vodafone H 500-s | 1 | Dual-band WiFi 5 (2.4+5GHz), 12V/2.5A, ISP-branded gateway | Working | Backup router, test network, OpenWrt (limited) | Marginal | **Keep (better unit)** |
| 20b | Vodafone H 500-s (duplicate) | 1 | Same as 20a | Working | Nothing — redundant | No | **Toss** |
| 21 | Wall-Wart Power Adapters (assorted) | ~6 | Mix of 5V/9V/12V barrel-jack DC adapters, SA 2-pin plugs | Test needed | Bench PSUs for routers, dev boards, any 12V/5V device | Indirect — bench power | **Keep (tested ones)** |
| 22 | NiMH Quick Charger | 1 | AA/AAA NiMH battery charger, mains powered | Working | Rechargeable battery maintenance, AA/AAA for remotes/sensors | No | **Keep** |
| 23 | BenQ Monitor (disassembled) | 1 | Old CCFL-backlit LCD, VGA+DVI only, BenQ senseye scaler board, 4H.L2E02.A34 PSU/inverter board. **450V caps — dangerous** | Unknown | Nothing — no HDMI, CCFL obsolete, VGA/DVI dead | No | **Toss (safely)** |

---

## Detailed Notes by Component

### 1. Cudy WR3000 WiFi 6 Router

**Best use:** Flash OpenWrt and deploy as a dedicated ground station router for
the drone project. WiFi 6 gives better range and throughput for FPV video relay
or MAVLink telemetry forwarding. Can also serve as a portable lab router or VPN
gateway.

**Cross-project:** Excellent general-purpose networking device. OpenWrt turns it
into a firewall, VPN endpoint, mesh node, or captive portal.

### 2. Older MT7615DN WiFi Router

**Best use:** The 2.4GHz antenna (SMA or RP-SMA) can be salvaged for other
RF projects. The router itself is a backup if the Cudy dies. MT7615DN has
decent Linux driver support.

**Cross-project:** OpenWrt test bed, antenna donor.

### 3. PS4 DualShock 4 (JDM-011)

**Best use:** Use as a manual override controller for the drone via Bluetooth
HID to a companion computer (RPi). The dual analog sticks map naturally to
throttle/yaw and pitch/roll. Has a built-in IMU (accelerometer + gyro) and
touchpad.

**Cross-project:** Gaming, robotics control, any project needing analog input.

### 4a-g. Hoverboard Components (x2 boards, x2 hub motors)

Salvaged from two self-balancing scooters (hoverboards). These are **the most
valuable items in the entire spare parts bin**.

**Board A (keep intact):** Flash with open-source FOC firmware
(e.g. [EFeru/hoverboard-firmware-hack-FOC](https://github.com/EFeru/hoverboard-firmware-hack-FOC)).
This gives you a ready-made dual BLDC motor controller with hall sensor inputs,
current sensing, UART/I2C control interface, and 36V power handling. Perfect
base for a ground rover, electric go-kart, or autonomous robot platform.

**Board B (harvest):** Desolder the power MOSFETs (CLN89 or similar — D-PAK
package, easy with hot air or wide chisel tip). These are 60-100V, 30A+
N-channel FETs — genuinely expensive to buy individually and useful for any
high-current project. Also harvest the R004/R010 current sense resistors
(precision shunts, annoying to source), the 220uF caps, and the JST-XH
connectors.

**Hub motors (x2):** 36V 250-350W BLDC hub motors with integrated tyres.
Worth R500+ each new. Use cases: robot rover, electric skateboard, belt grinder,
lathe spindle, go-kart, wheelchair conversion, conveyor drive.

**Rooivalk relevance:** Not for the drone itself (way too heavy), but highly
relevant for a ground-based counter-UAS rover platform or autonomous patrol
vehicle. Combined with the PS4 controller (#3) and a RPi, you have the bones of
a remote-controlled ground station on wheels.

### 14. Piezo Buzzer (salvaged from RC toy board)

**Best use:** Lost-model alarm or status beeper on any drone build. Desolder
from the good RC toy board (5 seconds, two wires). Toss the rest of that board.

**Cross-project:** Any project needing audible feedback.

### 5. USB Wall Charger PCB

**Best use:** Bench 5V supply for dev boards (ESP32, Arduino, RPi Zero). Keep it
in a safe enclosure since it handles mains voltage.

**Cross-project:** Universal bench tool.

### 6. 1S-to-5V USB Boost Converter

**Best use:** Power a RPi Zero 2W from a single-cell LiPo for field testing the
AI companion computer tier. Also useful for any portable USB-powered device.

**Cross-project:** Portable power for any 5V device from LiPo cells.

### 7. Tuya WR3E WiFi Module (RTL8710BN)

**Best use:** Reflash with LibreTiny or OpenBeken firmware. Use as a lightweight
WiFi telemetry bridge (UART-to-WiFi) for drone status data, or deploy in IoT
sensor nodes around the house.

**Cross-project:** Smart home sensors, WiFi-controlled relays, environmental
monitoring, any UART-to-WiFi bridge need.

### 8. Laptop 56K Modem Card

**Best use:** None. Dial-up is dead. No salvageable components worth the effort.

### 9. Fanhar Relay Module

**Best use:** Home automation — switching pumps, lights, irrigation valves. The
opto-isolation makes it safe to drive from 3.3V microcontrollers.

**Cross-project:** Irrigation, lighting control, power switching for any
project that needs to toggle mains or high-current DC loads.

### 10. Tactile Push Button Breakout

**Best use:** Breadboard prototyping. Keep in the parts bin for when you need a
quick button input on any project.

### 11. Parrot Minikit+ Complete Unit

Fully intact Bluetooth car kit with CSR BlueCore5 MCU, MEMS microphone, Class D
speaker amplifier, status LEDs, visor clip mount, and silicone button membrane
with light pipes.

**Best use — keep as a complete unit.** More valuable intact than as parts:

- **Bluetooth serial bridge (SPP):** CSR BlueCore5 supports Serial Port Profile.
  With custom firmware or AT commands, use as a wireless UART bridge for any
  microcontroller project (range ~10m).
- **Acoustic sensor:** The MEMS microphone + amplifier chain is already
  noise-filtered for voice. Repurpose for acoustic drone detection — propeller
  noise signatures are in the audible range. Feed audio to a RPi running
  frequency analysis.
- **Hands-free intercom:** Use as-is for workshop/garage intercom paired with a
  phone.
- **BT audio sink:** Stream audio from phone to any amplifier via the speaker
  output pads.

**Cross-project:** Bluetooth serial for IoT, acoustic monitoring, audio
streaming, enclosure/UX design reference (button membrane + light pipes are
excellent examples for 3D-printed housing design).

### 12. Bluetooth Audio Receiver Module

**Best use:** Build a portable Bluetooth speaker with a salvaged driver and
amplifier. Pair with a power bank for a camping/workshop speaker.

**Cross-project:** Audio streaming to any amplifier setup.

### 13. LED Driver / Voltage Doubler

**Best use:** Very limited. Toss.

---

## Summary by Project Applicability

| Project | Useful Components |
|---------|-------------------|
| **Rooivalk Drone (Paths A/B/C)** | #1 (ground station), #3 (controller), #6 (field power), #7 (telemetry), #11 (acoustic detection), #14 (buzzer), #19 (4G field link) |
| **Ground Rover / Robotics** | #4a (motor controller), #4c (hub motors), #3 (PS4 controller), #4d (MOSFETs) |
| **IoT / Smart Home** | #7 (WiFi nodes), #9 (relay switching), #5 (bench power), #10 (buttons), #11 (BT serial bridge) |
| **Networking / Lab** | #1 (OpenWrt router), #2 (backup/antenna donor), #17 (ZyXEL switch), #19 (4G LTE), #20a (Vodafone backup) |
| **Audio / Media** | #11 (Parrot BT kit), #12 (BT audio receiver) |
| **EV / High-Power Builds** | #4a (BLDC controller), #4c (hub motors), #4d (power MOSFETs), #4e (current shunts) |
| **General Prototyping** | #14 (piezo buzzer), #5 (5V supply), #6 (boost converter), #10 (button), #4e-g (harvested parts), #21 (PSUs), #22 (charger) |
| **Toss Pile** | #8 (56K modem), #13 (LED driver), #15 (washer panel), #16 (T-Con), #18 (D-Link DSL), #20b (dupe Vodafone), #23 (BenQ monitor) |

---

## Storage Recommendations

- **Keep assembled:** #4a (intact hoverboard board — do not strip), #11 (Parrot kit — more valuable intact)
- **Anti-static bag:** #7 (WiFi module), #12 (BT module), #4d-g (harvested hoverboard parts)
- **Labelled bin:** #14 (buzzer), #9 (relay), #10 (button), #6 (boost converter), #21 (tested PSUs)
- **Shelf/rack:** #1 (Cudy router), #2 (old router), #3 (PS4 controller), #4c (hub motors), #17 (ZyXEL), #19 (Huawei 4G), #20a (Vodafone), #22 (NiMH charger)
- **E-waste recycling:** #8 (56K modem), #13 (LED driver), #15 (washer panel), #16 (T-Con), #18 (D-Link DSL), #20b (dupe Vodafone), #23 (BenQ — **discharge 450V caps first**), RC toy board (after buzzer removed)
