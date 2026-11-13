import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import OlivyOrb from '../components/OlivyOrb'
import { GEN_STEPS } from '../lib/demo'
import { analyzeSite } from '../lib/api'
import { BRAND } from '../lib/brand'

const STEP_MS = 1100
const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  site: string
  onDone: () => void
}

export default function Generating({ site, onDone }: Props) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    analyzeSite(site, {
      name: BRAND.name,
      domain: BRAND.domain,
      category: BRAND.category,
      voice: BRAND.voice.tone,
      audience: BRAND.audience,
      products: [BRAND.product],
      look: BRAND.look,
    }).then((b) => live && setName(b.name))
    return () => {
      live = false
    }
  }, [site])
  const steps = GEN_STEPS.map((s, i) => (i === 0 ? `Reading ${site}` : i === 1 && name ? `Learning ${name}, its products and voice` : s))

  useEffect(() => {
    if (step >= steps.length) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [step, steps.length, onDone])

  const current = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="flex w-full max-w-[460px] flex-col items-center text-center">
        <OlivyOrb size={64} breathe />

        <div className="mt-10 h-9">
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: EASE }}
              className="shimmer m-0 text-[24px] font-medium tracking-[-0.025em]"
            >
              {current}
            </motion.p>
          </AnimatePresence>
        </div>

        <ul className="mt-6 flex min-h-[96px] flex-col items-center gap-2 text-[14px] text-ink-3">
          {steps.slice(0, Math.min(step, steps.length)).slice(-3).map((label) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-2"
            >
              <svg viewBox="0 0 16 16" className="size-3.5 text-accent" fill="none" aria-hidden>
                <path className="gen-check" d="M3.5 8.2 L6.6 11.2 L12.5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {label}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
