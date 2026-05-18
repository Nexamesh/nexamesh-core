# Battery Technologies: Counter-UAS Threat Assessment

## Overview

Battery technology is the **primary constraint on drone threat capability**. This
document assesses current and emerging battery chemistries from the counter-UAS
defender's perspective: how they affect detection, endurance estimation, response
planning, and exploitable vulnerabilities.

This supplements the existing power storage research
(`inst-power-storage-and-management.md`) with a threat-focused lens.

---

## 1. Current Mainstream Drone Batteries

### Lithium Polymer (LiPo)

| Parameter          | Value                       |
| ------------------ | --------------------------- |
| Nominal voltage    | 3.7V/cell (4.2V charged)   |
| Energy density     | 150-250 Wh/kg              |
| Discharge rates    | 25C-150C                   |
| Cycle life         | 300-500 cycles              |
| Thermal runaway    | ~150 degrees C              |

**Threat profile:** Dominates consumer, racing, and current military FPV drones.
High burst current enables aggressive maneuvering. Typical endurance: 20-45
minutes (consumer multirotor), 8-15 minutes (FPV attack drone at combat speeds).

**Counter-UAS relevance:** Well-understood thermal signature. Vulnerable to
thermal runaway via directed energy. Predictable endurance limits.

### Lithium-Ion (Li-ion)

| Parameter          | Value                       |
| ------------------ | --------------------------- |
| Nominal voltage    | 3.6-3.7V/cell               |
| Energy density     | 250-300 Wh/kg              |
| Discharge rates    | 2C-10C                     |
| Cycle life         | 500-1000+ cycles            |
| Thermal runaway    | ~200 degrees C              |

**Threat profile:** Preferred for long-endurance fixed-wing and enterprise
platforms (DJI Matrice series). Higher energy density but lower peak power.
Typical endurance: 40-60+ minutes.

**Counter-UAS relevance:** Longer loiter times complicate response. Slightly
more thermally stable than LiPo. Some military FPV units experimenting with
Li-ion (21700 cells) for extended-range strikes (15-30 km).

### Lithium High Voltage (LiHV)

| Parameter          | Value                       |
| ------------------ | --------------------------- |
| Nominal voltage    | 3.8V/cell (4.35V charged)  |
| Energy density     | 5-10% above standard LiPo  |
| Cycle life         | Reduced vs standard LiPo   |

**Threat profile:** Common in micro/mini FPV (Tiny Whoop class). Marginal
endurance improvement. Slightly elevated thermal runaway risk.

---

## 2. Emerging Technologies and Threat Implications

### Solid-State Batteries

- **Energy density target:** 400-500 Wh/kg (2x current Li-ion)
- **Key change:** Solid electrolyte replaces liquid; dramatically reduces fire
  risk
- **Timeline:** Automotive-grade cells expected 2026-2028; drone formats 1-2
  years behind
- **Threat impact:** Could double flight endurance. **Critically, solid-state
  cells are far more resistant to thermal runaway**, reducing effectiveness of
  directed-energy countermeasures that rely on inducing battery fires
- **Key players:** QuantumScape, Solid Power, Samsung SDI, Toyota

### Lithium-Sulfur (Li-S)

- **Energy density target:** 400-600 Wh/kg theoretical; 300-400 Wh/kg current
  prototypes
- **Limitation:** Poor cycle life (<100 cycles), voltage fade
- **Threat impact:** Attractive for one-way attack drones where cycle life is
  irrelevant. DARPA has funded Li-S specifically for UAV applications
- **Key players:** Lyten, Sion Power

### Hydrogen Fuel Cells

- **System energy density:** 800-1500 Wh/kg (fuel only); lower at system level
- **Demonstrated flight time:** 2-4+ hours on multirotor platforms
- **Threat impact:** Qualitatively different threat -- **cannot be "waited out"**
  like battery drones. Enables standoff distances of 50+ km. Different
  thermal/IR signature (warm water vapor exhaust, cooling fans). Different
  acoustic signature.
- **Key players:** Intelligent Energy, Doosan Mobility Innovation, Honeywell
  (acquired Ballard's UAV division), HES Energy Systems

### Silicon Anode Li-ion

- **Energy density:** 450+ Wh/kg (Amprius, shipping to defense/aerospace)
- **Threat impact:** Near-term improvement within existing Li-ion ecosystem.
  Already deployed in HALE drone applications.

### Solar Hybrid

- Relevant only for HALE/persistent surveillance platforms (Airbus Zephyr, BAE
  PHASA-35). Can extend fixed-wing endurance 15-40% in daylight. Negligible
  benefit on small multirotors due to limited surface area.

---

## 3. Military FPV Batteries (Current Conflict Data)

Based on open-source reporting from the Ukraine-Russia conflict:

| Parameter           | Typical Value                    |
| ------------------- | -------------------------------- |
| Chemistry           | LiPo                            |
| Configuration       | 4S-6S (14.8-22.2V)              |
| Capacity            | 1300-2200 mAh                   |
| C-rating            | 75C-150C                        |
| Endurance           | 8-15 min at combat speeds        |
| Effective range     | 5-10 km (one-way attack)         |
| Battery weight      | 200-500g                         |
| Warhead capacity    | 1-3 kg                          |
| De facto standard   | 6S 1300mAh LiPo                 |
| Supply chain        | Shenzhen (CNHL, Tattu/Gens Ace) |

### Key Operational Factors

- **One-way missions:** No return margin needed, allowing operators to push
  batteries harder (deeper discharge, higher sustained C-rate)
- **Cold weather:** LiPo capacity drops 20-40% below 0 degrees C; operators keep
  batteries warm inside clothing pre-flight
- **Extended-range trend:** Some units switching to Li-ion (Samsung 21700) for
  15-30 km strike missions, accepting reduced maneuverability
- **Fiber-optic guided drones:** Eliminate RF link (and RF detectability) but
  fiber bobbin weight competes with battery capacity

---

## 4. Battery-Related Vulnerabilities for Counter-UAS

### Thermal Runaway Induction

**Mechanism:** LiPo/Li-ion cells enter self-sustaining thermal runaway above
~150-200 degrees C.

**Exploitation:** Directed energy weapons (high-power lasers, HPM) can heat
battery packs through drone structures. Demonstrated by Lockheed Martin ATHENA
and Raytheon HEL systems.

**Limitation:** Solid-state batteries will be largely immune to this attack
vector due to non-flammable solid electrolyte.

### BMS Disruption via EMI

**Mechanism:** Smart BMS units use microcontrollers and communication buses
(I2C, SMBus, CAN) susceptible to electromagnetic interference. Disruption could
cause:

- Loss of cell balancing (uneven discharge, cell damage)
- False voltage readings triggering premature shutdown
- Bypass of over-current protection

**Limitation:** BMS communication is low-frequency, short-range, and partially
shielded by the battery pack. Jamming the C2 link or GPS is far more practical.

### EMP Effects

**Mechanism:** EMP damages BMS electronics (MOSFETs, microcontrollers, voltage
regulators) without necessarily destroying cells. A damaged BMS may cut power
entirely.

**Systems:** Epirus Leonidas HPM, Raytheon PHASER high-power microwave.

### Voltage Sag Exploitation

**Mechanism:** Aggressive maneuvers cause temporary voltage drops. If the flight
controller hits a low-voltage threshold, it triggers return-to-home or emergency
landing.

**Exploitation:** Forcing a drone to maneuver aggressively (decoys, dazzlers,
defensive movement of protected assets) accelerates battery depletion and can
trigger voltage-sag failsafes.

### Cold Temperature Degradation

**Mechanism:** LiPo internal resistance increases below 0 degrees C; capacity
and voltage sag worsen significantly.

**Exploitation:** In cold-weather operations, any delay imposed by counter-UAS
measures (forcing loiter, maneuver, or diversion) consumes margins faster.

### Supply Chain Intelligence

**Mechanism:** Consolidation around specific battery formats (6S 1300mAh in
military FPV) enables confident threat modeling of endurance, range, and payload
capacity. Identifying supply chains can inform threat assessment and interdiction
planning.

---

## 5. Detection Implications by Battery Type

| Detection Method | LiPo              | Li-ion            | H2 Fuel Cell       | Solid-State (Future) |
| ---------------- | ------------------ | ----------------- | ------------------- | -------------------- |
| Thermal/IR       | Distinct heat sig  | Moderate heat sig | Different profile (exhaust vapor, fans) | Reduced thermal cross-section |
| Endurance est.   | 20-45 min          | 40-60+ min        | 2-4+ hours          | 40-90 min (est.)     |
| RF signature     | BMS noise, smart battery comms | Similar to LiPo | Additional electronics (fuel regulation) | Likely minimal BMS noise |
| Acoustic         | Motor-dominated    | Motor-dominated   | Added fan/valve noise | Motor-dominated      |
| DE vulnerability | High (thermal runaway) | Moderate      | Low (no thermal runaway risk) | Very low             |

---

## 6. Recommendations for NexaMesh System

1. **Detection algorithms** should incorporate power-source classification as a
   feature in the threat identification pipeline. Thermal signature differences
   between battery types provide additional classification data.

2. **Endurance estimation** should be a core output of the threat assessment
   engine. Once a drone type is identified, battery type can be inferred,
   enabling prediction of remaining flight time, loiter capability, and return
   window.

3. **Response planning** must account for hydrogen-powered threats that cannot be
   waited out. The threat simulator should model variable-endurance scenarios.

4. **Directed-energy effectiveness models** should factor in battery chemistry.
   As solid-state batteries enter the drone market, thermal-runaway-dependent
   defeat mechanisms will lose effectiveness.

5. **Threat simulator scenarios** should include:
   - Standard LiPo FPV attack (8-15 min, 5-10 km)
   - Extended-range Li-ion strike (30+ min, 15-30 km)
   - Hydrogen fuel cell persistent surveillance (2+ hours, 50+ km)
   - Future solid-state swarm (doubled endurance, reduced DE vulnerability)

---

## Sources

- Battery University (batteryuniversity.com)
- RUSI reports on drone warfare in Ukraine
- Amprius Technologies (amprius.com) -- silicon anode cells for defense
- Doosan Mobility Innovation -- hydrogen fuel cell drone systems
- Intelligent Energy -- fuel cell power modules for UAVs
- Epirus, Raytheon -- HPM/directed energy counter-UAS systems
- QuantumScape, Samsung SDI -- solid-state battery roadmaps
- Open-source conflict reporting (Defense One, The War Zone, Janes)
- DARPA Li-S battery research program documentation
