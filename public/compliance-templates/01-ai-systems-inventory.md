# AI Systems Inventory

**Version 1.0 · Starter template for EU SaaS · Updates included through 2 August 2026**

> Not legal advice. This is a starter template written against the EU AI Act final text (Regulation 2024/1689) and EDPB guidance. Your DPO or counsel should adapt it to your specific processing operations.

## Purpose

An AI systems inventory is the single most important compliance artefact for an EU SaaS touching AI. It maps every AI system you build, deploy, or integrate to (a) its AI Act risk tier, (b) its owner inside your company, (c) its data flows, and (d) its associated documentation. Regulators, auditors, and your own incident response will all start here.

Maintaining this inventory is implicitly required under AI Act Art. 12 (record-keeping), Art. 17 (quality management system for providers of high-risk systems) and Art. 26 (obligations of deployers), and explicitly helpful when answering any Art. 15 GDPR request.

## How to use this template

1. List every AI system in the table below. Include third-party APIs (OpenAI, Anthropic, Mistral, HuggingFace-hosted models) and any in-house model, fine-tune or classifier — even a spam filter.
2. Classify each row against AI Act Annex III. If any row is Annex III, you are a **deployer of a high-risk AI system** and most of your other obligations follow from that single cell.
3. Review quarterly. Update immediately when you add or remove a system.
4. Store the inventory somewhere your DPO, CTO and legal counsel can all read.

## Inventory table

| # | System name | Purpose | Provider (in-house / vendor) | Personal data? | Automated decisions? | AI Act tier | Owner | DPIA done? | Last reviewed |
|---|---|---|---|---|---|---|---|---|---|
| 1 | {{EXAMPLE: GPT-4 customer support assistant}} | {{answers user queries in-app chat}} | {{OpenAI (gpt-4o)}} | yes (user messages) | no (human agent approves replies) | Limited risk (Art. 50) | {{Head of Support}} | yes | {{YYYY-MM-DD}} |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |

## AI Act tier definitions (condensed)

- **Prohibited (Art. 5):** social scoring, untargeted scraping of facial images, emotion recognition in the workplace and education, predictive policing based solely on profiling. **If any row fits here — stop and consult counsel.**
- **High-risk (Annex III):** recruitment/hiring, credit scoring, insurance risk assessment, biometric identification, education access, essential private/public services, law enforcement, migration, administration of justice, democratic processes.
- **Limited risk (Art. 50):** systems that interact with humans (chatbots), emotion recognition, biometric categorisation, deep fakes, generative output. Transparency + marking obligations only.
- **Minimal risk:** everything else. Best-practice recommended but no mandatory obligations.

## Quality checklist

- [ ] Every AI feature mentioned in any marketing, pricing, or technical documentation is in this inventory.
- [ ] Every vendor in the "Provider" column has a current DPA on file.
- [ ] Every row with "Personal data? = yes" has a DPIA or an explicit risk-based decision not to do one.
- [ ] The person in "Owner" can actually be reached. Not a deprecated team, not a personal email.
- [ ] At least one Annex III row triggers the full high-risk playbook (template 07 DPIA + template 08 audit log + template 04 candidate notice where relevant).

---

*Template © HireCheck / hirecheck.eu. Licenced for unlimited internal use by the purchasing organisation. Not for resale.*
