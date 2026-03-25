# Spare Parts Bin — Identified Components Inventory

Catalogue of salvaged components identified from around the workshop. Assessed
for usefulness across **all projects** — not just Phoenix Rooivalk drone builds.

**Legend:**
- **Rooivalk** = Drone upgrade paths (A/B/C) and counter-UAS platform
- **IoT/Smart Home** = ESP32, Tuya, Home Assistant, sensor networks
- **Networking** = Ground stations, mesh networks, lab infrastructure
- **Audio/Media** = Bluetooth speakers, media projects
- **General Electronics** = Bench tools, prototyping, learning

---

## Master Inventory Table

| # | Component | Description | Condition | Useful For | Rooivalk? | Keep/Toss |
|---|-----------|-------------|-----------|------------|-----------|-----------|
| 1 | Cudy WR3000 WiFi 6 Router | MediaTek MT7981B SoC, WiFi 6, dual-band, OpenWrt compatible | Working | Ground station networking, mesh relay, OpenWrt lab, VPN endpoint | Yes — ground station | **Keep** |
| 2 | Older MT7615DN WiFi Router | MediaTek MT7615DN chipset, 2.4/5GHz, larger form factor | Working | Backup router, 2.4GHz antenna donor, OpenWrt experiments | Marginal — antenna salvage | **Keep (antennas)** |
| 3 | PS4 DualShock 4 (JDM-011) | Sony CUH-ZCT1U controller, Bluetooth + USB, analog sticks, IMU | Working | Gaming, DIY RC controller (analog sticks), Bluetooth HID input | Yes — manual override controller | **Keep** |
| 4 | RC Toy Motor Controller PCB | Blue PCB from cheap RC car, H-bridge brushed motor driver, piezo buzzer | Working | Piezo buzzer salvage, learning H-bridge circuits | No | **Keep (buzzer only)** |
| 5 | USB Wall Charger PCB | 5V USB-A output, mains AC input, bare PCB (no enclosure) | Working | Bench 5V supply, powering dev boards, phone charging | Indirect — bench power | **Keep** |
| 6 | 1S-to-5V USB Boost Converter | Small PCB, single-cell LiPo input, 5V USB output, ~1A | Working | Portable RPi power testing, field USB charging from LiPo | Yes — field power for companion computer | **Keep** |
| 7 | Tuya WR3E WiFi Module | RTL8710BN-based, 2.4GHz WiFi, reflashable (LibreTiny/ESPHome) | Working | IoT sensor nodes, WiFi telemetry bridge, smart home devices | Yes — lightweight WiFi telemetry | **Keep** |
| 8 | Laptop 56K Modem Card | Mini-PCIe dial-up modem, RJ-11 jack | Unknown | Nothing — obsolete technology, no modern use | No | **Toss** |
| 9 | Fanhar Relay Module | Single-channel 5V relay, opto-isolated, screw terminals | Working | Home automation, irrigation control, power switching circuits | No (too heavy for drone) | **Keep** |
| 10 | Tactile Push Button Breakout | Small PCB with single tactile switch, 2-pin header | Working | Prototyping reset/boot buttons, breadboard projects | Marginal — parts bin filler | **Keep** |
| 11 | Parrot Minikit+ Main Board (MPP_MB_07) | Bluetooth 2.1+EDR car kit, CSR BlueCore5 chipset, MEMS mic, speaker amp | Working | Bluetooth audio experiments, hands-free intercom, DSP learning | No | **Keep (learning)** |
| 12 | Parrot Minikit+ Clip/Mount Assembly | Visor clip mechanism with speaker grille and mic housing | Working | Enclosure/mount reference for 3D printing projects | No | **Keep** |
| 13 | Parrot Minikit+ Button Membrane + Light Pipe | Silicone button pad with integrated light guides for status LEDs | Working | UI reference for custom enclosures, LED light pipe examples | No | **Keep (reference)** |
| 14 | Bluetooth Audio Receiver Module | Small PCB, BT audio sink, 3.5mm or solder pad output | Working | Portable Bluetooth speaker builds, audio streaming to amp | No | **Keep** |
| 15 | LED Driver / Voltage Doubler Tiny PCB | Charge-pump circuit, ~10mm PCB, likely white LED backlight driver | Unknown | Very limited — niche LED driving only | No | **Toss** |

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

### 4. RC Toy Motor Controller PCB

**Best use:** The piezo buzzer is worth desoldering — useful as a lost-model
alarm or status beeper on any build. The H-bridge driver IC is too weak and
undocumented for reuse.

**Cross-project:** Electronics learning, piezo salvage.

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

### 11-13. Parrot Minikit+ Components

**Best use:** The CSR BlueCore5 Bluetooth chipset is a capable BT 2.1 audio
device. The MEMS microphone and speaker amplifier could be reused in an
intercom or audio monitoring project. The clip mount and button membrane are
good physical design references if you're 3D printing enclosures.

**Cross-project:** Bluetooth audio experiments, enclosure design reference.

### 14. Bluetooth Audio Receiver Module

**Best use:** Build a portable Bluetooth speaker with a salvaged driver and
amplifier. Pair with a power bank for a camping/workshop speaker.

**Cross-project:** Audio streaming to any amplifier setup.

### 15. LED Driver / Voltage Doubler

**Best use:** Very limited. Charge-pump voltage doublers are cheap and
application-specific. Not worth designing around.

---

## Summary by Project Applicability

| Project | Useful Components |
|---------|-------------------|
| **Rooivalk Drone (Paths A/B/C)** | #1 (ground station), #3 (controller), #6 (field power), #7 (telemetry) |
| **IoT / Smart Home** | #7 (WiFi nodes), #9 (relay switching), #5 (bench power), #10 (buttons) |
| **Networking / Lab** | #1 (OpenWrt router), #2 (backup/antenna donor) |
| **Audio / Media** | #11 (Bluetooth car kit), #14 (BT audio receiver) |
| **General Prototyping** | #4 (piezo buzzer), #5 (5V supply), #6 (boost converter), #10 (button) |
| **Toss Pile** | #8 (56K modem), #15 (LED driver) |

---

## Storage Recommendations

- **Anti-static bag:** #7 (WiFi module), #11 (Parrot board), #14 (BT module)
- **Labelled bin:** #4 (buzzer), #9 (relay), #10 (button), #6 (boost converter)
- **Shelf/rack:** #1 (Cudy router), #2 (old router), #3 (PS4 controller)
- **Recycling:** #8 (modem), #15 (LED driver)
