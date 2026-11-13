import type { MatchRound } from './lumina'

export type BrandBrief = {
  name: string
  domain: string
  category: string
  voice: string
  audience: string
  products: string[]
  look: string
}

type ApiOption = {
  id: string
  title: string
  caption: string
  duration?: string
  image?: string
}

type ApiRound = {
  id: string
  kind: 'reel' | 'still' | 'caption'
  prompt: string
  typeLabel: string
  a: ApiOption
  b: ApiOption
}

export type OnboardResult = {
  brand: BrandBrief
  rounds: MatchRound[]
  ms: number
}

function toRound(r: ApiRound): MatchRound {
  const map = (o: ApiOption) => ({
    id: o.id,
    title: o.title,
    caption: o.caption,
    duration: o.duration,
    image: o.image || '/brand/hero.jpg',
  })
  return {
    id: r.id,
    kind: r.kind,
    prompt: r.prompt,
    typeLabel: r.typeLabel,
    a: map(r.a),
    b: map(r.b),
  }
}

/** Calls the real Olivy backend: captions (Gemini Flash) + images (Nano Banana). */
export async function onboardSite(site: string): Promise<OnboardResult> {
  const res = await fetch('/api/onboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Onboard failed (${res.status})`)
  return {
    brand: data.brand,
    rounds: (data.rounds as ApiRound[]).map(toRound),
    ms: data.ms,
  }
}

export async function apiHealth() {
  const res = await fetch('/api/health')
  return res.json() as Promise<{ ok: boolean; hasKey: boolean }>
}

/** One real call. Falls back to the stored brief on any failure or timeout. */
export async function analyzeSite(site: string, fallback: BrandBrief): Promise<BrandBrief> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site }),
      signal: AbortSignal.timeout(7000),
    })
    if (!res.ok) return fallback
    const data = await res.json()
    return data?.brand?.name ? (data.brand as BrandBrief) : fallback
  } catch {
    return fallback
  }
}
