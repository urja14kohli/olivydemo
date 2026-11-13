import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import BrandLogo from '../components/BrandLogo'
import { BRAND } from '../lib/brand'

const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }
const EASE = [0.22, 1, 0.36, 1] as const

const PLATFORMS = [
  { id: 'ig', name: 'Instagram', note: 'Posts, reels and replies', color: '#E1306C', glyph: 'Ig' },
  { id: 'tt', name: 'TikTok', note: 'The same reel, cut for TikTok', color: '#111', glyph: 'Tt' },
  { id: 'fb', name: 'Facebook', note: 'Your page and your ads', color: '#1877F2', glyph: 'f' },
  { id: 'shop', name: 'Shopify', note: 'Products and real sales', color: '#5A863E', glyph: 'S' },
  { id: 'ga', name: 'Google Analytics', note: 'What actually drives traffic', color: '#E37400', glyph: 'Ga' },
  { id: 'mail', name: 'Mailchimp', note: 'Newsletters and audiences', color: '#FFC21A', glyph: 'Mc' },
]

type State = 'off' | 'busy' | 'on'
type Props = { site: string; onDone: () => void }

export default function Connect({ site, onDone }: Props) {
  const [state, setState] = useState<Record<string, State>>({})
  const count = Object.values(state).filter((s) => s === 'on').length

  const connect = (id: string) => {
    if (state[id]) return
    setState((s) => ({ ...s, [id]: 'busy' }))
    setTimeout(() => setState((s) => ({ ...s, [id]: 'on' })), 1000)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(139,126,200,0.18), rgba(250,250,250,0) 70%)' }}
      />

      <header className="relative flex items-center justify-between px-[clamp(20px,5vw,64px)] pt-6">
        <Wordmark size={32} />
        <div className="flex items-center gap-5 text-[13px] text-ink-3">
          <span className="hidden sm:inline">{site || BRAND.domain}</span>
          <span className="flex items-center gap-1.5" aria-label="Step 3 of 3">
            <span className="h-1 w-6 rounded-full bg-accent-2" />
            <span className="h-1 w-6 rounded-full bg-accent-2" />
            <span className="h-1 w-6 rounded-full bg-accent" />
          </span>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[860px] flex-1 flex-col items-center justify-center px-6 pb-10 pt-6 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <p className="m-0 mb-4 text-[13px] text-ink-3">Last step</p>
          <h1 className="m-0 text-[clamp(38px,5vw,64px)] font-normal leading-[1.03] tracking-[-0.015em]" style={SERIF}>
            Give Olivy a way to publish.
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-relaxed text-ink-3">
            Connect what you use. Olivy posts, replies and reports from there. Skip any and add them later in Settings.
          </p>
        </motion.div>

        <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PLATFORMS.map((p, i) => {
            const st = state[p.id] ?? 'off'
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => connect(p.id)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                className={`group relative flex flex-col items-start rounded-2xl border-0 bg-white p-5 text-left transition-all duration-300 ${
                  st === 'on'
                    ? 'shadow-[inset_0_0_0_1.5px_var(--accent),0_10px_30px_rgba(107,63,160,0.12)]'
                    : 'shadow-[inset_0_0_0_1px_var(--line),0_1px_2px_rgba(26,26,46,0.04)] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_var(--line-2),0_14px_34px_rgba(26,26,46,0.08)]'
                }`}
              >
                <BrandLogo id={p.id} name={p.name} color={p.color} glyph={p.glyph} size={46} />
                <span className="mt-5 text-[16.5px] font-medium tracking-[-0.01em]">{p.name}</span>
                <span className="mt-0.5 text-[13.5px] leading-snug text-ink-3">{p.note}</span>
                <span className="mt-4 text-[14px] font-medium">
                  {st === 'on' ? (
                    <span className="inline-flex items-center gap-1.5 text-success">
                      <Check className="size-4" strokeWidth={2.6} /> Connected
                    </span>
                  ) : st === 'busy' ? (
                    <span className="shimmer">Connecting</span>
                  ) : (
                    <span className="text-accent group-hover:underline">Connect</span>
                  )}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-10 flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={onDone}
            className="h-12 w-full max-w-[320px] rounded-xl border-0 bg-accent px-6 text-[16px] font-medium text-white shadow-[0_4px_14px_rgba(107,63,160,.3)] transition hover:brightness-110"
          >
            {count ? `Open Hub with ${count} connected` : 'Open Hub'}
          </button>
          {!count && (
            <button type="button" onClick={onDone} className="border-0 bg-transparent p-0 text-[14.5px] text-ink-3 hover:text-ink">
              Skip for now
            </button>
          )}
          <p className="m-0 mt-2 inline-flex items-center gap-2 text-[13px] text-ink-3">
            <Lock className="size-3.5" strokeWidth={2} /> Nothing goes out without your approval.
          </p>
        </div>
      </main>
    </div>
  )
}
