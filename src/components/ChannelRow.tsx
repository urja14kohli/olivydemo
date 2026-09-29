import { AnimatePresence, motion } from 'framer-motion'
import type { Channel } from '../lib/plan'
import { TONES } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * One marketing channel, shown either as it is today or as Olivy would run it.
 * The two states share a row so the change reads as the same thing improving.
 */
export default function ChannelRow({
  channel,
  phase,
}: {
  channel: Channel
  phase: 'before' | 'after'
}) {
  const state = phase === 'before' ? channel.before : channel.after
  const tone = TONES[state.tone]
  const Icon = channel.icon

  return (
    <div className="surface flex items-center gap-4 rounded-[16px] px-4 py-3">
      <motion.span
        className="grid size-10 shrink-0 place-items-center rounded-[13px]"
        animate={{
          background: phase === 'after' ? `${channel.accent}1F` : 'rgba(120,120,145,0.10)',
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.span
          animate={{ color: phase === 'after' ? channel.accent : '#8A8A9E' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Icon className="size-[17px]" strokeWidth={2} />
        </motion.span>
      </motion.span>

      <div className="min-w-0 flex-1">
        <p className="text-[14.5px] font-bold tracking-[-0.01em] text-ink">{channel.name}</p>
        <div className="relative mt-0.5 h-[18px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={state.detail}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="absolute inset-0 truncate text-[12.5px] text-ink-soft"
            >
              {state.detail}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative h-[24px] w-[104px] shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state.chip}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute right-0 top-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
            style={{ background: tone.bg, color: tone.text }}
          >
            <span className="size-[5px] rounded-full" style={{ background: tone.dot }} />
            {state.chip}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
