import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock3, Play, TrendingUp } from 'lucide-react'
import type { Reel } from '../lib/chat'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * A reel as it will go out: frame, caption, and the slot it is booked into.
 * Approve and tweak sit on the card so a decision never needs a second screen.
 */
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
      className="surface flex shrink-0 snap-start flex-col overflow-hidden rounded-[18px]"
      style={{ width }}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.55, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <Frame reel={reel} height={compact ? 218 : 210} />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <h4 className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-ink">
          {reel.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.45] text-ink-soft">
          {reel.caption}
        </p>

        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ink-faint">
          <Clock3 className="size-[12px]" strokeWidth={2.2} />
          <span className="truncate">{reel.slot}</span>
        </div>

        {actions && (
        <div className="mt-auto flex gap-1.5 pt-3">
          <motion.button
            type="button"
            onClick={() => setApproved(true)}
            className="relative flex-1 overflow-hidden rounded-full py-[7px] text-[12px] font-semibold text-white"
            style={{
              background: approved
                ? 'linear-gradient(135deg, #34C98A, #1FA873)'
                : 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
            }}
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
          <button
            type="button"
            className="rounded-full border border-orchid-200 bg-white/70 px-3 py-[7px] text-[12px] font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            Tweak
          </button>
        </div>
        )}
      </div>
    </motion.article>
  )
}

/** Stand-in for the rendered video frame. */
function Frame({ reel, height }: { reel: Reel; height: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height,
        background: `linear-gradient(155deg, ${reel.art[0]}, ${reel.art[1]})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 22%, rgba(255,255,255,0.55), transparent 55%)',
        }}
      />

      {/* An abstract bottle keeps the frame reading as a product shot. */}
      <svg
        viewBox="0 0 100 140"
        className="absolute left-1/2 top-1/2 h-[54%] -translate-x-1/2 -translate-y-[54%]"
        aria-hidden
      >
        <rect x="41" y="6" width="18" height="16" rx="4" fill="rgba(255,255,255,0.55)" />
        <rect x="46" y="20" width="8" height="10" fill="rgba(255,255,255,0.4)" />
        <rect
          x="26"
          y="28"
          width="48"
          height="104"
          rx="16"
          fill="rgba(255,255,255,0.42)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
        />
        <rect x="34" y="60" width="32" height="2.5" rx="1.25" fill="rgba(255,255,255,0.75)" />
        <rect x="34" y="68" width="20" height="2.5" rx="1.25" fill="rgba(255,255,255,0.55)" />
      </svg>

      <span className="absolute left-2.5 top-2.5 rounded-md bg-black/26 px-1.5 py-[2px] text-[10px] font-semibold text-white backdrop-blur-sm">
        Reel
      </span>
      <span className="numeric absolute right-2.5 top-2.5 rounded-md bg-black/26 px-1.5 py-[2px] text-[10px] font-semibold text-white backdrop-blur-sm">
        {reel.duration}
      </span>

      {reel.lift && (
        <span className="absolute right-2.5 top-9 inline-flex items-center gap-1 rounded-md bg-live/85 px-1.5 py-[2px] text-[10px] font-semibold text-white">
          <TrendingUp className="size-[10px]" strokeWidth={2.8} />
          {reel.lift}
        </span>
      )}

      <motion.span
        className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/28 backdrop-blur-[2px]"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Play className="size-[13px] translate-x-[1px] fill-white text-white" strokeWidth={0} />
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-2.5 pb-2 pt-6">
        <p className="text-[10.5px] leading-[1.3] text-white/95">{reel.frame}</p>
      </div>
    </div>
  )
}
