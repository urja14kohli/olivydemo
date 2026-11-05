import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ChatBubble({
  from,
  delay = 0,
  children,
}: {
  from: 'olivy' | 'you'
  delay?: number
  children: ReactNode
}) {
  const mine = from === 'you'

  return (
    <motion.div
      className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <div
        className={`max-w-[440px] px-4 py-2.5 text-[14px] leading-[1.55] ${
          mine
            ? 'rounded-[16px] rounded-br-[5px] bg-accent text-[#04140f]'
            : 'rounded-[16px] rounded-bl-[5px] border border-line bg-white/[0.04] text-fg'
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}
