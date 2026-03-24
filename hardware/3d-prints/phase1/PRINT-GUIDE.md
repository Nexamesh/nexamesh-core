# Phase 1 — 3D Print Guide

All models are parametric OpenSCAD files. Edit the parameters at the top of each
`.scad` file to adjust for your exact boards, then export STL from OpenSCAD
(Design → Render → File → Export as STL).

---

## Parts List

| # | File | Parts per print | Purpose |
|---|------|----------------|---------|
| 1 | `hub-enclosure.scad` | Base + Lid | ESP32-S3 + PCA9685 + SX1276 LoRa |
| 2 | `turret-bracket.scad` | Base plate + Tilt arm + Camera platform | Pan/tilt gimbal for 2× SG90 |
| 3 | `camera-node-enclosure.scad` | Base + Lid | ESP32-CAM (SkyWatch Nano) |
| 4 | `relay-node-enclosure.scad` | Base + Lid + DIN clip | ESP32-C3 + relay module |

---

## Print Settings

| Setting | Hub | Turret | Camera | Relay |
|---------|-----|--------|--------|-------|
| Layer height | 0.2mm | 0.2mm | 0.2mm | 0.2mm |
| Infill | 20% | 30% | 20% | 25% |
| Material | PETG | PETG/PLA+ | PETG | PETG |
| Supports | None | None | None | None |
| Walls | 3 | 4 | 3 | 3 |
| Top/bottom | 4 layers | 4 layers | 4 layers | 4 layers |

**Why PETG?** Better heat resistance (ESP32s run warm), UV stability for outdoor
use, and slight flex for snap-fit lids. PLA works fine for indoor/demo use.

---

## Exporting STL from OpenSCAD

1. Open the `.scad` file in [OpenSCAD](https://openscad.org/)
2. Press **F6** (Render) — wait for it to complete
3. For each part, comment/uncomment the render section at the bottom
4. **File → Export as STL**
5. Import STL into your slicer (PrusaSlicer, Cura, etc.)

### Hub Enclosure

Export two STLs:
- **Base**: Uncomment `base();`, comment out `lid();`
- **Lid**: Uncomment `lid();` — flip upside-down in slicer for printing

### Turret Bracket

Export three STLs (or print all on one plate):
- **Base plate**: Print flat, no supports
- **Tilt arm**: Print flat on its widest face
- **Camera platform**: Print flat, standoffs facing up

### Camera Node

Export two STLs:
- **Base**: Print open-side up
- **Lid**: Flip upside-down in slicer

### Relay Node

Export three STLs:
- **Base**: Print open-side up
- **Lid**: Flip upside-down in slicer
- **DIN clip**: Optional, print flat

---

## Assembly Hardware

| Item | Qty | Purpose |
|------|-----|---------|
| M2.5 × 8mm screws | 4 | Hub lid attachment |
| M2 × 6mm screws | 8 | PCB mounting (hub boards) |
| M2 × 5mm screws | 4 | Camera PCB mounting |
| M1.6 × 4mm self-tap | 4 | SG90 servo mounting (each servo) |
| M3 × 12mm screws | 4 | Turret base to enclosure lid |
| M4 × 15mm screws + nuts | 4 | Wall/pole mounting (hub ears) |
| M3 × 8mm screws + nuts | 4 | Camera node wall mount |

---

## Assembly Order

### Hub + Turret

1. Mount ESP32-S3 to base standoffs with M2 screws
2. Mount PCA9685 to base standoffs with M2 screws
3. Mount SX1276 carrier board to base standoffs
4. Wire I2C (SDA/SCL), SPI (LoRa), and power connections
5. Route servo cables through rear cable exit
6. Route LoRa antenna wire through side exit hole
7. Snap/screw lid on
8. Mount turret base plate to lid with M3 screws
9. Press-fit pan servo into base plate pocket, secure with M1.6 screws
10. Attach tilt arm to pan servo horn (screw through center)
11. Press-fit tilt servo into tilt arm pocket
12. Attach camera platform to tilt servo horn

### Camera Node (SkyWatch Nano)

1. Mount ESP32-CAM to standoffs (align lens with front window)
2. Connect PIR sensor wires, mount AM312 in lid hole
3. Route power cable through rear access
4. Snap lid on

### Relay Node

1. Mount ESP32-C3 SuperMini to left-side standoffs
2. Slide relay module into right-side cradle
3. Wire GPIO4 → relay IN, share GND
4. Route power in (left hole), load out (right hole)
5. Snap lid on
6. Optionally clip DIN rail mount to bottom

---

## Customisation Tips

- **Tolerance too tight?** Increase `clearance` parameter (default 0.3mm)
- **Snap-fit too loose?** Decrease `lid_clearance` parameter
- **Different board?** Measure your PCB and update the dimension variables
- **Need waterproofing?** Print with 100% infill walls, add silicone gasket to lid lip
- **Colour coding**: Print hub=blue, camera=green, relay=orange to match LED colour scheme
- **Pole mount**: Hub ears accept M4 bolts + hose clamps for pole mounting

---

## Estimated Print Times (0.2mm, standard speed)

| Part | Time | Filament |
|------|------|----------|
| Hub base | ~2h 30m | ~35g |
| Hub lid | ~45m | ~12g |
| Turret (all 3) | ~2h | ~28g |
| Camera base | ~1h 15m | ~18g |
| Camera lid | ~30m | ~8g |
| Relay base | ~1h 30m | ~22g |
| Relay lid | ~30m | ~8g |
| DIN clip | ~20m | ~5g |
| **Total** | **~9h** | **~136g** |

At ~R350/kg for PETG, total filament cost is roughly **R48** (~$2.50).
