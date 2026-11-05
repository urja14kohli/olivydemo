import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, Globe } from 'lucide-react'
import AgentCard, { CARD_HEIGHT, CARD_WIDTH, cardHeight } from '../components/AgentCard'
import AgentDetailPanel from '../components/AgentDetailPanel'
import ActivityFeed from '../components/ActivityFeed'
import ConnectionLine from '../components/ConnectionLine'
import NotificationBanner from '../components/NotificationBanner'
import OlivyOrb from '../components/OlivyOrb'
import ChatView from './ChatView'
import { AGENTS } from '../lib/agents'
import type { Agent, AgentId } from '../lib/agents'
import { useDelayedFlag, useElementSize } from '../lib/hooks'

const ORB_SIZE = 184
const EASE = [0.22, 1, 0.36, 1] as const

/** Room kept clear at the bottom centre for the floating activity feed. */
const FEED_CLEARANCE = 112

type Placement = {
  agent: Agent
  center: { x: number; y: number }
  height: number
  /** Unit vector pointing from the orb out to the card. */
  dir: { x: number; y: number }
  orbEdge: { x: number; y: number }
  cardEdge: { x: number; y: number }
}

type Layout = { origin: { x: number; y: number }; placements: Placement[] }

function place(agents: Agent[], width: number, height: number): Layout {
  const usable = height - FEED_CLEARANCE
  const cx = width / 2
  const cy = usable / 2

  const rx = Math.min(width / 2 - CARD_WIDTH / 2 - 52, 498)
  const ry = Math.min(usable / 2 - CARD_HEIGHT / 2 - 12, 262)

  const placements = agents.map((agent) => {
    const a = (agent.angle * Math.PI) / 180
    const x = cx + rx * Math.cos(a)
    const y = cy + ry * Math.sin(a)
    const h = cardHeight(agent)

    const vx = x - cx
    const vy = y - cy
    const len = Math.hypot(vx, vy) || 1
    const dir = { x: vx / len, y: vy / len }

    // Where the spoke leaves the orb.
    const orbEdge = {
      x: cx + dir.x * (ORB_SIZE / 2 + 18),
      y: cy + dir.y * (ORB_SIZE / 2 + 18),
    }

    // Where it meets the card: the ray back toward the orb, clipped to the
    // card rectangle so the line always touches an edge and never overlaps it.
    const tX = Math.abs(dir.x) < 1e-4 ? Infinity : CARD_WIDTH / 2 / Math.abs(dir.x)
    const tY = Math.abs(dir.y) < 1e-4 ? Infinity : h / 2 / Math.abs(dir.y)
    const t = Math.min(tX, tY)
    const cardEdge = { x: x - dir.x * t, y: y - dir.y * t }

    return { agent, center: { x, y }, height: h, dir, orbEdge, cardEdge }
  })

  return { origin: { x: cx, y: cy }, placements }
}

export default function ControlRoom() {
  const [stageRef, stage] = useElementSize<HTMLDivElement>()
  const [openId, setOpenId] = useState<AgentId | null>(null)
  const [hoverId, setHoverId] = useState<AgentId | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const orbReady = useDelayedFlag(0.1)
  const onOpenChat = () => setChatOpen(true)

  // Olivy speaks up once the room has settled. Press N to replay it.
  const noticeDue = useDelayedFlag(14)
  useEffect(() => {
    if (noticeDue) setNotice(true)
  }, [noticeDue])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'n') setNotice((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const layout = useMemo(
    () =>
      stage.width > 0
        ? place(AGENTS, stage.width, stage.height)
        : { origin: { x: 0, y: 0 }, placements: [] },
    [stage.width, stage.height],
  )
  const { origin, placements } = layout

  const openAgent = AGENTS.find((a) => a.id === openId) ?? null
  const runningCount = AGENTS.filter((a) => a.status === 'running').length

  return (
    <div className="flex h-full flex-col">
      <Header runningCount={runningCount} onReview={onOpenChat} />

      <div ref={stageRef} className="relative min-h-0 flex-1">
        {stage.width > 0 && (
          <>
            <svg
              className="pointer-events-none absolute inset-0"
              width={stage.width}
              height={stage.height}
              aria-hidden
            >
              {placements.map(({ agent, orbEdge, cardEdge }) => (
                <ConnectionLine
                  key={agent.id}
                  from={orbEdge}
                  to={cardEdge}
                  accent={agent.accent}
                  delay={agent.entrance + 0.28}
                  muted={agent.status === 'inactive'}
                  emphasis={hoverId === agent.id}
                />
              ))}
            </svg>

            <motion.div
              className="absolute flex flex-col items-center"
              style={{
                left: origin.x,
                top: origin.y,
                marginLeft: -ORB_SIZE / 2,
                marginTop: -ORB_SIZE / 2,
              }}
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20 }}
            >
              <OlivyOrb
                size={ORB_SIZE}
                state={orbReady ? 'active' : 'thinking'}
                onClick={onOpenChat}
              />
              <motion.button
                type="button"
                onClick={onOpenChat}
                className="btn-ghost mt-5 px-3.5 py-1.5 text-[12.5px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
                whileHover={{ y: -2 }}
              >
                Talk to Olivy
                <ChevronUp className="size-3.5" strokeWidth={2.6} />
              </motion.button>
            </motion.div>

            {placements.map(({ agent, center, dir, height }) => (
              <motion.div
                key={agent.id}
                className="absolute"
                style={{
                  left: center.x,
                  top: center.y,
                  marginLeft: -CARD_WIDTH / 2,
                  marginTop: -height / 2,
                }}
                initial={{ opacity: 0, scale: 0.88, x: dir.x * 170, y: dir.y * 170 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{
                  delay: agent.entrance,
                  type: 'spring',
                  stiffness: 130,
                  damping: 19,
                  mass: 0.9,
                }}
                onHoverStart={() => setHoverId(agent.id)}
                onHoverEnd={() => setHoverId((id) => (id === agent.id ? null : id))}
              >
                <AgentCard
                  agent={agent}
                  live={agent.status !== 'inactive'}
                  onOpen={() => setOpenId(agent.id)}
                />
              </motion.div>
            ))}
          </>
        )}

        {/* The bottom centre of the ring is deliberately empty, so the log
            lives there instead of stealing height from the constellation. */}
        <motion.div
          className="absolute bottom-5 left-1/2 w-full max-w-[760px] -translate-x-1/2 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.6, ease: EASE }}
        >
          <ActivityFeed />
        </motion.div>
      </div>

      <AgentDetailPanel agent={openAgent} onClose={() => setOpenId(null)} />
      <ChatView open={chatOpen} onClose={() => setChatOpen(false)} />
      <NotificationBanner open={notice && !chatOpen} onDismiss={() => setNotice(false)} />
    </div>
  )
}

function Header({
  runningCount,
  onReview,
}: {
  runningCount: number
  onReview: () => void
}) {
  return (
    <motion.header
      className="flex items-center justify-between border-b border-line px-6 py-3.5"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-center gap-3">
        <OlivyOrb size={22} particles={false} state="idle" />
        <span className="display text-[15px] text-fg">Olivy</span>
        <span className="text-fg-4">/</span>
        <span className="mono text-[12px] text-fg-3">luminaskin.com</span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12.5px] text-fg-3">
          <Globe className="size-3.5 text-fg-4" strokeWidth={2.2} />
          Control room
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12.5px] text-fg-3">
          <span className="relative flex size-[6px]">
            <span className="absolute inset-0 rounded-full bg-accent" />
            <motion.span
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
            />
          </span>
          {runningCount} agents working
        </span>
        <button type="button" onClick={onReview} className="btn px-4 py-1.5 text-[12.5px]">
          Review 3
        </button>
      </div>
    </motion.header>
  )
}
