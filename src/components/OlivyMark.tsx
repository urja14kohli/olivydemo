import type { CSSProperties } from 'react'

type Props = {
  size?: number
  active?: boolean
  className?: string
}

/**
 * Loose spiral (logo-like spacing). Animates empty → full → empty.
 */
function spiralPath(turns = 2.15) {
  const cx = 50
  const cy = 50
  const steps = Math.round(turns * 80)
  const r0 = 2.4
  const r1 = 34
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const angle = t * turns * Math.PI * 2 - Math.PI / 2
    const r = r0 + (r1 - r0) * t
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

const PATH = spiralPath(2.15)
const PATH_LEN = 380

export default function OlivyMark({ size = 176, active = false, className = '' }: Props) {
  const gid = `hero-${size}-${active ? 'a' : 'i'}`
  return (
    <span
      className={`olivy-mark ${active ? 'olivy-mark-active' : ''} ${className}`}
      style={
        {
          '--m': `${size}px`,
          '--path-len': PATH_LEN,
        } as CSSProperties
      }
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" className="olivy-mark-svg">
        <defs>
          <linearGradient id={`${gid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A89AD4" />
            <stop offset="50%" stopColor="#9486C4" />
            <stop offset="100%" stopColor="#8678B4" />
          </linearGradient>
        </defs>
        <path
          className="olivy-mark-path"
          d={PATH}
          stroke={`url(#${gid}-grad)`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="olivy-mark-dot" cx="50" cy="47.6" r="1.35" fill="#9486C4" />
      </svg>
    </span>
  )
}
