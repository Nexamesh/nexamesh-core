/**
 * Response Relay Enclosure — Phase 1
 *
 * Houses: ESP32-C3 SuperMini + relay module (or MOSFET board)
 * Features:
 *   - Relay module bay (fits SRD-05VDC-SL or similar)
 *   - Screw terminal access slot (top)
 *   - Status LEDs visible through light pipes
 *   - DIN rail clip option (bottom)
 *   - Cable gland holes (power in, load out)
 *   - Compact form factor
 *
 * ESP32-C3 SuperMini: 22.5 x 18.0 mm (tiny!)
 * Relay module (1-ch): 33.0 x 25.5 x 18.5 mm
 *
 * Print: 0.2mm layer, 25% infill, PETG (heat from relay coil)
 */

// ── Component Dimensions ───────────────────────────────────────────
// ESP32-C3 SuperMini
c3_w = 22.5;
c3_d = 18.0;
c3_h = 3.5;   // PCB + components

// 1-channel relay module
relay_w = 33.0;
relay_d = 25.5;
relay_h = 18.5;

// ── Design Parameters ──────────────────────────────────────────────
wall = 2.0;
clearance = 0.3;

// Internal — side by side layout: C3 + relay
inner_w = relay_w + c3_w + 8;    // ~63mm
inner_d = max(relay_d, c3_d) + 6; // ~31mm
inner_h = relay_h + 6;            // ~24mm

// Outer
outer_w = inner_w + 2 * wall;
outer_d = inner_d + 2 * wall;
outer_h = inner_h + wall;

corner_r = 2;

// Lid
lid_h = 3;
lid_lip = 1.2;

// Standoffs
standoff_h = 3;
standoff_d = 4.5;
standoff_hole_d = 1.8;

// Cable holes
power_hole_d = 5;   // DC power in
load_hole_d = 6;    // load output (thicker wire)

// DIN rail clip dimensions (35mm standard DIN rail)
din_rail_w = 35;
din_rail_slot = 7.5;
din_clip_h = 8;

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

        // Power input hole (left side)
        translate([-0.1, outer_d / 2, wall + inner_h / 2])
            rotate([0, 90, 0])
                cylinder(h = wall + 0.2, d = power_hole_d, $fn = 20);

        // Load output hole (right side)
        translate([outer_w - wall - 0.1, outer_d / 2, wall + inner_h / 2])
            rotate([0, 90, 0])
                cylinder(h = wall + 0.2, d = load_hole_d, $fn = 20);

        // USB-C access (rear, for programming ESP32-C3)
        translate([wall + 4, outer_d - wall - 0.1, wall + standoff_h + 1])
            rotate([-90, 0, 0])
                hull() {
                    translate([-4.5, 0, 0]) cylinder(h = wall + 0.2, d = 3.5, $fn = 15);
                    translate([4.5, 0, 0]) cylinder(h = wall + 0.2, d = 3.5, $fn = 15);
                }

        // Status LED holes (front face, 2x)
        for (x_off = [wall + 8, wall + 16])
            translate([x_off, -0.1, outer_h - 6])
                rotate([-90, 0, 0])
                    cylinder(h = wall + 0.2, d = 3, $fn = 15);

        // Ventilation (bottom)
        for (x = [outer_w / 3, 2 * outer_w / 3])
            for (y = [outer_d / 3, 2 * outer_d / 3])
                translate([x, y, -0.1])
                    cylinder(h = wall + 0.2, d = 2, $fn = 12);

        // Screw terminal access slot (top — will align with lid cutout)
        // Relay screw terminals are on top, need access
        translate([wall + inner_w - relay_w - 2 + 5, wall + 3, outer_h - 0.1])
            cube([relay_w - 10, inner_d - 6, wall + 0.2]);
    }

    // ESP32-C3 standoffs (left side of enclosure)
    c3_x = wall + 3;
    c3_y = wall + (inner_d - c3_d) / 2;
    for (dx = [2, c3_w - 2])
        for (dy = [2, c3_d - 2])
            translate([c3_x + dx, c3_y + dy, wall])
                difference() {
                    cylinder(h = standoff_h, d = standoff_d, $fn = 18);
                    translate([0, 0, -0.1])
                        cylinder(h = standoff_h + 0.2, d = standoff_hole_d, $fn = 15);
                }

    // Relay module cradle (right side — friction fit ledge)
    relay_x = wall + c3_w + 6;
    relay_y = wall + (inner_d - relay_d) / 2;

    // Bottom support rails for relay
    for (y_off = [0, relay_d - 2])
        translate([relay_x, relay_y + y_off, wall])
            cube([relay_w + 2, 2, 3]);

    // Side retaining walls for relay
    for (y_off = [-1, relay_d + clearance])
        translate([relay_x + 2, relay_y + y_off, wall])
            cube([relay_w - 4, 1, relay_h / 2]);

    // Divider wall between C3 and relay (electrical isolation)
    translate([wall + c3_w + 4, wall + 2, wall])
        cube([1.5, inner_d - 4, inner_h - 4]);
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

        // Screw terminal access window (matches base cutout)
        translate([wall + inner_w - relay_w - 2 + 5, wall + 3, -0.1])
            cube([relay_w - 10, inner_d - 6, wall + 0.2]);

        // Label
        translate([outer_w / 3, outer_d / 2, wall - 0.4])
            linear_extrude(0.5)
                text("RELAY", size = 5, halign = "center", valign = "center",
                     font = "Liberation Sans:style=Bold");
    }
}

// ═══════════════════════════════════════════════════════════════════
// Optional: DIN Rail Clip (print separately, glue to bottom)
// ═══════════════════════════════════════════════════════════════════

module din_rail_clip() {
    clip_w = outer_w - 4;
    clip_d = din_rail_w + 4;

    difference() {
        // Body
        cube([clip_w, clip_d, din_clip_h]);

        // Rail channel
        translate([-0.1, 2, 2])
            cube([clip_w + 0.2, din_rail_w, din_rail_slot]);

        // Spring relief cut (allows clip to flex)
        translate([clip_w / 2, -0.1, 1])
            cube([clip_w / 2 + 0.1, 3, din_clip_h - 2]);
    }

    // Retaining hooks
    translate([1, 1, 0])
        cube([3, 1, din_clip_h]);
    translate([1, din_rail_w + 2, 0])
        cube([3, 1, din_clip_h]);
}

// ── Render ─────────────────────────────────────────────────────────

base();

translate([outer_w + 15, 0, 0])
    lid();

translate([0, outer_d + 20, 0])
    din_rail_clip();
