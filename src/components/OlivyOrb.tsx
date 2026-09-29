import { useMemo } from 'react'
import { motion, useTime, useTransform } from 'framer-motion'

export type OrbState = 'idle' | 'thinking' | 'active' | 'notify'

type Props = {
  size?: number
  state?: OrbState
  particles?: boolean
  onClick?: () => void
  label?: string
  className?: string
}

const TUNING: Record<
  OrbState,
  {
    breathe: [number, number]
    breatheDuration: number
    halo: [number, number]
    haloDuration: number
    spinA: number
    spinB: number
    orbit: number
  }
> = {
  idle: {
    breathe: [1, 1.022],
    breatheDuration: 4.6,
    halo: [0.4, 0.58],
    haloDuration: 4.6,
    spinA: 26,
    spinB: 34,
    orbit: 1,
  },
  thinking: {
    breathe: [0.99, 1.06],
    breatheDuration: 1.7,
    halo: [0.55, 0.9],
    haloDuration: 1.7,
    spinA: 9,
    spinB: 13,
    orbit: 0.4,
  },
  active: {
    breathe: [1, 1.035],
    breatheDuration: 2.9,
    halo: [0.62, 0.86],
    haloDuration: 2.9,
    spinA: 16,
    spinB: 22,
    orbit: 0.66,
  },
  notify: {
    breathe: [1, 1.05],
    breatheDuration: 1.1,
    halo: [0.7, 1],
    haloDuration: 1.1,
    spinA: 12,
    spinB: 16,
    orbit: 0.5,
  },
}

/**
 * Olivy's face. Two counter-rotating conic gradients blurred into a mesh,
 * three drifting colour blobs for organic movement, a glass specular on top,
 * and a halo that breathes with the orb's state.
 */
export default function OlivyOrb({
  size = 180,
  state = 'idle',
  particles = true,
  onClick,
  label = 'Olivy',
  className = '',
}: Props) {
  const t = TUNING[state]
  const time = useTime()

  const spinA = useTransform(time, (v) => (v / (t.spinA * 1000)) * 360)
  const spinB = useTransform(time, (v) => -(v / (t.spinB * 1000)) * 360)

  // Lissajous drift: the blobs never repeat the same loop, so the surface
  // reads as alive rather than looped.
  const blob1X = useTransform(time, (v) => Math.sin(v / 2300) * size * 0.16)
  const blob1Y = useTransform(time, (v) => Math.cos(v / 3100) * size * 0.14)
  const blob2X = useTransform(time, (v) => Math.cos(v / 2900) * size * 0.18)
  const blob2Y = useTransform(time, (v) => Math.sin(v / 2100) * size * 0.16)
  const blob3X = useTransform(time, (v) => Math.sin(v / 3700 + 1.2) * size * 0.14)
  const blob3Y = useTransform(time, (v) => Math.cos(v / 2500 + 0.6) * size * 0.18)

  const dots = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        radius: 0.62 + ((i * 37) % 26) / 100,
        duration: (16 + ((i * 53) % 17)) * t.orbit,
        delay: -(i * 2.4),
        scale: 0.5 + ((i * 29) % 60) / 100,
        reverse: i % 3 === 0,
      })),
    [t.orbit],
  )

  const Wrapper = onClick ? motion.button : motion.div

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      aria-label={onClick ? `Open ${label}` : undefined}
      className={`relative shrink-0 rounded-full ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, border: 'none', background: 'none', padding: 0 }}
      whileHover={onClick ? { scale: 1.04 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      {/* Broad ambient wash: colours the air around the orb. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: -size * 0.85,
          background:
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.30) 0%, rgba(167,139,250,0.18) 34%, rgba(96,165,250,0.09) 52%, transparent 72%)',
          filter: `blur(${size * 0.14}px)`,
        }}
        animate={{ opacity: [t.halo[0] * 0.8, t.halo[1], t.halo[0] * 0.8], scale: [1, 1.09, 1] }}
        transition={{ duration: t.haloDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tight glow ring: peaks just outside the sphere so it reads as light
          coming off the orb rather than a shadow underneath it. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: -size * 0.34,
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(139,92,246,0.55) 52%, rgba(167,139,250,0.34) 62%, rgba(192,132,252,0.14) 74%, transparent 88%)',
          filter: `blur(${size * 0.055}px)`,
        }}
        animate={{ opacity: [t.halo[0], t.halo[1], t.halo[0]], scale: [1, 1.05, 1] }}
        transition={{ duration: t.haloDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Notification ripple */}
      {state === 'notify' && (
        <>
          {[0, 0.55].map((delay) => (
            <motion.span
              key={delay}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border"
              style={{ borderColor: 'rgba(167,139,250,0.6)' }}
              animate={{ scale: [1, 1.7], opacity: [0.65, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, delay, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* Sphere */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          filter: 'saturate(1.28) contrast(1.06)',
          boxShadow: `0 ${size * 0.09}px ${size * 0.26}px -${size * 0.05}px rgba(72,38,116,0.5)`,
        }}
        animate={{ scale: [t.breathe[0], t.breathe[1], t.breathe[0]] }}
        transition={{ duration: t.breatheDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[#4A2382]" />

        <motion.div
          className="absolute -inset-[28%]"
          style={{
            rotate: spinA,
            background:
              'conic-gradient(from 0deg, #562C93 0%, #8B5CF6 13%, #C084FC 25%, #A78BFA 36%, #7FA8F5 47%, #60A5FA 53%, #8B7EC8 62%, #A855F7 74%, #7C4FD6 87%, #562C93 100%)',
            filter: `blur(${size * 0.06}px)`,
          }}
        />

        <motion.div
          className="absolute -inset-[28%] mix-blend-overlay"
          style={{
            rotate: spinB,
            opacity: 0.9,
            background:
              'conic-gradient(from 140deg, rgba(0,0,0,0.35), #C084FC, rgba(0,0,0,0.3), #60A5FA, rgba(0,0,0,0.35), #E9D5FF, rgba(0,0,0,0.3))',
            filter: `blur(${size * 0.09}px)`,
          }}
        />

        <motion.div
          className="absolute rounded-full mix-blend-screen"
          style={{
            inset: '14%',
            x: blob1X,
            y: blob1Y,
            opacity: 0.85,
            background: 'radial-gradient(circle, #C084FC, transparent 62%)',
            filter: `blur(${size * 0.07}px)`,
          }}
        />
        <motion.div
          className="absolute rounded-full mix-blend-screen"
          style={{
            inset: '22%',
            x: blob2X,
            y: blob2Y,
            opacity: 0.55,
            background: 'radial-gradient(circle, #60A5FA, transparent 60%)',
            filter: `blur(${size * 0.07}px)`,
          }}
        />
        {/* Iridescent sheen, not a white wash. */}
        <motion.div
          className="absolute rounded-full mix-blend-soft-light"
          style={{
            inset: '18%',
            x: blob3X,
            y: blob3Y,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 58%)',
            filter: `blur(${size * 0.06}px)`,
          }}
        />

        {/* Specular highlight reads the orb as a physical sphere. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 34% 26%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 16%, transparent 36%)',
          }}
        />
        {/* Grounding shade at the base gives the sphere weight. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 66% 96%, rgba(30,10,58,0.62) 0%, rgba(30,10,58,0.22) 30%, transparent 58%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 ${size * 0.01}px ${size * 0.03}px rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.28)`,
          }}
        />
      </motion.div>

      {/* Orbiting micro particles */}
      {particles && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {dots.map((d) => (
            <motion.div
              key={d.id}
              className="absolute inset-0"
              animate={{ rotate: d.reverse ? -360 : 360 }}
              transition={{
                duration: d.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: d.delay,
              }}
            >
              <motion.span
                className="absolute left-1/2 top-1/2 block rounded-full bg-white"
                style={{
                  width: size * 0.028,
                  height: size * 0.028,
                  marginLeft: -size * 0.014,
                  marginTop: -size * 0.014,
                  x: size * d.radius,
                  boxShadow: '0 0 8px rgba(167,139,250,0.9)',
                }}
                animate={{ opacity: [0.25, 0.85, 0.25], scale: [d.scale, d.scale * 1.5, d.scale] }}
                transition={{
                  duration: 3.4 + d.id * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </Wrapper>
  )
}
