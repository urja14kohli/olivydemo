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
    <main className="mx-auto max-w-[1280px] px-5 pb-40 pt-9 sm:px-8 sm:pt-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2.5 text-sm text-ink-3">November 5 to 11</p>
          <h1 className="display mb-3.5 text-[clamp(32px,4.4vw,44px)] tracking-[-0.032em]">This week</h1>
          <p className="voice m-0 max-w-[34em] text-[19px] text-ink-2">
            14 pieces across your 3 channels, timed for when your audience is actually online. Two
            need your yes.
          </p>
        </div>
        <button
          type="button"
          onClick={approveAll}
          className={`btn btn-lg ${allDone ? 'btn-done' : 'btn-ink'}`}
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

      <div className="mb-5 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter by channel">
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
        <span className="flex-1" />
        <span className="text-[13.5px] text-ink-3">Drag anything to move it</span>
      </div>

      <div className="no-scrollbar overflow-x-auto rounded-[22px] bg-surface shadow-lift">
        <div className="grid min-w-[1120px] grid-cols-7">
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
              className={`flex min-h-[520px] flex-col gap-3 px-3 pb-[18px] pt-3.5 transition-colors ${
                di > 0 ? 'shadow-[inset_1px_0_0_var(--line)]' : ''
              } ${day.now ? 'bg-accent-tint/60' : ''} ${over === di && dragging ? 'bg-fill' : ''}`}
            >
              <div className="flex items-baseline justify-between px-0.5">
                <b className="font-semibold">{day.d}</b>
                <span className={`display text-[22px] tracking-[-0.03em] ${day.now ? 'text-accent-text' : 'text-ink-3'}`}>
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
