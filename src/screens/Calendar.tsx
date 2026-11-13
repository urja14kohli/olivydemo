import { useState } from 'react'
import NavBar from '../components/NavBar'
import { CAL_ITEMS, HUB_CARDS, QUEUE, WEEK_DAYS } from '../lib/demo'
import type { CalItem } from '../lib/demo'
import { useStore } from '../lib/store'

const KIND_COLOR: Record<string, string> = {
  social: 'bg-accent',
  blog: 'bg-sky-500',
  newsletter: 'bg-success',
  ads: 'bg-pending',
}

const PILLS = [
  { label: 'All', kinds: null },
  { label: 'Social Media', kinds: ['social'] },
  { label: 'Blogs', kinds: ['blog'] },
  { label: 'Newsletter', kinds: ['newsletter'] },
  { label: 'Ads', kinds: ['ads'] },
] as const

export default function Calendar() {
  const [pill, setPill] = useState('All')
  const { queue, extraCards } = useStore()
  const extra: CalItem[] = queue.flatMap((q) => {
    const c = [...HUB_CARDS, ...extraCards].find((h) => h.id === q.id)
    if (!c) return []
    const kind = c.column === 'blogs' ? 'blog' : c.column === 'newsletter' ? 'newsletter' : c.column === 'ads' ? 'ads' : 'social'
    return [{ id: `q-${q.id}`, day: q.day, time: q.time, title: c.title, kind, image: c.image, olivyPick: true } as CalItem]
  })
  const filled = queue.length >= 8
  const all = filled ? extra : [...CAL_ITEMS, ...extra]
  const pickedQueue = filled ? extra : [...QUEUE, ...extra]
  const kinds = PILLS.find((p) => p.label === pill)?.kinds
  const shown = all.filter((i) => !kinds || (kinds as readonly string[]).includes(i.kind))
  return (
    <div className="min-h-screen">
      <NavBar tab="calendar" />
      <main className="mx-auto grid max-w-[1280px] gap-6 px-4 py-6 lg:grid-cols-[1fr_280px] sm:px-6">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h1 className="m-0 text-[44px] font-normal leading-none tracking-[-0.01em]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>This week</h1>
              <p className="mt-1 text-[14px] text-ink-3">{queue.length ? `Nov 10 to 16 · ${queue.length} scheduled by Olivy` : 'Nov 10 to 16'}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {PILLS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPill(p.label)}
                className={`h-8 rounded-full border-0 px-3.5 text-[13px] font-medium ${pill === p.label ? 'bg-accent text-white' : 'bg-accent-tint text-accent'}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="no-scrollbar overflow-x-auto rounded-xl bg-surface shadow-lift">
            <div className="grid min-w-[860px] grid-cols-7">
              {WEEK_DAYS.map((day, di) => (
                <div
                  key={day.n}
                  className={`min-h-[420px] px-2.5 pb-4 pt-3 ${di > 0 ? 'shadow-[inset_1px_0_0_var(--line)]' : ''} ${'now' in day && day.now ? 'bg-accent-tint/50' : ''}`}
                >
                  <div className="mb-3 flex items-baseline justify-between px-0.5">
                    <span className="text-[12px] font-semibold">{day.d}</span>
                    <span className="text-[13px] tabular-nums text-ink-3">{day.n}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {shown.filter((i) => i.day === di).map((it) => (
                      <div key={it.id} className="cursor-grab rounded-[10px] bg-surface-2 p-1.5 shadow-[inset_0_0_0_1px_var(--line)]">
                        <div className="relative overflow-hidden rounded-lg">
                          <img src={it.image} alt="" className="aspect-[16/11] w-full object-cover" />
                          <span className={`absolute left-1.5 top-1.5 size-2 rounded-full ${KIND_COLOR[it.kind]}`} />
                        </div>
                        <p className="mt-1.5 px-1 text-[12.5px] font-medium leading-snug">{it.title}</p>
                        <p className="px-1 text-[11px] text-ink-3">{it.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-xl bg-surface p-4 shadow-lift">
          <h2 className="display mb-1 text-[18px]">Queue</h2>
          <p className="mb-4 text-[13px] text-ink-3">Times Olivy picked</p>
          <div className="flex flex-col gap-3">
            {pickedQueue.map((q) => (
              <div key={q.id} className="flex gap-3 rounded-[10px] bg-fill p-2">
                <img src={q.image} alt="" className="size-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium">{q.title}</p>
                  <p className="text-[12px] text-ink-3">{q.time}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  )
}
