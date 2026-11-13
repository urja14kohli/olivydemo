import { useState } from 'react'
import { Check } from 'lucide-react'
import { InstagramLogo, ShopifyLogo, TikTokLogo } from '../components/Icons'
import Thumb from '../components/Thumb'
import { READY, STATE_LABEL } from '../lib/lumina'
import type { Day, ItemState, ReadyPiece } from '../lib/lumina'
import { stateOf } from '../lib/schedule'
import type { ReactNode } from 'react'

type Props = {
  days: Day[]
  approved: Set<string>
  setApproved: (id: string, on: boolean) => void
  ready?: ReadyPiece[]
}

const DESTINATIONS: { id: string; name: string; logo: ReactNode }[] = [
  { id: 'ig', name: 'Instagram', logo: <InstagramLogo className="size-[18px]" /> },
  { id: 'tiktok', name: 'TikTok', logo: <TikTokLogo className="size-[18px]" /> },
  { id: 'shopify', name: 'Shopify', logo: <ShopifyLogo className="size-[18px]" /> },
]

export default function Today({ days, approved, setApproved, ready }: Props) {
  const pieces = ready ?? READY
  const hero = pieces.find((p) => p.kind === 'reel') ?? pieces[0]
  const done = approved.has(hero.id)
  const [linked, setLinked] = useState<Set<string>>(new Set(['ig']))
  const total = days.reduce((n, d) => n + d.items.length, 0)

  const toggleLink = (id: string) =>
    setLinked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <main className="mx-auto max-w-[1200px] px-5 pb-28 pt-6 sm:px-8 sm:pt-7">
      {/* One toolbar row: date + destinations */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-ink-3">Thursday, November 5</p>
        <div className="flex items-center gap-1.5" role="group" aria-label="Connect to post">
          <span className="mr-1.5 text-[12px] text-ink-3 max-[480px]:hidden">Connect</span>
          {DESTINATIONS.map((d) => {
            const on = linked.has(d.id)
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleLink(d.id)}
                aria-pressed={on}
                aria-label={`${on ? 'Connected' : 'Connect'} ${d.name}`}
                title={d.name}
                className={`grid size-9 place-items-center rounded-full border-0 transition ${
                  on ? 'bg-surface shadow-lift' : 'bg-transparent hover:bg-fill'
                }`}
              >
                {d.logo}
              </button>
            )
          })}
        </div>
      </div>

      {/* One composition: approve + week, side by side */}
      <div className="grid items-start gap-8 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-10">
        <section aria-label="First post" className="xl:sticky xl:top-[72px]">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-3">
            Ready for you
          </p>

          <div className="overflow-hidden rounded-[22px] bg-surface shadow-lift">
            <Thumb src={hero.image} alt={hero.title} aspect="4 / 5" radius={0}>
              <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
              {hero.duration && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {hero.duration}
                </span>
              )}
            </Thumb>

            <div className="p-4">
              <h1 className="mb-1 text-[18px] font-semibold tracking-[-0.02em]">{hero.title}</h1>
              <p className="mb-4 text-[13.5px] leading-snug text-ink-2 line-clamp-2">{hero.caption}</p>

              {done ? (
                <div className="flex items-center gap-2" aria-live="polite">
                  <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium">
                    <Check className="size-4" strokeWidth={2.2} />
                    Scheduled
                  </span>
                  <button
                    type="button"
                    onClick={() => setApproved(hero.id, false)}
                    className="btn btn-plain btn-sm ml-auto"
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setApproved(hero.id, true)}
                    className="btn btn-ink flex-1"
                  >
                    Approve
                  </button>
                  <button type="button" className="btn">
                    Edit
                  </button>
                </div>
              )}
              <p className="mt-3 mb-0 text-[12px] text-ink-3">{hero.when}</p>
            </div>
          </div>
        </section>

        <section aria-label="Your week">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <div>
              <h2 className="display m-0 text-[22px] tracking-[-0.025em]">Your week</h2>
              <p className="mt-1 mb-0 text-[13px] text-ink-3">{total} posts · Nov 5–11</p>
            </div>
            <a
              href="#calendar"
              className="text-[13px] font-medium text-ink no-underline hover:opacity-55"
            >
              Edit schedule
            </a>
          </div>

          <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="grid min-w-[640px] grid-cols-7 gap-2.5">
              {days.map((day) => (
                <div key={day.n} className="min-w-0">
                  <div
                    className={`mb-2.5 flex items-baseline justify-between px-0.5 ${
                      day.now ? 'text-ink' : 'text-ink-3'
                    }`}
                  >
                    <span className="text-[12px] font-semibold">{day.d}</span>
                    <span className="text-[12px] tabular-nums">{day.n}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {day.items.map((it) => {
                      const s = stateOf(it, approved)
                      return (
                        <a
                          key={it.id}
                          href="#calendar"
                          title={`${it.title} · ${it.time}`}
                          className="block no-underline"
                        >
                          <Thumb
                            src={it.image}
                            alt={it.title}
                            channel={it.ch}
                            aspect="3 / 4"
                            radius={12}
                            className={`transition-opacity hover:opacity-90 ${
                              s === 'posted' ? 'opacity-45' : ''
                            }`}
                          >
                            {s && s !== 'posted' && (
                              <span
                                className={`absolute right-1 top-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                                  s === 'idea'
                                    ? 'bg-white/95 text-[#1d1d1f]'
                                    : 'bg-ink text-[var(--bg)]'
                                }`}
                              >
                                {badge(s)}
                              </span>
                            )}
                          </Thumb>
                        </a>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function badge(s: ItemState) {
  if (s === 'need') return 'Yes'
  if (s === 'idea') return 'Idea'
  return STATE_LABEL[s]
}
