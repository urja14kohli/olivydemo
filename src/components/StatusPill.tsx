import { motion } from 'framer-motion'
import type { AgentStatus } from '../lib/agents'

const COPY: Record<AgentStatus, { label: string; dot: string; text: string; bg: string }> = {
  running: {
    label: 'Running',
    dot: '#00D4AA',
    text: '#7BF0D0',
    bg: 'rgba(0,212,170,0.10)',
  },
  queued: {
    label: 'Queued',
    dot: '#F59E0B',
    text: '#FBBF24',
    bg: 'rgba(245,158,11,0.10)',
  },
  inactive: {
    label: 'Standby',
    dot: '#52525B',
    text: '#A1A1AA',
    bg: 'rgba(255,255,255,0.04)',
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
