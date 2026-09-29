import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AmbientBackground from './components/AmbientBackground'
import Splash from './screens/Splash'
import Scanning from './screens/Scanning'
import Mirror from './screens/Mirror'
import Plan from './screens/Plan'
import Connectors from './screens/Connectors'
import ControlRoom from './screens/ControlRoom'

const EASE = [0.22, 1, 0.36, 1] as const

const ORDER = ['splash', 'scanning', 'mirror', 'plan', 'connectors', 'control'] as const
type Screen = (typeof ORDER)[number]

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [site, setSite] = useState('luminaskin.com')

  const goTo = useCallback((next: Screen) => setScreen(next), [])

  // Presenting aid: arrow keys step through the flow, number keys jump.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const i = ORDER.indexOf(screen)
      if (e.key === 'ArrowRight' && i < ORDER.length - 1) setScreen(ORDER[i + 1])
      if (e.key === 'ArrowLeft' && i > 0) setScreen(ORDER[i - 1])
      const n = Number(e.key)
      if (n >= 1 && n <= ORDER.length) setScreen(ORDER[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [screen])

  return (
    <>
      <AmbientBackground />
      <div className="relative h-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={screen}
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {screen === 'splash' && (
              <Splash
                onStart={(url) => {
                  setSite(url)
                  goTo('scanning')
                }}
              />
            )}
            {screen === 'scanning' && (
              <Scanning site={site} onDone={() => goTo('mirror')} />
            )}
            {screen === 'mirror' && <Mirror site={site} onNext={() => goTo('plan')} />}
            {screen === 'plan' && <Plan onRun={() => goTo('connectors')} />}
            {screen === 'connectors' && <Connectors onDone={() => goTo('control')} />}
            {screen === 'control' && <ControlRoom />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
