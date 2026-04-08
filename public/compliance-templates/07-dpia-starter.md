# DPIA Starter — AI Processing

**Version 1.0 · Data Protection Impact Assessment template under GDPR Art. 35**

> Not legal advice. Starter template against GDPR Art. 35, EDPB Guidelines 4/2019 on DPIA, and AI Act Art. 27 (Fundamental Rights Impact Assessment). Your DPO signs off the final version.

## When you need one

A DPIA is mandatory under GDPR Art. 35 whenever processing is "likely to result in a high risk" to the rights and freedoms of individuals. For AI, this is almost always the case when any of the following is true:

- the processing is large-scale and touches personal data;
- the processing involves automated decision-making producing legal or similarly significant effects on individuals (Art. 22);
- the processing uses new technologies;
- the processing fits one of the categories on your national supervisory authority's "DPIA required" list (most do list "use of AI" explicitly).

Under AI Act Art. 27, deployers of high-risk AI systems used by public authorities or providing services of general interest must also complete a Fundamental Rights Impact Assessment, which overlaps substantially with the DPIA. Doing them together saves work.

## How to use

1. Fill out every section below. Do not skip.
2. Consult the DPO in section 7 before sign-off.
3. Review annually or whenever you materially change the processing (new vendor, new feature, new data type).
4. Keep the signed DPIA for at least the duration of the processing plus three years.

---

## 1. Description of the processing

| Field | Value |
|---|---|
| Processing name | {{e.g. "GPT-4 customer support assistant"}} |
| Description | {{2-3 sentence summary}} |
| Owner (role, not person) | {{e.g. Head of Support}} |
| Start of processing | {{YYYY-MM-DD}} |
| Categories of data subjects | {{customers, employees, job applicants, ...}} |
| Categories of personal data | {{e.g. name, email, ticket content}} |
| Categories of special category data (Art. 9) | {{e.g. none / health data}} |
| Recipients (internal) | {{e.g. support team, engineering on-call}} |
| Recipients (external processors) | {{list vendors}} |
| International transfers | {{none / SCCs / DPF}} |
| Retention period | {{e.g. 30 days prompts, 7 years audit logs}} |
| Lawful basis under Art. 6 | {{legitimate interest, contract, consent, ...}} |
| Lawful basis under Art. 9 (if applicable) | {{explicit consent / substantial public interest}} |

## 2. Necessity and proportionality

- Why is this processing necessary? Could you achieve the same goal with less data or without AI?
- What is the expected benefit to users, and to {{COMPANY_NAME}}?
- What alternatives have you considered, and why were they rejected?

## 3. Risk assessment

List every risk you can think of. A good DPIA typically has 8-15 rows. Score each 1-5 for likelihood and severity; risk rating is likelihood × severity.

| # | Risk | Likelihood (1-5) | Severity (1-5) | Score | Mitigation |
|---|---|---|---|---|---|
| 1 | {{e.g. vendor retains prompts and uses them for training}} | 2 | 4 | 8 | {{zero-retention DPA with vendor; quarterly audit}} |
| 2 | {{e.g. hallucinated answer sent to customer}} | 4 | 3 | 12 | {{human review before every customer-facing send}} |
| 3 | {{e.g. prompt injection leaks another customer's data}} | 2 | 5 | 10 | {{prompt sanitisation; tenant isolation; penetration test}} |
| 4 | | | | | |
| 5 | | | | | |

Any risk scored 15 or higher must have a stated mitigation and a named owner.

## 4. Measures envisaged

- **Data minimisation** — what fields do you strip before sending to the model?
- **Human oversight** — where is the human in the loop, and what is their SLA?
- **Transparency** — how are users informed? (Cross-reference templates 02, 03, 04 in this pack.)
- **Logging** — what gets logged, where, for how long? (Cross-reference template 08.)
- **Incident response** — who gets paged, how fast?
- **Vendor controls** — DPA signed (date), DDQ completed (date).
- **Security** — access controls, encryption at rest and in transit.

## 5. Consultation

If residual risk is high even after mitigation, you must consult your supervisory authority under Art. 36. Before reaching that step, document consultation with:

- **The DPO.** Name, date, signature. Their formal opinion.
- **Internal stakeholders.** Engineering, product, legal, security.
- **A representative sample of data subjects**, where reasonable.

## 6. Residual risk decision

After all mitigations, the residual risk to data subjects is: **{{low / medium / high}}**.

If **high**: consult the supervisory authority before processing starts.
If **medium** or **low**: proceed, review annually.

## 7. Sign-off

| Name | Role | Signature | Date |
|---|---|---|---|
| {{}} | Processing owner | | |
| {{}} | Data Protection Officer | | |
| {{}} | Security lead | | |

## 8. Review

Scheduled next review: **{{YYYY-MM-DD}}** (no later than 12 months from sign-off, or immediately upon material change).

---

*Template © HireCheck / hirecheck.eu. Licenced for unlimited internal use by the purchasing organisation. Not for resale.*
