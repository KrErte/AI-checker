-- 003_leads.sql
-- Leads table for /api/ai-act-lead (AI Act readiness funnel and similar).
-- Writes come from a server route using the anon key, so RLS must allow
-- anonymous INSERT but block SELECT for the public (leads are private).

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'ai-act-ready',
  meta JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT leads_email_length CHECK (char_length(email) BETWEEN 3 AND 320),
  CONSTRAINT leads_source_length CHECK (char_length(source) BETWEEN 1 AND 64)
);

-- Prevent duplicate signups per funnel.
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email_source
  ON leads (lower(email), source);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can submit a lead (insert only).
CREATE POLICY "Leads can be created by anyone"
ON leads FOR INSERT
WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE. Reads must go through the service role
-- from a secure admin context, never from the browser.
