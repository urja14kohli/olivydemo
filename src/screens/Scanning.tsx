import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'

const EASE = [0.22, 1, 0.36, 1] as const
const CHAR_MS = 22
const LINE_PAUSE = 420

const LINES = [
  'Scanning luminaskin.com',
  'Found Instagram  ·  2.3K followers  ·  47 posts',
  'Found website    ·  no blog  ·  no SEO',
  'Checking 6 competitors in clean skincare',
  'Scoring what wins in this category',
]

const PHASES = 5

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

  const filled = complete ? PHASES : Math.min(PHASES, line)

  return (
    <div className="flex min-h-full items-center justify-center gap-16 px-8">
      <motion.div
        className="hidden w-[280px] shrink-0 lg:block"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Wireframe scanning={!complete} />
      </motion.div>

      <div className="flex w-full max-w-[540px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <OlivyOrb size={112} state={complete ? 'active' : 'thinking'} />
        </motion.div>

        <motion.div
          className="mt-12 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
        >
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
                  <span className="relative mt-[4px] grid size-[16px] shrink-0 place-items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      {isCurrent ? (
                        <motion.span
                          key="spin"
                          exit={{ opacity: 0, scale: 0.6 }}
                          className="absolute inset-0 rounded-full border-[1.5px] border-white/10 border-t-accent"
                          animate={{ rotate: 360 }}
                          transition={{
                            rotate: { duration: 0.85, repeat: Infinity, ease: 'linear' },
                          }}
                        />
                      ) : (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                          className="grid size-[16px] place-items-center rounded-full bg-accent/15"
                        >
                          <Check className="size-[9px] text-accent" strokeWidth={3.4} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  <span
                    className={`mono text-[13.5px] leading-[1.55] ${
                      isCurrent ? 'text-fg' : 'text-fg-3'
                    }`}
                  >
                    {shown}
                    {isCurrent && (
                      <motion.span
                        className="ml-[2px] inline-block h-[14px] w-[7px] translate-y-[2px] bg-accent align-middle"
                        animate={{ opacity: [1, 0.1, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </span>
                </motion.li>
              )
            })}
          </ul>

          <div className="mt-10 flex gap-1.5">
            {Array.from({ length: PHASES }).map((_, i) => (
              <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < filled ? 1 : 0 }}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Wireframe({ scanning }: { scanning: boolean }) {
  return (
    <div className="surface relative overflow-hidden rounded-[14px] p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-[7px] rounded-full bg-white/10" />
        <span className="size-[7px] rounded-full bg-white/10" />
        <span className="size-[7px] rounded-full bg-white/10" />
        <span className="ml-2 h-[7px] flex-1 rounded-full bg-white/[0.05]" />
      </div>
      <div className="h-[92px] rounded-[8px] bg-white/[0.04]" />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="h-[64px] rounded-[8px] bg-white/[0.04]" />
        <div className="h-[64px] rounded-[8px] bg-white/[0.04]" />
        <div className="h-[64px] rounded-[8px] bg-white/[0.04]" />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-[6px] w-[86%] rounded-full bg-white/[0.05]" />
        <div className="h-[6px] w-[64%] rounded-full bg-white/[0.05]" />
        <div className="h-[6px] w-[74%] rounded-full bg-white/[0.05]" />
      </div>
      {scanning && (
        <div
          className="scan-sweep pointer-events-none absolute inset-x-3 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #00D4AA, transparent)',
            boxShadow: '0 0 18px rgba(0,212,170,0.7)',
          }}
        />
      )}
    </div>
  )
}
