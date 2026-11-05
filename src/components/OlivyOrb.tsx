import type { CSSProperties } from 'react'

export type OrbState = 'idle' | 'thinking'

type Props = {
  size?: number
  state?: OrbState
  /** Slow breathing. Use on large hero orbs. */
  breathe?: boolean
  /** Soft lilac bloom behind the orb. */
  halo?: boolean
  className?: string
}

/**
 * Olivy's face. A soft pearly sphere of four blurred pastel blobs (blue, lilac,
 * peach, mint) morphing inside a circular mask. Pure CSS, so it costs nothing
 * per frame and honours prefers-reduced-motion.
 */
export default function OlivyOrb({
  size = 40,
  state = 'idle',
  breathe = false,
  halo = false,
  className = '',
}: Props) {
  const orb = (
    <span
      aria-hidden
      className={`orb ${breathe ? 'orb-breathe' : ''} ${state === 'thinking' ? 'orb-thinking' : ''} ${className}`}
      style={{ '--s': `${size}px` } as CSSProperties}
    >
      <span className="orb-core">
        <i />
        <i />
        <i />
        <i />
      </span>
    </span>
  )
  return halo ? <span className="orb-halo">{orb}</span> : orb
}
