# Satellite SEO Sites — Build Plan

> Roadmap for replicating the `apps/divorce` pilot to all 9 remaining practice areas backed by the `SiteOrigin` enum.

---

## 1. Current State (as of 2026-05-20)

### What's done
- ✅ **Pilot: `apps/divorce`** (`daehanlaw-divorce.com`) — fully built (home, cases, articles, attorneys, contact, search, login, about, practice, calculation, solatium, sitemap, robots).
- ✅ **Monorepo skeleton** (Turborepo + yarn workspaces) with shared packages:
  - `packages/config` → `SiteConfig` interface + `mainSiteLink` UTM helper
  - `packages/graphql` → Apollo client + queries/mutations/types
  - `packages/ui` → Navbar, Footer, Hero, SeoHead, cards, ContactForm, AI chatbot, QuickMenu
- ✅ **Backend Phase 1–4 complete** (origin/develop, 13 commits ahead of local):
  - `SiteOrigin` enum + `siteOrigin` field on Article/Case (`c5cac6d`, `569c3ca`)
  - Pattern-based CORS allowlist for `daehanlaw-*.com` (`be05599`)
  - New content modules: `CaseResult`, `CaseAnalysis`, `LegalQA`, `Review` — all with `siteOrigin` multi-domain support (`75c5964`)
  - `siteOrigin` filter on Case search (`619a158`)
  - JWT moved to httpOnly cookie (`c42b19d`)

### What's blocking (must fix before duplicating)
- 🔴 **`apps/divorce/pages/articles.tsx`** — filters by invalid `articleCategory: 'PRACTICE_DIVORCE'` and is **missing `siteOrigin: 'divorce'`** in the search input. Backend ignores the bad enum, returns ALL articles → categories mixed (the bug user reported on `daehanlaw-divorce.com/articles`).
- 🔴 **`apps/divorce/pages/cases/{analysis,knowledge}.tsx`** — correct `articleCategory` but missing `siteOrigin: 'divorce'`.
- ⚠️ Local `DeahanLaw-backend` is 13 commits behind origin/develop. Production already has the new schema; local copy needs `git pull` for codegen/typing parity.

---

## 2. Backend Reference (source of truth)

### `SiteOrigin` enum (`src/libs/enums/site-origin.enum.ts`)
```ts
MAIN             = 'main'              // daehanlaw.com (already shipped)
DIVORCE          = 'divorce'           // 이혼            ✅ pilot built
SEX_CRIME        = 'sex_crime'         // 성범죄
REAL_ESTATE      = 'real_estate'       // 부동산
CRIMINAL         = 'criminal'          // 형사
HOUSING_ASSOC    = 'housing_assoc'     // 지역주택조합
REDEVELOPMENT    = 'redevelopment'     // 재건축/재개발
FALSE_ACCUSATION = 'false_accusation'  // 무고
ADMIN_LAW        = 'admin_law'         // 행정
CLASS_ACTION     = 'class_action'      // 단체소송
```

**Filter pattern (Article + Case):** pass `siteOrigin: '<value>'` inside the `search` object of `ArticlesInquiry` / `CasesInquiry`. Lowercase string values — match the enum exactly.

### Article/Case Phase 4 modules (also support `siteOrigin`)
- `CaseResult`   — `case-result` GraphQL
- `CaseAnalysis` — `case-analysis` GraphQL
- `LegalQA`      — `legal-qa` GraphQL
- `Review`       — `review` GraphQL

Each has its own resolver/service/DTO with `siteOrigin` filtering — satellites can opt in once `packages/graphql/queries.ts` is extended.

---

## 3. Sites to Build (9 remaining)

Each row = one `apps/<area>` clone of `apps/divorce`. Only `site.config.ts`, `package.json` (`name` + port), and a couple of copy strings differ.

| # | App folder        | Domain                             | `siteOrigin`        | `caseType` (enum)     | `propertyType`               | `articleCategory` (display)        | Dev port | Prod port | Phone           | Brand color |
|---|-------------------|------------------------------------|---------------------|-----------------------|------------------------------|-------------------------------------|----------|-----------|-----------------|-------------|
| 1 | `sex-crime`       | daehanlaw-sexcrime.com            | `sex_crime`         | `SEX_CRIME`           | `SEX_CRIMES`                 | `PRACTICE_SEX_CRIME`                | 3002     | 4002      | 1533-7377       | `#5a1a1a`   |
| 2 | `real-estate`     | daehanlaw-realestate.com          | `real_estate`       | `REAL_ESTATE`         | `CONSTRUCTION_REAL_ESTATE`   | `PRACTICE_CONSTRUCTION`             | 3003     | 4003      | 1533-7377       | `#1a3a5c`   |
| 3 | `criminal`        | daehanlaw-criminal.com            | `criminal`          | `CRIMINAL`            | `CRIMINAL`                   | `PRACTICE_CRIMINAL`                 | 3004     | 4004      | 1533-7377       | `#1a1a2f`   |
| 4 | `housing-assoc`   | daehanlaw-housing.com             | `housing_assoc`     | `LOCAL_HOUSING`       | `CONSTRUCTION_REAL_ESTATE`   | `PRACTICE_CONSTRUCTION` (shared)    | 3005     | 4005      | 1533-7377       | `#2f5c1a`   |
| 5 | `redevelopment`   | daehanlaw-redevelopment.com       | `redevelopment`     | `RECONSTRUCTION`      | `CONSTRUCTION_REAL_ESTATE`   | `PRACTICE_CONSTRUCTION` (shared)    | 3006     | 4006      | 1533-7377       | `#5c2f1a`   |
| 6 | `false-accusation`| daehanlaw-falseaccusation.com     | `false_accusation`  | `FALSE_ACCUSATION`    | `CRIMINAL`                   | `PRACTICE_CRIMINAL` (shared)        | 3007     | 4007      | 1533-7377       | `#5c1a3a`   |
| 7 | `admin-law`       | daehanlaw-administrative.com      | `admin_law`         | `ADMIN_CENTER`        | `CONSTITUTIONAL_ADMIN`       | `PRACTICE_CONSTITUTIONAL`           | 3008     | 4008      | 1533-7377       | `#1a4a5c`   |
| 8 | `class-action`    | daehanlaw-classaction.com         | `class_action`      | `CLASS_ACTION`        | `CONSTITUTIONAL_ADMIN`       | `PRACTICE_CONSTITUTIONAL` (shared)  | 3009     | 4009      | 1533-7377       | `#3a1a5c`   |

> Domains are proposals — confirm with the user before registering on Cafe24. Brand colors are starting points; adjust per area's market positioning. Phone may differ per practice area if a dedicated DID is assigned.

---

## 4. Pre-flight Fixes (before replicating)

These are blocking bugs in the **pilot** that will propagate to every clone if not fixed first.

### 4.1 Fix `siteOrigin` filtering across all article-list pages
**File: `apps/divorce/pages/articles.tsx` (line 51)**
```ts
// before  →  invalid category, returns everything
search: { articleCategory: SITE_CONFIG.articleCategory },
// after
search: { articleCategory: 'LEGAL_INFO', siteOrigin: 'divorce' },
```

**File: `apps/divorce/pages/cases/analysis.tsx` (line ~50)**
```ts
search: { articleCategory: 'ANALYSIS', siteOrigin: 'divorce' },
```

**File: `apps/divorce/pages/cases/knowledge.tsx` (line ~50)**
```ts
search: { articleCategory: 'KNOWLEDGE', siteOrigin: 'divorce' },
```

### 4.2 Plumb `siteOrigin` into shared config
Add `siteOrigin: SiteOrigin` to `SiteConfig` so every page can read it (DRY across satellites):

**File: `packages/config/index.ts`**
```ts
export type SiteOrigin =
  | 'main' | 'divorce' | 'sex_crime' | 'real_estate' | 'criminal'
  | 'housing_assoc' | 'redevelopment' | 'false_accusation' | 'admin_law' | 'class_action';

export interface SiteConfig {
  // ...existing fields...
  siteOrigin: SiteOrigin;
}
```

**File: `apps/divorce/site.config.ts`** — add `siteOrigin: 'divorce'`.

Then update every page that filters by it to read from `SITE_CONFIG.siteOrigin` instead of hard-coding `'divorce'`. After this change, every clone needs **only** site.config.ts edits.

### 4.3 Pull latest backend locally (parity for dev/typegen)
```bash
cd /Users/shakhmuhtorxonov/Desktop/DeahanLaw-backend
git pull origin develop
```
(No code change — just sync.)

---

## 5. Replication Recipe (per site, ~30 min each after pilot is fixed)

For each row in §3:

```bash
# 1. Copy the pilot
cd /Users/shakhmuhtorxonov/Desktop/Daehanlaw-Seo-Frontend/apps
cp -r divorce <area>      # e.g. cp -r divorce sex-crime
```

2. **Edit `apps/<area>/package.json`:**
   - `"name": "<area>"`
   - Update dev/start port in scripts (`-p <devPort>`)
   - Clean `tsconfig.tsbuildinfo` if present

3. **Edit `apps/<area>/site.config.ts`:**
   - `practiceArea`, `practiceAreaEn`, `siteName`, `siteUrl`, `leadSource`, `leadKeyword`, `articleCategory`, `caseType`, `propertyType`, `brandColor`, `heroHeadline`, `heroSubheadline`, `siteOrigin`.

4. **Edit `apps/<area>/public/robots.txt`:**
   - Update the `Sitemap:` URL to the new domain.

5. **Replace area-specific copy:**
   - `apps/<area>/pages/practice/<area>.tsx` — rename file + practice-area-specific content
   - Hero images in `apps/<area>/public/` (or keep generic for now)
   - Any hard-coded "이혼·가사" strings → search the app folder for them and route through `SITE_CONFIG.practiceArea`

6. **Smoke-test locally:**
   ```bash
   cd /Users/shakhmuhtorxonov/Desktop/Daehanlaw-Seo-Frontend
   yarn install
   yarn dev --filter=<area>
   ```
   Hit `http://localhost:<devPort>` and verify hero, /cases, /articles, /attorneys, /contact all render with the correct `siteOrigin`-filtered data.

---

## 6. Deployment per site (Phase 2 per area)

Same VPS, additive only:

1. **Register domain** on Cafe24
2. **DNS:** A record `@` + `www` → `180.70.116.138`, TTL 3600
3. **Dockerfile + compose service** in `apps/<area>/Dockerfile` and root `docker-compose.yml` — port `<prodPort>:3001`, network `daehanlaw-network`
4. **Update `deploy.sh`** to include the new service (or use `docker compose up -d --build` which picks all)
5. **Push branch / merge to main**, SSH to VPS, `./deploy.sh`
6. **Nginx vhost:** `/etc/nginx/sites-available/daehanlaw-<area>.com` proxying `:<prodPort>`
7. **SSL:** `certbot --nginx -d daehanlaw-<area>.com -d www.daehanlaw-<area>.com`
8. **Verify:** site loads on HTTPS, `/sitemap.xml` is XML, `/robots.txt` resolves, contact form lead lands in `/admin/leads` with the right `leadSource`.

---

## 7. SEO wiring per site (Phase 3 per area)

1. Google Search Console verification (drop `public/google*.html`)
2. Naver Search Advisor verification (drop `public/naver*.html`)
3. Submit `sitemap.xml` to both
4. Request indexing for `/`, `/cases`, `/articles`, `/attorneys`, `/contact`
5. Wait 2 weeks; if keyword traction → keep, else iterate copy.

---

## 8. Suggested Build Order (priority)

Built on assumed traffic volume / search demand for each practice area in the Korean legal market:

1. `criminal`           — highest general-purpose search volume
2. `real-estate`        — high commercial value, urban demand
3. `sex-crime`          — high-urgency keyword, premium leads
4. `redevelopment` + `housing-assoc` — share UI/copy, build as a pair
5. `false-accusation`   — niche but high-intent
6. `admin-law`          — government-adjacent, B2B leaning
7. `class-action`       — lowest individual search volume; build last

Recommend shipping 1–2 satellites, measuring SEO impressions over 2–4 weeks, then committing to the rest based on data — same playbook used for the divorce pilot.

---

## 9. Open Questions for the user

Before starting, please confirm:

- [ ] **Domain naming** — are the domains in §3 final, or should some use shorter Korean transliterations (e.g. `daehanlaw-hyungsa.com` instead of `daehanlaw-criminal.com`)?
- [ ] **Phone numbers** — single `1533-7377` for all, or dedicated DIDs per practice area for lead attribution?
- [ ] **Build order** — agree with §8, or different priority based on internal sales focus?
- [ ] **Hero imagery** — generate per-area illustrations now, or ship with placeholder + iterate?
- [ ] **Article seeding** — does each `siteOrigin` already have published articles in the main admin panel, or do we need to seed content before launch?

---

## 10. Key Paths (fast context)

| | |
|---|---|
| SEO monorepo root | `/Users/shakhmuhtorxonov/Desktop/Daehanlaw-Seo-Frontend/` |
| Pilot app          | `apps/divorce/` |
| Shared packages    | `packages/{config,graphql,ui}/` |
| Backend (read-only sync) | `/Users/shakhmuhtorxonov/Desktop/DeahanLaw-backend/` (origin/develop = production) |
| Backend SiteOrigin enum  | `src/libs/enums/site-origin.enum.ts` (after `git pull`) |
| Backend ArtISearch DTO   | `src/libs/dto/article/article.input.ts` |
| Main site (patterns)     | `/Users/shakhmuhtorxonov/Desktop/Daehanlaw-Frontend/` |
| Existing scaffold plan   | `PLAN.md` (this repo) |
| Pattern reference        | `DAEHANLAW-PATTERNS.md` (this repo) |
