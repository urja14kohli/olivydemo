import { motion } from 'framer-motion'
import type { AgentStatus } from '../lib/agents'

const COPY: Record<AgentStatus, { label: string; dot: string; text: string; bg: string }> = {
  running: {
    label: 'Running',
    dot: '#34C98A',
    text: '#1B8A5F',
    bg: 'rgba(52,201,138,0.13)',
  },
  queued: {
    label: 'Queued',
    dot: '#F0A830',
    text: '#A66A0B',
    bg: 'rgba(240,168,48,0.15)',
  },
  inactive: {
    label: 'Standby',
    dot: '#9B9BAF',
    text: '#71718A',
    bg: 'rgba(120,120,145,0.11)',
  },
}

export default function StatusPill({
  status,
  size = 'md',
}: {
  status: AgentStatus
  size?: 'sm' | 'md'
}) {
  const s = COPY[status]
  const small = size === 'sm'

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium ${
        small ? 'px-1.5 py-[2px] text-[10px]' : 'px-2 py-[3px] text-[11px]'
      }`}
      style={{ background: s.bg, color: s.text }}
    >
      <span className="relative flex" style={{ width: 5, height: 5 }}>
        <span className="absolute inset-0 rounded-full" style={{ background: s.dot }} />
        {status === 'running' && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: s.dot }}
            animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </span>
      {s.label}
    </span>
  )
}
