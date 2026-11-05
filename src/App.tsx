import { useEffect, useState } from 'react'
import Welcome from './screens/Welcome'
import Scan from './screens/Scan'
import Channels from './screens/Channels'
import SignIn from './screens/SignIn'
import AppShell from './screens/AppShell'

const ROUTES = ['welcome', 'scan', 'plan', 'signin', 'home', 'calendar'] as const
type Route = (typeof ROUTES)[number]

const LABEL: Record<Route, string> = {
  welcome: 'Welcome',
  scan: 'Scan',
  plan: 'Channels',
  signin: 'Sign in',
  home: 'Today',
  calendar: 'Calendar',
}

const readRoute = (): Route => {
  const h = window.location.hash.slice(1) as Route
  return ROUTES.includes(h) ? h : 'welcome'
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute)
  const [site, setSite] = useState('luminaskin.com')
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>('auto')

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Presenting aid: number keys jump between screens.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey) return
      const n = Number(e.key)
      if (n >= 1 && n <= ROUTES.length) window.location.hash = ROUTES[n - 1]
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (r: Route) => {
    window.location.hash = r
  }

  return (
    <>
      {route === 'welcome' && (
        <Welcome
          onStart={(s) => {
            setSite(s)
            go('scan')
          }}
        />
      )}
      {/* Unmounts when you leave, so the scan replays every time it is opened. */}
      {route === 'scan' && <Scan site={site} />}
      {route === 'plan' && <Channels />}
      {route === 'signin' && <SignIn onDone={() => go('home')} />}
      {(route === 'home' || route === 'calendar') && <AppShell tab={route} />}

      <nav
        aria-label="Prototype screens"
        className="glass fixed bottom-4 left-4 z-40 hidden items-center gap-0.5 rounded-xl p-1 text-[12.5px] shadow-[var(--lift),inset_0_0_0_1px_var(--line)] min-[1100px]:flex"
      >
        {ROUTES.map((r) => (
          <a
            key={r}
            href={`#${r}`}
            aria-current={r === route ? 'true' : undefined}
            className={`rounded-lg px-[9px] py-[5px] no-underline ${
              r === route ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]' : 'text-ink-3 hover:text-ink'
            }`}
          >
            {LABEL[r]}
          </a>
        ))}
        <span className="mx-1.5 h-4 w-px bg-line-2" aria-hidden />
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="rounded-lg border-0 bg-transparent px-[9px] py-[5px] text-[12.5px] text-ink-3 hover:text-ink"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
    </>
  )
}
