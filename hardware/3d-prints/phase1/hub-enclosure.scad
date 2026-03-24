/**
 * SkyWatch Hub Enclosure — Phase 1
 *
 * Houses: ESP32-S3 DevKitC-1, PCA9685 servo driver, SX1276 LoRa module
 * Features:
 *   - Snap-fit lid with screw option
 *   - Cable glands for servo/power/antenna
 *   - Ventilation slots
 *   - Mounting ears for wall/pole attachment
 *   - LoRa antenna SMA/wire exit hole
 *
 * Print settings: 0.2mm layer, 20% infill, no supports needed
 * Material: PETG recommended (heat resistant), PLA acceptable for indoor
 *
 * Board dimensions (reference):
 *   ESP32-S3 DevKitC-1:  69.0 x 25.5 mm, mount holes 2.0mm
 *   PCA9685 breakout:    62.5 x 25.4 mm
 *   SX1276 bare module:  16.0 x 16.0 mm (on carrier ~20 x 25 mm)
 */

// ── Parameters ─────────────────────────────────────────────────────
// Change these to adjust for your exact boards

// Wall thickness
wall = 2.0;

// Internal dimensions (enough for all 3 boards stacked with wiring)
inner_w = 100;   // X — width
inner_d = 70;    // Y — depth
inner_h = 40;    // Z — height

// Outer dimensions (computed)
outer_w = inner_w + 2 * wall;
outer_d = inner_d + 2 * wall;
outer_h = inner_h + wall;       // bottom wall only; lid adds top

// Corner radius
corner_r = 3;

// Lid parameters
lid_h = 4;              // lid wall height (overlap)
lid_clearance = 0.3;    // print tolerance gap
lid_lip = 1.5;          // lip thickness

// Screw post dimensions
screw_d = 2.5;          // M2.5 screw
post_d = 6;
post_h = inner_h - 2;   // slightly shorter than inner height

// Ventilation slot dimensions
vent_w = 2;
vent_l = 15;
vent_spacing = 4;
vent_count = 6;

// Mounting ear dimensions
ear_w = 15;
ear_h = 3;
ear_hole_d = 4;  // M4 mounting hole

// Cable exit holes
cable_hole_d = 6;        // servo/power cable
antenna_hole_d = 8;      // LoRa antenna (SMA or wire exit)

// Board standoff dimensions
standoff_h = 4;          // clearance under PCBs
standoff_d = 5;
standoff_hole_d = 2.0;   // M2 screw for PCB mounting

// ── Modules ────────────────────────────────────────────────────────

module rounded_box(w, d, h, r) {
    hull() {
        for (x = [r, w - r])
            for (y = [r, d - r])
                translate([x, y, 0])
                    cylinder(h = h, r = r, $fn = 30);
    }
}

module screw_post(h, outer_d, inner_d) {
    difference() {
        cylinder(h = h, d = outer_d, $fn = 20);
        translate([0, 0, -0.1])
            cylinder(h = h + 0.2, d = inner_d, $fn = 20);
    }
}

module standoff(h, outer_d, hole_d) {
    difference() {
        cylinder(h = h, d = outer_d, $fn = 20);
        translate([0, 0, -0.1])
            cylinder(h = h + 0.2, d = hole_d, $fn = 20);
    }
}

module ventilation_slots(count, slot_w, slot_l, spacing) {
    for (i = [0:count - 1]) {
        translate([0, i * (slot_w + spacing), 0])
            cube([wall + 0.2, slot_w, slot_l]);
    }
}

module mounting_ear(w, h, hole_d) {
    difference() {
        hull() {
            cube([w, h, wall]);
            translate([w / 2, 0, 0])
                cylinder(h = wall, d = w, $fn = 30);
        }
        translate([w / 2, 0, -0.1])
            cylinder(h = wall + 0.2, d = hole_d, $fn = 20);
    }
}

// ── Base (bottom half) ─────────────────────────────────────────────

module base() {
    difference() {
        // Outer shell
        rounded_box(outer_w, outer_d, outer_h, corner_r);

        // Hollow interior
        translate([wall, wall, wall])
            rounded_box(inner_w, inner_d, inner_h + 1, corner_r - 0.5);

        // Ventilation slots — left side
        translate([-0.1, wall + 10, wall + 10])
            ventilation_slots(vent_count, vent_w, vent_l, vent_spacing);

        // Ventilation slots — right side
        translate([outer_w - wall - 0.1, wall + 10, wall + 10])
            ventilation_slots(vent_count, vent_w, vent_l, vent_spacing);

        // Cable exit — rear left (servo cables)
        translate([wall + 15, outer_d - wall - 0.1, wall + 12])
            rotate([-90, 0, 0])
                cylinder(h = wall + 0.2, d = cable_hole_d, $fn = 20);

        // Cable exit — rear center (power)
        translate([outer_w / 2, outer_d - wall - 0.1, wall + 12])
            rotate([-90, 0, 0])
                cylinder(h = wall + 0.2, d = cable_hole_d, $fn = 20);

        // Cable exit — rear right (USB for programming)
        translate([outer_w - wall - 15, outer_d - wall - 0.1, wall + 12])
            rotate([-90, 0, 0])
                cylinder(h = wall + 0.2, d = cable_hole_d, $fn = 20);

        // LoRa antenna exit — top of right wall
        translate([outer_w - wall - 0.1, outer_d / 2, outer_h - 8])
            rotate([0, 90, 0])
                cylinder(h = wall + 0.2, d = antenna_hole_d, $fn = 20);
    }

    // Corner screw posts (for lid attachment)
    post_inset = wall + post_d / 2 + 1;
    for (pos = [[post_inset, post_inset],
                [outer_w - post_inset, post_inset],
                [post_inset, outer_d - post_inset],
                [outer_w - post_inset, outer_d - post_inset]])
        translate([pos[0], pos[1], wall])
            screw_post(post_h, post_d, screw_d);

    // PCB standoffs — ESP32-S3 DevKitC-1 (69 x 25.5mm)
    // Placed along left side of enclosure
    esp_x = wall + 5;
    esp_y = wall + 5;
    for (dx = [0, 63], dy = [0, 19.5])
        translate([esp_x + dx + 3, esp_y + dy + 3, wall])
            standoff(standoff_h, standoff_d, standoff_hole_d);

    // PCB standoffs — PCA9685 (62.5 x 25.4mm)
    // Placed along right side of enclosure
    pca_x = wall + 5;
    pca_y = wall + 38;
    for (dx = [0, 56.5], dy = [0, 19.4])
        translate([pca_x + dx + 3, pca_y + dy + 3, wall])
            standoff(standoff_h, standoff_d, standoff_hole_d);

    // PCB standoff — SX1276 LoRa carrier board (~20 x 25mm)
    // Placed in remaining corner
    lora_x = wall + 72;
    lora_y = wall + 5;
    for (dx = [0, 14], dy = [0, 19])
        translate([lora_x + dx + 3, lora_y + dy + 3, wall])
            standoff(standoff_h, standoff_d, standoff_hole_d);

    // Mounting ears — two on bottom for wall/pole mount
    translate([-ear_w, outer_d / 4, 0])
        mounting_ear(ear_w, ear_h, ear_hole_d);
    translate([-ear_w, 3 * outer_d / 4, 0])
        mounting_ear(ear_w, ear_h, ear_hole_d);
    translate([outer_w, outer_d / 4, 0])
        mirror([1, 0, 0])
            mounting_ear(ear_w, ear_h, ear_hole_d);
    translate([outer_w, 3 * outer_d / 4, 0])
        mirror([1, 0, 0])
            mounting_ear(ear_w, ear_h, ear_hole_d);
}

// ── Lid ────────────────────────────────────────────────────────────

module lid() {
    lid_outer_w = outer_w;
    lid_outer_d = outer_d;
    lid_inner_w = inner_w - lid_clearance * 2;
    lid_inner_d = inner_d - lid_clearance * 2;

    // Flat top
    rounded_box(lid_outer_w, lid_outer_d, wall, corner_r);

    // Inner lip (fits inside base)
    translate([wall + lid_clearance, wall + lid_clearance, wall])
        difference() {
            rounded_box(lid_inner_w, lid_inner_d, lid_h, corner_r - 1);
            translate([lid_lip, lid_lip, -0.1])
                rounded_box(lid_inner_w - 2 * lid_lip, lid_inner_d - 2 * lid_lip,
                           lid_h + 0.2, corner_r - 2);
        }

    // Screw holes in lid (align with base posts)
    post_inset = wall + post_d / 2 + 1;
    for (pos = [[post_inset, post_inset],
                [lid_outer_w - post_inset, post_inset],
                [post_inset, lid_outer_d - post_inset],
                [lid_outer_w - post_inset, lid_outer_d - post_inset]])
        translate([pos[0], pos[1], -0.1])
            cylinder(h = wall + 0.2, d = screw_d, $fn = 20);

    // Label emboss (text on top)
    translate([lid_outer_w / 2, lid_outer_d / 2, wall - 0.4])
        linear_extrude(0.5)
            text("SKYWATCH HUB", size = 6, halign = "center", valign = "center",
                 font = "Liberation Sans:style=Bold");
    translate([lid_outer_w / 2, lid_outer_d / 2 - 10, wall - 0.4])
        linear_extrude(0.5)
            text("Phase 1", size = 4, halign = "center", valign = "center");
}

// ── Render ─────────────────────────────────────────────────────────

// Uncomment the part you want to export as STL:

// Base
base();

// Lid (translated for side-by-side preview)
translate([outer_w + 20, 0, 0])
    lid();

// For printing the lid, flip it:
// translate([outer_w + 20, 0, wall + lid_h])
//     rotate([180, 0, 0]) lid();
