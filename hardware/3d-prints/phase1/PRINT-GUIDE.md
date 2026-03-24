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

## STL → G-code Slicing Workflow

G-code is the machine instruction language your 3D printer reads. You need a
**slicer** to convert the STL mesh into layer-by-layer G-code. Here's the
complete workflow.

### Step 1: Install a Slicer

| Slicer | Best for | Download |
|--------|----------|----------|
| **PrusaSlicer** | Prusa, Creality, most FDM printers | [prusaslicer.org](https://www.prusa3d.com/page/prusaslicer_424/) |
| **Cura** | Ender 3, CR-10, Anycubic | [ultimaker.com/cura](https://ultimaker.com/software/ultimaker-cura/) |
| **OrcaSlicer** | Advanced tuning, multi-colour | [github.com/SoftFever/OrcaSlicer](https://github.com/SoftFever/OrcaSlicer) |
| **Bambu Studio** | Bambu Lab printers only | Comes with printer |

If you're unsure, **PrusaSlicer** works with almost any printer and has the best
defaults.

### Step 2: First-Time Printer Setup

1. Open slicer → **Configuration → Configuration Wizard**
2. Select your printer model (e.g. Ender 3 V2, Prusa MK3S+, etc.)
3. This loads your bed size, nozzle diameter, and default speeds
4. If your printer isn't listed, choose a "Custom FFF" and enter:
   - Bed size (e.g. 220 × 220mm for Ender 3)
   - Nozzle diameter: **0.4mm** (standard)
   - Max print height (e.g. 250mm)

### Step 3: Import and Orient the STL

1. **File → Import → Import STL** (or drag-and-drop the `.stl` file)
2. The part appears on the virtual build plate
3. **Orient for printing** (critical!):
   - Enclosure **bases**: Open side faces UP (print upside-down)
   - Enclosure **lids**: Flat top faces DOWN on the bed
   - Turret **base plate**: Flat bottom on bed
   - Turret **tilt arm**: Widest flat face on bed
   - Camera **platform**: Flat bottom on bed, standoffs pointing up
4. Right-click → **Place on Face** to snap a flat surface to the bed
5. Multiple parts can go on one plate — leave ~5mm gap between them

### Step 4: Configure Print Settings

Select the correct material profile, then adjust:

```
Printer Profile:     [Your printer]
Material:            PETG (or PLA for indoor demo)
Layer Height:        0.2mm (Quality) or 0.28mm (Draft/fast)
Infill:              20% (enclosures) / 30% (turret bracket)
Infill Pattern:      Gyroid (strongest) or Grid (fastest)
Wall Count:          3 (enclosures) / 4 (turret — structural)
Top/Bottom Layers:   4
Supports:            OFF (none of our parts need supports)
Adhesion:            Brim — 5mm (recommended for PETG)
```

**PETG-specific settings** (important — PETG is stringy without these):

```
Nozzle Temp:         230–240°C (check your filament's label)
Bed Temp:            80–85°C
Print Speed:         40–50 mm/s (slower = cleaner for PETG)
Retraction:          5mm at 40mm/s (Bowden) or 1mm at 30mm/s (direct drive)
Fan Speed:           50% (not 100% — PETG needs less cooling)
First Layer Speed:   20 mm/s
Z-hop:               0.2mm (reduces stringing)
```

**PLA settings** (if using PLA instead):

```
Nozzle Temp:         200–210°C
Bed Temp:            60°C
Print Speed:         50–60 mm/s
Fan Speed:           100%
```

### Step 5: Slice and Preview

1. Click **Slice Now** (bottom right in PrusaSlicer, or "Slice" in Cura)
2. **Preview tab** — scrub through the layers to check:
   - First layer looks solid with good bed coverage
   - No floating/unsupported sections (there shouldn't be any)
   - Infill pattern is visible inside the walls
   - Cable holes and ventilation slots are clean
   - Screw posts and standoffs look correct
3. Check the estimated **time** and **filament usage** at bottom
4. If anything looks wrong, go back and adjust settings

### Step 6: Export G-code

1. Click **Export G-code** (PrusaSlicer) or **Save to Disk** (Cura)
2. Save to your SD card / USB drive with a clear name:
   ```
   hub-base_PETG_0.2mm.gcode
   hub-lid_PETG_0.2mm.gcode
   turret-all_PETG_0.2mm.gcode
   camera-base_PETG_0.2mm.gcode
   camera-lid_PETG_0.2mm.gcode
   relay-base_PETG_0.2mm.gcode
   relay-lid_PETG_0.2mm.gcode
   din-clip_PETG_0.2mm.gcode
   ```
3. Eject SD card safely

### Step 7: Print

1. Insert SD card / USB into printer
2. **Level your bed first!** (paper test or auto-level if equipped)
3. Pre-heat to PETG temps (nozzle 235°C, bed 80°C)
4. Clean bed with IPA (isopropyl alcohol) for adhesion
5. Start print from SD card menu
6. **Watch the first layer** — it should be smooth and stuck down:
   - Too high: filament doesn't stick, curls up → lower Z offset
   - Too low: filament is squished flat/transparent → raise Z offset
   - Just right: slight squish, lines touch each other, no gaps
7. After first layer looks good, you can walk away

### Recommended Print Order

Print in this order (smallest/fastest first to test your settings):

1. **DIN rail clip** (~20min) — test piece, verify tolerance
2. **Camera lid** (~30min) — test snap-fit tolerance
3. **Camera base** (~1h 15min) — first real enclosure
4. **Relay lid + base** (~2h) — test relay fitment
5. **Hub lid** (~45min)
6. **Hub base** (~2h 30min) — biggest piece
7. **Turret parts** (~2h) — all 3 on one plate

### Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Part won't stick to bed | Bed dirty or too high | Clean with IPA, re-level |
| Stringing between parts | PETG temp too high | Lower nozzle 5°C, increase retraction |
| Lid too tight | Tolerance too small | Increase `clearance` in .scad to 0.4mm, re-export |
| Lid too loose | Tolerance too big | Decrease `clearance` to 0.2mm |
| Warping/lifting corners | Bed temp too low, no brim | Add 8mm brim, increase bed temp 5°C |
| Layer gaps/holes | Under-extrusion | Increase flow rate 2–5%, check for clog |
| Screw holes too small | Over-extrusion | Decrease flow 2%, or drill out with hand drill |
| Rough overhangs | PETG sag | Reduce speed to 30mm/s, try 60% fan |

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
