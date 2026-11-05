import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUp, ChevronDown } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'
import { IconTile } from '../components/Icons'
import { WEEK, WORKING } from '../lib/lumina'
import type { Day } from '../lib/lumina'
import Today from './Today'
import CalendarPage from './CalendarPage'

const TABS = [
  { id: 'home', label: 'Today', href: '#home' },
  { id: 'calendar', label: 'Calendar', href: '#calendar' },
  { id: 'library', label: 'Library', href: '#home' },
  { id: 'brand', label: 'Brand', href: '#home' },
] as const

export default function AppShell({ tab }: { tab: 'home' | 'calendar' }) {
  const [days, setDays] = useState<Day[]>(WEEK)
  const [approved, setApprovedSet] = useState<Set<string>>(new Set())

  const setApproved = (id: string, on: boolean) =>
    setApprovedSet((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })

  const move = (itemId: string, toDay: number) =>
    setDays((prev) => {
      const item = prev.flatMap((d) => d.items).find((i) => i.id === itemId)
      if (!item) return prev
      return prev.map((d, i) => ({
        ...d,
        items:
          i === toDay
            ? [...d.items.filter((x) => x.id !== itemId), item]
            : d.items.filter((x) => x.id !== itemId),
      }))
    })

  return (
    <div className="min-h-screen">
      <TopBar tab={tab} />
      {tab === 'home' ? (
        <Today days={days} approved={approved} setApproved={setApproved} />
      ) : (
        <CalendarPage
          days={days}
          approved={approved}
          approveAll={() => {
            setApproved('p1', true)
            setApproved('p2', true)
          }}
          move={move}
        />
      )}
      <AskBar />
    </div>
  )
}

function TopBar({ tab }: { tab: 'home' | 'calendar' }) {
  const [open, setOpen] = useState(false)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rightRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="glass sticky top-0 z-20 border-b border-line">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-2.5 sm:px-6 max-[860px]:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          aria-label="Switch brand, current: Lumina"
          className="inline-flex items-center gap-2.5 justify-self-start rounded-[10px] border-0 bg-transparent py-1.5 pl-1.5 pr-2.5 hover:bg-fill"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-[#e7e1d6] text-[13px] font-semibold text-[#2a241c]" aria-hidden>
            L
          </span>
          <b className="font-semibold max-[620px]:hidden">Lumina</b>
          <ChevronDown className="size-3 text-ink-3" strokeWidth={2.2} />
        </button>

        <nav aria-label="Sections" className="inline-flex justify-self-center rounded-[10px] bg-fill p-[3px]">
          {TABS.map((t, i) => (
            <a
              key={t.id}
              href={t.href}
              aria-current={t.id === tab ? 'page' : undefined}
              className={`inline-flex h-[30px] items-center rounded-lg px-4 text-[13.5px] font-medium no-underline max-[860px]:px-2.5 ${
                i > 1 ? 'max-[620px]:hidden' : ''
              } ${t.id === tab ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-ink-2'}`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div ref={rightRef} className="relative flex items-center gap-2 justify-self-end">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="working-pop"
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex h-[34px] items-center gap-2 rounded-full border-0 pl-1.5 pr-3 text-[13.5px] hover:bg-fill ${
              open ? 'bg-fill text-ink' : 'bg-transparent text-ink-2'
            }`}
          >
            <OlivyOrb size={22} state="thinking" />
            <span className="max-[620px]:hidden">Working on 3 things</span>
          </button>
          <button
            type="button"
            aria-label="Account"
            className="grid size-[30px] place-items-center rounded-full border-0 bg-[#d9d3ee] text-[12.5px] font-semibold text-[#3a3360]"
          >
            UK
          </button>

          {open && (
            <div
              id="working-pop"
              role="dialog"
              aria-label="What Olivy is doing right now"
              className="absolute right-[38px] top-[calc(100%+10px)] w-[min(360px,calc(100vw-32px))] rounded-[18px] bg-surface p-[18px] shadow-lift-hi max-[620px]:right-0"
            >
              <h3 className="mb-1.5 mt-0 text-[13px] font-medium text-ink-3">Right now</h3>
              {WORKING.now.map((t, i) => (
                <Task key={t.title} task={t} first={i === 0} />
              ))}
              <h3 className="mb-1.5 mt-3.5 text-[13px] font-medium text-ink-3">Waiting on you</h3>
              {WORKING.waiting.map((t) => (
                <Task key={t.title} task={t} first />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Task({
  task,
  first,
}: {
  task: { icon: 'search' | 'ig' | 'ai' | 'ads'; title: string; detail: string; progress?: number }
  first: boolean
}) {
  return (
    <div className={`grid grid-cols-[28px_minmax(0,1fr)] gap-3 py-2.5 ${first ? '' : 'border-t border-line'}`}>
      <IconTile name={task.icon} />
      <div>
        <b className="block text-sm font-medium">{task.title}</b>
        <span className="text-[13px] text-ink-3">{task.detail}</span>
        {task.progress != null && (
          <div className="mt-2 h-1 overflow-hidden rounded-sm bg-fill">
            <i className="block h-full rounded-sm bg-accent" style={{ width: `${task.progress * 100}%` }} />
          </div>
        )}
      </div>
    </div>
  )
}

function AskBar() {
  const submit = (e: FormEvent) => e.preventDefault()
  return (
    <div className="fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] left-1/2 z-[15] w-[min(640px,calc(100%-32px))] -translate-x-1/2">
      <form
        onSubmit={submit}
        className="glass flex items-center gap-2.5 rounded-[20px] py-2 pl-3 pr-2 shadow-[var(--lift-hi),inset_0_0_0_1px_var(--line)]"
      >
        <OlivyOrb size={28} />
        <label htmlFor="ask" className="sr-only">
          Ask Olivy
        </label>
        <input
          id="ask"
          placeholder="Ask Olivy, or tell her what to change"
          className="h-10 min-w-0 flex-1 border-0 bg-transparent text-[15.5px] outline-none placeholder:text-ink-3"
        />
        <button
          type="submit"
          aria-label="Send"
          className="grid size-10 place-items-center rounded-xl border-0 bg-ink text-[var(--bg)]"
        >
          <ArrowUp className="size-4" strokeWidth={2.2} />
        </button>
      </form>
    </div>
  )
}
