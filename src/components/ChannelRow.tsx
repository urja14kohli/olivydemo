import { AnimatePresence, motion } from 'framer-motion'
import type { Channel } from '../lib/plan'
import { TONES } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ChannelRow({
  channel,
  phase,
  dense = false,
}: {
  channel: Channel
  phase: 'before' | 'after'
  dense?: boolean
}) {
  const state = phase === 'before' ? channel.before : channel.after
  const tone = TONES[state.tone]
  const Icon = channel.icon

  if (dense) {
    return (
      <motion.div layout className="surface flex items-center gap-3 rounded-[12px] px-3.5 py-2">
        <span
          className="grid size-7 shrink-0 place-items-center rounded-[8px]"
          style={{ background: `${channel.accent}1A` }}
        >
          <Icon className="size-[13px]" style={{ color: channel.accent }} strokeWidth={2.2} />
        </span>
        <span className="shrink-0 text-[13px] font-semibold tracking-[-0.015em] text-fg">
          {channel.name}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12.5px] text-fg-3">{state.detail}</span>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ background: tone.bg, color: tone.text }}
        >
          <span className="size-[5px] rounded-full" style={{ background: tone.dot }} />
          {state.chip}
        </span>
      </motion.div>
    )
  }

  return (
    <div className="surface flex items-center gap-4 rounded-[14px] px-4 py-3">
      <motion.span
        className="grid size-10 shrink-0 place-items-center rounded-[11px]"
        animate={{
          background: phase === 'after' ? `${channel.accent}1A` : 'rgba(255,255,255,0.04)',
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.span
          animate={{ color: phase === 'after' ? channel.accent : '#71717A' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Icon className="size-[17px]" strokeWidth={2} />
        </motion.span>
      </motion.span>

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold tracking-[-0.015em] text-fg">{channel.name}</p>
        <div className="relative mt-0.5 h-[18px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={state.detail}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="absolute inset-0 truncate text-[12.5px] text-fg-3"
            >
              {state.detail}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative h-[24px] w-[108px] shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state.chip}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute right-0 top-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
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
