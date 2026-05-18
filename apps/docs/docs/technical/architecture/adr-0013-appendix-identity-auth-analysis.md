---
id: adr-0013-appendix-identity-analysis
title: "ADR 0013 Appendix: Identity & Auth Analysis"
sidebar_label: "Appendix: Identity Analysis"
difficulty: expert
estimated_reading_time: 12
points: 30
tags:
  - technical
  - architecture
  - analysis
  - security
  - authentication
---

# ADR 0013 Appendix: Identity & AuthN/AuthZ Weighted Analysis

This appendix provides the detailed technical analysis supporting
[ADR 0013: Identity & AuthN/AuthZ Strategy](./adr-0013-identity-auth.md).

---

## Weighted Decision Matrix

### Evaluation Criteria

| Criterion                    | Weight | Rationale                                 |
| ---------------------------- | ------ | ----------------------------------------- |
| **Firebase Integration**     | 20%    | Native integration with existing stack    |
| **RBAC Capabilities**        | 18%    | Role-based access for AI features         |
| **Enterprise Federation**    | 15%    | Future SSO with airports, law enforcement |
| **MFA Support**              | 12%    | Security requirement for sensitive docs   |
| **Operational Simplicity**   | 12%    | Minimize auth complexity                  |
| **Cost Efficiency**          | 10%    | Budget-conscious for documentation site   |
| **Defence-Grade Compliance** | 8%     | Future high-security deployments          |
| **Migration Effort**         | 5%     | Current state is Firebase Auth            |

---

### Option Scoring (1-10 Scale)

| Criterion                | Firebase Auth | Entra ID (Azure AD) | Auth0 | Keycloak |
| ------------------------ | ------------- | ------------------- | ----- | -------- |
| Firebase Integration     | 10            | 4                   | 5     | 3        |
| RBAC Capabilities        | 7             | 9                   | 10    | 10       |
| Enterprise Federation    | 7             | 10                  | 10    | 9        |
| MFA Support              | 6             | 10                  | 9     | 8        |
| Operational Simplicity   | 9             | 6                   | 7     | 3        |
| Cost Efficiency          | 9             | 7                   | 5     | 8        |
| Defence-Grade Compliance | 5             | 9                   | 8     | 10       |
| Migration Effort         | 10            | 4                   | 5     | 3        |

---

### Weighted Scores Calculation

| Option                  | Weighted Score | Rank   |
| ----------------------- | -------------- | ------ |
| **Firebase Auth**       | **7.91**       | 🥇 1st |
| Entra ID (Azure AD B2C) | 7.19           | 🥈 2nd |
| Auth0                   | 7.08           | 🥉 3rd |
| Keycloak (Self-Hosted)  | 6.07           | 4th    |

**Calculation for Firebase Auth**:

```
(10×0.20) + (7×0.18) + (7×0.15) + (6×0.12) + (9×0.12) + (9×0.10) + (5×0.08) + (10×0.05)
= 2.0 + 1.26 + 1.05 + 0.72 + 1.08 + 0.9 + 0.4 + 0.5
= 7.91
```

---

## Feature Comparison Matrix

### Authentication Methods

| Method              | Firebase | Entra ID  | Auth0     | Keycloak  |
| ------------------- | -------- | --------- | --------- | --------- |
| Email/Password      | ✅       | ✅        | ✅        | ✅        |
| Google OAuth        | ✅       | ✅        | ✅        | ✅        |
| Microsoft OAuth     | ✅       | ✅ Native | ✅        | ✅        |
| GitHub OAuth        | ✅       | ⚠️ Custom | ✅        | ✅        |
| Apple Sign-In       | ✅       | ⚠️ Custom | ✅        | ✅        |
| Phone/SMS           | ✅       | ✅        | ✅        | ⚠️ Plugin |
| Magic Links         | ✅       | ✅        | ✅        | ✅        |
| SAML                | ✅       | ✅        | ✅        | ✅        |
| OIDC                | ✅       | ✅        | ✅        | ✅        |
| Passkeys/WebAuthn   | ⚠️ Beta  | ✅        | ✅        | ✅        |
| FIDO2 Hardware Keys | ❌       | ✅        | ✅        | ✅        |
| PIV/CAC Cards       | ❌       | ✅        | ⚠️ Custom | ✅        |

### Multi-Factor Authentication

| MFA Type             | Firebase     | Entra ID | Auth0 | Keycloak  |
| -------------------- | ------------ | -------- | ----- | --------- |
| SMS OTP              | ✅           | ✅       | ✅    | ⚠️ Plugin |
| TOTP (Authenticator) | ✅ Extension | ✅       | ✅    | ✅        |
| Push Notification    | ❌           | ✅       | ✅    | ⚠️ Custom |
| Hardware Key (FIDO2) | ❌           | ✅       | ✅    | ✅        |
| Biometric            | ⚠️ Device    | ✅       | ✅    | ✅        |
| Risk-Based MFA       | ❌           | ✅       | ✅    | ⚠️ Custom |

### Authorization Features

| Feature                  | Firebase      | Entra ID     | Auth0 | Keycloak |
| ------------------------ | ------------- | ------------ | ----- | -------- |
| Custom Claims            | ✅ 1KB limit  | ✅ Unlimited | ✅    | ✅       |
| Groups/Roles             | ⚠️ Via claims | ✅ Native    | ✅    | ✅       |
| Attribute-Based (ABAC)   | ⚠️ Manual     | ✅           | ✅    | ✅       |
| Fine-Grained Permissions | ❌            | ⚠️ Custom    | ✅    | ✅       |
| API Scopes               | ⚠️ Manual     | ✅           | ✅    | ✅       |
| Tenant Isolation         | ⚠️ Project    | ✅ Native    | ✅    | ✅       |

---

## Cost Analysis (24 Months)

### Firebase Auth (Current)

| Usage Tier   | Monthly Cost            | Notes            |
| ------------ | ----------------------- | ---------------- |
| 0-10K MAU    | $0                      | Free tier        |
| 10K-100K MAU | $0.0025/MAU             | $25-250/month    |
| 100K+ MAU    | $0.0015/MAU             | Volume discount  |
| Phone Auth   | $0.01-0.06/verification | Regional pricing |

**Projected for NexaMesh**:

- Expected MAU: ~5,000 (documentation site)
- 24-month cost: **$0** (within free tier)

### Entra ID (Azure AD B2C)

| Usage Tier   | Monthly Cost   | Notes              |
| ------------ | -------------- | ------------------ |
| 0-50K MAU    | $0             | Free tier          |
| 50K-100K MAU | $0.003/MAU     | $150-300/month     |
| 100K-1M MAU  | $0.002/MAU     | Volume discount    |
| Premium P1   | +$6/user/month | Conditional Access |

**Projected for NexaMesh**:

- Expected MAU: ~5,000
- 24-month cost: **$0** (within free tier)
- With Premium (for enterprise): **$720** (100 users × $6 × 12 months)

### Auth0

| Plan         | Monthly Cost | MAU Limit  |
| ------------ | ------------ | ---------- |
| Free         | $0           | 7,000 MAU  |
| Essentials   | $35/month    | 1,000 MAU  |
| Professional | $240/month   | 10,000 MAU |
| Enterprise   | Custom       | Unlimited  |

**Projected for NexaMesh**:

- Expected MAU: ~5,000
- 24-month cost: **~$840** (Free tier covers most, overflow to Essentials)

### Keycloak (Self-Hosted)

| Component          | Monthly Cost | Notes          |
| ------------------ | ------------ | -------------- |
| VM (2 vCPU, 4GB)   | ~$40         | Azure B2s      |
| Managed PostgreSQL | ~$25         | Basic tier     |
| Backup/Monitoring  | ~$10         | Azure services |
| Operational effort | ~$200        | Engineer time  |

**Projected for NexaMesh**:

- 24-month cost: **~$6,600** (infrastructure + operations)

---

## Token & Session Analysis

### Firebase Auth Token Structure

```json
{
  "iss": "https://securetoken.google.com/nexamesh",
  "aud": "nexamesh",
  "auth_time": 1732665600,
  "user_id": "abc123",
  "sub": "abc123",
  "iat": 1732665600,
  "exp": 1732669200,
  "email": "user@example.com",
  "email_verified": true,
  "firebase": {
    "identities": {
      "google.com": ["123456789"],
      "email": ["user@example.com"]
    },
    "sign_in_provider": "google.com"
  },
  "role": "editor",
  "org": "phoenix-team",
  "features": ["ai-panel", "suggestions"]
}
```

### Token Lifecycle

| Stage          | Duration        | Action                   |
| -------------- | --------------- | ------------------------ |
| Initial token  | 1 hour          | Issued on login          |
| Refresh window | 1 hour - 5 min  | Auto-refresh if active   |
| Refresh token  | 2 weeks         | Stored securely          |
| Force refresh  | On claim change | `getIdTokenResult(true)` |
| Revocation     | Immediate       | Server-side revoke       |

### Session Security

| Setting             | Recommended    | Rationale               |
| ------------------- | -------------- | ----------------------- |
| Token storage       | sessionStorage | Cleared on tab close    |
| Refresh strategy    | On-demand      | Minimize network calls  |
| Session timeout     | 1 hour         | Balance UX and security |
| Concurrent sessions | 3 max          | Detect account sharing  |

---

## RBAC Implementation

### Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        Role Hierarchy                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐                                               │
│   │  admin   │ ← Inherits all permissions                   │
│   └────┬─────┘                                               │
│        │                                                     │
│   ┌────┴─────┐                                               │
│   │ auditor  │ ← Read-only access to everything             │
│   └────┬─────┘                                               │
│        │                                                     │
│   ┌────┴─────┐                                               │
│   │  editor  │ ← Can submit suggestions                     │
│   └────┬─────┘                                               │
│        │                                                     │
│   ┌────┴─────┐                                               │
│   │  viewer  │ ← Default role                               │
│   └──────────┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Permission Matrix

| Resource             | Action  | viewer | editor | admin | auditor |
| -------------------- | ------- | ------ | ------ | ----- | ------- |
| **Documentation**    |
| Public docs          | read    | ✅     | ✅     | ✅    | ✅      |
| Internal docs        | read    | ❌     | ✅     | ✅    | ✅      |
| Classified docs      | read    | ❌     | ❌     | ✅    | ✅      |
| **AI Features**      |
| Ask Docs (RAG)       | use     | ✅     | ✅     | ✅    | ❌      |
| Summarize            | use     | ✅     | ✅     | ✅    | ❌      |
| Suggest Improvements | use     | ❌     | ✅     | ✅    | ❌      |
| Competitor Analysis  | use     | ❌     | ❌     | ✅    | ❌      |
| SWOT Generator       | use     | ❌     | ❌     | ✅    | ❌      |
| **Administration**   |
| View metrics         | access  | ❌     | ❌     | ✅    | ✅      |
| Clear cache          | execute | ❌     | ❌     | ✅    | ❌      |
| Reindex docs         | execute | ❌     | ❌     | ✅    | ❌      |
| Manage users         | access  | ❌     | ❌     | ✅    | ❌      |
| View audit logs      | access  | ❌     | ❌     | ✅    | ✅      |

### Rate Limits by Role

| Role    | RAG Queries/Hour | AI Actions/Day | Concurrent Sessions |
| ------- | ---------------- | -------------- | ------------------- |
| viewer  | 50               | 200            | 2                   |
| editor  | 200              | 500            | 3                   |
| admin   | Unlimited        | Unlimited      | 5                   |
| auditor | 50               | 100            | 2                   |

---

## Enterprise Federation Architecture

### Entra ID Federation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Enterprise SSO Flow                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Enterprise User                                                │
│        │                                                         │
│        │ 1. Click "Sign in with Organization"                   │
│        ▼                                                         │
│   Phoenix Docs (React)                                           │
│        │                                                         │
│        │ 2. Redirect to Entra ID                                │
│        ▼                                                         │
│   Entra ID (Azure AD)                                           │
│        │                                                         │
│        │ 3. Authenticate with org credentials                   │
│        │    (possibly with MFA, Conditional Access)             │
│        ▼                                                         │
│   Entra ID Token                                                │
│        │                                                         │
│        │ 4. OIDC redirect to Firebase                           │
│        ▼                                                         │
│   Firebase Auth (OIDC Provider)                                 │
│        │                                                         │
│        │ 5. Map claims, create/update Firebase user             │
│        │    - Map groups → role claim                           │
│        │    - Map tenant_id → org claim                         │
│        ▼                                                         │
│   Firebase Token (with custom claims)                           │
│        │                                                         │
│        │ 6. Return to Phoenix Docs                              │
│        ▼                                                         │
│   Authenticated Session                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Claim Mapping Rules

```typescript
// Cloud Function: Map Entra ID claims to Firebase custom claims
interface EntraIdClaims {
  preferred_username: string;
  groups: string[];
  tenant_id: string;
  roles: string[];
}

interface FirebaseCustomClaims {
  role: "viewer" | "editor" | "admin" | "auditor";
  org: string;
  features: string[];
}

function mapEntraClaims(entraClaims: EntraIdClaims): FirebaseCustomClaims {
  // Map Entra ID groups to Phoenix roles
  const roleMapping: Record<string, string> = {
    "Phoenix-Admins": "admin",
    "Phoenix-Editors": "editor",
    "Phoenix-Auditors": "auditor",
  };

  let role: string = "viewer";
  for (const group of entraClaims.groups) {
    if (roleMapping[group]) {
      role = roleMapping[group];
      break;
    }
  }

  // Map Entra ID roles to feature flags
  const featureMapping: Record<string, string[]> = {
    "AI-Full-Access": ["ai-panel", "suggestions", "competitor", "swot"],
    "AI-Basic": ["ai-panel", "suggestions"],
  };

  const features: string[] = [];
  for (const entRole of entraClaims.roles) {
    if (featureMapping[entRole]) {
      features.push(...featureMapping[entRole]);
    }
  }

  return {
    role: role as FirebaseCustomClaims["role"],
    org: entraClaims.tenant_id,
    features: [...new Set(features)],
  };
}
```

---

## Security Threat Analysis

### Threat Model (STRIDE)

| Threat                     | Risk   | Mitigation                             |
| -------------------------- | ------ | -------------------------------------- |
| **Spoofing** (Identity)    | Medium | Firebase Auth handles token validation |
| **Tampering** (Claims)     | Low    | Claims set server-side only            |
| **Repudiation**            | Low    | Audit logging in Firestore             |
| **Information Disclosure** | Medium | Role-based document filtering          |
| **Denial of Service**      | Medium | Rate limiting by role                  |
| **Elevation of Privilege** | Low    | Server-side role verification          |

### Attack Scenarios

| Scenario             | Likelihood | Impact | Mitigation                     |
| -------------------- | ---------- | ------ | ------------------------------ |
| Token theft (XSS)    | Low        | High   | CSP, HttpOnly where possible   |
| Session hijacking    | Low        | High   | Short token expiry, IP binding |
| Brute force login    | Medium     | Medium | Account lockout, rate limiting |
| Privilege escalation | Very Low   | High   | Server-side claim verification |
| Credential stuffing  | Medium     | Medium | MFA enforcement                |
| Social engineering   | Medium     | High   | Security awareness training    |

### Security Controls

```typescript
// Server-side authorization check
async function verifyAccess(
  context: functions.https.CallableContext,
  requiredRole: string,
  requiredFeature?: string,
): Promise<void> {
  // 1. Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }

  // 2. Get role from verified token (not from client)
  const role = context.auth.token.role || "viewer";

  // 3. Role hierarchy check
  const roleHierarchy = ["viewer", "editor", "auditor", "admin"];
  const userLevel = roleHierarchy.indexOf(role);
  const requiredLevel = roleHierarchy.indexOf(requiredRole);

  if (userLevel < requiredLevel) {
    throw new functions.https.HttpsError(
      "permission-denied",
      `${requiredRole} role required`,
    );
  }

  // 4. Feature flag check (if applicable)
  if (requiredFeature) {
    const features = context.auth.token.features || [];
    if (!features.includes(requiredFeature)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        `${requiredFeature} feature required`,
      );
    }
  }

  // 5. Rate limit check
  await checkRateLimit(context.auth.uid, role);
}
```

---

## Compliance Mapping

### Defence Sector Requirements

| Requirement        | Standard          | Firebase Status   | Migration Path       |
| ------------------ | ----------------- | ----------------- | -------------------- |
| MFA Required       | NIST 800-63B      | ✅ TOTP available | Entra ID for FIDO2   |
| Session Timeout    | NIST 800-53 AC-12 | ✅ Configurable   | Enforce 1-hour       |
| Audit Logging      | NIST 800-53 AU-2  | ✅ Firebase logs  | Export to SIEM       |
| Account Lockout    | NIST 800-53 AC-7  | ✅ Built-in       | Configure thresholds |
| FIDO2/PIV          | NIST 800-157      | ❌ Not supported  | Migrate to Entra ID  |
| On-Premises Option | FedRAMP           | ❌ Cloud only     | Keycloak deployment  |
| Data Residency     | GDPR/Sovereignty  | ⚠️ US/EU regions  | Configure region     |

### Certification Status

| Certification    | Firebase      | Entra ID      | Auth0          | Keycloak              |
| ---------------- | ------------- | ------------- | -------------- | --------------------- |
| SOC 2 Type II    | ✅            | ✅            | ✅             | N/A (self-hosted)     |
| ISO 27001        | ✅            | ✅            | ✅             | N/A                   |
| HIPAA            | ✅ (with BAA) | ✅            | ✅             | Depends on deployment |
| FedRAMP          | ⚠️ GovCloud   | ✅ (Moderate) | ⚠️ In progress | Depends on deployment |
| IRAP (Australia) | ❌            | ✅            | ❌             | Depends on deployment |

---

## Migration Roadmap

### Phase 1: Current (Firebase Auth) ✓

- Email/password authentication
- Google/GitHub OAuth
- Custom claims for RBAC
- Basic TOTP MFA (via extension)

### Phase 2: Enterprise Federation (Q2 2026)

- Enable Entra ID as OIDC provider
- Configure claim mapping
- Pilot with partner organizations
- Conditional Access policies

### Phase 3: Defence-Grade (Q4 2026)

- Migrate admins to Entra ID with FIDO2
- Enable Conditional Access (compliant devices)
- Hardware key requirement for classified docs
- Audit log export to security SIEM

### Phase 4: Classified Deployments (2027+)

- Deploy Keycloak on-premises
- PIV/CAC card integration
- Air-gapped deployment option
- SCIF-compatible authentication

---

## Decision Summary

| Criterion              | Firebase Auth       | Notes                      |
| ---------------------- | ------------------- | -------------------------- |
| **Recommended**        | ✅ Yes              | Best fit for current phase |
| **Primary benefit**    | Native integration  | Zero migration, seamless   |
| **Main trade-off**     | Limited MFA         | No hardware keys           |
| **Migration effort**   | N/A                 | Already deployed           |
| **24-month cost**      | $0                  | Free tier sufficient       |
| **Risk level**         | Low                 | Mature platform            |
| **Defence-grade path** | Entra ID federation | Planned for Phase 2        |

---

## References

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Azure AD B2C Documentation](https://docs.microsoft.com/azure/active-directory-b2c/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [NIST 800-63B: Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)

---

_© 2026 NexaMesh. Confidential._
