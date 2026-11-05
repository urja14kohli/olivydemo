import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, ChevronDown } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import ContentPreviewCard from '../components/ContentPreviewCard'
import OlivyOrb from '../components/OlivyOrb'
import { CONVERSATION, REELS } from '../lib/chat'

const EASE = [0.22, 1, 0.36, 1] as const

const SUGGESTIONS = [
  'Show me the blog drafts',
  'More like Monday',
  'Move Friday to the weekend',
]

export default function ChatView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [draft, setDraft] = useState('')
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const timers = CONVERSATION.map((_, i) =>
      setTimeout(
        () =>
          scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }),
        600 + i * 420,
      ),
    )
    return () => timers.forEach(clearTimeout)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={onClose}
          />

          <motion.section
            className="surface-raised fixed bottom-0 left-1/2 z-50 flex w-[min(780px,calc(100%-2rem))] -translate-x-1/2 flex-col overflow-hidden rounded-t-[22px]"
            style={{ height: 'min(86vh, 820px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.9 }}
          >
            <header className="flex items-center gap-3 border-b border-line px-6 py-4">
              <OlivyOrb size={38} state="active" particles={false} />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold tracking-[-0.015em] text-fg">Olivy</p>
                <p className="flex items-center gap-1.5 text-[12px] text-fg-3">
                  <span className="relative flex size-[5px]">
                    <span className="absolute inset-0 rounded-full bg-accent" />
                    <motion.span
                      className="absolute inset-0 rounded-full bg-accent"
                      animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </span>
                  Working on four things right now
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="grid size-9 place-items-center rounded-full bg-white/[0.04] text-fg-3 transition-colors hover:bg-white/[0.08] hover:text-fg"
              >
                <ChevronDown className="size-[18px]" strokeWidth={2.2} />
              </button>
            </header>

            <div ref={scroller} className="flex-1 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-3.5">
                {CONVERSATION.map((message, i) => (
                  <div key={message.id} className="flex flex-col gap-3.5">
                    <ChatBubble from={message.from} delay={0.22 + i * 0.42}>
                      {message.text}
                    </ChatBubble>

                    {message.kind === 'reels' && (
                      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
                        {REELS.map((reel, r) => (
                          <ContentPreviewCard key={reel.id} reel={reel} index={r} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <footer className="border-t border-line px-6 pb-5 pt-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    type="button"
                    onClick={() => setDraft(s)}
                    className="btn-ghost px-3 py-1.5 text-[12.5px]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 + i * 0.08, duration: 0.45, ease: EASE }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>

              <form
                className="surface flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setDraft('')
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Talk to Olivy"
                  aria-label="Message Olivy"
                  className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-fg outline-none focus-visible:outline-none"
                />
                <motion.button
                  type="submit"
                  aria-label="Send"
                  className={`grid size-9 shrink-0 place-items-center rounded-full ${
                    draft ? 'bg-accent text-[#04140f]' : 'bg-white/[0.06] text-fg-4'
                  }`}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                >
                  <ArrowUp className="size-[17px]" strokeWidth={2.6} />
                </motion.button>
              </form>
            </footer>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  )
}
