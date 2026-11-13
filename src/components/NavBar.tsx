import { Settings } from 'lucide-react'
import { setAutopilot, useStore } from '../lib/store'
import Wordmark from './Wordmark'

const TABS = [
  { id: 'hub', label: 'Hub', href: '#hub' },
  { id: 'calendar', label: 'Calendar', href: '#calendar' },
  { id: 'notifs', label: 'Brief', href: '#notifs', badge: true },
] as const

export default function NavBar({ tab }: { tab: 'hub' | 'calendar' | 'notifs' | 'settings' }) {
  const { autopilot } = useStore()
  return (
    <header className="glass sticky top-0 z-30 border-b border-line">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Wordmark size={34} />

        <nav aria-label="Sections" className="inline-flex rounded-[10px] bg-fill p-[3px]">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={t.href}
              aria-current={t.id === tab ? 'page' : undefined}
              className={`relative inline-flex h-[30px] items-center rounded-lg px-3.5 text-[13.5px] font-medium no-underline sm:px-4 ${
                t.id === tab ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-ink-2'
              }`}
            >
              {t.label}
              {'badge' in t && t.badge && t.id !== tab && (
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={autopilot}
            onClick={() => setAutopilot(!autopilot)}
            className="flex items-center gap-2 border-0 bg-transparent p-0 text-[13px] font-medium text-ink-2"
          >
            Autopilot
            <span className={`relative h-5 w-9 rounded-full transition-colors ${autopilot ? 'bg-accent' : 'bg-fill-2'}`}>
              <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${autopilot ? 'left-[18px]' : 'left-0.5'}`} />
            </span>
          </button>
          <a href="#settings" aria-label="Settings" onClick={(e) => { e.preventDefault(); window.location.hash = 'settings' }} className={`grid size-8 place-items-center rounded-lg text-ink-3 no-underline hover:bg-fill hover:text-ink ${tab === 'settings' ? 'bg-fill text-ink' : ''}`}>
            <Settings className="size-4" strokeWidth={1.8} />
          </a>
          <span className="grid size-8 place-items-center rounded-full bg-accent-tint text-[12px] font-semibold text-accent">
            UK
          </span>
        </div>
      </div>
    </header>
  )
}
