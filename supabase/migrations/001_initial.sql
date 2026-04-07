-- Companies table
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT,
  size TEXT,
  ats_system TEXT,
  uses_ai_screening BOOLEAN DEFAULT false,
  has_human_review BOOLEAN DEFAULT false,
  claimed BOOLEAN DEFAULT false,
  claimed_by UUID REFERENCES auth.users(id),
  badge_status TEXT DEFAULT 'none' CHECK (badge_status IN ('none', 'pending', 'verified', 'certified')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Estonia',
  outcome TEXT NOT NULL CHECK (outcome IN ('automated_rejection', 'human_response', 'no_response', 'interview')),
  response_time TEXT NOT NULL CHECK (response_time IN ('within_24h', 'within_week', 'within_month', 'over_month', 'never')),
  rejection_email BOOLEAN DEFAULT false,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles table (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);

-- Audit requests table
CREATE TABLE audit_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  questionnaire_data JSONB DEFAULT '{}',
  result TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Company responses table
CREATE TABLE company_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_reports_company_id ON reports(company_id);
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_company_responses_report_id ON company_responses(report_id);

-- Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_responses ENABLE ROW LEVEL SECURITY;

-- Companies: anyone can read, only claimed owner can update
CREATE POLICY "Companies are viewable by everyone" ON companies FOR SELECT USING (true);
CREATE POLICY "Companies can be created by anyone" ON companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Companies can be updated by owner" ON companies FOR UPDATE USING (auth.uid() = claimed_by);

-- Reports: anyone can read and insert
CREATE POLICY "Reports are viewable by everyone" ON reports FOR SELECT USING (true);
CREATE POLICY "Reports can be created by anyone" ON reports FOR INSERT WITH CHECK (true);

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Audit requests: company owners can manage
CREATE POLICY "Audit requests viewable by company owner" ON audit_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM companies WHERE companies.id = audit_requests.company_id AND companies.claimed_by = auth.uid())
);
CREATE POLICY "Audit requests can be created by company owner" ON audit_requests FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM companies WHERE companies.id = audit_requests.company_id AND companies.claimed_by = auth.uid())
);

-- Company responses: company owners can create, anyone can read
CREATE POLICY "Company responses are viewable by everyone" ON company_responses FOR SELECT USING (true);
CREATE POLICY "Company responses can be created by company owner" ON company_responses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM companies WHERE companies.id = company_responses.company_id AND companies.claimed_by = auth.uid())
);
