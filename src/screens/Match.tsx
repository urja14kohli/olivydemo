import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import { InstagramLogo } from '../components/Icons'
import { MATCH_ROUNDS } from '../lib/demo'
import type { MatchOption } from '../lib/demo'
import { BRAND } from '../lib/brand'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  site: string
  onDone: (picks: MatchOption[]) => void
}

export default function Match({ site, onDone }: Props) {
  const [round, setRound] = useState(0)
  const [picks, setPicks] = useState<MatchOption[]>([])
  const [picked, setPicked] = useState<'a' | 'b' | null>(null)
  const current = MATCH_ROUNDS[round]

  const choose = (side: 'a' | 'b') => {
    if (picked) return
    setPicked(side)
    const option = side === 'a' ? current.a : current.b
    const next = [...picks, option]
    setTimeout(() => {
      if (round >= MATCH_ROUNDS.length - 1) {
        onDone(next)
        return
      }
      setPicks(next)
      setPicked(null)
      setRound((r) => r + 1)
    }, 450)
  }

  return (
    <div className="flex h-screen min-h-[560px] flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between px-[clamp(20px,5vw,64px)] pt-5">
        <Wordmark size={32} />
        <span className="text-sm text-ink-3">{site || BRAND.domain}</span>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[920px] flex-1 flex-col px-5 pb-6 pt-[clamp(8px,2vh,24px)] sm:px-8">
        <div className="mb-[clamp(12px,2.4vh,28px)] shrink-0 text-center">
          <p className="label mb-2">{current.typeLabel}</p>
          <h1 className="m-0 whitespace-nowrap text-[clamp(30px,min(4.4vw,6.4vh),56px)] font-normal leading-[1.05] tracking-[-0.005em] text-ink" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            {current.prompt}
          </h1>
          <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden>
            {MATCH_ROUNDS.map((_, i) => (
              <span key={i} className={`h-1 w-7 rounded-full transition-colors ${i === round ? 'bg-accent' : i < round ? 'bg-accent-2' : 'bg-fill-2'}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid min-h-0 flex-1 grid-cols-2 gap-4 sm:gap-5"
          >
            <PostCard option={current.a} selected={picked === 'a'} dimmed={picked === 'b'} onPick={() => choose('a')} />
            <PostCard option={current.b} selected={picked === 'b'} dimmed={picked === 'a'} onPick={() => choose('b')} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

function PostCard({
  option,
  selected,
  dimmed,
  onPick,
}: {
  option: MatchOption
  selected: boolean
  dimmed: boolean
  onPick: () => void
}) {
  const ring = selected ? 'scale-[1.015] ring-2 ring-accent' : ''
  const fade = dimmed ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-lift-hi'
  const tick = selected && (
    <span className="absolute left-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-accent text-white">
      <Check className="size-4" strokeWidth={2.6} />
    </span>
  )

  // Newsletter: show it as the email it is
  if (option.heading) {
    return (
      <button type="button" onClick={onPick} className={`relative flex min-h-0 flex-col overflow-hidden rounded-xl border-0 bg-white p-0 text-left shadow-lift transition-all duration-300 ${ring} ${fade}`}>
        {tick}
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-2.5 text-[12px] text-ink-3">
          <span><b className="font-medium text-ink-2">Perféro</b> · hello@perferofragrance.com</span>
          <span>Tue 9:00 AM</span>
        </div>
        <div className="shrink-0 px-5 pt-3">
          <p className="m-0 text-[12px] text-ink-3">Subject</p>
          <p className="m-0 text-[15px] font-medium text-ink">{option.subject}</p>
        </div>
        <div className="relative mx-5 mt-3 min-h-0 flex-1 overflow-hidden rounded-lg bg-fill">
          <img src={option.image} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="shrink-0 px-5 pb-4 pt-4">
          <p className="m-0 text-[clamp(22px,2.6vh,30px)] leading-[1.1] text-ink" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{option.heading}</p>
          <p className="m-0 mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-3">{option.body}</p>
          <span className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-[12.5px] font-medium text-white">{option.cta}</span>
        </div>
        <p className="m-0 shrink-0 border-t border-line px-5 py-2 text-[11.5px] text-ink-3">{option.title}</p>
      </button>
    )
  }

  return (
    <button type="button" onClick={onPick} className={`group relative flex min-h-0 flex-col overflow-hidden rounded-xl border-0 bg-surface p-0 text-left shadow-lift transition-all duration-300 ${ring} ${fade}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-fill">
        {option.video ? (
          <video src={option.video} poster={option.image} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
        ) : (
          <img src={option.image} alt="" className="absolute inset-0 size-full object-cover" />
        )}
        {option.duration && (
          <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-[12px] font-medium text-white">{option.duration}</span>
        )}
        {option.handle ? (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/60 to-transparent p-3.5 pt-12">
            <img src={option.avatar} alt="" className="size-8 rounded-full object-cover ring-2 ring-white/80" />
            <span className="text-[13px] font-medium text-white">{option.handle}</span>
          </div>
        ) : (
          <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/95">
            <InstagramLogo className="size-[18px]" />
          </span>
        )}
        {tick}
      </div>
      <div className="flex shrink-0 flex-col gap-1 px-4 pb-3.5 pt-3">
        <p className="m-0 text-[12.5px] font-medium text-ink-3">{option.title}</p>
        <p className="m-0 line-clamp-2 text-[14px] leading-snug text-ink">{option.caption}</p>
      </div>
    </button>
  )
}
