// GDPR Article 22 letter generator.
// Article 22(3) gives data subjects the right to obtain human intervention,
// to express their point of view, and to contest a decision made solely on
// automated processing (incl. profiling) that produces legal or similarly
// significant effects (e.g. recruitment rejection).

export type Lang = "en" | "et"

export interface LetterInput {
  lang: Lang
  candidateName: string
  candidateEmail: string
  companyName: string
  position: string
  appliedOn: string // ISO date
  rejectedOn: string // ISO date
  atsOrTool?: string // optional, e.g. "Workday", "HireVue"
}

export interface LetterOutput {
  subject: string
  body: string
  filename: string
}

function fmtDate(iso: string, lang: Lang): string {
  if (!iso) return "[date]"
  try {
    return new Date(iso).toLocaleDateString(lang === "et" ? "et-EE" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export function generateLetter(input: LetterInput): LetterOutput {
  const {
    lang,
    candidateName,
    candidateEmail,
    companyName,
    position,
    appliedOn,
    rejectedOn,
    atsOrTool,
  } = input

  const today = new Date().toLocaleDateString(
    lang === "et" ? "et-EE" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const safeCompany = companyName || "[Company]"
  const safePosition = position || "[Position]"
  const safeName = candidateName || "[Your name]"
  const safeEmail = candidateEmail || "[your email]"
  const tool = atsOrTool ? ` (${atsOrTool})` : ""

  if (lang === "et") {
    const subject = `GDPR artikkel 22 — palve inimese poolt teostatavaks ülevaatuseks (${safePosition})`
    const body = `${today}

Lugupeetud ${safeCompany} värbamismeeskond,

Mina, ${safeName}, kandideerisin teie ettevõttes positsioonile "${safePosition}" ${fmtDate(appliedOn, "et")}. ${fmtDate(rejectedOn, "et")} sain teate, et minu kandidatuur ei jätkanud edasi valikuprotsessis.

Mul on alust arvata, et kõnealune otsus tehti vähemalt osaliselt automatiseeritud töötlemise${tool} teel, ilma sisulise inimliku läbivaatuseta. Pöördun teie poole tuginedes isikuandmete kaitse üldmääruse (EL 2016/679, edaspidi "GDPR") artiklile 22 ja artiklile 15.

Palun:

1. Kinnitada, kas otsuse tegemiseks kasutati automatiseeritud töötlemist, sealhulgas profiilianalüüsi (GDPR art 22 lg 1).
2. Kui jah, esitada artiklis 15 lg 1 punktis h sätestatud sisuline teave automatiseeritud otsuse loogika, olulisuse ja kavandatavate tagajärgede kohta.
3. Tagada GDPR artikli 22 lg 3 alusel minu õigus inimese sekkumisele otsustusprotsessis, võimalus väljendada oma seisukohta ja vaidlustada otsus.
4. Säilitada minu kandideerimisega seotud isikuandmed senikaua, kuni käesolev nõue on lahendatud, ning mitte kustutada need automaatselt enne läbivaatuse lõppemist.

GDPR artikli 12 lg 3 kohaselt ootan vastust ühe (1) kuu jooksul käesoleva kirja saamisest.

Juhul, kui ülaltoodud punktidele ei vastata, jätan endale õiguse pöörduda Andmekaitse Inspektsiooni poole (https://www.aki.ee) ja esitada kaebus GDPR artikli 77 alusel.

Lugupidamisega,
${safeName}
${safeEmail}

—
See kiri on koostatud HireSignali tasuta tööriista abil (https://hirecheck.eu/human-review). Tööriist ei asenda õigusabi.`
    return {
      subject,
      body,
      filename: `gdpr-art22-${safeCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`,
    }
  }

  // English
  const subject = `GDPR Article 22 — request for human review (${safePosition})`
  const body = `${today}

Dear ${safeCompany} hiring team,

My name is ${safeName} and I applied for the position "${safePosition}" at your company on ${fmtDate(appliedOn, "en")}. On ${fmtDate(rejectedOn, "en")} I was informed that my application would not proceed.

I have reason to believe that this decision was made, at least in part, through automated processing${tool}, without meaningful human review. I am writing to you under Articles 22 and 15 of the General Data Protection Regulation (EU 2016/679, "GDPR").

I hereby request that you:

1. Confirm whether the decision was based on automated processing, including profiling, within the meaning of Article 22(1) GDPR.
2. If so, provide the meaningful information about the logic involved, as well as the significance and envisaged consequences of such processing, as required by Article 15(1)(h) GDPR.
3. Grant me the rights set out in Article 22(3) GDPR, namely (a) human intervention by a competent member of your staff, (b) the opportunity to express my point of view, and (c) the right to contest the decision.
4. Preserve all personal data relating to my application until this request has been resolved, and refrain from automatically deleting it before the review is concluded.

Pursuant to Article 12(3) GDPR I expect a substantive response within one (1) month from receipt of this letter.

Should you fail to address the above, I reserve the right to lodge a complaint with the competent supervisory authority under Article 77 GDPR.

Yours sincerely,
${safeName}
${safeEmail}

—
This letter was generated with HireSignal's free tool (https://hirecheck.eu/human-review). It does not constitute legal advice.`

  return {
    subject,
    body,
    filename: `gdpr-art22-${safeCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`,
  }
}
