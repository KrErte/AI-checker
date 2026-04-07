-- 002_security_hardening.sql
-- Tighten RLS so that anon users cannot tamper with claim status,
-- and add per-(company,job_title) duplicate-day index for spam control.

-- 1. Drop the wide-open companies INSERT policy and replace it.
DROP POLICY IF EXISTS "Companies can be created by anyone" ON companies;

-- Anonymous users can still create companies (so the report-form flow keeps
-- working) but only with safe default values. claimed/claimed_by/badge_status
-- are forced via a BEFORE INSERT trigger below.
CREATE POLICY "Companies can be created by anyone (safe defaults)"
ON companies FOR INSERT
WITH CHECK (
  claimed = false
  AND claimed_by IS NULL
  AND badge_status = 'none'
);

-- 2. Trigger that forces safe defaults even if a client tries to override.
CREATE OR REPLACE FUNCTION enforce_company_insert_defaults()
RETURNS TRIGGER AS $$
BEGIN
  NEW.claimed := false;
  NEW.claimed_by := NULL;
  NEW.badge_status := 'none';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_company_insert_defaults ON companies;
CREATE TRIGGER trg_enforce_company_insert_defaults
BEFORE INSERT ON companies
FOR EACH ROW EXECUTE FUNCTION enforce_company_insert_defaults();

-- 3. Reports: cap comment length at the database layer too (defence in depth).
ALTER TABLE reports
  ADD CONSTRAINT reports_comment_length CHECK (
    comment IS NULL OR char_length(comment) <= 2000
  );

ALTER TABLE reports
  ADD CONSTRAINT reports_job_title_length CHECK (
    char_length(job_title) BETWEEN 2 AND 200
  );

-- 4. Index used by spam-dedupe queries / leaderboard.
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_company_outcome ON reports(company_id, outcome);
