import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ChannelRow from '../components/ChannelRow'
import { BRAND } from '../lib/brand'
import { CHANNELS } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Mirror({ site, onNext }: { site: string; onNext: () => void }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-10">
      <motion.p
        className="mono text-[11px] uppercase tracking-[0.14em] text-fg-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {site}
      </motion.p>
      <motion.h1
        className="display mt-3 text-center text-[34px] text-fg"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
      >
        Here is where you are right now
      </motion.h1>
      <motion.p
        className="mt-2 text-center text-[14.5px] text-fg-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.7, ease: EASE }}
      >
        Nothing here is broken. Most of it was simply never set up.
      </motion.p>

      <motion.div
        className="mt-8 grid w-full max-w-[1080px] gap-4 lg:grid-cols-[340px_1fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.7, ease: EASE }}
      >
        <BrandCard />
        <div className="flex min-w-0 flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Audience" value="2.3K" note="Instagram only. No email list." />
            <MetricCard label="Voice" value="Quiet" note={BRAND.voice.tone} />
          </div>
          <motion.ul
            className="flex flex-col gap-2"
            initial="hidden"
            animate="shown"
            variants={{ shown: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } } }}
          >
            {CHANNELS.map((channel) => (
              <motion.li
                key={channel.id}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
              >
                <ChannelRow channel={channel} phase="before" />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onNext}
        className="btn group mt-9 px-6 py-3.5 text-[14.5px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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

function BrandCard() {
  return (
    <div className="surface overflow-hidden rounded-[16px]">
      <div className="relative h-[180px] overflow-hidden">
        <img src={BRAND.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="display text-[22px] text-fg">{BRAND.name}</p>
          <p className="mono mt-0.5 text-[11px] text-fg-3">{BRAND.category} · {BRAND.founded}</p>
        </div>
      </div>
      <div className="px-4 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-4">Palette</p>
        <div className="mt-2.5 flex gap-2">
          {BRAND.palette.map((swatch) => (
            <div key={swatch.hex} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className="h-8 w-full rounded-[8px] border border-white/10"
                style={{ background: swatch.hex }}
              />
              <span className="mono text-[9px] tracking-tight text-fg-4">{swatch.hex}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-[1.5] text-fg-2">{BRAND.audience.who}</p>
      </div>
    </div>
  )
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="surface rounded-[14px] px-4 py-3.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-4">{label}</p>
      <p className="display mt-1.5 text-[22px] text-fg">{value}</p>
      <p className="mt-1 text-[12px] leading-[1.4] text-fg-3">{note}</p>
    </div>
  )
}
