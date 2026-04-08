# Audit & Incident Log Template

**Version 1.0 · Record-keeping satisfying AI Act Art. 12 and Art. 19**

> Not legal advice. Starter template aligned with AI Act Art. 12 (automatic logging) and Art. 19 (record-keeping), GDPR Art. 30 (records of processing), and incident notification duties under Art. 33 GDPR and Art. 73 AI Act.

## Why this exists

AI Act Art. 12 requires providers of high-risk AI systems to maintain automatic logs of system events for traceability, and Art. 19 requires those logs to be kept for at least six months. Deployers must preserve the logs they control.

Beyond the legal minimum, a clean audit log is the single most useful artefact you have when something goes wrong: a regulator asks a question, a customer complains, or a journalist files a story. Without it you are reconstructing from memory. With it, you are showing your work.

## Two logs, not one

You need two separate logs:

1. **System event log** — continuous, automated, machine-written. Every inference, every decision, every human override.
2. **Incident and change log** — discrete, human-written. Every time something unusual happens and every time the system materially changes.

Both logs should be immutable (append-only, cryptographically hashed or stored in a WORM-capable backend). Retention minimum: 6 months for system events; 7 years for incident logs and DPIA reviews.

## 1. System event log — schema

Each log line should contain at minimum:

| Field | Meaning |
|---|---|
| `timestamp` | ISO 8601 with millisecond precision, UTC |
| `system_id` | matches row in AI Systems Inventory (template 01) |
| `version` | model version, prompt version, or deployment hash |
| `request_id` | unique per inference call |
| `data_subject_id` | anonymised identifier if applicable |
| `input_hash` | hash of input, not the input itself (privacy) |
| `output_summary` | high-level decision or output class, not full content |
| `confidence` | numeric confidence if applicable |
| `decision` | final decision taken (e.g. "approve", "flag", "reject") |
| `human_reviewer` | ID of human who reviewed, or `null` if fully automated |
| `latency_ms` | end-to-end latency |
| `vendor` | which external AI vendor handled this |
| `region` | EU region where processing happened |

Do **not** log raw personal data. Hash or drop it. Retention of raw inputs is a separate decision, governed by your DPIA.

## 2. Incident and change log — template

Use the table below. One row per event. Copy the header; never edit old rows.

| # | Date | Category | System affected | Summary | Severity (1-5) | Detected by | Actions taken | Root cause | Status | Owner | Notified regulator? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | {{YYYY-MM-DD}} | {{incident / change / access request / DSAR / Art 22 request / vendor update}} | {{system name}} | {{one sentence}} | {{1-5}} | {{user / monitoring / employee / vendor}} | {{what you did}} | {{post-mortem link or one sentence}} | {{open / closed}} | {{name}} | {{no / yes — date}} |

### Categories worth tracking separately

- **Art. 22 requests** — human review demanded by a user or candidate (including any HireCheck-generated letters).
- **Art. 15(1)(h) requests** — detailed information about automated decision-making logic.
- **Art. 17 erasure requests** touching AI-held data.
- **Model updates** — any change to the underlying model, prompt, or vendor.
- **Vendor notifications** — any change or incident flagged upstream by your AI vendors.
- **Hallucination / error events** — any publicly visible incorrect AI output.
- **Prompt injection / security events.**
- **Near-misses** — things that almost went wrong. Log these too. They are the cheapest learning.

## 3. Notification obligations

If any event reaches severity 4 or 5, check the following within 24 hours of detection:

- **GDPR Art. 33** — personal data breach to supervisory authority within 72 hours of awareness, unless unlikely to result in risk to rights and freedoms.
- **AI Act Art. 73** — serious incident notification to the national market surveillance authority "immediately" and in any case within 15 days (or 2 days for widespread infringement).
- **Customer notification** where contractually required.

Record in the log which notifications were sent, when, and who signed them off.

## 4. Review cadence

- Weekly: operations review of low-severity incidents.
- Monthly: DPO review of any Art. 22 / Art. 15 requests.
- Quarterly: full audit of system event log for anomalies.
- Annually: DPIA refresh and log retention audit.

---

## Ownership

This log is owned by **{{DPO_NAME}}** ({{DPO_EMAIL}}). Every employee has a duty to log any incident they witness, regardless of who caused it.

*Last updated: {{YYYY-MM-DD}}*

---

*Template © HireCheck / hirecheck.eu. Licenced for unlimited internal use by the purchasing organisation. Not for resale.*
