// CV AI-pattern analyzer. Pure rule-based. No ML.
// Goal: surface the patterns real AI detectors (GPTZero, Originality, Copyleaks)
// and ATS-side AI-writing filters typically flag. We never claim to beat any
// specific detector; we show the patterns.

const CLICHES: string[] = [
  // HR/CV clichés that AI loves
  "passionate about", "results-driven", "results driven", "detail-oriented",
  "detail oriented", "team player", "self-starter", "self starter",
  "hard-working", "hard working", "proven track record", "exceeded expectations",
  "above and beyond", "go-to person", "go to person", "thought leader",
  "value proposition", "value-add", "value add",
  // Corporate LLM tells
  "leveraging", "leverage", "leveraged", "synergy", "synergies", "synergistic",
  "spearheaded", "orchestrated", "championed", "empowered", "streamlined",
  "facilitated", "catalyzed", "galvanized", "pioneered",
  "cutting-edge", "cutting edge", "state-of-the-art", "state of the art",
  "world-class", "world class", "best-in-class", "best in class",
  "strategic", "strategically", "dynamic", "innovative", "innovation",
  "paradigm shift", "move the needle", "think outside the box", "deep dive",
  "ecosystem", "holistic approach", "holistic", "touched base", "circle back",
  // Classic LLM stylistic tells
  "in order to", "furthermore", "moreover", "nevertheless", "subsequently",
  "consequently", "accordingly", "ultimately", "indeed", "arguably",
  "notably", "particularly", "especially", "importantly",
  "delved into", "delve into", "tapestry", "underscore", "underscores",
  "underscored", "pivotal", "crucial", "vital", "essential", "meticulous",
  "meticulously", "comprehensive", "robust", "seamless", "seamlessly",
  "optimize", "optimized", "optimization", "utilize", "utilized", "utilization",
  "implement", "implemented", "implementation",
  // Hedge phrases AI overuses
  "it is worth noting", "it should be noted", "it is important to note",
  "it is worth mentioning", "in today's", "in today's world",
  "in the ever-evolving", "in the rapidly evolving", "ever-changing landscape",
  "navigating the", "navigate the",
]

const SENTENCE_SPLIT = /(?<=[.!?])\s+(?=[A-ZÄÖÜÕŠŽ])/

export type HighlightType = "cliche" | "burstiness" | "adverb" | "hedge" | "em_dash"

export interface Highlight {
  type: HighlightType
  text: string
  reason: string
  suggestion: string
}

export interface CvAnalysis {
  score: number // 0-100 AI-risk
  risk: "low" | "medium" | "high"
  stats: {
    words: number
    sentences: number
    avg_sentence_length: number
    burstiness: number // coefficient of variation
    cliche_count: number
    adverb_ratio: number
    em_dash_count: number
    hedge_count: number
  }
  highlights: Highlight[]
  summary: string
}

export function analyzeCv(raw: string): CvAnalysis {
  const text = raw.trim()
  if (!text) {
    return emptyAnalysis()
  }

  const lower = text.toLowerCase()
  const words = text.split(/\s+/).filter(Boolean)
  const sentences = text
    .split(SENTENCE_SPLIT)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  // 1. Cliché detection — exact substring
  const highlights: Highlight[] = []
  const clicheMatches: { phrase: string; sentence: string }[] = []
  for (const phrase of CLICHES) {
    let idx = lower.indexOf(phrase)
    while (idx !== -1) {
      const sentence = findSentenceContaining(sentences, idx, text)
      clicheMatches.push({ phrase, sentence })
      idx = lower.indexOf(phrase, idx + phrase.length)
    }
  }
  // Dedupe by (phrase, sentence)
  const seen = new Set<string>()
  for (const m of clicheMatches) {
    const key = `${m.phrase}::${m.sentence}`
    if (seen.has(key)) continue
    seen.add(key)
    if (highlights.filter((h) => h.type === "cliche").length < 20) {
      highlights.push({
        type: "cliche",
        text: m.sentence,
        reason: `Contains the AI-over-used phrase "${m.phrase}".`,
        suggestion: suggestForCliche(m.phrase),
      })
    }
  }

  // 2. Burstiness (coefficient of variation of sentence word counts)
  const lens = sentences.map((s) => s.split(/\s+/).filter(Boolean).length)
  const avgLen = lens.reduce((a, b) => a + b, 0) / Math.max(lens.length, 1)
  const variance =
    lens.reduce((sum, n) => sum + (n - avgLen) ** 2, 0) / Math.max(lens.length, 1)
  const stddev = Math.sqrt(variance)
  const burstiness = avgLen > 0 ? stddev / avgLen : 0

  if (sentences.length >= 4 && burstiness < 0.45) {
    // pick two example sentences close to the average
    const exemplars = sentences
      .slice(0, 20)
      .filter((s) => {
        const n = s.split(/\s+/).filter(Boolean).length
        return Math.abs(n - avgLen) <= 2 && n >= 6
      })
      .slice(0, 2)
    for (const s of exemplars) {
      highlights.push({
        type: "burstiness",
        text: s,
        reason: `Your sentences have unusually uniform length (avg ${avgLen.toFixed(
          1,
        )} words, variation only ${(burstiness * 100).toFixed(0)}%). Human writing is bursty — mix 4-word lines with 22-word ones.`,
        suggestion:
          "Break this into one short punchy line and one longer follow-up, or merge with a neighbour.",
      })
    }
  }

  // 3. Adverb ratio (-ly words)
  const adverbs = words.filter((w) => /ly[.,;:!?)]?$/i.test(w) && w.length > 4)
  const adverbRatio = adverbs.length / Math.max(words.length, 1)
  if (adverbRatio > 0.035) {
    const examples = Array.from(new Set(adverbs))
      .slice(0, 5)
      .map((w) => w.replace(/[.,;:!?)]/g, ""))
    highlights.push({
      type: "adverb",
      text: examples.join(", "),
      reason: `Adverb density is ${(adverbRatio * 100).toFixed(
        1,
      )}% — AI writing averages 3-5%, strong human prose is under 2%.`,
      suggestion:
        "Delete -ly words or replace them with a stronger verb. 'Significantly improved' → 'doubled'.",
    })
  }

  // 4. Em-dash / en-dash density (ChatGPT tell)
  const emDashCount = (text.match(/[—–]/g) || []).length
  if (emDashCount >= 3) {
    highlights.push({
      type: "em_dash",
      text: `${emDashCount} em/en-dashes`,
      reason:
        "Em-dashes (—) are a well-known ChatGPT signature. Most humans type - or , instead.",
      suggestion:
        "Replace — with a comma, period, or hyphen. Keep at most one em-dash in a CV.",
    })
  }

  // 5. Hedge phrases already counted inside clichés above, but count them separately for scoring
  const hedgePhrases = [
    "it is worth noting",
    "it should be noted",
    "it is important to note",
    "in today's",
    "in the ever-evolving",
    "navigating the",
  ]
  const hedgeCount = hedgePhrases.reduce(
    (n, p) => n + (lower.split(p).length - 1),
    0,
  )

  // Scoring
  let score = 0
  score += Math.min(50, clicheMatches.length * 4)
  if (sentences.length >= 4) {
    if (burstiness < 0.3) score += 25
    else if (burstiness < 0.45) score += 15
    else if (burstiness < 0.6) score += 5
  }
  if (adverbRatio > 0.05) score += 10
  else if (adverbRatio > 0.035) score += 5
  score += Math.min(15, emDashCount * 3)
  score += Math.min(10, hedgeCount * 5)
  score = Math.min(100, Math.round(score))

  const risk: "low" | "medium" | "high" =
    score <= 25 ? "low" : score <= 55 ? "medium" : "high"

  return {
    score,
    risk,
    stats: {
      words: words.length,
      sentences: sentences.length,
      avg_sentence_length: Number(avgLen.toFixed(1)),
      burstiness: Number(burstiness.toFixed(2)),
      cliche_count: clicheMatches.length,
      adverb_ratio: Number(adverbRatio.toFixed(3)),
      em_dash_count: emDashCount,
      hedge_count: hedgeCount,
    },
    highlights,
    summary: buildSummary(score, risk, clicheMatches.length, burstiness, emDashCount),
  }
}

function findSentenceContaining(sentences: string[], charIdx: number, full: string): string {
  let pos = 0
  for (const s of sentences) {
    const next = full.indexOf(s, pos)
    if (next === -1) continue
    if (charIdx >= next && charIdx <= next + s.length) return s
    pos = next + s.length
  }
  return sentences[0] || ""
}

function suggestForCliche(phrase: string): string {
  const map: Record<string, string> = {
    "passionate about":
      "Replace with a specific reason. 'Passionate about fintech' → 'I picked fintech because payment rails are the plumbing of the internet'.",
    "results-driven":
      "Delete. Show a result instead: '+38% retention in Q3'.",
    "results driven":
      "Delete. Show a result instead: '+38% retention in Q3'.",
    "team player":
      "Delete. Name a team outcome: 'led 4-person migration of legacy monolith'.",
    leveraging: "Replace with 'using' or the specific action.",
    leverage: "Replace with 'use' or the specific verb.",
    spearheaded: "Replace with 'led' or 'started'.",
    "cutting-edge": "Delete or name the specific tech.",
    "state-of-the-art": "Delete or name the specific tech.",
    synergy: "Delete — humans rarely type this.",
    synergies: "Delete — humans rarely type this.",
    "in order to": "Replace with 'to'.",
    utilize: "Replace with 'use'.",
    utilized: "Replace with 'used'.",
    implement: "Replace with the specific verb: 'shipped', 'wrote', 'built'.",
    robust: "Delete or name the specific guarantee (e.g. '99.9% uptime').",
    seamless: "Delete or name the specific UX win.",
  }
  return (
    map[phrase.toLowerCase()] ||
    "Replace with a specific concrete detail, or delete the sentence."
  )
}

function buildSummary(
  score: number,
  risk: "low" | "medium" | "high",
  cliches: number,
  burstiness: number,
  emDashes: number,
): string {
  if (score === 0) return "Paste a CV above to get your AI-pattern score."
  const parts: string[] = []
  parts.push(
    risk === "low"
      ? "Your CV looks mostly human. Most AI detectors will leave it alone."
      : risk === "medium"
        ? "Your CV has several AI-writing patterns. Some detectors will flag it, others will not."
        : "Your CV reads heavily like AI output. Most detectors will flag it and many ATS filters will auto-reject.",
  )
  if (cliches > 0)
    parts.push(`Found ${cliches} instance${cliches === 1 ? "" : "s"} of AI-cliché phrases.`)
  if (burstiness > 0 && burstiness < 0.45)
    parts.push(`Sentence length is unusually uniform (variation ${(burstiness * 100).toFixed(0)}%).`)
  if (emDashes >= 3)
    parts.push(`${emDashes} em-dashes detected — a classic ChatGPT tell.`)
  return parts.join(" ")
}

function emptyAnalysis(): CvAnalysis {
  return {
    score: 0,
    risk: "low",
    stats: {
      words: 0,
      sentences: 0,
      avg_sentence_length: 0,
      burstiness: 0,
      cliche_count: 0,
      adverb_ratio: 0,
      em_dash_count: 0,
      hedge_count: 0,
    },
    highlights: [],
    summary: "Paste a CV above to get your AI-pattern score.",
  }
}
