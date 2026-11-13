import { GoogleGenAI } from '@google/genai'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, 'generated')

const CAPTION_MODEL = 'gemini-3.8-flash'
/** Nano Banana — Gemini native image generation */
const IMAGE_MODEL = 'gemini-3.1-flash-image'

export type BrandBrief = {
  name: string
  domain: string
  category: string
  voice: string
  audience: string
  products: string[]
  look: string
}

export type GenOption = {
  id: string
  title: string
  caption: string
  imagePrompt: string
  duration?: string
  image?: string
}

export type GenRound = {
  id: string
  kind: 'reel' | 'still' | 'caption'
  prompt: string
  typeLabel: string
  a: GenOption
  b: GenOption
}

function client() {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY missing')
  return new GoogleGenAI({ apiKey: key })
}

function ensureOut() {
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })
}

/** Pull readable text from a site homepage (best-effort). */
export async function fetchSiteText(domain: string): Promise<string> {
  const url = domain.startsWith('http') ? domain : `https://${domain}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'OlivyBot/1.0 (+demo)' },
      signal: AbortSignal.timeout(8000),
    })
    const html = await res.text()
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 6000)
  } catch {
    return ''
  }
}

export async function analyzeBrand(domain: string, siteText: string): Promise<BrandBrief> {
  const ai = client()
  const prompt = `You are branding research for a marketing OS called Olivy.
Given the domain and optional homepage text, return ONLY valid JSON:
{
  "name": "brand name",
  "domain": "${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}",
  "category": "short category",
  "voice": "tone in one short phrase",
  "audience": "who buys, short",
  "products": ["up to 4 product or offering names"],
  "look": "visual look: colors, lighting, materials"
}

Domain: ${domain}
Homepage text (may be empty): ${siteText || '(none — infer carefully from the domain)'}
`

  const res = await ai.models.generateContent({
    model: CAPTION_MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  })

  const text = res.text ?? '{}'
  try {
    return JSON.parse(text) as BrandBrief
  } catch {
    const host = domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return {
      name: host.split('.')[0] || 'Brand',
      domain: host,
      category: 'Consumer brand',
      voice: 'Clear, specific, never salesy',
      audience: 'Their existing customers',
      products: ['Core product'],
      look: 'Clean product photography, soft natural light',
    }
  }
}

export async function planMatchRounds(brand: BrandBrief): Promise<GenRound[]> {
  const ai = client()
  const prompt = `Create Instagram-ready A/B post options for this brand. Return ONLY JSON:
{
  "rounds": [
    {
      "id": "routine",
      "kind": "reel",
      "prompt": "Which reel feels more like {brand}?",
      "typeLabel": "Instagram Reels",
      "a": { "id": "a1", "title": "...", "caption": "max 110 chars", "imagePrompt": "photoreal product/lifestyle shot prompt", "duration": "0:24" },
      "b": { "id": "b1", "title": "...", "caption": "...", "imagePrompt": "...", "duration": "0:28" }
    },
    {
      "id": "product",
      "kind": "still",
      "prompt": "Which product moment feels right?",
      "typeLabel": "Product posts",
      "a": { "id": "a2", "title": "...", "caption": "...", "imagePrompt": "...", "duration": "0:18" },
      "b": { "id": "b2", "title": "...", "caption": "...", "imagePrompt": "...", "duration": "0:16" }
    },
    {
      "id": "voice",
      "kind": "caption",
      "prompt": "Which voice sounds like you?",
      "typeLabel": "Same frame, two captions",
      "a": { "id": "quiet", "title": "Quiet specific", "caption": "...", "imagePrompt": "hero product on clean surface" },
      "b": { "id": "warm", "title": "Slightly warmer", "caption": "...", "imagePrompt": "SAME as a — reuse hero product on clean surface" }
    }
  ]
}

Rules:
- Both options in a round are the SAME format (reel vs reel, still vs still).
- Everything is clearly about THIS brand's products — not stock vibes.
- Captions sound adult and specific, never kiddish or hypey.
- imagePrompt must describe photoreal vertical social content (4:5), no logos/watermarks/text overlays.

Brand JSON: ${JSON.stringify(brand)}
`

  const res = await ai.models.generateContent({
    model: CAPTION_MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  })

  const parsed = JSON.parse(res.text ?? '{"rounds":[]}') as { rounds: GenRound[] }
  if (!parsed.rounds?.length) throw new Error('Caption model returned no rounds')
  return parsed.rounds
}

/** Generate one image with Nano Banana; returns a public path under /generated/. */
export async function generateImage(imagePrompt: string, fileStem: string): Promise<string> {
  ensureOut()
  const ai = client()
  const fullPrompt = `${imagePrompt}

Photorealistic Instagram/TikTok still, vertical 4:5, soft natural light, premium brand photography, no text, no watermark, no logo.`

  // Prefer Interactions API (Nano Banana). Fall back to generateContent image modality.
  try {
    const interaction = await ai.interactions.create({
      model: IMAGE_MODEL,
      input: fullPrompt,
    })
    const img = interaction.output_image
    if (img?.data) {
      const path = join(OUT, `${fileStem}.png`)
      writeFileSync(path, Buffer.from(img.data, 'base64'))
      return `/generated/${fileStem}.png`
    }
  } catch {
    // fall through
  }

  const res = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: fullPrompt,
    config: {
      // @ts-expect-error image modality on Nano Banana models
      responseModalities: ['TEXT', 'IMAGE'],
    },
  })

  const parts = res.candidates?.[0]?.content?.parts ?? []
  for (const part of parts) {
    const inline = (part as { inlineData?: { data?: string; mimeType?: string } }).inlineData
    if (inline?.data) {
      const ext = inline.mimeType?.includes('jpeg') ? 'jpg' : 'png'
      const path = join(OUT, `${fileStem}.${ext}`)
      writeFileSync(path, Buffer.from(inline.data, 'base64'))
      return `/generated/${fileStem}.${ext}`
    }
  }

  throw new Error(`No image returned for ${fileStem}`)
}

export async function generateMatchForSite(site: string) {
  const domain = site.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'luminaskin.com'
  const siteText = await fetchSiteText(domain)
  const brand = await analyzeBrand(domain, siteText)
  const rounds = await planMatchRounds(brand)

  // Round 3 shares one image (two captions). Generate 5 unique prompts max.
  const jobs: { key: string; prompt: string; apply: (url: string) => void }[] = []

  for (const round of rounds) {
    if (round.kind === 'caption') {
      jobs.push({
        key: `${round.id}-shared`,
        prompt: round.a.imagePrompt,
        apply: (url) => {
          round.a.image = url
          round.b.image = url
        },
      })
    } else {
      jobs.push({
        key: `${round.id}-a`,
        prompt: round.a.imagePrompt,
        apply: (url) => {
          round.a.image = url
        },
      })
      jobs.push({
        key: `${round.id}-b`,
        prompt: round.b.imagePrompt,
        apply: (url) => {
          round.b.image = url
        },
      })
    }
  }

  const stamp = Date.now().toString(36)
  await Promise.all(
    jobs.map(async (job, i) => {
      const url = await generateImage(job.prompt, `${stamp}-${i}-${job.key}`)
      job.apply(url)
    }),
  )

  return { brand, rounds }
}

export function readGenerated(file: string): Buffer | null {
  const path = join(OUT, file)
  if (!existsSync(path)) return null
  return readFileSync(path)
}
