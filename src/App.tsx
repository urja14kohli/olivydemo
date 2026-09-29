import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"
      >
        <Sparkles className="size-7 text-white" />
      </motion.div>
      <p className="text-sm tracking-wide text-zinc-400">
        olivy-demo ready — Tailwind, Framer Motion, Lucide wired up
      </p>
    </div>
  )
}
