# Spare Parts Bin — Identified Components Inventory

Catalogue of salvaged components identified from around the workshop. Assessed
for usefulness across **all projects** — not just NexaMesh drone builds.

> **Note:** The Parrot Minikit+ was associated with a Parrot drone that has been
> stolen. The toy quadcopter (X8-class, 320mm diagonal) for upgrade paths A/B/C
> is still available.

**Decision records:** See [Spare Parts Decisions](./spare-parts-decisions.md) for
detailed keep/scrap/toss reasoning on each component.

**Stripping approach:** A dedicated person handles all disassembly — labour is
free. The question is not "is it worth the effort" but rather "is the component
useful once removed?" and "what's the learning value?" Items marked **Strip**
get disassembled for parts. Items marked **Toss** have nothing useful even with
free labour.

**Legend:**
- **Rooivalk** = Drone upgrade paths (A/B/C) and counter-UAS platform
- **IoT/Smart Home** = ESP32, Tuya, Home Assistant, sensor networks
- **Networking** = Ground stations, mesh networks, lab infrastructure
- **Audio/Media** = Bluetooth speakers, media projects
- **Robotics/EV** = Ground vehicles, rovers, electric builds
- **Bench/Power** = Power supplies, test equipment, bench tools
- **General Electronics** = Prototyping, learning, parts bin

---

## Master Inventory Table

| # | Component | Qty | Description | Condition | Useful For | Rooivalk? | Action |
|---|-----------|-----|-------------|-----------|------------|-----------|--------|
| 1 | Cudy WR3000 WiFi 6 Router | 1 | MediaTek MT7981B SoC, WiFi 6, dual-band, OpenWrt compatible | Working | Ground station networking, mesh relay, OpenWrt lab, VPN endpoint | Yes — ground station | **Keep intact** |
| 2 | Older MT7615DN WiFi Router | 1 | MediaTek MT7615DN chipset, 2.4/5GHz, larger form factor | Working | Backup router, 2.4GHz antenna donor, OpenWrt experiments | Marginal — antenna salvage | **Keep** |
| 3 | PS4 DualShock 4 (JDM-011) | 1 | Sony CUH-ZCT1U controller, Bluetooth + USB, analog sticks, IMU | Working | Gaming, DIY RC controller, Bluetooth HID input, robotics | Yes — manual override controller | **Keep intact** |
| 4a | Hoverboard Controller Board (intact) | 1 | Blue PCB, dual 3-phase BLDC driver, STM32/GD32 MCU, power MOSFETs, hall sensor inputs, JST-XH connectors, 36V rated | Working | Dual BLDC motor controller — robot platform, go-kart, CNC. Reflashable with open-source FOC firmware | Yes — ground rover platform | **Keep intact** |
| 4b | Hoverboard Controller Board (harvest) | 1 | Same as 4a — designated for component salvage | Working | MOSFET harvesting, current sense resistors, capacitors, connectors | Parts donor | **Strip** |
| 4c | Hoverboard Hub Motors | 2 | 36V 250-350W brushless DC hub motors, ~6.5" wheel with tyre | Working | Robot rover, go-kart, belt grinder, lathe spindle. ~R500+ each | Yes — ground rover | **Keep** |
| 4d | Hoverboard Power MOSFETs (from 4b) | 6-8 | CLN89 or similar N-channel D-PAK, 60-100V 30A+ rated | Harvestable | High-current switching: motor drivers, DC-DC converters, ESC builds | Yes — custom ESC | **Harvest (priority)** |
| 4e | Hoverboard Current Sense Resistors (from 4b) | 4+ | R004/R010 low-ohm precision shunt resistors | Harvestable | Motor/battery current monitoring on any power project | Yes — current sensing | **Harvest (priority)** |
| 4f | Hoverboard Electrolytic Caps (from 4b) | 2-4 | 220uF 35-50V rated | Harvestable | Power supply filtering on any 12-36V project | General use | **Harvest** |
| 4g | Hoverboard JST-XH Connectors (from 4b) | 6+ | 2.54mm pitch, multi-pin, through-hole, white | Harvestable | Reusable connectors for any project wiring | General use | **Harvest** |
| 5 | USB Wall Charger PCB | 1 | 5V USB-A output, mains AC input, bare PCB (no enclosure) | Working | Bench 5V supply, powering dev boards | Indirect — bench power | **Keep** |
| 6 | 1S-to-5V USB Boost Converter | 1 | Small PCB, single-cell LiPo input, 5V USB output, ~1A | Working | Portable RPi power, field USB charging from LiPo | Yes — field power | **Keep** |
| 7 | Tuya WR3E WiFi Module | 1 | RTL8710BN-based, 2.4GHz WiFi, reflashable (LibreTiny/ESPHome) | Working | IoT sensor nodes, WiFi telemetry bridge, smart home | Yes — WiFi telemetry | **Keep** |
| 8 | Laptop 56K Modem Card | 1 | Mini-PCIe dial-up modem, RJ-11 jack | Unknown | Nothing — obsolete technology | No | **Strip (learning)** |
| 9 | Fanhar Relay Module | 1 | Single-channel 5V relay, opto-isolated, screw terminals | Working | Home automation, irrigation, power switching | No (too heavy) | **Keep** |
| 10 | Tactile Push Button Breakout | 1 | Small PCB with single tactile switch, 2-pin header | Working | Prototyping reset/boot buttons, breadboard projects | Marginal | **Keep** |
| 11 | Parrot Minikit+ Complete Unit (MPP_MB_07) | 1 | Bluetooth 2.1+EDR car kit — CSR BlueCore5 MCU, MEMS mic, Class D speaker amp, status LEDs, clip mount, button membrane with light pipes. Fully intact | Working | BT serial bridge, acoustic drone detection, intercom, audio sink | Yes — acoustic detection, BT bridge | **Keep intact** |
| 12 | Bluetooth Audio Receiver Module | 1 | Small PCB, BT audio sink, 3.5mm or solder pad output | Working | Portable Bluetooth speaker builds, audio streaming | No | **Keep** |
| 13 | LED Driver / Voltage Doubler Tiny PCB | 1 | Charge-pump circuit, ~10mm PCB, unmarked IC | Unknown | Nothing — too small, unmarked, no learning value | No | **Toss** |
| 14 | Piezo Buzzer (from RC toy board) | 1 | Through-hole piezo disc, salvaged from toy car controller | Working | Lost-model alarm, status beeper, audible alerts | Yes — buzzer | **Keep** |
| 15 | Panasonic Washing Machine Button Panel | 1 | Part A4274008084, 3x rocker switches, phenolic PCB, ribbon cable | Unknown | Switches are proprietary form factor but board is good desoldering practice | No | **Strip (learning)** |
| 16 | LG TV T-Con Board | 1 | EAX36987601, Panasonic MN-series QFP ICs, FPC connector | Unknown | QFP desoldering practice, SMD rework learning | No | **Strip (learning)** |
| 17 | ZyXEL CB71 Gateway | 1 | EMG2926-T50C, dual-band WiFi 5, 4x LAN + 1x WAN, 12V/1.5A | Working | 4-port Gigabit switch, backup AP, test network isolation | Marginal — LAN switch | **Keep (test first)** |
| 18 | D-Link DSL-2640U | 1 | ADSL2+ modem/router, 802.11n, FW v2.01 | Working | RJ-45 jacks, board-level teardown practice, OpenWrt learning | No | **Strip (learning)** |
| 19 | Huawei B315s-936 | 1 | 4G LTE Cat 4 router, SIM slot, WiFi, 12V/1A | Working | Mobile internet, field data link, backup WAN, portable hotspot | Yes — 4G field link | **Keep intact** |
| 20a | Vodafone H 500-s | 1 | Dual-band WiFi 5 (2.4+5GHz), 12V/2.5A, ISP-branded gateway | Working | Backup router, test network, workshop AP | Marginal | **Keep** |
| 20b | Vodafone H 500-s (duplicate) | 1 | Same as 20a | Working | Strip practice, SoC identification, heatsink/antenna salvage | No | **Strip (learning)** |
| 21 | Wall-Wart Power Adapters (assorted) | ~6 | Mix of 5V/9V/12V barrel-jack DC adapters, SA 2-pin plugs | Test needed | Bench PSUs for routers, dev boards, any 12V/5V device | Indirect — bench power | **Keep (tested ones)** |
| 22 | NiMH Quick Charger | 1 | AA/AAA NiMH battery charger, mains powered | Working | Rechargeable battery maintenance | No | **Keep** |
| 23 | BenQ Monitor (disassembled) | 1 | CCFL-backlit LCD, VGA+DVI, senseye scaler, 4H.L2E02.A34 PSU. **450V caps** | Unknown | Strip for caps, transformers, connectors. High-voltage learning | No | **Strip (learning + parts)** |
| 24 | DStv Remote Control | 1 | MultiChoice/Explora IR remote, coloured A/B/C/D buttons | Working | IR protocol learning, IR receiver testing, spare remote | No | **Keep** |
| 25 | HDMI Cable | 1 | Standard HDMI cable, appears full-size both ends | Working | Display connectivity for RPi, dev boards, any HDMI device | Yes — ground station display | **Keep** |
| 26 | ARRIS DStv Decoder (F55525MC) | 1 | DStv Explora, 12V/2.5A, HDMI out, made in SA 2020. May contain 2.5" SATA HDD | Unknown | HDD salvage (if present), HDMI port practice, PSU analysis | No (locked to MultiChoice) | **Strip (HDD + learning)** |
| 27a | Fridge Compressor | 1 | QD brand sealed compressor with start relay (Changlong), copper tubing | Working (needs gas) | Scrap copper (tubing), compressor motor for experimental air pump (no refrigerant) | No | **Strip (copper + learning)** |
| 27b | Fridge Control Board | 1 | DIP controller IC (LCD(005C)), 3x mains relays, X2 safety cap, piezo buzzer, ribbon to LCD, electrolytic caps | Working | Mains relays (240V rated, reusable), X2 cap, piezo buzzer, DIP IC socket practice | No | **Strip (relays + buzzer)** |
| 28 | Orion 320 Landline Telephone | 1 | PSTN desktop phone, speakerphone, speed-dial, LCD display area | Unknown | Keypad matrix learning, speaker/mic salvage, handset cord (RJ-9 curly cable) | No | **Strip (learning)** |
| 29 | SPI ATX-250GT Power Supply | 1 | Sparkle Power 250W ATX PSU. +3.3V/14A, +5V/25A, +12V, mains input | Unknown | **Multi-voltage bench supply** (3.3V, 5V, 12V, -12V simultaneously), high current, standard ATX connector | Yes — bench power for all projects | **Keep (test first)** |

---

## Summary by Project Applicability

| Project | Useful Components |
|---------|-------------------|
| **Rooivalk Drone (Paths A/B/C)** | #1 (ground station), #3 (controller), #6 (field power), #7 (telemetry), #11 (acoustic detection), #14 (buzzer), #19 (4G field link), #25 (HDMI), #29 (bench PSU) |
| **Ground Rover / Robotics** | #4a (motor controller), #4c (hub motors), #3 (PS4 controller), #4d (MOSFETs) |
| **IoT / Smart Home** | #7 (WiFi nodes), #9 (relay), #5 (bench power), #10 (buttons), #11 (BT serial bridge), #27b (mains relays) |
| **Networking / Lab** | #1 (OpenWrt), #2 (backup), #17 (ZyXEL switch), #19 (4G LTE), #20a (Vodafone) |
| **Audio / Media** | #11 (Parrot BT kit), #12 (BT audio receiver) |
| **EV / High-Power Builds** | #4a (BLDC controller), #4c (hub motors), #4d (MOSFETs), #4e (shunts) |
| **Bench / Power** | #29 (ATX PSU — top priority), #5 (5V USB), #6 (boost converter), #21 (wall-warts), #22 (charger) |
| **General Prototyping** | #14 (buzzer), #10 (button), #4e-g (harvested parts), #24 (IR remote), #27b (relays, buzzer) |
| **Learning / Stripping Practice** | #8 (modem), #15 (washer panel), #16 (T-Con), #18 (D-Link), #20b (Vodafone dupe), #23 (BenQ), #26 (decoder), #27 (fridge), #28 (phone) |

---

## Strip Priority Order

For the dedicated disassembly person, work through in this order:

| Priority | Item | Why First | Key Parts to Recover |
|----------|------|-----------|---------------------|
| 1 | #4b Hoverboard Board B | Highest-value components | MOSFETs, current shunts, caps, JST-XH connectors |
| 2 | #27b Fridge Control Board | Easy through-hole, useful parts | 3x mains relays, piezo buzzer, X2 safety cap |
| 3 | #26 ARRIS DStv Decoder | Check for HDD first | 2.5" SATA HDD (if present), heatsinks |
| 4 | #23 BenQ Monitor PSU | **Discharge 450V caps first!** | Large electrolytics, transformers, connectors |
| 5 | #20b Vodafone H 500-s | Practice + antenna salvage | WiFi antennas, heatsinks, RJ-45 jacks |
| 6 | #18 D-Link DSL-2640U | SMD practice | RJ-45 jacks, LEDs, learning |
| 7 | #28 Orion 320 Telephone | Through-hole + keypad | Keypad matrix, speaker, mic, handset cord |
| 8 | #16 LG T-Con Board | QFP hot-air practice | SMD rework skill building |
| 9 | #15 Washing Machine Panel | Basic desoldering practice | Rocker switches (non-standard but practice) |
| 10 | #8 56K Modem Card | Mini-PCIe teardown | RJ-11 jack, SMD practice |
| 11 | #27a Fridge Compressor | Last — heavy, messy | Copper tubing, start relay, motor windings |

---

## Storage Recommendations

- **Keep assembled:** #4a (hoverboard board A), #11 (Parrot kit), #1 (Cudy), #3 (PS4), #19 (Huawei 4G)
- **Anti-static bag:** #7 (WiFi module), #12 (BT module), #4d-g (harvested parts)
- **Labelled bin:** #14 (buzzer), #9 (relay), #10 (button), #6 (boost converter), #24 (remote), #25 (HDMI)
- **Shelf/rack:** #2 (old router), #4c (hub motors), #17 (ZyXEL), #20a (Vodafone), #22 (charger), #29 (ATX PSU)
- **Test with adapters (#21):** #17 (needs 12V), #19 (needs 12V), #29 (needs mains)
- **Stripping queue:** #4b, #27b, #26, #23, #20b, #18, #28, #16, #15, #8, #27a
- **True e-waste (nothing to strip):** #13 (LED driver — too small/unmarked)
