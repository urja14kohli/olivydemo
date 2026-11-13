import { motion } from 'framer-motion'
import Wordmark from '../components/Wordmark'
import { InstagramLogo, TikTokLogo } from '../components/Icons'
import { BRAND } from '../lib/brand'

const EASE = [0.22, 1, 0.36, 1] as const

type Piece = {
  image: string
  title: string
  caption: string
  duration: string
  label: string
  when: string
}

type Props = {
  site: string
  piece: Piece
  onContinue: () => void
}

export default function FirstPost({ site, piece, onContinue }: Props) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark size={36} />
        <span className="text-sm text-ink-3">{site}</span>
      </header>

      <main className="mx-auto flex max-w-[440px] flex-col items-center px-5 pb-20 pt-4 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="label mb-3"
        >
          Got it. Here is your first post.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full rounded-[28px] bg-[#1a1a2e] p-2.5 shadow-lift-hi"
        >
          <div className="overflow-hidden rounded-[22px] bg-black">
            <div className="relative aspect-[9/14]">
              <img src={piece.image} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16 text-left">
                <p className="mb-1 text-[13px] font-semibold text-white">{BRAND.name}</p>
                <p className="text-[13.5px] leading-snug text-white/95">{piece.caption}</p>
                <span className="mt-2 inline-block text-[11px] text-white/70">{piece.duration}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] shadow-lift">
            <InstagramLogo className="size-4" /> Instagram
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] shadow-lift">
            <TikTokLogo className="size-4" /> TikTok
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex w-full flex-col gap-2.5"
        >
          <button type="button" onClick={onContinue} className="btn btn-accent btn-lg w-full">
            Looks good. Continue
          </button>
          <button type="button" onClick={() => { window.location.hash = "hub" }} className="btn btn-plain w-full">
            Skip
          </button>
        </motion.div>
      </main>
    </div>
  )
}
