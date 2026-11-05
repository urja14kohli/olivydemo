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
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.aside
            className="surface-raised fixed right-4 top-4 z-50 flex w-[400px] flex-col overflow-hidden rounded-[18px]"
            style={{ maxHeight: 'calc(100% - 2rem)' }}
            initial={{ x: 56, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 56, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28"
              style={{ background: `linear-gradient(180deg, ${agent.accent}14, transparent)` }}
            />

            <header className="relative flex items-start gap-3 px-6 pb-5 pt-6">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-[12px]"
                style={{
                  background: `${agent.accent}1A`,
                  boxShadow: `inset 0 0 0 1px ${agent.accent}2E`,
                }}
              >
                <agent.icon className="size-5" style={{ color: agent.accent }} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <h2 className="display text-[18px] text-fg">{agent.name} agent</h2>
                <p className="mt-0.5 text-[12.5px] text-fg-3">{agent.role}</p>
              </div>
              <StatusPill status={agent.status} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.04] text-fg-3 transition-colors hover:bg-white/[0.08] hover:text-fg"
              >
                <X className="size-4" strokeWidth={2.2} />
              </button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-6">
              <p className="text-[13.5px] leading-[1.6] text-fg-2">{agent.detail.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {agent.detail.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: EASE }}
                    className="rounded-[12px] border border-line bg-white/[0.03] px-3 py-2.5"
                  >
                    <p className="numeric display text-[18px] text-fg">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] text-fg-3">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="mb-2.5 mt-6 text-[11px] font-medium uppercase tracking-[0.08em] text-fg-4">
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

            <footer className="relative flex gap-2.5 border-t border-line px-6 py-4">
              <motion.button
                type="button"
                onClick={() => setApproved(true)}
                className="btn flex-1 py-2.5 text-[13px]"
                style={
                  approved
                    ? { background: '#00D4AA' }
                    : undefined
                }
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
              <button type="button" className="btn-ghost px-4 py-2.5 text-[13px]">
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
    <div className="flex items-center gap-3 rounded-[12px] border border-line bg-white/[0.025] px-3 py-2.5">
      {item.state === 'done' ? (
        <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-accent/15">
          <Check className="size-[10px] text-accent" strokeWidth={3.4} />
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
          <span className="size-[6px] rounded-full bg-fg-4/50" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-fg">{item.title}</span>
        <span className="block truncate text-[11.5px] text-fg-3">{item.meta}</span>
      </span>
    </div>
  )
}
