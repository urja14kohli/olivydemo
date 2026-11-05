/** A tiny activity spark drawn as a polyline. Purely decorative. */
export default function Sparkline({
  points,
  color,
  className = '',
}: {
  points: number[]
  color: string
  className?: string
}) {
  const w = 56
  const h = 16
  const max = Math.max(...points, 1)
  const min = Math.min(...points, 0)
  const range = Math.max(max - min, 1)
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / range) * (h - 2) - 1
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} width={w} height={h} aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" opacity={0.85} />
    </svg>
  )
}

export const SPARK: Record<string, number[]> = {
  social: [2, 3, 2, 5, 4, 8, 7, 11],
  seo: [1, 1, 2, 2, 4, 5, 8, 9],
  blog: [0, 1, 1, 3, 3, 5, 6, 6],
  geo: [0, 0, 1, 1, 1, 2, 3, 4],
}
