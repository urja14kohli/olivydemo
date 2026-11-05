import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import OlivyOrb from '../components/OlivyOrb'
import Wordmark from '../components/Wordmark'
import { IconTile } from '../components/Icons'
import Thumb from '../components/Thumb'
import { BRAND } from '../lib/brand'
import { SCAN_GROUPS, SCAN_POSTS, SCAN_STEPS } from '../lib/lumina'
import type { ScanRow } from '../lib/lumina'

const TOTAL = SCAN_GROUPS.reduce((n, g) => n + g.rows.length, 0)
const FIRST = 700
const STEP = 650

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Scan({ site }: { site: string }) {
  // How many rows have landed. Rows fill in order, one at a time.
  const [found, setFound] = useState(() => (reduceMotion() ? TOTAL : 0))
  const done = found >= TOTAL

  useEffect(() => {
    if (reduceMotion()) return
    const timers = Array.from({ length: TOTAL }, (_, i) =>
      setTimeout(() => setFound(i + 1), FIRST + i * STEP),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const status = done ? 'Done. Here’s where you stand.' : SCAN_STEPS[Math.min(found, SCAN_STEPS.length - 1)]
  let index = 0

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1280px] items-center px-5 py-5 sm:px-8">
        <Wordmark />
      </header>

      <div className="mx-auto grid max-w-[1120px] gap-8 px-5 pb-24 pt-4 sm:px-8 md:grid-cols-[5fr_6fr] md:gap-[72px]">
        <div className="md:sticky md:top-12 md:self-start md:pt-10">
          <OlivyOrb size={112} state={done ? 'idle' : 'thinking'} halo />
          <h1 className="display mb-3 mt-10 text-[40px] leading-[1.1] tracking-[-0.03em]">
            Reading {site.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </h1>
          <p className="m-0 min-h-[1.5em] text-[17px] text-ink-2" aria-live="polite">
            {status}
          </p>

          <motion.div
            className="mt-10"
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: done ? 'auto' : 'none' }}
            aria-hidden={!done}
          >
            <p className="voice mb-6 max-w-[22em] text-[22px]">
              Nothing here is broken. Most of it was simply never set up, and that’s the easy part
              to fix.
            </p>
            <a href="#plan" className="btn btn-ink btn-lg" tabIndex={done ? 0 : -1}>
              See where to focus
            </a>
          </motion.div>
        </div>

        <div>
          {SCAN_GROUPS.map((group) => (
            <section key={group.title} className="mb-7">
              <h2 className="mb-2 ml-4 text-[13px] font-medium text-ink-3">{group.title}</h2>
              <div className="overflow-hidden rounded-2xl bg-surface shadow-lift">
                {group.rows.map((row, r) => {
                  const mine = index++
                  return <Row key={row.title} row={row} shown={found > mine} first={r === 0} />
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function Row({ row, shown, first }: { row: ScanRow; shown: boolean; first: boolean }) {
  return (
    <motion.div
      className="relative grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3.5 px-4 py-3.5"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 4 }}
      transition={{ duration: 0.5 }}
    >
      {!first && <span className="absolute left-[58px] right-0 top-0 h-px bg-line" />}
      <IconTile name={row.icon} />
      <div className="min-w-0">
        <b className="block font-medium">{row.title}</b>
        <span className="block text-sm text-ink-3">{row.detail}</span>
        {row.extra === 'swatches' && (
          <span className="mt-1.5 flex gap-1.5" role="img" aria-label="Brand colors">
            {BRAND.palette.map((c) => (
              <i
                key={c.hex}
                className="size-[22px] rounded-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                style={{ background: c.hex }}
              />
            ))}
          </span>
        )}
        {row.extra === 'posts' && (
          <span className="mt-2 flex gap-1.5" role="img" aria-label="Your three latest posts">
            {SCAN_POSTS.map((src) => (
              <Thumb key={src} src={src} alt="" radius={6} className="w-11" />
            ))}
          </span>
        )}
      </div>
      <span className={`tag ${row.tag.tone === 'ok' ? 'tag-ok' : 'tag-warn'}`}>{row.tag.label}</span>
    </motion.div>
  )
}
