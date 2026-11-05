import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'

const EASE = [0.22, 1, 0.36, 1] as const
const SITE = 'luminaskin.com'

export default function Splash({ onStart }: { onStart: (url: string) => void }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const url = value.trim() || SITE

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <OlivyOrb size={196} state="idle" />
      </motion.div>

      <motion.h1
        className="display mt-14 text-[56px] text-fg"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.8, ease: EASE }}
      >
        Olivy
      </motion.h1>

      <motion.p
        className="mt-3 text-[15.5px] text-fg-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.8, ease: EASE }}
      >
        Marketing intelligence that runs itself
      </motion.p>

      <motion.form
        className="mt-11 w-full max-w-[480px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.8, ease: EASE }}
        onSubmit={(e) => {
          e.preventDefault()
          onStart(url)
        }}
      >
        <motion.div
          className="surface flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5"
          animate={{
            boxShadow: focused
              ? '0 0 0 1px rgba(0,212,170,0.45), 0 18px 44px -20px rgba(0,212,170,0.35)'
              : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
          transition={{ duration: 0.25 }}
        >
          <span className="mono shrink-0 text-[12px] text-fg-4">https://</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="paste your website"
            aria-label="Your website"
            className="mono min-w-0 flex-1 bg-transparent py-2.5 text-[14.5px] text-fg outline-none focus-visible:outline-none"
          />
          <motion.button
            type="submit"
            className="btn shrink-0 px-4 py-2.5 text-[13.5px]"
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
          className="mx-auto mt-4 block text-[13px] text-fg-4 transition-colors hover:text-accent"
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
