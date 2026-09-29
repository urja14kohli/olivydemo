import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Agent } from '../lib/agents'
import { useTimeline } from '../lib/hooks'
import StatusPill from './StatusPill'

export const CARD_WIDTH = 282
export const CARD_HEIGHT = 156
export const CARD_HEIGHT_COMPACT = 92

/** Agents on standby get a shorter, quieter card. Hierarchy through size. */
export function cardHeight(agent: Agent) {
  return agent.status === 'inactive' ? CARD_HEIGHT_COMPACT : CARD_HEIGHT
}

type Props = {
  agent: Agent
  live: boolean
  onOpen: () => void
}

export default function AgentCard({ agent, live, onOpen }: Props) {
  if (agent.status === 'inactive') return <StandbyCard agent={agent} onOpen={onOpen} />
  return <LiveCard agent={agent} live={live} onOpen={onOpen} />
}

/**
 * A working agent. Shows a rolling window of the last three things it did, so
 * the card height never moves while the feed underneath keeps changing.
 */
function LiveCard({ agent, live, onOpen }: Props) {
  const durations = agent.steps.map((s) => s.duration)
  const index = useTimeline(durations, live)
  const finished = index >= agent.steps.length

  const windowStart = Math.max(0, Math.min(index, agent.steps.length - 1) - 2)
  const visible = agent.steps.slice(windowStart, windowStart + 3)
  const Icon = agent.icon

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-agent={agent.id}
      className="surface relative overflow-hidden rounded-[18px] text-left"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{ background: `linear-gradient(180deg, ${agent.accent}16, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px]"
        style={{ background: agent.accent, opacity: 0.6 }}
      />

      <div className="relative flex h-full flex-col px-4 py-3.5">
        <CardHeader agent={agent} Icon={Icon} />

        <div className="mt-3 flex-1">
          <div className="flex flex-col gap-[7px]">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((step, i) => {
                const absolute = windowStart + i
                const state =
                  absolute < index ? 'done' : absolute === index ? 'running' : 'pending'
                return (
                  <motion.div
                    key={step.label}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: state === 'pending' ? 0.45 : 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2"
                  >
                    <Marker state={state} accent={agent.accent} />
                    <span
                      className={`min-w-0 flex-1 truncate text-[12px] leading-[15px] ${
                        state === 'done' ? 'text-ink-soft' : 'font-semibold text-ink'
                      }`}
                    >
                      {step.label}
                    </span>
                    {step.value && state !== 'pending' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="numeric shrink-0 rounded-md bg-orchid-100 px-1.5 py-[1px] text-[10.5px] font-semibold text-orchid-600"
                      >
                        {step.value}
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <footer className="h-[11px]">
          {!finished && agent.steps[index]?.bar ? (
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-orchid-100">
              <motion.div
                key={index}
                className="h-full rounded-full"
                style={{ background: agent.accent }}
                initial={{ width: '4%' }}
                animate={{ width: '100%' }}
                transition={{ duration: agent.steps[index].duration / 1000, ease: 'easeInOut' }}
              />
            </div>
          ) : finished ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="truncate text-[11px] text-ink-faint"
            >
              Up next: {agent.next}
            </motion.p>
          ) : null}
        </footer>
      </div>
    </motion.button>
  )
}

/** An agent Olivy has deliberately not switched on yet. */
function StandbyCard({ agent, onOpen }: { agent: Agent; onOpen: () => void }) {
  const Icon = agent.icon
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-agent={agent.id}
      className="relative overflow-hidden rounded-[18px] text-left"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT_COMPACT,
        background: 'rgba(255,255,255,0.34)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px dashed rgba(124,133,152,0.38)',
      }}
      whileHover={{ y: -3, background: 'rgba(255,255,255,0.55)' }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <div className="flex h-full flex-col justify-center gap-2 px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[#7C8598]/12">
            <Icon className="size-[14px] text-[#7C8598]" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold tracking-[-0.01em] text-ink-soft">
            {agent.name}
          </span>
          <StatusPill status={agent.status} size="sm" />
        </div>
        <p className="truncate pl-[38px] text-[11.5px] text-ink-faint">{agent.next}</p>
      </div>
    </motion.button>
  )
}

function CardHeader({ agent, Icon }: { agent: Agent; Icon: Agent['icon'] }) {
  return (
    <header className="flex items-center gap-2.5">
      <span
        className="grid size-8 shrink-0 place-items-center rounded-[10px]"
        style={{
          background: `${agent.accent}1A`,
          boxShadow: `inset 0 0 0 1px ${agent.accent}26`,
        }}
      >
        <Icon className="size-[15px]" style={{ color: agent.accent }} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-bold tracking-[-0.01em] text-ink">
          {agent.name}
        </span>
        <span className="block truncate text-[11px] text-ink-faint">{agent.role}</span>
      </span>
      <StatusPill status={agent.status} />
    </header>
  )
}

function Marker({ state, accent }: { state: 'done' | 'running' | 'pending'; accent: string }) {
  if (state === 'done') {
    return (
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
        className="grid size-[15px] shrink-0 place-items-center rounded-full"
        style={{ background: 'rgba(52,201,138,0.16)' }}
      >
        <Check className="size-[9px] text-[#1B8A5F]" strokeWidth={3.4} />
      </motion.span>
    )
  }

  if (state === 'running') {
    return (
      <span className="relative grid size-[15px] shrink-0 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full border-[1.5px]"
          style={{ borderColor: `${accent}2E`, borderTopColor: accent }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
        />
      </span>
    )
  }

  return (
    <span className="grid size-[15px] shrink-0 place-items-center">
      <span className="size-[5px] rounded-full bg-ink-faint/45" />
    </span>
  )
}
