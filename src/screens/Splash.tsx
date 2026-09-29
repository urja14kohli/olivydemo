import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'

const EASE = [0.22, 1, 0.36, 1] as const
const SITE = 'luminaskin.com'

export default function Splash({ onStart }: { onStart: (url: string) => void }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const url = value.trim() || SITE

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <OlivyOrb size={196} state="idle" />
      </motion.div>

      <motion.h1
        className="display mt-14 text-[54px] text-ink"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.8, ease: EASE }}
      >
        Olivy
      </motion.h1>

      <motion.p
        className="mt-2.5 text-[16.5px] text-ink-soft"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.8, ease: EASE }}
      >
        Your marketing partner
      </motion.p>

      <motion.form
        className="mt-11 w-full max-w-[452px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.8, ease: EASE }}
        onSubmit={(e) => {
          e.preventDefault()
          onStart(url)
        }}
      >
        <motion.div
          className="surface flex items-center gap-3 rounded-full py-2 pl-5 pr-2"
          animate={{
            boxShadow: focused
              ? '0 0 0 3px rgba(139,92,246,0.18), 0 18px 44px -20px rgba(84,48,125,0.4)'
              : '0 12px 28px -14px rgba(84,48,125,0.22)',
          }}
          transition={{ duration: 0.25 }}
        >
          <Lock className="size-[15px] shrink-0 text-ink-faint" strokeWidth={2.2} />
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste your website to get started"
            aria-label="Your website"
            className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-ink outline-none focus-visible:outline-none"
          />
          <motion.button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
              boxShadow: '0 10px 24px -10px rgba(107,63,160,0.85)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            Get started
            <ArrowRight className="size-[15px]" strokeWidth={2.4} />
          </motion.button>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setValue(SITE)}
          className="mx-auto mt-4 block text-[13px] font-medium text-ink-soft transition-colors hover:text-orchid-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Try it with {SITE}
        </motion.button>
      </motion.form>
    </div>
  )
}
