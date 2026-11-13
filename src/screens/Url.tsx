import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import { BRAND } from '../lib/brand'

type Props = { onContinue: (site: string) => void }

export default function Url({ onContinue }: Props) {
  const [site, setSite] = useState(BRAND.domain)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onContinue(site.trim() || BRAND.domain)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-[clamp(20px,5vw,48px)] pt-6">
        <Wordmark size={32} />
      </header>

      <motion.main
        className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="max-w-[16em] text-[clamp(32px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.045em] text-ink">
          Paste your brand.
          <br />
          Olivy handles the rest.
        </h1>
        <p className="mt-4 text-[clamp(15px,1.4vw,18px)] text-ink-3">Olivy will learn your brand and get to work.</p>

        <form onSubmit={submit} className="mt-10 flex w-[min(560px,100%)] flex-col gap-3 sm:flex-row">
          <input
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="yourwebsite.com"
            autoFocus
            spellCheck={false}
            className="h-14 min-w-0 flex-1 rounded-xl border-0 bg-white px-5 text-[17px] text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none transition placeholder:text-ink-3/70 focus:shadow-[inset_0_0_0_1.5px_var(--accent),0_0_0_5px_rgba(107,63,160,0.14)]"
          />
          <button type="submit" className="h-14 rounded-xl bg-accent px-8 text-[16px] font-medium text-white shadow-[0_4px_14px_rgba(107,63,160,.3)] transition hover:brightness-110">
            Continue
          </button>
        </form>

        <p className="mt-5 text-[14px] text-ink-3">
          Just exploring? Try it with{' '}
          <button
            type="button"
            onClick={() => onContinue(BRAND.domain)}
            className="border-0 bg-transparent p-0 font-medium text-accent hover:underline"
          >
            {BRAND.domain}
          </button>
        </p>
      </motion.main>

      <footer className="flex items-center justify-center gap-2 pb-8 text-[13px] text-ink-3">
        <Lock className="size-3.5" strokeWidth={2} />
        Nothing goes out without your approval.
      </footer>
    </div>
  )
}
