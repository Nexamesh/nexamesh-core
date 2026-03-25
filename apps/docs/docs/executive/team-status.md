---
id: team-status
title: Team Status
sidebar_label: Team Status
difficulty: intermediate
estimated_reading_time: 4
points: 15
tags:
  - executive
  - counter-uas
---

## Who Is Working on This

**Nexamesh** is a two-person active team with three advisors engaged as needed.

---

## Active Team (Daily Contributors)

### Jurie Smit — Co-Founder & CTO

- **Day job**: Senior Developer at Sygnia Asset Management
- **Role on project**: Everything software — Rust API, blockchain evidence anchoring, edge AI detector, threat simulator desktop app, documentation portal, architecture, CI/CD
- **Education**: B.Eng Industrial-Electronic (Stellenbosch), B.Com Quantitative Management (UNISA)
- **GitHub**: [JustAGhosT](https://github.com/JustAGhosT)
- **Contact**: jurie@nexamesh.ai

### Charl Chapman — Co-Founder & Hardware Lead

- **Background**: Vehicle systems, mechanical and electrical repair, hands-on component work
- **Role on project**: Physical hardware prototyping — stripping salvaged components, assembling drone hardware, building and testing flight systems from budget components
- **Current focus**: Path C hardware build (F405 FC + GPS + brushed motors on toy quadcopter frame)
- **LinkedIn**: Pending setup
- **Contact**: charl@nexamesh.ai

---

## Advisors (Not Day-to-Day)

| Name | Area | Engagement |
|------|------|------------|
| **Martyn Redelinghuys** | Business strategy, manufacturing | Has factory. Will engage actively when funded. MBA (GIBS), B.Eng Electrical (Stellenbosch), 20+ years energy/defense/mining. |
| **Eben Maré** | Financial strategy | Available for financial modeling and investor discussions. BSc Applied Maths (UP), BSc Hons Operations Research (UNISA), 15+ years investment banking/PE/quant finance. |
| **Pieter La Grange** | Embedded systems, industry connections | Advisory capacity. 15+ years embedded systems (Snuza). B.Eng Electrical & Electronics (Stellenbosch). |

---

## What Has Been Built (Software — Real and Working)

| Component | Status |
|-----------|--------|
| Rust/Axum REST API | ✅ Complete — evidence, countermeasures, auth, x402 payment protocol |
| Blockchain evidence anchoring | ✅ Complete — Solana + EtherLink dual-chain |
| Edge AI drone detector | ✅ Complete — YOLOv8 on Jetson Nano / Raspberry Pi |
| Threat simulator desktop | ✅ Complete — Leptos/WASM + Tauri 2 |
| Documentation portal | ✅ Complete — Docusaurus 3 + Azure Functions + Cosmos DB |
| Evidence CLI | ✅ Complete — SHA-256 hash + API submit |
| Monorepo CI/CD | ✅ Complete — GitHub Actions, Azure Static Web Apps |

**440+ commits. ~9 months of development. All software is real, functional, and in this repository.**

---

## What Has NOT Been Built (Hardware — R&D Phase)

| Component | Status |
|-----------|--------|
| Physical interceptor drone | ⬜ R&D — toy quadcopter as test platform |
| Net capture system | ⬜ Concept only |
| Pneumatic launcher | ⬜ Concept only |
| Field-tested detection node | ⬜ Detector runs on laptop; field deployment not yet done |
| Manufacturing-ready prototype | ⬜ Pre-prototype |

**Current hardware: toy quadcopter + salvaged hoverboard motors + R478 Temu order (F405 FC, GPS, absorber balls). Charl is the person building this.**

---

## TRL Assessment (Honest)

| Dimension | Level |
|-----------|-------|
| Software platform | TRL 4–5 — validated in lab/dev environment |
| Hardware integration | TRL 1–2 — concept with components on order |
| Field detection demo | TRL 2 — algorithm validated, not field-deployed |
| Net capture / interdiction | TRL 1 — concept only |

---

## Company Status

- **Incorporation**: Not yet registered. SA Pty Ltd registration pending (required for TIA Seed Fund).
- **CSD Registration**: Not done. Required gate for all SA government funding.
- **Brand**: Nexamesh. GitHub: `Nexamesh/nexamesh-core`. Old name: Phoenix Rooivalk.
- **Domain**: nexamesh.ai (registered)

---

## What's Next

1. CSD registration (csd.gov.za) — unlocks TIA, ARMSCOR, IDC
2. Charl's LinkedIn profile — unlocks MS Founders Hub application
3. NVIDIA Inception + AWS Activate — immediate free cloud/hardware resources
4. MS Founders Hub (Charl applies under Nexamesh) — up to $150K Azure credits
5. Detection demo video — laptop + detector + blockchain evidence log
6. TIA Seed Fund application — R500K–R2M, non-dilutive, rolling
