import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ChannelRow from '../components/ChannelRow'
import OlivyOrb from '../components/OlivyOrb'
import { CHANNELS } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Mirror({ site, onNext }: { site: string; onNext: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <OlivyOrb size={64} state="idle" particles={false} />
        <p className="mt-4 text-[12.5px] font-medium text-ink-faint">{site}</p>
      </motion.div>

      <motion.h1
        className="display mt-7 text-center text-[34px] text-ink"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
      >
        Here is where you are right now
      </motion.h1>

      <motion.p
        className="mt-2.5 text-center text-[15px] text-ink-soft"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
      >
        Nothing here is broken. Most of it was simply never set up.
      </motion.p>

      <motion.ul
        className="mt-9 flex w-full max-w-[640px] flex-col gap-2.5"
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.09, delayChildren: 0.34 } } }}
      >
        {CHANNELS.map((channel) => (
          <motion.li
            key={channel.id}
            variants={{
              hidden: { opacity: 0, y: 26 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <ChannelRow channel={channel} phase="before" />
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        type="button"
        onClick={onNext}
        className="group mt-10 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14.5px] font-semibold text-white"
        style={{
          background: 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
          boxShadow: '0 14px 32px -14px rgba(107,63,160,0.9)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
      >
        Show me what you would do
        <motion.span
          className="grid place-items-center"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="size-[17px]" strokeWidth={2.4} />
        </motion.span>
      </motion.button>
    </div>
  )
}
