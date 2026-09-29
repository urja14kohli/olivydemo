import { motion } from 'framer-motion'

export type Point = { x: number; y: number }

type Props = {
  from: Point
  to: Point
  accent: string
  /** Seconds before the line starts drawing itself. */
  delay: number
  /** Dimmed agents get a quieter, static link. */
  muted?: boolean
  /** Lifts the line while its card is hovered. */
  emphasis?: boolean
}

/**
 * The link between the orb and one agent. A hairline that draws itself, a
 * flowing dash on top, and a packet that runs the length of the path.
 */
export default function ConnectionLine({
  from,
  to,
  accent,
  delay,
  muted = false,
  emphasis = false,
}: Props) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1

  // A shallow, consistent bow so the spokes read as drawn rather than snapped.
  const bow = length * 0.08 * (dy >= 0 ? 1 : -1)
  const cx = (from.x + to.x) / 2 + (-dy / length) * bow
  const cy = (from.y + to.y) / 2 + (dx / length) * bow
  const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`

  const travel = Math.max(1.6, length / 150)

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={accent}
        strokeWidth={emphasis ? 1.8 : 1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: muted ? 0.2 : emphasis ? 0.55 : 0.38 }}
        transition={{
          pathLength: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4, delay },
        }}
      />

      {!muted && (
        <>
          <motion.path
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth={emphasis ? 2.6 : 2.2}
            strokeLinecap="round"
            strokeDasharray="3 8"
            initial={{ opacity: 0 }}
            animate={{ opacity: emphasis ? 1 : 0.85, strokeDashoffset: [0, -44] }}
            transition={{
              opacity: { duration: 0.5, delay: delay + 0.5 },
              strokeDashoffset: {
                duration: 2.2,
                repeat: Infinity,
                ease: 'linear',
                delay: delay + 0.5,
              },
            }}
          />

          <motion.circle
            r={3.2}
            fill={accent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.7 }}
            style={{ filter: `drop-shadow(0 0 7px ${accent})` }}
          >
            <animateMotion
              dur={`${travel}s`}
              repeatCount="indefinite"
              begin={`${delay + 0.7}s`}
              path={d}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.4 0 0.6 1"
            />
          </motion.circle>
        </>
      )}

      {/* Landing point on the card edge. */}
      <motion.circle
        cx={to.x}
        cy={to.y}
        r={3}
        fill="#FFFFFF"
        stroke={accent}
        strokeWidth={1.4}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: muted ? 0.45 : 1 }}
        transition={{ type: 'spring', stiffness: 460, damping: 20, delay: delay + 0.65 }}
        style={{ transformOrigin: `${to.x}px ${to.y}px` }}
      />
    </g>
  )
}
