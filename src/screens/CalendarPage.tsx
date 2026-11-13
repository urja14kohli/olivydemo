import { useState } from 'react'
import { Check } from 'lucide-react'
import { Icon } from '../components/Icons'
import Thumb from '../components/Thumb'
import { CHANNEL_NAME, STATE_LABEL } from '../lib/lumina'
import type { Day } from '../lib/lumina'
import { stateOf } from '../lib/schedule'

type Filter = 'all' | 'ig' | 'search' | 'short'

const CHIPS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ig', label: 'Instagram' },
  { id: 'search', label: 'Search' },
  { id: 'short', label: 'TikTok' },
]

type Props = {
  days: Day[]
  approved: Set<string>
  approveAll: () => void
  move: (itemId: string, toDay: number) => void
}

export default function CalendarPage({ days, approved, approveAll, move }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [dragging, setDragging] = useState<string | null>(null)
  const [over, setOver] = useState<number | null>(null)
  const allDone = approved.has('p1') && approved.has('p2')

  return (
    <main className="mx-auto max-w-[1280px] px-5 pb-28 pt-7 sm:px-8 sm:pt-9">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="display mb-1 text-[clamp(24px,3.2vw,30px)] tracking-[-0.03em]">This week</h1>
          <p className="m-0 text-[14px] text-ink-3">Nov 5–11 · drag to reschedule</p>
        </div>
        <button
          type="button"
          onClick={approveAll}
          className={`btn ${allDone ? 'btn-done' : 'btn-ink'}`}
        >
          {allDone ? (
            <>
              <Check className="size-4" strokeWidth={2.2} />
              All approved
            </>
          ) : (
            'Approve both'
          )}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by channel">
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`inline-flex h-8 items-center gap-[7px] rounded-full border-0 px-3 text-[13.5px] font-medium ${
              filter === c.id ? 'bg-ink text-[var(--bg)]' : 'bg-fill text-ink-2'
            }`}
          >
            {c.id !== 'all' && <Icon name={c.id} className="size-3.5" />}
            {c.label}
          </button>
        ))}
      </div>

      <div className="no-scrollbar overflow-x-auto rounded-[22px] bg-surface shadow-lift">
        <div className="grid min-w-[980px] grid-cols-7">
          {days.map((day, di) => (
            <div
              key={day.n}
              onDragOver={(e) => {
                e.preventDefault()
                setOver(di)
              }}
              onDragLeave={() => setOver((o) => (o === di ? null : o))}
              onDrop={(e) => {
                e.preventDefault()
                if (dragging) move(dragging, di)
                setDragging(null)
                setOver(null)
              }}
              className={`flex min-h-[420px] flex-col gap-2.5 px-2.5 pb-4 pt-3 transition-colors ${
                di > 0 ? 'shadow-[inset_1px_0_0_var(--line)]' : ''
              } ${day.now ? 'bg-accent-tint/60' : ''} ${over === di && dragging ? 'bg-fill' : ''}`}
            >
              <div className="flex items-baseline justify-between px-0.5">
                <b className="text-[13px] font-semibold">{day.d}</b>
                <span className={`text-[15px] font-semibold tabular-nums ${day.now ? 'text-accent-text' : 'text-ink-3'}`}>
                  {day.n}
                </span>
              </div>

              {day.items.map((it) => {
                if (filter !== 'all' && it.filter !== filter) return null
                const s = stateOf(it, approved)
                return (
                  <div
                    key={it.id}
                    draggable
                    onDragStart={() => setDragging(it.id)}
                    onDragEnd={() => {
                      setDragging(null)
                      setOver(null)
                    }}
                    className={`flex cursor-grab flex-col gap-1.5 rounded-[14px] bg-surface-2 p-1.5 transition hover:-translate-y-px hover:shadow-lift active:cursor-grabbing ${
                      s === 'need'
                        ? 'shadow-[inset_0_0_0_1.5px_var(--ink)]'
                        : s === 'idea'
                          ? 'shadow-[inset_0_0_0_1.5px_var(--accent)]'
                          : 'shadow-[inset_0_0_0_1px_var(--line)]'
                    } ${s === 'posted' ? 'opacity-60' : ''} ${dragging === it.id ? 'opacity-40' : ''}`}
                  >
                    <Thumb src={it.image} alt={it.title} channel={it.ch} aspect="16 / 11" />
                    <span className="px-1 text-[13px] font-medium leading-snug">{it.title}</span>
                    <span className="flex items-center gap-1.5 px-1 pb-1 text-xs text-ink-3">
                      <Icon name={it.ch} className="size-3 shrink-0" aria-label={CHANNEL_NAME[it.ch]} />
                      <span className="truncate">{it.time}</span>
                      {s && (
                        <span className={`ml-auto font-semibold ${s === 'idea' ? 'text-accent-text' : 'text-ink'}`}>
                          {STATE_LABEL[s]}
                        </span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
