# Fundability Roadmap — Nexamesh

**Last updated**: 2026-03-25
**Status**: Pre-seed. Software platform complete. Hardware prototype R&D underway.
**Brand**: Nexamesh (formerly NexaMesh — rebranded for fresh startup program applications)

---

## Where We Are Today

| Dimension | Reality |
|-----------|---------|
| Stage | Pre-seed / TRL 1–2 |
| Team | 2 active (Jurie Smit — CTO; Charl Chapman — Hardware Lead) + 2 advisors |
| Revenue | R0 — no product, no customers |
| Hardware | Toy quadcopter + salvaged hoverboard motors + R478 Temu order pending |
| Software | Complete: Rust API, blockchain anchoring (Solana + EtherLink), edge AI detector (YOLOv8), threat simulator (Leptos/WASM + Tauri), full docs portal. 440+ commits. |
| Incorporation | Not yet. Registration on csd.gov.za needed as first gate for SA government funding. |
| External funding | None received. Azure credits lost due to org mixup (phoenixvc vs phoenixrooivalk). |

**Fundability score: 5/10** — fundable at pre-seed with honest positioning. Not fundable as Series A (current docs gap is being closed).

---

## The Honest Pitch

> "We are two South African engineers building an affordable, AI-powered airspace awareness platform for African critical infrastructure — wildlife reserves, mines, power utilities, and event venues. Our detection engine runs on R1,500 hardware and produces blockchain-verified evidence for legal proceedings, making counter-drone protection accessible to organisations that can't afford R15M Israeli systems. The counter-UAS market is $6.64B and growing at 25% annually. SANDF has no current C-UAS system — Denel can't deliver. We fill that vacuum."

**Key differentiators (software already exists):**
- Only blockchain-enabled C-UAS concept globally
- Non-ITAR South African jurisdiction — can sell where US companies can't
- Edge AI: runs offline on R1,500 Jetson Nano / Raspberry Pi hardware
- Blockchain evidence anchoring for legal chain of custody (unique in the market)

---

## Milestones to Unlock Each Funding Tier

```
TODAY (Mar 2026)
├── Software platform complete ✅
├── R478 hardware order (Temu) — pending purchase
├── Register csd.gov.za — GATE: unlocks SA government funding
├── Apply NVIDIA Inception (Charl, Nexamesh brand) — instant
├── Apply MS Founders Hub (Charl, Nexamesh brand) — instant
└── Apply AWS Activate (Charl, Nexamesh brand) — instant

Q2 2026 (3 months)
├── Basic hardware prototype: toy quad + hoverboard motors + F405 FC
├── Field test: detector identifying toy quad on Jetson
├── TIA Seed Fund application — needs: CSD registration + prototype evidence
└── Apply Google for Startups Africa

Q3–Q4 2026 (6–9 months)
├── Working detection + tracking demo (video evidence)
├── Approach CSIR DPSS for co-development discussion
├── TIA Technology Development Fund (step up from Seed Fund)
└── Grindstone / Knife Capital — annual intake, apply Q1 2027

2027 (12–18 months)
├── Net capture prototype (if legal path clear)
├── ARMSCOR supplier registration — SANDF vacuum is real
├── IDC application — requires working prototype
└── UK DASA — SA companies eligible, monitor for next competition cycle
```

---

## Funding Roadmap by Phase

### Phase 0 — Immediate: Free Cloud Credits (This Week)

**Goal**: Recover computing resources. Zero cost, zero equity, instant application.

| Program | Owner | Amount | Notes |
|---------|-------|--------|-------|
| NVIDIA Inception | Charl (Nexamesh) | GPU discounts + DGX credits | Detector uses Jetson — automatic fit. Fresh brand, instant approval. |
| Microsoft Founders Hub | Charl (Nexamesh) | Up to $150K Azure credits | Jurie burned on phoenixvc. Charl = fresh applicant. New brand required. |
| AWS Activate (Founders) | Charl (Nexamesh) | $1K–$25K | Free, instant. Apply first. |
| Google for Startups Africa | Jurie or Charl | $200K cloud credits | AI-first cohort. Higher bar — needs pitch. Apply after cloud credits done. |

**Charl application prerequisites:**
1. LinkedIn profile: name, "Hardware Lead at Nexamesh", vehicle repair + drone prototyping background
2. Personal email not tied to any previous startup program account
3. Brief coaching on application flow (see `startup-program-tracker.md`)

---

### Phase 1 — Short-Term: SA Government Non-Dilutive (1–3 months)

**Goal**: R500K–R2M non-dilutive funding to build hardware prototype.

| Program | Amount | Dilution | Requirements |
|---------|--------|----------|--------------|
| **TIA Seed Fund** | R500K–R2M | None (royalty model) | CSD registration, SA incorporated, working concept |
| **CSIR DPSS partnership** | R1M–R10M co-dev | None | Intro meeting, shared IP negotiation |

**TIA Seed Fund** is the single most important near-term target:
- Non-dilutive — TIA takes a royalty, not equity
- Rolling applications via tia.org.za — no hard deadline
- Strongest fit in SA for defense/security tech at this stage
- CSD registration is the hard prerequisite — do this first

**CSIR DPSS** (Defence, Peace, Safety and Security):
- Their radar and EW competency overlaps directly with the detector
- A co-development arrangement preserves IP while accessing lab resources
- Contact: CSIR DPSS Business Development division
- This is a relationship play, not an application — requires an intro meeting

---

### Phase 2 — Accelerators (1–3 months, parallel track)

| Program | Amount | Notes |
|---------|--------|-------|
| **Soonami accelerator** | ~$125K | Pitch structure already in `playbooks/soonami-pitch-structure.mdx`. Apply now. |
| **Grindstone (Knife Capital)** | R500K–R2M + mentorship | Aerobotics (drone + AI agriculture) is an alumni. Annual intake — Q1 applications. |

---

### Phase 3 — Medium-Term: Institutional (3–6 months)

**Goal**: Larger grants and government contracts once prototype exists.

| Program | Amount | Notes |
|---------|--------|-------|
| **ARMSCOR LEDGER** | TBD | SANDF has no C-UAS. Denel can't deliver. Real vacuum to fill. Requires supplier registration first. |
| **IDC Defense/Security Cluster** | R5M–R50M | Loan + equity. Requires working prototype. |
| **UK DASA** | £50K–£1M | SA companies CAN apply. Competition-based. Monitor gov.uk/dasa for next cycle. |
| **TIA Technology Development Fund** | R2M–R10M | Step up from Seed Fund. Requires prototype evidence. |

---

## Legal Guardrails (SA Market Entry)

| Capability | Legal status in SA | Recommendation |
|-----------|-------------------|----------------|
| Detection only | **Fully legal** | Enter here. No risk. |
| Electronic jamming | **Illegal** (ICASA) | Do not offer, do not mention in SA pitches |
| Physical net capture | Grey area | Proceed carefully, get legal opinion before product launch |
| Export to SADC/Africa | ITAR-free from SA | Key differentiator over US competitors |

**Market positioning**: Enter as "airspace awareness and evidence platform." Not "counter-drone weapon." This is both legally safer and commercially broader.

---

## What Investors Need to See (in order of importance)

1. **Working detection demo** — Jetson + YOLOv8 identifying toy quad on video (already possible with current software)
2. **Honest team slide** — 2 founders + 2 advisors. Charl's hands-on background is an asset, not a liability.
3. **Market narrative** — SANDF vacuum, Denel failure, 25% CAGR. Real and provable.
4. **Blockchain differentiation** — unique globally. Show the evidence anchoring UI.
5. **SA jurisdiction advantage** — ITAR-free. Explicit.
6. **Funding ask** — R500K–R2M for hardware prototype + ARMSCOR registration. Specific, credible.

---

## Key Contacts to Develop

| Organisation | Contact approach | Why |
|-------------|-----------------|-----|
| TIA | tia.org.za online application | Seed Fund — non-dilutive, rolling |
| CSIR DPSS | Business development email | Co-development, lab access |
| ARMSCOR | LEDGER programme office | SANDF procurement gate |
| Knife Capital / Grindstone | Apply Q1 2027 | Aerobotics alumni — warm signal |
| Soonami | Direct application | Pitch already structured |

---

*See also: `sa-funding-guide.md` (deep-dive on each SA program) and `startup-program-tracker.md` (live application status)*
