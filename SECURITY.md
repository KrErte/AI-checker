# Security Audit Notes

Initial security review of the AI-checker (HireSignal) project.

## Findings

### High

**1. `companies` INSERT policy is fully open**
File: `supabase/migrations/001_initial.sql:72`
```sql
CREATE POLICY "Companies can be created by anyone" ON companies FOR INSERT WITH CHECK (true);
```
Anyone (including unauthenticated users) can create company rows with arbitrary `name`, `slug`, `domain`, and even pre-set `claimed_by`. Recommendation:
- Either require `auth.uid() IS NOT NULL`, or
- Restrict insert to a server-side service role and create companies via an API route after validation.
- Always force `claimed = false`, `claimed_by = NULL`, `badge_status = 'none'` on insert (use a `BEFORE INSERT` trigger).

**2. Claim flow is unimplemented and bypassable**
Files: `src/app/claim/page.tsx`, `supabase/migrations/001_initial.sql:73`
The claim page only sets local state and never sends a verification email. The UPDATE policy `auth.uid() = claimed_by` only allows updates when the row is *already* claimed by the caller, so an unclaimed company can never be claimed through the policy itself. A real claim flow must:
- Verify the user's email domain matches `companies.domain`.
- Use a server route with the service-role key to set `claimed_by` and `claimed = true`.
- Never trust client-supplied `claimed_by`.

**3. Reports table has no rate limiting / anti-spam**
File: `supabase/migrations/001_initial.sql:76-77`
Anyone can insert unlimited reports. Recommendations:
- Add a per-IP rate limit at the API layer.
- Consider hCaptcha/Turnstile on the submit form.
- Add a `created_by` (nullable) and unique constraint on `(company_id, created_by, job_title, created_at::date)` to prevent dupes.

### Medium

**4. API route does not validate or persist data**
File: `src/app/api/reports/route.ts:5-29`
The route accepts arbitrary JSON, does no length/format validation, and only returns success without writing to Supabase. When wired up:
- Validate inputs with `zod`.
- Cap field lengths (`job_title <= 200`, `comment <= 2000`).
- Sanitize `comment` before rendering.

**5. `audit_requests` SELECT policy leaks no data, but missing UPDATE/DELETE policies**
File: `supabase/migrations/001_initial.sql:85-90`
Only SELECT and INSERT policies exist. With RLS enabled, UPDATE/DELETE will be denied — that is OK if intended, but document it. If owners should edit their requests, add an UPDATE policy.

**6. Service-role key handling**
The repo currently only uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`. If/when introducing `SUPABASE_SERVICE_ROLE_KEY`, ensure:
- It is **never** prefixed with `NEXT_PUBLIC_`.
- It is only read in server-only files (`src/lib/supabase/server.ts` style, never imported by client components).

### Low

**7. CSP / security headers not configured**
`next.config.mjs` does not set `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, etc. Add a `headers()` export.

**8. `.env` files**
No `.env.example` exists. Add one documenting required vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, future `SUPABASE_SERVICE_ROLE_KEY`).

**9. Dependency audit**
Run regularly:
```bash
npm audit --audit-level=high
```
This is now part of CI (`.github/workflows/ci.yml`).

## Quick Wins Checklist

- [ ] Tighten `companies` INSERT policy
- [ ] Implement real claim flow (server-side, domain-verified)
- [ ] Add `zod` validation to `/api/reports`
- [ ] Add rate limiting / captcha on submit
- [ ] Add `.env.example`
- [ ] Add security headers in `next.config.mjs`
- [ ] Run `npm audit fix` for any flagged advisories
