type Props = {
  size?: number
  className?: string
}

/** Same lockup as the landing page: purple square, ring, Olivy. */
export default function Wordmark({ size = 34, className = '' }: Props) {
  const box = Math.round(size * 0.88)
  return (
    <a href="#welcome" className={`inline-flex items-center gap-2 no-underline ${className}`} aria-label="Olivy">
      <span className="grid place-items-center bg-accent" style={{ width: box, height: box, borderRadius: box * 0.3 }}>
        <span className="rounded-full border-white" style={{ width: box * 0.5, height: box * 0.5, borderWidth: Math.max(2.5, box * 0.1) }} />
      </span>
      <span className="select-none font-semibold tracking-[-0.04em] text-accent" style={{ fontSize: Math.round(size * 0.66), lineHeight: 1 }}>
        Olivy
      </span>
    </a>
  )
}
