export type OrbState = 'idle' | 'thinking'

type Props = {
  size?: number
  state?: OrbState
  breathe?: boolean
  halo?: boolean
  className?: string
}

/** Olivy's mark: purple rounded square with a white ring. */
export default function OlivyOrb({ size = 40, state = 'idle', breathe = false, className = '' }: Props) {
  const pulse = breathe || state === 'thinking'
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center bg-accent ${pulse ? 'animate-pulse' : ''} ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.3 }}
    >
      <span className="rounded-full border-white" style={{ width: size * 0.48, height: size * 0.48, borderWidth: Math.max(2, size * 0.1) }} />
    </span>
  )
}
