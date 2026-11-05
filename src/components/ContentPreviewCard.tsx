import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock3, Play, TrendingUp } from 'lucide-react'
import type { Reel } from '../lib/chat'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ContentPreviewCard({
  reel,
  index = 0,
  compact = false,
  actions = true,
}: {
  reel: Reel
  index?: number
  compact?: boolean
  actions?: boolean
}) {
  const [approved, setApproved] = useState(false)
  const width = compact ? 214 : 196

  return (
    <motion.article
      className="surface flex shrink-0 snap-start flex-col overflow-hidden rounded-[14px]"
      style={{ width }}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.55, ease: EASE }}
      whileHover={{ y: -3 }}
    >
      <Frame reel={reel} height={compact ? 218 : 210} />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <h4 className="truncate text-[13px] font-semibold tracking-[-0.015em] text-fg">
          {reel.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.45] text-fg-3">{reel.caption}</p>

        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-fg-4">
          <Clock3 className="size-[12px]" strokeWidth={2.2} />
          <span className="truncate">{reel.slot}</span>
        </div>

        {actions && (
          <div className="mt-auto flex gap-1.5 pt-3">
            <motion.button
              type="button"
              onClick={() => setApproved(true)}
              className="btn relative flex-1 overflow-hidden py-[7px] text-[12px]"
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={approved ? 'done' : 'idle'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-1"
                >
                  {approved && <Check className="size-[12px]" strokeWidth={3.2} />}
                  {approved ? 'Approved' : 'Approve'}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <button type="button" className="btn-ghost px-3 py-[7px] text-[12px]">
              Tweak
            </button>
          </div>
        )}
      </div>
    </motion.article>
  )
}

function Frame({ reel, height }: { reel: Reel; height: number }) {
  return (
    <div className="relative overflow-hidden bg-raised" style={{ height }}>
      <img src={reel.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <span className="absolute left-2.5 top-2.5 rounded-md bg-black/50 px-1.5 py-[2px] text-[10px] font-medium text-white backdrop-blur-sm">
        Reel
      </span>
      <span className="numeric mono absolute right-2.5 top-2.5 rounded-md bg-black/50 px-1.5 py-[2px] text-[10px] font-medium text-white backdrop-blur-sm">
        {reel.duration}
      </span>

      {reel.lift && (
        <span className="absolute right-2.5 top-9 inline-flex items-center gap-1 rounded-md bg-accent px-1.5 py-[2px] text-[10px] font-semibold text-[#04140f]">
          <TrendingUp className="size-[10px]" strokeWidth={2.8} />
          {reel.lift}
        </span>
      )}

      <motion.span
        className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/35 backdrop-blur-[2px]"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Play className="size-[13px] translate-x-[1px] fill-white text-white" strokeWidth={0} />
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2 pt-6">
        <p className="text-[10.5px] leading-[1.3] text-white/90">{reel.frame}</p>
      </div>
    </div>
  )
}
