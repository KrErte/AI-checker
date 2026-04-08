// Minimal lead / email capture store. File-backed JSON under DATA_DIR.
import fs from "fs/promises"
import path from "path"

const DATA_DIR = process.env.DATA_DIR || "/app/data"
const LEADS_FILE = path.join(DATA_DIR, "leads.json")

export interface Lead {
  id: string
  email: string
  source: string
  meta: Record<string, unknown>
  created_at: string
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(LEADS_FILE, "utf-8")) as Lead[]
  } catch {
    return []
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await ensureDir()
  const tmp = `${LEADS_FILE}.tmp`
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf-8")
  await fs.rename(tmp, LEADS_FILE)
}

export async function addLead(
  email: string,
  source: string,
  meta: Record<string, unknown> = {},
): Promise<Lead> {
  const leads = await readLeads()
  const existing = leads.find((l) => l.email === email && l.source === source)
  if (existing) return existing
  const lead: Lead = {
    id: crypto.randomUUID(),
    email,
    source,
    meta,
    created_at: new Date().toISOString(),
  }
  leads.push(lead)
  await writeLeads(leads)
  return lead
}

export async function leadCount(source?: string): Promise<number> {
  const leads = await readLeads()
  return source ? leads.filter((l) => l.source === source).length : leads.length
}
