# Session Handover: Fundability & Rebrand Reality-Alignment

**Date**: 2026-03-25
**Branch**: `claude/cr2032-rechargeable-research-3mWaD`
**PR**: #776 (open, targeting `dev`)

---

## What This Session Is About

Full fundability assessment of Phoenix Rooivalk followed by a planned major
documentation reality-alignment. The project has an impressive software
platform but the business docs describe a Series A company when the reality is
pre-seed. This work closes that gap honestly, rebrands for fresh startup program
applications, and creates a concrete funding roadmap.

---

## Key Decisions Made (User-Confirmed)

### 1. Rebrand for Fresh Applications

The Phoenix Rooivalk name is burned on Microsoft Founders Hub — Azure credits
went to the `phoenixvc` org instead of `phoenixrooivalk` due to a mixup and
were lost. A new brand name is needed for fresh MS Founders Hub, NVIDIA
Inception, and other startup program applications.

**Naming candidates scored by user:**

| Name | Score | Notes |
|------|-------|-------|
| **Altivigil** | 8.8 | "Alti" (altitude) + "vigil" (watchfulness). Broad, serious. Slight spelling risk. **User's highest score.** |
| **TalonGrid** | 8.3 | Strong systems/platform feel. Easy to spell and communicate. **Claude's recommendation.** |
| Phoenix Altivigil | 8.1 | Bridge name, but longer |
| VeldAegis | 7.8 | SA identity ("veld" + "aegis"). Distinctive but niche. |
| AetherWatch | 7.6 | Premium and clear, softer feel |
| KestrelShield | 7.2 | Understandable but generic |

**Also considered:**
- Valkyr Systems — Norse/military, short
- Nexamesh — tainted (associated with the phoenixvc mixup, already in README)
- Sentrix Defence — SA spelling, enterprise feel
- Skygrid Technologies — clean startup feel

**Decision: NOT YET FINALIZED.** Pick the name, register the domain, THEN do
the doc rewrites. SkySnare (consumer) and AeroNet (enterprise) sub-brands
remain unchanged under the new parent.

---

### 2. Team Restructure (Confirmed by User)

**Active team — daily contributors:**

| Role | Person | Background |
|------|--------|------------|
| **CTO / Technical Lead** | Jurie Smit | 15yr systems engineer. B.Eng Industrial-Electronic (Stellenbosch), B.Com Quantitative Management (UNISA). Currently Senior Dev at Sygnia. Builds the entire software platform, AI, architecture, and business planning. |
| **Hardware Lead** | Charl Chapman | Vehicle repairs background. No LinkedIn. No formal CV. Actually building the physical drone from salvaged and budget components — strips hoverboard controllers, orders Temu parts. NOT currently listed anywhere in docs. |

**Advisors — not active day-to-day:**

| Role | Person | Background | Why advisor |
|------|--------|------------|-------------|
| **Business Advisor** | Martyn Redelinghuys | MBA (GIBS), B.Eng Electrical (Stellenbosch). 20yr energy/mining/defense. Sasol exec PM, R500M+ portfolio. | Has the factory. Will engage when funded. |
| **Finance Advisor** | Eben Maré | BSc Applied Maths (UP), BSc Hons Operations Research (UNISA). 15yr investment banking/PE, quant finance, former Head Quant at Deloitte. | Financial modeling when needed. |

**Dropped entirely:**
- **Pieter La Grange** — Previously listed as "Co-Founder & Hardware Lead."
  User's assessment: "doesn't do shit really." Remove from all docs under the
  new brand. No advisor status.

**Chanelle Fellinger** — Listed in docs portal internal-users.ts as
Marketing/Sales. Status not discussed this session. Probably stays in portal
profiles but not in the founding team.

---

### 3. Documentation Approach: Full Transparency

User chose **full transparency**:
- Rewrite to accurately reflect pre-seed / TRL 1-2 status
- Mark aspirational content clearly as targets, not current state
- Remove fictional traction (Kickstarter numbers, FAA consultation, airport
  discussions — none confirmed)
- Be honest about what's built (software ✅) vs what's concept (hardware ⬜)

---

### 4. MS Founders Hub Applicant

**Charl Chapman** applies under the new brand name. Reasoning:
- Jurie is burned — already registered on Founders Hub under Rooivalk
- Martyn is not responsive enough to complete applications
- Pieter is dropped
- Charl is a completely fresh face with no prior startup program history

**What Charl needs before applying:**
1. LinkedIn profile — basic: name, title "Hardware Lead at [NewBrand]",
   vehicle repair + drone prototyping background framed as hands-on mechanical
   and electrical engineering
2. Personal email not tied to any previous startup program
3. Brief coaching on how to complete the application

---

## Fundability Assessment

### Reality vs Documentation Gap

| Dimension | Docs claim | Reality |
|-----------|-----------|---------|
| Prototype | "60% pneumatic launcher, 40% net deployment" | R478 Temu order. Toy quadcopter + salvaged hoverboard motors. |
| Team | 4 co-founders, 60+ years experience | 2 active people. 2 advisors. 1 dropped. |
| Revenue | "$2.15M Year 1" | Zero. No product exists. |
| Funding | Seeking $1.5M seed | Personal budget R500 for components |
| Kickstarter | "$375K pledged, 1,100 backers" | Projection, not reality |
| Corporate | "Delaware C-Corp (in progress)" | Not incorporated |
| TRL | "TRL 3-5" | Honestly TRL 1-2 |
| Traction | FAA consultation, airport MOUs, Kickstarter | None confirmed |

### What IS Real and Strong

- **Software platform**: Rust/Axum API, blockchain evidence anchoring
  (Solana + EtherLink), edge AI detector (YOLOv8 on Jetson/Pi), threat
  simulator (Leptos/WASM + Tauri desktop), full Docusaurus documentation
  portal. 440+ commits. Genuinely impressive for a two-person project.
- **Market**: Counter-UAS $6.64B (2025) → $20.31B (2030) at 25.1% CAGR.
  Real demand — Ukraine, Gatwick, Brussels, Pentagon Replicator ($500M).
- **Differentiation**: Only blockchain-enabled C-UAS concept. Non-ITAR SA
  jurisdiction (can sell where US companies can't). Edge AI offline capable.
  No competitor has blockchain evidence anchoring.
- **Advisor backgrounds**: Stellenbosch engineers, GIBS MBA, Deloitte quant.
  Strong for pitching even if not day-to-day active.

### Fundability Score: 5/10

Fundable at pre-seed/seed level **with honest positioning**. Not fundable as
currently documented — the gap between Series A claims and pre-seed reality
kills trust the moment any investor does light due diligence.

### The Honest Pitch Narrative

> "We are two South African engineers building an affordable, AI-powered
> airspace awareness platform for African critical infrastructure — wildlife
> reserves, mines, power utilities, and event venues. Our detection engine
> runs on R1,500 hardware and produces blockchain-verified evidence for legal
> proceedings, making counter-drone protection accessible to organizations that
> can't afford R15M Israeli systems. The counter-UAS market is $6.64B and
> growing at 25% annually. SANDF has no current C-UAS system — Denel can't
> deliver. We fill that vacuum."

---

## Funding Priority List

### Immediate — Free, This Week

| Action | Owner | Notes |
|--------|-------|-------|
| Register on csd.gov.za (Central Supplier Database) | Jurie | Required gate for all SA government funding |
| Apply NVIDIA Inception | Charl (new brand) | Detector uses Jetson. Instant approval. Discounts + DGX credits. |
| Apply Microsoft Founders Hub | Charl (new brand) | Fresh face, new brand. Up to $150K Azure credits. |
| Apply AWS Activate (Founders tier) | Charl (new brand) | Free, instant. $1K-$25K credits. |
| Apply Google for Startups Africa | Jurie or Charl | AI-first. $200K cloud credits. Cohort-based. |

### Short-Term — 1-3 Months

| Program | Amount | Notes |
|---------|--------|-------|
| **TIA Seed Fund** | R500K–R2M | Strongest SA government fit. Rolling applications via tia.org.za. Non-dilutive, no equity — royalty agreement instead. |
| **CSIR DPSS partnership** | R1M–R10M co-dev | Their radar/EW competency overlaps directly with the detector. Contact DPSS business development. |
| **Soonami accelerator** | ~$125K | Already have the pitch structure documented in playbooks/. Apply. |
| **Grindstone (Knife Capital)** | R500K–R2M + mentorship | Aerobotics (drone + AI for agriculture) is an alumni company. Annual intake, Q1 applications. |

### Medium-Term — 3-6 Months

| Program | Amount | Notes |
|---------|--------|-------|
| **ARMSCOR supplier registration** | — | SANDF has no C-UAS. Denel can't deliver. You fill a vacuum. Contact ARMSCOR Technology Development / LEDGER program. |
| **IDC (Industrial Development Corp)** | R5M–R50M | Defense/security cluster. Requires working prototype. Loan + equity. |
| **UK DASA** | £50K–£1M | SA companies CAN apply. Competition-based. Monitor gov.uk/dasa. |
| **Canada CUAS Sandbox** | $1.75M CAD | Prize pool. Dec 15 2025 deadline passed — watch for next cycle. |
| **TIA Technology Development Fund** | R2M–R10M | Step up from Seed Fund once prototype exists. |

### Legal Note on SA Market Entry

- Signal jamming: **illegal** in SA (ICASA). Do not offer jamming.
- Physical interdiction (net capture): legal grey area — proceed carefully.
- **Detection-only is unambiguously legal** and the safest commercial entry.
- Enter as "airspace awareness and evidence platform," not "counter-drone weapon."

---

## Files That Need To Be Created

| File | Purpose |
|------|---------|
| `apps/docs/docs/research/fundability-roadmap.md` | Master funding plan — timeline, who applies where, milestones, narrative |
| `apps/docs/docs/business/opportunities/sa-funding-guide.md` | Deep-dive on TIA, IDC, ARMSCOR, CSIR DPSS, SEDA, NEF — requirements, amounts, timelines |
| `apps/docs/docs/business/applications/startup-program-tracker.md` | Live tracker: program, deadline, owner, status, amount, outcome |

---

## Files That Need Reality-Alignment

### Data Files (highest impact — used everywhere via MDX imports)

| File | Changes needed |
|------|---------------|
| `apps/docs/src/data/values.ts` | TEAM: restructure to 2 active + 2 advisors, add Charl, remove Pieter. PHASES: shift timelines 12+ months. FUNDING/CAPITAL: mark projections as targets. SKYSNARE: remove return rate / units sold (no product). |
| `apps/docs/src/data/team.ts` | Complete rewrite. founders = Jurie + Charl. advisors = Martyn + Eben. Remove Pieter. Remove fictional partnerships (CSIR "current" partnership is not real). |
| `apps/docs/src/config/profiles/internal-users.ts` | Add Charl (placeholder email for now). Remove Pieter's email mapping (megatesla@gmail.com). |

### Executive Docs

| File | Changes needed |
|------|---------------|
| `apps/docs/docs/executive/investor-executive-summary.mdx` | Rewrite for pre-seed. Remove unverified traction. Honest TRL 1-2. Lead with software platform as proof of technical capability. |
| `apps/docs/docs/executive/team.mdx` | 2 founders + 2 advisors structure. Add Charl. Remove Pieter. |
| `apps/docs/docs/executive/team-status.md` | Drop "stealth mode" / "operational security" fiction entirely. Plainly state who is doing what. |

### Business Docs

| File | Changes needed |
|------|---------------|
| `apps/docs/docs/business/12-month-business-plan.mdx` | Current plan has CPSC certification March 2026 (this month — impossible). Rewrite from today's actual position. |
| `apps/docs/docs/business/business-model.mdx` | Mark Year 1-5 revenue as projections contingent on funding. Remove Lockheed/Boeing/Raytheon "partnerships" (none exist). |
| `apps/docs/docs/business/traction-metrics.mdx` | Honest rewrite: software built ✅, hardware R&D underway ✅, zero revenue, zero customers. |
| `apps/docs/docs/business/opportunities/cloud-credits-programs.md` | Add rebrand strategy section. Note which programs Charl applies under new brand. |
| `apps/docs/docs/playbooks/pre-pitch-checklist.mdx` | Update "Quick Reference: Key Numbers" — current numbers don't match reality. |

### Deferred Until Brand Name Confirmed

| File | Why deferred |
|------|-------------|
| `pitch-deck/PITCH_DECK_v2.0.md` | Need new brand name first |
| `apps/docs/src/components/Downloads/slidedecks/*.ts` | Same |
| `apps/marketing/src/components/sections/TeamSection.tsx` | Same |

### Files That Are Fine — Leave Alone

- `apps/docs/docs/research/spare-parts-bin.md` — accurate, created this session
- `apps/docs/docs/research/spare-parts-decisions.md` — accurate, created this session
- `apps/docs/docs/research/component-pricelist.md` — accurate, created this session
- `apps/docs/docs/research/upgrade-purchasing-tracker.md` — updated this session
- `apps/docs/docs/research/upgrade-path-*.md` — hardware upgrade paths, accurate
- `apps/docs/docs/business/accelerators/*` — international research, useful reference
- `apps/docs/docs/business/opportunities/opportunities-summary.md` — useful, needs SA additions only
- `apps/docs/docs/playbooks/soonami-pitch-structure.mdx` — good framework, keep
- `apps/docs/docs/business/market-analysis.mdx` — market data solid, minor fixes only
- Market intelligence notes — factual, keep

---

## Key values.ts Constants to Update

```typescript
// TEAM — restructure entirely
TEAM.TEAM_SIZE: 4 → 2 (active founders)
TEAM.COMBINED_EXPERIENCE: "60+ years" → "15+ years" (Jurie only; Charl TBD)
// Remove: MEMBER_3 (Pieter), MEMBER_4 (Eben as founder)
// Add: HARDWARE_LEAD (Charl Chapman)
// Add new: ADVISORS export with Martyn + Eben

// PHASES — all timelines have slipped; shift ~12 months
PHASES.SEED.timeline: "Nov 2025 - Oct 2026"
// → "Q2 2026 - Q2 2027" (hardware prototype is months away)

// CAPITAL
CAPITAL.INVESTMENT_TO_DATE: "6 months founder R&D" // keep — it's honest

// FUNDING — label as projections
FUNDING.REVENUE_2026: "$2M"       // → "$0 (pre-revenue)"
FUNDING.YEAR_1_SYSTEMS: 25        // → 0 (no systems exist)
FUNDING.BM_YEAR_1_REVENUE: "$2.5M" // → mark as "target (post-funding)"

// SKYSNARE — no product exists yet
SKYSNARE.YEAR_1_UNITS: 5000       // → mark as "target"
SKYSNARE.RETURN_RATE: "8-10%"     // → remove (no product to return)

// COMPETITORS.UNIQUE_FEATURES — keep, this is real
// BLOCKCHAIN, PERFORMANCE specs — keep, the software delivers these
```

---

## Hardware Context (for Charl's work)

- **Toy quadcopter**: Available for upgrade Paths A, B, C (documented in
  `upgrade-path-*.md`). Path C (brain upgrade, brushed, F405 + GPS) is current
  focus.
- **Temu cart**: R478 pending purchase — F405 FC, GPS module, absorber balls,
  XT30 connectors (2 varieties). User still deciding.
- **Spare parts bin**: 29 items documented in `spare-parts-bin.md`. Hoverboard
  controllers (dual 3-phase BLDC with MOSFETs) are highest-value strip. ATX PSU
  second most valuable. Strip priority queue in `spare-parts-decisions.md`.
- **Parrot drone**: Stolen. The toy quadcopter is the active hardware.
- **Martyn's factory**: Available when funded. Not accessible now.
- **"Free labor" paradigm**: Charl strips everything. Only truly hollow/burnt
  items are tossed. Learning value noted for each component.

---

## Git State

- **Branch**: `claude/cr2032-rechargeable-research-3mWaD`
- **PR**: #776 (open, targeting `dev`)
- **Branch is up to date with origin** as of session start on new machine
- **Previous session's HANDOVER.md** was committed locally on the other machine
  but push failed (403 permissions). That commit did NOT make it to origin.
- **Untracked**: `.roadmap.yaml`, `.todo.yaml` (ignore these)

---

## Next Steps (In Order)

**Before anything else:** Finalize the brand name. Everything else depends on it.

1. ☐ **Brand name decision** — Altivigil vs TalonGrid vs other
2. ☐ **Create `fundability-roadmap.md`** — master funding plan
3. ☐ **Create `sa-funding-guide.md`** — SA-specific programs deep-dive
4. ☐ **Create `startup-program-tracker.md`** — application tracker
5. ☐ **Rewrite `values.ts` TEAM section** — add Charl, remove Pieter, advisors
6. ☐ **Rewrite `team.ts`** — complete restructure
7. ☐ **Rewrite `team-status.md`** — drop stealth fiction
8. ☐ **Rewrite `investor-executive-summary.mdx`** — pre-seed honesty
9. ☐ **Rewrite `12-month-business-plan.mdx`** — realistic from today
10. ☐ **Rewrite `traction-metrics.mdx`** — honest traction
11. ☐ **Update `internal-users.ts`** — add Charl, remove Pieter
12. ☐ **Update `cloud-credits-programs.md`** — rebrand application plan
13. ☐ **Update `pre-pitch-checklist.mdx`** — fix key numbers
14. ☐ **Commit + push all changes**

Steps 2–4 can proceed before brand name is finalized.
Steps 5–13 need the name confirmed first.
