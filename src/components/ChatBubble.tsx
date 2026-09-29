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
            ? 'rounded-[18px] rounded-br-[6px] border border-white/80 bg-white/85 text-ink'
            : 'rounded-[18px] rounded-bl-[6px] text-white'
        }`}
        style={
          mine
            ? { boxShadow: '0 6px 18px -10px rgba(26,26,46,0.22)' }
            : {
                background: 'linear-gradient(135deg, #7C4FD6, #6B3FA0)',
                boxShadow: '0 10px 26px -14px rgba(107,63,160,0.85)',
              }
        }
      >
        {children}
      </div>
    </motion.div>
  )
}
