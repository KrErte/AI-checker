# Internal AI Usage Policy

**Version 1.0 · For {{COMPANY_NAME}} employees and contractors**

> Not legal advice. Starter text — your HR and legal team should adapt it to your employment agreements and data classification.

## Purpose

This policy governs how {{COMPANY_NAME}} employees and contractors may use third-party generative AI tools (ChatGPT, Claude, Copilot, Gemini, Mistral, Perplexity, and equivalents) in the course of their work. It protects you, your colleagues, our customers, and the company from the main risks these tools create: leaking confidential data, producing work we cannot legally own, generating content that is wrong in ways we did not notice, and processing personal data without a lawful basis.

It does not tell you not to use AI. Used well, these tools make you faster. Used badly, they get us fined or sued.

## Scope

This policy applies to every employee, contractor, and intern of {{COMPANY_NAME}} when they use AI tools for work-related tasks, regardless of whether the tool is paid by the company, paid personally, or free. It applies during working hours and outside them when the task is work-related.

## The four rules

### 1. Never paste anything confidential into a tool that isn't on the approved list

The approved list is maintained at {{INTERNAL_WIKI_URL}} and currently includes: {{APPROVED_TOOLS, e.g. ChatGPT Team, Claude for Work, GitHub Copilot Business}}. Each tool on this list has a DPA, zero-retention terms, and has been checked for minimum security controls.

Anything not on the list — including the free tier of any tool above — is treated as an untrusted destination. You may use it for clearly non-confidential tasks (writing a blog post, summarising a public article) but never for anything involving: customer data, employee data, source code, internal financials, product roadmap, legal matters, HR cases, or incident details.

If you think a tool should be added to the list, ask {{APPROVER_ROLE}} — we review requests weekly.

### 2. You are responsible for what you ship

Anything AI helps you produce is still your output. Read it before you send it, commit it, publish it, or ship it to a customer. "The LLM said so" is not a defence.

Specifically:

- **Code:** review every suggestion before accepting. Never merge AI-generated code you do not understand. Never commit AI-generated secrets, licences, or cryptographic keys.
- **Customer-facing writing:** every sentence is attributable to you. Fact-check any claim, number, citation, or name before it goes out.
- **Legal, HR, or financial documents:** do not use AI to draft these without a human subject-matter expert reviewing the draft. Never use AI to analyse contracts you have not read yourself.

### 3. Respect personal data

If a task involves personal data — names, emails, CVs, health data, support tickets — treat it as Tier 1 confidential. You may only process it with an approved tool and only if your task has a lawful basis under GDPR Art. 6 already documented in your team's processing record.

When in doubt, ask the DPO **before** pasting. The DPO is **{{DPO_NAME}}** ({{DPO_EMAIL}}).

### 4. Disclose AI use where it matters

You must disclose that you used AI:

- in any written output delivered to a customer where AI authorship changes how the output should be read (e.g. draft contracts, technical recommendations);
- in any public statement or content attributed to {{COMPANY_NAME}};
- in any deliverable that will become training data for a model you or a customer operate;
- in any piece of work your manager explicitly asks you to deliver unaided.

You do not need to disclose AI use for: routine emails, personal productivity (notes, summaries for yourself), brainstorming, or formatting.

## What happens if this policy is violated

Minor, good-faith violations are a learning moment. Repeated or deliberate violations — especially those that leak personal data, confidential information, or source code — are treated as a serious breach of your employment agreement.

## Review

This policy is reviewed every {{6}} months by {{OWNER_ROLE}}. Suggestions and improvements are welcome: email {{OWNER_EMAIL}}.

---

*Signed off by:*

- {{CEO_NAME}}, Chief Executive Officer
- {{DPO_NAME}}, Data Protection Officer
- {{HR_NAME}}, Head of People

*Effective from {{YYYY-MM-DD}}. Last updated {{YYYY-MM-DD}}.*

---

*Template © HireCheck / hirecheck.eu. Licenced for unlimited internal use by the purchasing organisation. Not for resale.*
