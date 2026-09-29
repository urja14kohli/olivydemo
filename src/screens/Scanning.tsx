import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'

const EASE = [0.22, 1, 0.36, 1] as const
const CHAR_MS = 22
const LINE_PAUSE = 420

const LINES = [
  'Scanning luminaskin.com',
  'Found your Instagram: 2.3K followers, 47 posts',
  'Found your website: no blog, no SEO setup',
  'Checking 6 competitors in clean skincare',
  'Working out what wins in your space',
]

export default function Scanning({ site, onDone }: { site: string; onDone: () => void }) {
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)

  const lines = LINES.map((l, i) => (i === 0 ? `Scanning ${site}` : l))
  const complete = line >= lines.length

  useEffect(() => {
    if (complete) return
    const full = lines[line]
    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), CHAR_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1)
      setChars(0)
    }, LINE_PAUSE)
    return () => clearTimeout(t)
  }, [line, chars, complete, lines])

  useEffect(() => {
    if (!complete) return
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [complete, onDone])

  const totalChars = lines.reduce((sum, l) => sum + l.length, 0)
  const typedChars = lines.slice(0, line).reduce((sum, l) => sum + l.length, 0) + chars
  const progress = Math.min(1, typedChars / totalChars)

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <OlivyOrb size={120} state={complete ? 'active' : 'thinking'} />
      </motion.div>

      <motion.div
        className="mt-14 w-full max-w-[540px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
      >
        {/* Height is reserved for every line so the block never shifts as
            results land. */}
        <ul className="flex h-[186px] flex-col gap-3.5">
          {lines.slice(0, line + 1).map((text, i) => {
            const isCurrent = i === line && !complete
            const shown = isCurrent ? text.slice(0, chars) : text
            return (
              <motion.li
                key={text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex items-start gap-3"
              >
                <span className="relative mt-[4px] grid size-[18px] shrink-0 place-items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {isCurrent ? (
                      <motion.span
                        key="spin"
                        exit={{ opacity: 0, scale: 0.6 }}
                        className="absolute inset-0 rounded-full border-2 border-orchid-300/50 border-t-orchid-600"
                        animate={{ rotate: 360 }}
                        transition={{ rotate: { duration: 0.85, repeat: Infinity, ease: 'linear' } }}
                      />
                    ) : (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                        className="grid size-[18px] place-items-center rounded-full bg-live/16"
                      >
                        <Check className="size-[10px] text-[#1B8A5F]" strokeWidth={3.4} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <span
                  className={`text-[16.5px] leading-[1.5] ${
                    isCurrent ? 'font-medium text-ink' : 'text-ink-soft'
                  }`}
                >
                  {shown}
                  {isCurrent && (
                    <motion.span
                      className="ml-[2px] inline-block h-[16px] w-[2px] translate-y-[2px] rounded-full bg-orchid-600 align-middle"
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </span>
              </motion.li>
            )
          })}
        </ul>

        <div className="mt-10 h-[2px] w-full overflow-hidden rounded-full bg-orchid-200/70">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #8B5CF6, #60A5FA)' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.25, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
