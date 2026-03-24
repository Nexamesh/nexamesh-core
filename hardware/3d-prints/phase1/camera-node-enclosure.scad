/**
 * SkyWatch Nano — ESP32-CAM Enclosure
 *
 * Compact weatherproof-style case for the ESP32-CAM detection node.
 * Features:
 *   - Camera lens window (front face)
 *   - SD card access slot (optional, bottom)
 *   - USB/serial header access (rear)
 *   - PIR sensor mount hole (top)
 *   - Status LED light pipe hole
 *   - Wall/pole mounting tabs
 *   - Snap-fit lid
 *
 * ESP32-CAM dimensions: 40.5 x 27.0 x 4.5mm (PCB only)
 * Camera module protrudes ~3mm from front face
 *
 * Print: 0.2mm layer, 20% infill, PETG recommended
 * No supports needed — print base flat, lid flat (flipped)
 */

// ── ESP32-CAM Dimensions ───────────────────────────────────────────
cam_pcb_w = 27.0;    // width
cam_pcb_l = 40.5;    // length
cam_pcb_h = 4.5;     // PCB thickness (components on back)
cam_lens_d = 8.5;    // camera lens barrel diameter
cam_lens_offset_x = 0;   // centered on width (approx)
cam_lens_offset_y = 5.0;  // from top edge

// ── Design Parameters ──────────────────────────────────────────────
wall = 2.0;
clearance = 0.3;

// Internal dimensions
inner_w = cam_pcb_w + 6;    // 33mm — room for wires
inner_d = cam_pcb_l + 6;    // 46.5mm
inner_h = 18;               // room for PCB + components + antenna clearance

// Computed outer
outer_w = inner_w + 2 * wall;
outer_d = inner_d + 2 * wall;
outer_h = inner_h + wall;

corner_r = 2.5;

// Lid
lid_h = 3;
lid_lip = 1.2;

// PCB standoffs
standoff_h = 5;
standoff_d = 4.5;
standoff_hole_d = 1.8;  // M1.6 or friction fit

// PIR sensor (HC-SR501 mini or AM312)
pir_hole_d = 10;  // AM312 is ~10mm diameter

// ── Modules ────────────────────────────────────────────────────────

module rounded_box(w, d, h, r) {
    hull() {
        for (x = [r, w - r])
            for (y = [r, d - r])
                translate([x, y, 0])
                    cylinder(h = h, r = r, $fn = 24);
    }
}

// ═══════════════════════════════════════════════════════════════════
// Base
// ═══════════════════════════════════════════════════════════════════

module base() {
    difference() {
        // Shell
        rounded_box(outer_w, outer_d, outer_h, corner_r);

        // Hollow
        translate([wall, wall, wall])
            rounded_box(inner_w, inner_d, inner_h + 1, corner_r - 0.5);

        // Camera lens window (front face, Y=0)
        // Position: centered on X, offset from top
        translate([outer_w / 2, -0.1, outer_h - wall - cam_lens_offset_y - cam_lens_d / 2])
            rotate([-90, 0, 0])
                cylinder(h = wall + 0.2, d = cam_lens_d + 2, $fn = 30);

        // PIR sensor hole (top face — will be in lid)
        // We put a matching hole in the base wall just in case
        // Actually, PIR goes in the lid — skip here

        // USB/serial header access (rear, Y=outer_d)
        translate([outer_w / 2, outer_d - wall - 0.1, wall + standoff_h + 2])
            rotate([-90, 0, 0])
                cube([12, 5, wall + 0.2], center = true);

        // Status LED light pipe (front face, small hole)
        translate([outer_w / 2 + 8, -0.1, outer_h - wall - 5])
            rotate([-90, 0, 0])
                cylinder(h = wall + 0.2, d = 3, $fn = 15);

        // Ventilation holes (bottom, small)
        for (x = [outer_w / 4, outer_w / 2, 3 * outer_w / 4])
            for (y = [outer_d / 3, 2 * outer_d / 3])
                translate([x, y, -0.1])
                    cylinder(h = wall + 0.2, d = 2, $fn = 12);
    }

    // PCB standoffs — ESP32-CAM has mounting holes at ~2mm from edges
    // Mount holes approximately at: (2, 2), (2, 38), (25, 2), (25, 38)
    pcb_x = wall + (inner_w - cam_pcb_w) / 2;
    pcb_y = wall + (inner_d - cam_pcb_l) / 2;
    for (dx = [2, cam_pcb_w - 2])
        for (dy = [2, cam_pcb_l - 2])
            translate([pcb_x + dx, pcb_y + dy, wall])
                difference() {
                    cylinder(h = standoff_h, d = standoff_d, $fn = 18);
                    translate([0, 0, -0.1])
                        cylinder(h = standoff_h + 0.2, d = standoff_hole_d, $fn = 15);
                }

    // Mounting tabs (two sides, for wall/pole mount)
    for (y_pos = [outer_d / 4, 3 * outer_d / 4]) {
        // Left tab
        translate([-8, y_pos, 0])
            difference() {
                hull() {
                    translate([0, -5, 0]) cube([8, 10, wall]);
                    translate([4, 0, 0]) cylinder(h = wall, d = 10, $fn = 20);
                }
                translate([4, 0, -0.1])
                    cylinder(h = wall + 0.2, d = 3.5, $fn = 15);
            }
        // Right tab
        translate([outer_w, y_pos, 0])
            difference() {
                hull() {
                    translate([0, -5, 0]) cube([8, 10, wall]);
                    translate([4, 0, 0]) cylinder(h = wall, d = 10, $fn = 20);
                }
                translate([4, 0, -0.1])
                    cylinder(h = wall + 0.2, d = 3.5, $fn = 15);
            }
    }
}

// ═══════════════════════════════════════════════════════════════════
// Lid
// ═══════════════════════════════════════════════════════════════════

module lid() {
    lid_inner_w = inner_w - clearance * 2;
    lid_inner_d = inner_d - clearance * 2;

    difference() {
        union() {
            // Flat top
            rounded_box(outer_w, outer_d, wall, corner_r);

            // Inner lip
            translate([wall + clearance, wall + clearance, wall])
                difference() {
                    rounded_box(lid_inner_w, lid_inner_d, lid_h, corner_r - 1);
                    translate([lid_lip, lid_lip, -0.1])
                        rounded_box(lid_inner_w - 2 * lid_lip,
                                   lid_inner_d - 2 * lid_lip,
                                   lid_h + 0.2, corner_r - 2);
                }
        }

        // PIR sensor hole (top center)
        translate([outer_w / 2, outer_d / 3, -0.1])
            cylinder(h = wall + 0.2, d = pir_hole_d, $fn = 30);

        // Label emboss
        translate([outer_w / 2, 2 * outer_d / 3, wall - 0.4])
            linear_extrude(0.5)
                text("NANO", size = 5, halign = "center", valign = "center",
                     font = "Liberation Sans:style=Bold");
    }
}

// ── Render ─────────────────────────────────────────────────────────

base();

translate([outer_w + 15, 0, 0])
    lid();
