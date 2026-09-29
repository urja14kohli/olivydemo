import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ACTIVITY_EVENTS, AGENT_ACCENTS } from '../lib/agents'

const VISIBLE = 3
const BASE_MINUTES = 10 * 60 + 31

function clockAt(step: number) {
  const total = BASE_MINUTES + step
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function eventAt(step: number) {
  const source = ACTIVITY_EVENTS[step % ACTIVITY_EVENTS.length]
  return { ...source, time: clockAt(step), key: step }
}

type Props = {
  startDelay?: number
  intervalMs?: number
}

/** The running log along the bottom of the Control Room. */
export default function ActivityFeed({ startDelay = 3.6, intervalMs = 2400 }: Props) {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(-1)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay * 1000)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    setStep(0)
    const tick = setInterval(() => setStep((s) => s + 1), intervalMs)
    return () => clearInterval(tick)
  }, [started, intervalMs])

  const rows =
    step < 0
      ? []
      : Array.from({ length: Math.min(VISIBLE, step + 1) }, (_, i) =>
          eventAt(step - Math.min(VISIBLE, step + 1) + 1 + i),
        )

  return (
    <div className="surface flex items-stretch gap-5 rounded-[18px] px-5 py-3">
      <div className="flex w-[104px] shrink-0 flex-col justify-center gap-1 border-r border-orchid-200/60 pr-5">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
          <span className="relative flex size-[5px]">
            <span className="absolute inset-0 rounded-full bg-live" />
            <motion.span
              className="absolute inset-0 rounded-full bg-live"
              animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
            />
          </span>
          Live activity
        </span>
        <span className="numeric text-[11px] text-ink-faint">
          {step < 0 ? 'Standing by' : `${step + 1} events`}
        </span>
      </div>

      <div className="relative min-w-0 flex-1" style={{ height: VISIBLE * 22 }}>
        <AnimatePresence initial={false}>
          {rows.map((row, i) => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, y: 22 }}
              animate={{
                opacity: i === rows.length - 1 ? 1 : 0.42 + i * 0.12,
                y: i * 22,
              }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 flex items-center gap-3 text-[12px]"
            >
              <span className="numeric w-[38px] shrink-0 text-ink-faint">{row.time}</span>
              <span
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-[1px] text-[10.5px] font-semibold"
                style={{
                  color: AGENT_ACCENTS[row.agent],
                  background: `${AGENT_ACCENTS[row.agent]}14`,
                }}
              >
                {row.agent}
              </span>
              <span className="truncate text-ink-soft">{row.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
