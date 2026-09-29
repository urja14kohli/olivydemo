import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CalendarView from '../components/CalendarView'
import ChannelRow from '../components/ChannelRow'
import OlivyOrb from '../components/OlivyOrb'
import { CHANNELS } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Opens on the same rows the previous screen ended on, flips them one by one
 * into the state Olivy is proposing, then reveals the week underneath.
 */
export default function Plan({ onRun }: { onRun: () => void }) {
  const [flipped, setFlipped] = useState(0)
  const [showWeek, setShowWeek] = useState(false)

  useEffect(() => {
    const timers = CHANNELS.map((_, i) =>
      setTimeout(() => setFlipped(i + 1), 420 + i * 130),
    )
    const week = setTimeout(() => setShowWeek(true), 420 + CHANNELS.length * 130 + 180)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(week)
    }
  }, [])

  const done = flipped >= CHANNELS.length

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-6">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OlivyOrb size={56} state={done ? 'active' : 'thinking'} particles={false} />
      </motion.div>

      <div className="relative mt-5 h-[42px] w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={done ? 'after' : 'before'}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="display absolute inset-x-0 text-center text-[34px] text-ink"
          >
            {done ? 'Here is your marketing plan' : 'Here is what Olivy would change'}
          </motion.h1>
        </AnimatePresence>
      </div>

      <motion.ul layout className="mt-3 flex w-full max-w-[640px] flex-col gap-2">
        {CHANNELS.map((channel, i) => (
          <motion.li
            layout
            key={channel.id}
            animate={
              i < flipped
                ? { scale: [1, 1.018, 1], transition: { duration: 0.45, ease: EASE } }
                : {}
            }
          >
            <ChannelRow
              channel={channel}
              phase={i < flipped ? 'after' : 'before'}
              dense={showWeek}
            />
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {showWeek && (
          <motion.div
            key="week"
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full max-w-[1000px] pt-7"
          >
            <div className="mb-2.5 flex items-baseline justify-between px-1">
              <h2 className="text-[13px] font-bold tracking-[-0.01em] text-ink">
                Week of 29 September
              </h2>
              <p className="text-[12px] text-ink-faint">
                Nothing goes out without your approval
              </p>
            </div>
            <CalendarView delay={0.1} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWeek && (
          <motion.button
            type="button"
            onClick={onRun}
            className="relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
              boxShadow: '0 16px 40px -14px rgba(107,63,160,0.95)',
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Light sweeping across the button keeps the CTA alive. */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3"
              style={{
                background:
                  'linear-gradient(105deg, transparent, rgba(255,255,255,0.34), transparent)',
              }}
              animate={{ x: ['-160%', '420%'] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
            />
            <span className="relative">Run this plan</span>
            <ArrowRight className="relative size-[18px]" strokeWidth={2.4} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
