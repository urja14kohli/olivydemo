import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { sendChat, setChatOpen, useStore } from '../lib/store'

const EASE = [0.22, 1, 0.36, 1] as const

/** Command bar pinned to the bottom center, with a soft haze behind it. */
export default function OlivyChat() {
  const { chat, chatOpen: open, activity, playground, toasts } = useStore()
  const [value, setValue] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault()
        input.current?.focus()
      }
      if (e.key === 'Escape') setChatOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.length, open, activity])

  const send = () => {
    if (!value.trim()) return
    const text = value.trim()
    setValue('')
    setChatOpen(true)
    sendChat(text)
  }

  if (playground === 'full') return null
  const shift = playground === 'side' ? 'max-lg:hidden lg:right-1/2' : ''

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-[45] h-[55vh] transition-opacity duration-500 ${shift} ${!open && toasts.length ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(to top, rgba(20,16,32,0.55) 0%, rgba(20,16,32,0.32) 45%, rgba(20,16,32,0) 100%)' }}
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 h-44 ${shift}`}
        style={{ background: 'linear-gradient(to top, rgba(250,250,250,0.98) 0%, rgba(250,250,250,0.85) 35%, rgba(250,250,250,0) 100%)' }}
      />

      <div className={`pointer-events-none fixed inset-x-0 bottom-5 z-50 flex flex-col items-center px-4 sm:bottom-7 ${shift}`}>
        <div className="pointer-events-auto w-[min(660px,100%)]">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.985 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mb-3 max-h-[min(380px,45vh)] overflow-y-auto rounded-3xl bg-white/95 p-5 shadow-[0_20px_60px_rgba(26,26,46,0.14),inset_0_0_0_1px_rgba(26,26,46,0.06)] backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4">
                  {chat.map((m, i) =>
                    m.from === 'me' ? (
                      <p key={i} className="m-0 ml-auto w-fit max-w-[85%] rounded-2xl bg-fill px-4 py-2.5 text-[15px] leading-snug text-ink">
                        {m.text}
                      </p>
                    ) : (
                      <p key={i} className="m-0 text-[15.5px] leading-[1.55] text-ink">{m.text}</p>
                    ),
                  )}
                  {activity && (
                    <p className="shimmer m-0 text-[15.5px] font-medium">{activity}</p>
                  )}
                  <div ref={end} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-3 flex flex-col items-start gap-2">
            <AnimatePresence initial={false}>
              {!open &&
                toasts.map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="max-w-[min(440px,100%)] rounded-2xl rounded-bl-md bg-white/95 px-4 py-2.5 shadow-[0_10px_30px_rgba(26,26,46,0.14),inset_0_0_0_1px_rgba(26,26,46,0.06)] backdrop-blur-xl"
                  >
                    {t.typing ? (
                      <span className="flex h-[22px] items-center gap-1" aria-label="Olivy is typing">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="size-1.5 animate-bounce rounded-full bg-ink-3/60" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </span>
                    ) : (
                      <p className="m-0 text-[14.5px] leading-snug text-ink">
                        {t.text}
                      </p>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!open && activity && !toasts.length && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-white/90 py-2 pl-3.5 pr-4 shadow-[0_8px_24px_rgba(26,26,46,0.1),inset_0_0_0_1px_rgba(26,26,46,0.06)] backdrop-blur-xl"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                <span className="shimmer text-[14px] font-medium">{activity}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!open && !activity && !toasts.length && (
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {['Handle everything for me', 'Plan a holiday gifting campaign', 'Make the reels more product focused'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setChatOpen(true)
                    sendChat(c)
                  }}
                  className="rounded-full border-0 bg-white/80 px-3.5 py-1.5 text-[13px] text-ink-2 shadow-[inset_0_0_0_1px_rgba(26,26,46,0.08)] backdrop-blur transition hover:bg-white hover:text-ink"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            className="flex items-center gap-3 rounded-full bg-white/90 py-2 pl-2.5 pr-2 shadow-[0_12px_40px_rgba(26,26,46,0.14),inset_0_0_0_1px_rgba(26,26,46,0.07)] backdrop-blur-xl transition focus-within:shadow-[0_12px_40px_rgba(107,63,160,0.2),inset_0_0_0_1.5px_rgba(107,63,160,0.5)]"
          >
            <button
              type="button"
              aria-label={open ? 'Hide conversation' : 'Show conversation'}
              onClick={() => setChatOpen(!open)}
              className="grid size-9 shrink-0 place-items-center rounded-full border-0 bg-transparent text-ink-3 transition hover:bg-fill hover:text-ink"
            >
              {open ? <ChevronDown className="size-[18px]" strokeWidth={2} /> : <ChevronUp className="size-[18px]" strokeWidth={2} />}
            </button>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tell Olivy what to do"
              className="h-10 min-w-0 flex-1 border-0 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3/70"
            />
            <kbd className="hidden rounded-md bg-fill px-2 py-1 font-sans text-[12px] text-ink-3 sm:block">⌘ O</kbd>
            <button
              type="submit"
              aria-label="Send"
              disabled={!value.trim()}
              className="grid size-10 shrink-0 place-items-center rounded-full border-0 bg-accent text-white transition disabled:bg-fill-2 disabled:text-ink-3"
            >
              <ArrowUp className="size-[18px]" strokeWidth={2.4} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
