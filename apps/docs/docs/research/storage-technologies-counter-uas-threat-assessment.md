# Storage Technologies: Counter-UAS Threat Assessment

## Overview

Onboard storage determines what a drone can do autonomously and what
intelligence can be recovered after intercept. This document assesses drone
storage technologies from the counter-UAS defender's perspective: forensic
recovery, evidence preservation, and how storage enables increasingly autonomous
threats.

This complements the existing system storage architecture
(`storage-options.ts`, `adr-0052-data-retention-policies.md`) with a
threat-focused lens.

---

## 1. Drone Onboard Storage Types

### microSD Cards

| Parameter          | Value                          |
| ------------------ | ------------------------------ |
| Capacity           | Up to 1.5 TB (2-4 TB roadmap) |
| Write speed        | 30-300 MB/s (UHS-I to V90)    |
| Operating temp     | -25 to 85 degrees C           |
| Endurance          | 1,000-10,000 P/E cycles (TLC/QLC) |

**Role:** Video/photo storage, flight log caching. Dominant in consumer drones
(DJI Mavic, Autel EVO, Skydio).

**Forensic value:** High. Hot-swappable means it may survive separately from
airframe. Data recovery rates exceed 80% when card is physically intact, even
after high-velocity impacts.

**Vulnerability:** Vibration-induced contact loss causes write failures and
filesystem corruption — a well-documented failure mode in FPV drones.

### eMMC (Soldered Flash)

| Parameter          | Value                          |
| ------------------ | ------------------------------ |
| Capacity           | 4-64 GB typical                |
| Write speed        | Up to 400 MB/s (eMMC 5.1)     |
| Form factor        | Soldered to PCB                |

**Role:** Firmware, flight logs, telemetry, mission parameters. Found in DJI
flight controllers, military platforms, many FPV FCs.

**Forensic value:** Critical. Contains flight logs, firmware version (supply
chain origin), and potentially waypoint/mission files. Extraction requires
chip-off or JTAG/ISP access.

**Advantage:** Better vibration resistance than socketed microSD.

### NVMe SSD (M.2 2230/2242)

| Parameter          | Value                          |
| ------------------ | ------------------------------ |
| Capacity           | Up to 2 TB (4 TB emerging)    |
| Read/write speed   | 3,000-7,000 MB/s              |
| Power draw         | 1-5W                          |

**Role:** High-bandwidth data capture — multi-sensor fusion, LiDAR point clouds,
real-time AI inference. Emerging in military ISR and high-end commercial
platforms.

**Forensic value:** Very high. Large capacity means more intelligence: flight
history, sensor data, mission planning.

### Internal Flash / NAND (Flight Controller)

| Parameter          | Value                          |
| ------------------ | ------------------------------ |
| Capacity           | 2-32 MB typical                |

**Role:** Bootloader, firmware, blackbox flight data. ArduPilot and Betaflight
FCs use this for flight data recording.

**Forensic value:** Moderate but critical for flight path reconstruction.

---

## 2. Storage Performance Requirements by Drone Mission

| Mission Type         | Data Rate       | 30-min Storage | Storage Class     |
| -------------------- | --------------- | -------------- | ----------------- |
| 4K 60fps H.265       | 12-18 MB/s      | ~34 GB         | V30 microSD       |
| 4K 120fps / 8K 30fps | 25-50 MB/s      | ~90 GB         | V60/V90 microSD   |
| ProRes/RAW cinema    | 125-375 MB/s    | ~675 GB        | NVMe or CFexpress |
| LiDAR point cloud    | 8-40 MB/s       | 15-70 GB       | V60+ or NVMe      |
| Multispectral imaging| 10-50 MB/s      | 20-80 GB       | V30+ microSD      |
| Hyperspectral        | 100-500 MB/s    | ~900 GB        | NVMe              |
| AI inference logging | <1 MB/s         | <1 GB          | Any               |
| Multi-sensor fusion  | 500+ MB/s       | ~900 GB        | NVMe RAID         |

**Counter-UAS implication:** The mission type can be inferred from the storage
hardware. A drone carrying NVMe is likely running a more sophisticated payload
than one with a basic microSD.

---

## 3. Drone Forensics and Evidence Recovery

### Recoverable Data from Captured Drones

| Data Type            | Location               | Intelligence Value     |
| -------------------- | ---------------------- | ---------------------- |
| Flight logs (GPS, alt, speed) | eMMC, internal flash | Full path reconstruction |
| Video/photo + EXIF   | microSD, NVMe          | Target identification, operator location |
| Waypoint/mission files| eMMC, microSD         | Planned targets, operational patterns |
| WiFi/network logs    | eMMC                   | Operator network identification |
| Firmware             | eMMC, internal flash   | Supply chain origin, modifications |
| AI model weights     | eMMC, NVMe             | Capability assessment |
| Inference results    | microSD, NVMe          | What the drone detected/classified |

### DJI-Specific Forensics

DJI drones store encrypted flight logs (DAT files) decodable with DatCon or
CsvView. These contain GPS tracks, battery telemetry, gimbal position, RC input,
and error logs — providing a complete reconstruction of the flight.

### Flash Memory Crash Survivability

Flash memory (no moving parts) is inherently shock-resistant. The main threats to
data integrity after intercept:

1. **Power loss during write** — filesystem corruption, partial files
2. **Physical fracture of NAND die** — only from extreme impact
3. **Post-crash LiPo fire** — can exceed 500 degrees C, destroying NAND cells
4. **Water ingress** — corrosion of electrical connections (NAND cells survive
   if dried before power application)

Crash-recovered microSD cards show data recovery rates **exceeding 80%** when
physically intact.

### Forensic Extraction Methods

| Method              | Speed  | Capability              | When Used            |
| ------------------- | ------ | ----------------------- | -------------------- |
| Logical extraction  | Fast   | Accessible files only    | Intact storage       |
| Physical imaging    | Medium | Full medium incl. deleted| Intact controller    |
| JTAG/ISP access     | Medium | eMMC without desoldering | Damaged airframe     |
| Chip-off            | Slow   | Raw NAND recovery        | Damaged controller   |

### Chain of Custody (Relevant to Phoenix Rooivalk)

Digital evidence requires:
- Write-blocking during acquisition
- SHA-256 hashing at point of collection
- Blockchain-based tamper-evident timestamps
- Documented, unbroken chain of custody
- WORM or append-only storage for evidence repositories

This directly maps to the project's `evidence` crate (SHA-256 hashing), keeper
service (blockchain anchoring), and API evidence endpoints.

---

## 4. Anti-Forensics and Data Destruction

### Military Drone Self-Destruct Methods

| Method               | Speed      | Reliability | Trigger                    |
| -------------------- | ---------- | ----------- | -------------------------- |
| Cryptographic erase  | Instant    | Very high   | Remote command, tamper     |
| Zeroization          | 30-60s     | High        | Standards-compliant wipe   |
| Physical (thermite)  | Instant    | Very high   | Tamper switch, remote cmd  |
| Accelerometer-triggered| Instant  | Medium      | Crash g-force detection    |
| Loss-of-link timer   | Configurable| High       | Comm loss timeout          |

**Cryptographic erase** is the most practical: all storage encrypted with
AES-256, key stored in secure enclave/eFuse. Destroying the key makes data
unrecoverable without brute-forcing AES-256.

### Counter-Forensics Tactics for Defenders

To preserve evidence from captured drones:

1. **Faraday containment** immediately after capture — prevents remote wipe
   commands
2. **Maintain power** — prevents power-loss-triggered destruction
3. **Rapid cold imaging** — copy storage before timed destruction activates
4. **RF jamming during capture approach** — block remote destruct signals (but
   be careful not to trigger loss-of-link destruction timers)
5. **EMP/HPM weapons may help** — can disable the destruction mechanism
   alongside other electronics, potentially preserving data

---

## 5. Edge Computing Storage for Onboard AI

### Model Storage Requirements

| Model Type           | Size (INT8 quantized) | Platform              |
| -------------------- | --------------------- | --------------------- |
| MobileNet-SSD        | ~5 MB                 | Coral Edge TPU        |
| YOLOv8n              | ~6 MB                 | Jetson Nano           |
| YOLOv8s              | ~22 MB                | Jetson Orin Nano      |
| YOLOv8x              | ~130 MB               | Jetson Orin NX        |
| Foundation models    | 500 MB-4 GB           | Jetson AGX Orin       |

### Event-Triggered Recording Pattern

AI detects object of interest, then saves preceding N seconds from a circular
RAM buffer to persistent storage. Requires fast random write performance.
This is the pattern used in the Phoenix Rooivalk detector app.

### Counter-UAS Implication

Larger onboard AI models make drones more capable of:
- Evading counter-UAS systems through adaptive behavior
- Operating without continuous RF links (reducing RF detectability)
- Autonomous target selection and engagement

Storage capacity growth directly enables this autonomy.

---

## 6. Storage in Counter-UAS Ground Systems

### Data Generation Rates

| Sensor Type          | Data Rate       | Per-Event Volume    |
| -------------------- | --------------- | ------------------- |
| RF direction-finding | 50-200 MB/s/ch  | 1-10 GB             |
| Radar (range-Doppler)| 10-50 MB/s      | 500 MB-5 GB         |
| Optical/IR tracking  | 12-50 MB/s      | 2-10 GB             |
| Acoustic array       | 5-20 MB/s       | 200 MB-2 GB         |
| **Combined per event** | —             | **1-10 GB**         |

### Architecture (Aligns with Project Tiers)

| Tier       | Hot Storage    | Warm Storage     | Cold Storage           |
| ---------- | -------------- | ---------------- | ---------------------- |
| Nano       | 32 GB microSD  | —                | Cloud upload on event  |
| Standard   | 64 GB microSD  | —                | 3-7 day rolling        |
| Pro        | 128 GB NVMe    | NAS              | 30-day local           |
| Enterprise | 1 TB NVMe/node | RAID array       | 1-year archive (S3/Blob) |

This aligns with the existing `storage-options.ts` tier definitions and
`adr-0052` retention policies (Tier 1 permanent for blockchain-anchored
evidence, Tier 4 30-90 days for raw telemetry).

---

## 7. Environmental Factors

### Impact on Drone Storage

| Factor       | Effect                                      | Severity |
| ------------ | ------------------------------------------- | -------- |
| Vibration    | microSD contact loss, write corruption       | High     |
| Cold (<0 C)  | Reduced write performance, increased errors  | Medium   |
| Heat (>85 C) | Accelerated NAND wear, data corruption       | Medium   |
| Crash shock  | PCB/BGA fracture (>100g), card ejection      | High     |
| LiPo fire    | NAND destruction above 500 degrees C         | Critical |
| Water        | Controller corrosion; NAND cells survive dry | Medium   |
| EMP/HPM      | Controller damage, potential data preservation| Variable |

### Impact on Ground System Storage

MIL-STD-810G rated ruggedized SSDs are standard for mobile counter-UAS
deployments. Key specs: operating vibration 20g, shock 40g (11ms half-sine),
operating temp -40 to 85 degrees C.

---

## 8. Threat Evolution: Storage Enabling Autonomy

As onboard storage grows (1 TB+ microSD, 4 TB NVMe), drones gain:

1. **Multi-hour recording** without data offload
2. **Larger AI models** deployed at the edge (foundation models, multi-task
   networks), reducing reliance on ground station connectivity
3. **Pre-loaded terrain/3D maps** for GPS-denied navigation (5-50 GB per
   city-block-scale model)
4. **Swarm data redundancy** — mission-critical data distributed across swarm
   members
5. **Full onboard processing pipelines** (detect, classify, track, decide)
   without streaming raw data to ground

**Counter-UAS implication:** RF-detection-based systems become less effective
as drones operate without continuous RF links. Alternative detection modalities
(radar, acoustic, optical/IR) become more critical.

---

## 9. Recommendations for Phoenix Rooivalk System

1. **Evidence pipeline** should assume diverse storage sources: microSD images,
   eMMC chip-off dumps, flight log binaries (DJI DAT, ArduPilot BIN, PX4 ULG).
   The evidence CLI could support hashing of forensic disk images.

2. **Threat simulator** should model storage-dependent scenarios:
   - Consumer drone with microSD (full forensic recovery likely)
   - Military drone with cryptographic erase (evidence race condition)
   - AI-autonomous drone with no RF link (storage-dependent operation)

3. **Detection algorithms** should factor in storage-correlated behaviors:
   drones with NVMe-class storage are likely running onboard AI and may operate
   more autonomously.

4. **Ground station storage architecture** already aligns well with the tiered
   model in `storage-options.ts`. Ensure hot-tier NVMe has write-endurance
   ratings suitable for continuous multi-sensor recording (look for DWPD > 1).

5. **Forensic workflow integration**: the evidence crate's SHA-256 hashing
   should be the first step applied to any recovered drone storage, before any
   analysis tool touches the data. This preserves chain-of-custody integrity
   for the blockchain anchor.

---

## Sources

- DJI flight log forensics: DatCon, CsvView, Drone Forensics Research Workshop
  papers
- Flash memory survivability: NIST SP 800-88 (media sanitization), academic
  crash-recovery studies
- Military anti-forensics: NSA/CSS EPL for storage destruction, FIPS 140-3
  cryptographic module standards
- Storage specifications: SD Association (SD Express/SDUC), JEDEC (eMMC 5.1),
  NVMe specification
- Edge AI platforms: NVIDIA Jetson product documentation, Google Coral
  datasheets
- Counter-UAS ground systems: various defense contractor white papers (Leonardo,
  Rafael, Dedrone)
