import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Welcome from './screens/Welcome'
import Url from './screens/Url'
import Generating from './screens/Generating'
import Match from './screens/Match'
import FirstPost from './screens/FirstPost'
import Connect from './screens/Connect'
import Hub from './screens/Hub'
import Calendar from './screens/Calendar'
import Notifications from './screens/Notifications'
import Settings from './screens/Settings'
import OlivyChat from './components/OlivyChat'
import { composeFirstPost } from './lib/demo'
import type { MatchOption } from './lib/demo'
import { BRAND } from './lib/brand'

const ROUTES = ['welcome', 'url', 'generating', 'match', 'first', 'connect', 'hub', 'calendar', 'notifs', 'settings'] as const
type Route = (typeof ROUTES)[number]

const ALIAS: Record<string, Route> = {
  home: 'hub',
  scan: 'generating',
  plan: 'match',
  signin: 'connect',
  today: 'hub',
}

const readRoute = (): Route => {
  const raw = window.location.hash.slice(1)
  if (ALIAS[raw]) return ALIAS[raw]
  return ROUTES.includes(raw as Route) ? (raw as Route) : 'welcome'
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute)
  const [site, setSite] = useState(BRAND.domain)
  const [picks, setPicks] = useState<MatchOption[]>([])

  const first = useMemo(() => composeFirstPost(picks), [picks])
  const inApp = route === 'hub' || route === 'calendar' || route === 'notifs' || route === 'settings'

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey) return
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
      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
        >
          {route === 'welcome' && (
            <Welcome
              onStart={(s) => {
                setSite(s)
                setPicks([])
                go('generating')
              }}
            />
          )}
          {route === 'url' && (
            <Url
              onContinue={(s) => {
                setSite(s)
                setPicks([])
                go('generating')
              }}
            />
          )}
          {route === 'generating' && <Generating site={site} onDone={() => go('match')} />}
          {route === 'match' && (
            <Match
              site={site}
              onDone={(next) => {
                setPicks(next)
                go('first')
              }}
            />
          )}
          {route === 'first' && <FirstPost site={site} piece={first} onContinue={() => go('connect')} />}
          {route === 'connect' && <Connect site={site} onDone={() => go('hub')} />}
          {route === 'hub' && <Hub />}
          {route === 'calendar' && <Calendar />}
          {route === 'notifs' && <Notifications />}
          {route === 'settings' && <Settings />}
        </motion.div>
      </AnimatePresence>

      {inApp && <OlivyChat />}
    </>
  )
}
