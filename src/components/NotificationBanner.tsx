import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, X } from 'lucide-react'
import ContentPreviewCard from './ContentPreviewCard'
import OlivyOrb from './OlivyOrb'
import { FOLLOW_UP_REELS } from '../lib/chat'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Olivy speaking first. Collapsed it is a single line; opening it grows the
 * same surface into the two reels it is asking about, so nothing is lost.
 */
export default function NotificationBanner({
  open,
  onDismiss,
}: {
  open: boolean
  onDismiss: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [scheduled, setScheduled] = useState(false)

  const close = () => {
    setExpanded(false)
    setScheduled(false)
    onDismiss()
  }

  return (
    <AnimatePresence>
      {open && expanded && (
        <motion.div
          key="scrim"
          className="fixed inset-0 z-[55] bg-[#2A1B46]/12 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setExpanded(false)}
        />
      )}
      {open && (
        <motion.div
          layout
          className="surface-raised fixed left-1/2 top-4 z-[60] w-[496px] -translate-x-1/2 overflow-hidden rounded-[22px]"
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.85 }}
        >
          <motion.div layout="position" className="flex items-start gap-3 px-4 pb-4 pt-4">
            <OlivyOrb size={34} state="notify" particles={false} />

            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              data-notice="toggle"
              className="min-w-0 flex-1 text-left"
            >
              <p className="text-[13px] font-bold tracking-[-0.01em] text-ink">Olivy</p>
              <p className="mt-0.5 text-[13.5px] leading-[1.45] text-ink-soft">
                Your Monday reel got three times your usual views. I made two more in the same
                shape.
              </p>
            </button>

            <button
              type="button"
              onClick={expanded ? () => setExpanded(false) : close}
              aria-label={expanded ? 'Collapse' : 'Dismiss'}
              className="grid size-7 shrink-0 place-items-center rounded-full bg-white/70 text-ink-faint transition-colors hover:bg-white hover:text-ink"
            >
              {expanded ? (
                <ChevronDown className="size-4" strokeWidth={2.4} />
              ) : (
                <X className="size-[15px]" strokeWidth={2.4} />
              )}
            </button>
          </motion.div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="px-4 pb-4">
                  <div className="flex gap-3">
                    {FOLLOW_UP_REELS.map((reel, i) => (
                      <ContentPreviewCard
                        key={reel.id}
                        reel={reel}
                        index={i}
                        compact
                        actions={false}
                      />
                    ))}
                  </div>

                  <div className="mt-3.5 flex gap-2">
                    <motion.button
                      type="button"
                      onClick={() => setScheduled(true)}
                      className="flex-1 rounded-full py-2.5 text-[13.5px] font-semibold text-white"
                      style={{
                        background: scheduled
                          ? 'linear-gradient(135deg, #34C98A, #1FA873)'
                          : 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
                        boxShadow: '0 10px 24px -12px rgba(107,63,160,0.85)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={scheduled ? 'done' : 'idle'}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-center gap-1.5"
                        >
                          {scheduled && <Check className="size-[14px]" strokeWidth={3.2} />}
                          {scheduled ? 'Scheduled' : 'Schedule both'}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full border border-orchid-200 bg-white/70 px-4 py-2.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      Let me review first
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
