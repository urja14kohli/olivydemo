import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ConnectorCard from '../components/ConnectorCard'
import type { ConnectState } from '../components/ConnectorCard'
import OlivyOrb from '../components/OlivyOrb'
import { GoogleMark, Instagram, ShopifyMark } from '../components/BrandGlyphs'

const EASE = [0.22, 1, 0.36, 1] as const

const CONNECTORS = [
  {
    id: 'instagram',
    name: 'Instagram',
    purpose: 'So Olivy can publish reels and stories on schedule',
    mark: <Instagram className="size-[19px] text-fg" strokeWidth={1.8} />,
  },
  {
    id: 'gsc',
    name: 'Google Search Console',
    purpose: 'So Olivy can see which keywords start landing',
    mark: <GoogleMark className="size-[19px]" />,
  },
  {
    id: 'site',
    name: 'Shopify',
    purpose: 'So Olivy can publish posts and rewrite page titles',
    mark: <ShopifyMark className="size-[19px]" />,
  },
]

export default function Connectors({ onDone }: { onDone: () => void }) {
  const [states, setStates] = useState<Record<string, ConnectState>>({
    instagram: 'idle',
    gsc: 'idle',
    site: 'idle',
  })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const connect = useCallback((id: string) => {
    setStates((s) => (s[id] === 'idle' ? { ...s, [id]: 'connecting' } : s))
    timers.current.push(setTimeout(() => setStates((s) => ({ ...s, [id]: 'connected' })), 1000))
  }, [])

  const connectAll = useCallback(() => {
    CONNECTORS.forEach((c, i) => {
      timers.current.push(setTimeout(() => connect(c.id), i * 260))
    })
  }, [connect])

  const allConnected = CONNECTORS.every((c) => states[c.id] === 'connected')
  const anyStarted = CONNECTORS.some((c) => states[c.id] !== 'idle')

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <OlivyOrb size={72} state={allConnected ? 'active' : 'idle'} particles={false} />
      </motion.div>

      <motion.h1
        className="display mt-7 text-center text-[32px] text-fg"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
      >
        Three connections and Olivy can start
      </motion.h1>

      <motion.p
        className="mt-2.5 max-w-[560px] text-center text-[15px] text-fg-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.7, ease: EASE }}
      >
        Only what this week&rsquo;s plan needs. Revoke access whenever you want.
      </motion.p>

      <motion.ul
        className="mt-9 flex w-full max-w-[560px] flex-col gap-3"
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
      >
        {CONNECTORS.map((c) => (
          <motion.li
            key={c.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <ConnectorCard
              name={c.name}
              purpose={c.purpose}
              mark={c.mark}
              state={states[c.id]}
              onConnect={() => connect(c.id)}
            />
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-9 flex h-[56px] items-center">
        {allConnected ? (
          <motion.button
            type="button"
            onClick={onDone}
            className="btn px-7 py-3.5 text-[15px]"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            All set, let&rsquo;s go
            <ArrowRight className="size-[18px]" strokeWidth={2.4} />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={connectAll}
            className="btn-ghost px-6 py-3 text-[14px] disabled:opacity-45"
            disabled={anyStarted}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            Connect all three
          </motion.button>
        )}
      </div>
    </div>
  )
}
