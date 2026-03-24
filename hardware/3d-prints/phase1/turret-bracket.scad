/**
 * SkyWatch Pan/Tilt Turret Bracket — Phase 1
 *
 * Two-axis gimbal for SG90 micro servos. Mounts on top of the hub
 * enclosure or on a separate pole/tripod.
 *
 * Architecture:
 *   - Base plate with pan servo (yaw) pocket — rotates the tilt arm
 *   - Tilt arm with tilt servo (pitch) pocket — holds the camera mount
 *   - Camera platform on top — fits ESP32-CAM or small action cam
 *
 * SG90 dimensions: 23.0 x 12.2 x 22.0mm, shaft at 6mm from edge
 * SG90 mount tabs: 32.0mm apart (outer), 2.0mm screw holes
 *
 * Print settings: 0.2mm layer, 30% infill (structural), PETG or PLA+
 * Print each piece flat — no supports needed for any part.
 */

// ── SG90 Servo Dimensions ──────────────────────────────────────────
sg90_w = 23.0;      // body width
sg90_d = 12.2;      // body depth
sg90_h = 22.0;      // body height (below tabs)
sg90_tab_w = 32.0;  // tab-to-tab outer width
sg90_tab_h = 2.5;   // tab thickness
sg90_tab_y = 15.7;  // tab position from bottom
sg90_shaft_offset = 6.0;  // shaft center from one edge
sg90_shaft_d = 4.8; // shaft diameter
sg90_screw_d = 2.0; // mount screw holes
sg90_screw_span = 28.0;  // screw hole spacing

// ── Design Parameters ──────────────────────────────────────────────
wall = 2.5;          // wall thickness (sturdy for a turret)
clearance = 0.4;     // print tolerance
base_d = 60;         // base plate diameter
base_h = 6;          // base plate thickness
pole_mount_d = 25;   // center hole for pole mount (optional)

// Tilt arm dimensions
arm_l = 50;          // length of tilt arm
arm_w = sg90_d + 2 * wall + 2 * clearance;
arm_h = wall + sg90_h + sg90_tab_h + wall;

// Camera platform
cam_w = 30;          // ESP32-CAM is 27mm wide
cam_d = 42;          // ESP32-CAM is 40mm long
cam_h = wall;
cam_standoff_h = 3;

// ── Modules ────────────────────────────────────────────────────────

module sg90_cutout() {
    // Servo body pocket
    translate([-sg90_w / 2 - clearance, -sg90_d / 2 - clearance, 0])
        cube([sg90_w + 2 * clearance, sg90_d + 2 * clearance, sg90_h + clearance]);

    // Tab slot
    translate([-sg90_tab_w / 2 - clearance, -sg90_d / 2 - clearance, sg90_tab_y])
        cube([sg90_tab_w + 2 * clearance, sg90_d + 2 * clearance, sg90_tab_h + clearance]);

    // Shaft exit hole
    translate([sg90_w / 2 - sg90_shaft_offset, 0, sg90_h])
        cylinder(h = 10, d = sg90_shaft_d + 1, $fn = 20);

    // Wire exit
    translate([-sg90_w / 2 - 1, -3, 0])
        cube([5, 6, sg90_h]);
}

// ═══════════════════════════════════════════════════════════════════
// Part 1: Base Plate (holds pan servo)
// ═══════════════════════════════════════════════════════════════════

module base_plate() {
    difference() {
        union() {
            // Circular base
            cylinder(h = base_h, d = base_d, $fn = 60);

            // Raised servo pocket walls
            translate([0, 0, base_h])
                difference() {
                    // Outer walls for servo pocket
                    translate([-sg90_tab_w / 2 - wall, -sg90_d / 2 - wall, 0])
                        cube([sg90_tab_w + 2 * wall, sg90_d + 2 * wall,
                              sg90_tab_y + sg90_tab_h + wall]);
                    // Inner cutout for servo
                    sg90_cutout();
                }
        }

        // Center shaft pass-through (pan servo shaft goes up through base)
        translate([sg90_w / 2 - sg90_shaft_offset, 0, -0.1])
            cylinder(h = base_h + 0.2, d = sg90_shaft_d + 2, $fn = 20);

        // Mounting holes (M3) at corners of base — for attaching to enclosure lid
        for (a = [45, 135, 225, 315])
            translate([cos(a) * (base_d / 2 - 8), sin(a) * (base_d / 2 - 8), -0.1])
                cylinder(h = base_h + 0.2, d = 3.2, $fn = 20);

        // Servo screw holes through tabs
        translate([0, 0, base_h + sg90_tab_y + sg90_tab_h / 2])
            for (x = [-sg90_screw_span / 2, sg90_screw_span / 2])
                translate([x, 0, 0])
                    rotate([0, 0, 0])
                        cylinder(h = wall + 1, d = sg90_screw_d, $fn = 15);

        // Cable channel through base
        translate([-sg90_w / 2 - wall - 1, -3, -0.1])
            cube([5, 6, base_h + 5]);
    }
}

// ═══════════════════════════════════════════════════════════════════
// Part 2: Tilt Arm (connects to pan servo horn, holds tilt servo)
// ═══════════════════════════════════════════════════════════════════

module tilt_arm() {
    difference() {
        union() {
            // Main arm body
            translate([-arm_w / 2, 0, 0])
                cube([arm_w, arm_l, arm_h]);

            // Horn attachment hub (bottom, connects to pan servo)
            translate([0, 0, 0])
                cylinder(h = wall, d = 15, $fn = 30);
        }

        // Tilt servo pocket (at far end of arm)
        translate([0, arm_l - sg90_w / 2 - wall - 2, wall])
            rotate([0, 0, 90])
                sg90_cutout();

        // Horn screw hole (center, for attaching to pan servo horn)
        translate([0, 0, -0.1])
            cylinder(h = wall + 0.2, d = sg90_screw_d, $fn = 15);

        // Horn alignment holes (radial pattern matches SG90 horn)
        for (a = [0, 90, 180, 270])
            translate([cos(a) * 7, sin(a) * 7, -0.1])
                cylinder(h = wall + 0.2, d = 1.2, $fn = 15);

        // Tilt servo screw holes
        translate([0, arm_l - sg90_w / 2 - wall - 2, wall + sg90_tab_y + sg90_tab_h / 2])
            rotate([0, 0, 90])
                for (x = [-sg90_screw_span / 2, sg90_screw_span / 2])
                    translate([x, 0, 0])
                        cylinder(h = wall + 1, d = sg90_screw_d, $fn = 15);

        // Weight reduction cutout (center of arm)
        translate([- (arm_w - 2 * wall) / 2, 15, -0.1])
            cube([arm_w - 2 * wall, arm_l - sg90_w - 20, arm_h + 0.2]);
    }
}

// ═══════════════════════════════════════════════════════════════════
// Part 3: Camera Platform (attaches to tilt servo horn)
// ═══════════════════════════════════════════════════════════════════

module camera_platform() {
    difference() {
        union() {
            // Flat platform
            translate([-cam_w / 2, -cam_d / 2, 0])
                cube([cam_w, cam_d, cam_h]);

            // Horn attachment hub
            cylinder(h = cam_h, d = 15, $fn = 30);

            // Camera standoffs (4 corners, for M2 screws)
            cam_mount_x = 11;   // half of 22mm ESP32-CAM mount spacing
            cam_mount_y = 18;   // half of 36mm spacing
            for (x = [-cam_mount_x, cam_mount_x])
                for (y = [-cam_mount_y, cam_mount_y])
                    translate([x, y, cam_h])
                        difference() {
                            cylinder(h = cam_standoff_h, d = 5, $fn = 20);
                            translate([0, 0, -0.1])
                                cylinder(h = cam_standoff_h + 0.2, d = 2.0, $fn = 15);
                        }

            // Side rails for camera retention
            for (x = [-cam_w / 2, cam_w / 2 - 1.5])
                translate([x, -cam_d / 2 + 5, cam_h])
                    cube([1.5, cam_d - 10, cam_standoff_h + 1]);
        }

        // Horn screw hole (center)
        translate([0, 0, -0.1])
            cylinder(h = cam_h + 0.2, d = sg90_screw_d, $fn = 15);

        // Horn alignment holes
        for (a = [0, 90, 180, 270])
            translate([cos(a) * 7, sin(a) * 7, -0.1])
                cylinder(h = cam_h + 0.2, d = 1.2, $fn = 15);

        // Camera lens cutout (center hole)
        translate([0, -5, -0.1])
            cylinder(h = cam_h + 0.2, d = 10, $fn = 30);
    }
}

// ── Render ─────────────────────────────────────────────────────────
// All parts laid flat for printing — no supports needed

// Part 1: Base plate
base_plate();

// Part 2: Tilt arm (beside base)
translate([base_d / 2 + arm_w / 2 + 15, 0, 0])
    tilt_arm();

// Part 3: Camera platform (beside arm)
translate([base_d / 2 + arm_w + cam_w / 2 + 30, arm_l / 2, 0])
    camera_platform();
