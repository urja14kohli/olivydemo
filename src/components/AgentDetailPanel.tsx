import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { Agent, DetailItem } from '../lib/agents'
import StatusPill from './StatusPill'

const EASE = [0.22, 1, 0.36, 1] as const

export default function AgentDetailPanel({
  agent,
  onClose,
}: {
  agent: Agent | null
  onClose: () => void
}) {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    setApproved(false)
  }, [agent?.id])

  useEffect(() => {
    if (!agent) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [agent, onClose])

  const standby = agent?.status === 'inactive'

  return (
    <AnimatePresence>
      {agent && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[#2A1B46]/12 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.aside
            className="surface-raised fixed right-4 top-4 z-50 flex w-[400px] flex-col overflow-hidden rounded-[22px]"
            style={{ maxHeight: 'calc(100% - 2rem)' }}
            initial={{ x: 56, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 56, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-32"
              style={{ background: `linear-gradient(180deg, ${agent.accent}18, transparent)` }}
            />

            <header className="relative flex items-start gap-3 px-6 pb-5 pt-6">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-[14px]"
                style={{
                  background: `${agent.accent}1F`,
                  boxShadow: `inset 0 0 0 1px ${agent.accent}2E`,
                }}
              >
                <agent.icon className="size-5" style={{ color: agent.accent }} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <h2 className="display text-[19px] text-ink">{agent.name} agent</h2>
                <p className="mt-0.5 text-[12.5px] text-ink-faint">{agent.role}</p>
              </div>
              <StatusPill status={agent.status} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-white/70 text-ink-soft transition-colors hover:bg-white hover:text-ink"
              >
                <X className="size-4" strokeWidth={2.2} />
              </button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-6">
              <p className="text-[13.5px] leading-[1.6] text-ink-soft">{agent.detail.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {agent.detail.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: EASE }}
                    className="rounded-[14px] border border-white/70 bg-white/55 px-3 py-2.5"
                  >
                    <p className="numeric display text-[18px] text-ink">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="mb-2.5 mt-6 text-[12px] font-semibold text-ink-soft">
                {standby ? 'Before it starts' : 'This week'}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {agent.detail.items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 + i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    <ItemRow
                      item={approved ? { ...item, state: 'done' } : item}
                      accent={agent.accent}
                    />
                  </motion.li>
                ))}
              </ul>
            </div>

            <footer className="relative flex gap-2.5 border-t border-white/70 bg-white/40 px-6 py-4">
              <motion.button
                type="button"
                onClick={() => setApproved(true)}
                className="flex-1 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white"
                style={{
                  background: approved
                    ? 'linear-gradient(135deg, #34C98A, #1FA873)'
                    : 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
                  boxShadow: '0 8px 20px -8px rgba(107,63,160,0.7)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={approved ? 'done' : 'idle'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-1.5"
                  >
                    {approved && <Check className="size-[13px]" strokeWidth={3.2} />}
                    {approved ? 'Approved' : standby ? 'Turn this on' : 'Approve all'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <button
                type="button"
                className="rounded-full border border-orchid-200 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                {standby ? 'Not yet' : 'Pause agent'}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function ItemRow({ item, accent }: { item: DetailItem; accent: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-white/60 bg-white/45 px-3 py-2.5">
      {item.state === 'done' ? (
        <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-live/15">
          <Check className="size-[10px] text-[#1B8A5F]" strokeWidth={3.4} />
        </span>
      ) : item.state === 'running' ? (
        <span className="relative grid size-[18px] shrink-0 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: `${accent}2E`, borderTopColor: accent }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        </span>
      ) : (
        <span className="grid size-[18px] shrink-0 place-items-center">
          <span className="size-[6px] rounded-full bg-ink-faint/40" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-ink">{item.title}</span>
        <span className="block truncate text-[11.5px] text-ink-faint">{item.meta}</span>
      </span>
    </div>
  )
}
