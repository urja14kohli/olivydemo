import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../lib/store'

/** A visible Olivy cursor that travels to the card it is working on. */
export default function OlivyCursor() {
  const { cursor, reason } = useStore()
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!cursor) return
    const pg = cursor.startsWith('pg:')
    const el = document.querySelector<HTMLElement>(pg ? `[data-pg="${cursor.slice(3)}"]` : `[data-card="${cursor}"]`)
    if (!el) return
    if (pg) el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    else if (cursor.startsWith('tab-')) window.scrollTo({ top: 0, behavior: 'smooth' })
    else el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect()
      setPos(pg ? { x: r.left + Math.min(r.width * 0.5, 120), y: r.top + r.height * 0.6 } : cursor.startsWith('tab-') ? { x: r.left + r.width / 2, y: r.top + r.height * 0.7 } : { x: r.left + r.width * 0.55, y: r.top + r.height * 0.45 })
    }, pg ? 650 : 350)
    return () => clearTimeout(t)
  }, [cursor])

  if (!cursor || !pos) return null
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      initial={false}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 3l14 7-6 2-2 6L5 3Z" fill="#6B3FA0" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="-mt-1 ml-4 block w-max max-w-[280px] rounded-2xl rounded-tl-md bg-accent px-3 py-2 text-[13px] font-medium leading-snug text-white shadow-lift-hi">{reason ?? 'Olivy'}</span>
    </motion.div>
  )
}
