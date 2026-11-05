import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export type ConnectState = 'idle' | 'connecting' | 'connected'

type Props = {
  name: string
  purpose: string
  mark: ReactNode
  state: ConnectState
  onConnect: () => void
}

export default function ConnectorCard({ name, purpose, mark, state, onConnect }: Props) {
  const connected = state === 'connected'

  return (
    <motion.button
      type="button"
      onClick={state === 'idle' ? onConnect : undefined}
      disabled={state !== 'idle'}
      data-connector={name}
      className="surface surface-hover relative flex w-full items-center gap-4 overflow-hidden rounded-[14px] px-4 py-4 text-left"
      whileHover={state === 'idle' ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <AnimatePresence>
        {connected && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(0,212,170,0.10), transparent 62%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <span className="relative grid size-11 shrink-0 place-items-center rounded-[12px] border border-line bg-white/[0.04]">
        {mark}
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="block text-[14px] font-semibold tracking-[-0.015em] text-fg">{name}</span>
        <span className="block truncate text-[12.5px] text-fg-3">{purpose}</span>
      </span>

      <span className="relative grid h-9 w-[104px] shrink-0 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {state === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="rounded-full border border-line-strong px-4 py-2 text-[13px] font-semibold text-fg"
            >
              Connect
            </motion.span>
          )}

          {state === 'connecting' && (
            <motion.span
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 text-[13px] font-medium text-fg-3"
            >
              <motion.span
                className="size-[14px] rounded-full border-2 border-white/10 border-t-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              Linking
            </motion.span>
          )}

          {connected && (
            <motion.span
              key="connected"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 460, damping: 20 }}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-accent"
            >
              <span className="grid size-[18px] place-items-center rounded-full bg-accent/15">
                <motion.span
                  initial={{ scale: 0.3 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.08, type: 'spring', stiffness: 560, damping: 20 }}
                >
                  <Check className="size-[11px]" strokeWidth={3.4} />
                </motion.span>
              </span>
              Connected
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
