# Vendor AI Due-Diligence Questionnaire

**Version 1.0 · 25 questions to send to every AI vendor before you sign**

> Not legal advice. These questions are designed to surface the gaps most EU AI-vendor contracts have today. Adapt to your risk tier.

## Purpose

Under GDPR Art. 28, you remain responsible for the personal data your AI vendors process on your behalf. Under AI Act Art. 25, deployers have specific obligations that depend on what the provider has already done. Under AI Act Art. 26(3), deployers must monitor the operation of the AI system and inform the provider if they suspect a risk. You cannot meet any of these obligations if you do not know what your vendor is doing.

Send this questionnaire to every AI vendor **before** you sign. File the completed answers with the vendor contract. Review annually.

## How to use

1. Export the questions below to a document or a shared spreadsheet.
2. Send to the vendor with a 14-day response deadline.
3. Red-flag any missing answer, any "N/A" that does not have a written justification, and any answer that conflicts with public marketing claims.
4. For vendors supporting Annex III high-risk use cases (hiring, credit, insurance, biometrics, etc.) treat any red flag as a hard block until resolved.

## The questions

### A. Company and product

1. Legal entity name, address, and lead supervisory authority.
2. Product name(s) covered by this response and their current version.
3. Are you the provider (builder) or deployer (reseller) under AI Act terminology?
4. If you use subprocessors, list them with country and purpose.

### B. Data processing

5. What personal data will our users' data touch when flowing through your product? (Categories, not just "input text".)
6. Where is that data processed physically? List all countries.
7. Do you retain prompts, completions, or model inputs? If yes: for how long, for what purpose, and is opt-out available?
8. Are the prompts and completions used for training your models or any other model? If yes: is opt-out available and documented?
9. Describe your data deletion procedure and SLA on a deletion request.

### C. DPA and legal

10. Do you offer a GDPR Art. 28 compliant DPA? Please attach it.
11. Do you use the current European Commission Standard Contractual Clauses for any transfer to a third country? Which modules?
12. Do you hold a valid Data Privacy Framework certification (if US)?
13. Are you willing to agree to an audit right as required by Art. 28(3)(h)?

### D. AI Act conformity

14. For any high-risk system you provide: have you completed the conformity assessment under AI Act Art. 43 and affixed the CE marking under Art. 48?
15. Can you share the technical documentation required by Annex IV, or at minimum the summary required by Art. 53?
16. Do you maintain automatic logs of system events as required by Art. 12? What retention?
17. Do you publish a public summary of the training data used (Art. 53(1)(d)) if your system is a GPAI model?
18. What human oversight measures does your system support in line with Art. 14? How do deployers configure them?
19. What is your process for incident reporting under Art. 73 (serious incidents)?

### E. Security and robustness

20. Describe your security controls (ISO 27001? SOC 2? EU 2 Cybersecurity Act certification scheme?).
21. How do you test for adversarial inputs, prompt injection, and jailbreaking?
22. What is your SLA for disclosing a vulnerability that affects customer data?

### F. Bias, robustness and human rights

23. What steps have you taken to assess and mitigate bias in your model outputs? Link to any published bias or fairness report.
24. Has your system ever been assessed by a third party for conformity with EU fundamental rights, and if so can you share the assessment?

### G. Escalation

25. Who is the single point of contact for data protection matters at your company, and what is their response SLA for GDPR-related enquiries from our DPO?

---

## How to score the responses

- **Green:** every question answered, no gaps, DPA attached, AI Act conformity evidence provided (or clearly out of scope).
- **Amber:** two or fewer gaps, vendor willing to close them within 60 days in writing.
- **Red:** any gap in sections B, C, or D that the vendor cannot close within 60 days. Do not sign.

---

*Template © HireCheck / hirecheck.eu. Licenced for unlimited internal use by the purchasing organisation. Not for resale.*
