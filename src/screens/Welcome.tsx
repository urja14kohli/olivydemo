import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import OlivyOrb from '../components/OlivyOrb'
import Wordmark from '../components/Wordmark'

type Props = { onStart: (site: string) => void }

const EASE = [0.22, 1, 0.36, 1] as const

export default function Welcome({ onStart }: Props) {
  const [value, setValue] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onStart(value.trim() || 'luminaskin.com')
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark />
        <a href="#signin" className="btn btn-plain">
          Sign in
        </a>
      </header>

      <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 pb-16 pt-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <OlivyOrb size={168} breathe halo />
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          <h1 className="display mb-[18px] mt-14 max-w-[14ch] text-[clamp(40px,6vw,64px)] tracking-[-0.035em]">
            Your marketing, finally handled.
          </h1>
          <p className="mb-10 max-w-[34em] text-[19px] leading-[1.45] text-ink-2">
            Paste your website. In about a minute, Olivy shows you where you stand, which channels to
            focus on, and drafts your first post.
          </p>

          <form
            onSubmit={submit}
            className="flex w-[min(560px,100%)] items-center gap-1.5 rounded-[18px] bg-surface py-1.5 pl-5 pr-1.5 shadow-lift-hi transition-shadow focus-within:shadow-[var(--lift-hi),0_0_0_4px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
          >
            <span className="text-base text-ink-3" aria-hidden>
              https://
            </span>
            <label className="sr-only" htmlFor="site">
              Your website
            </label>
            <input
              id="site"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="url"
              autoComplete="url"
              placeholder="yourbrand.com"
              className="h-[52px] min-w-0 flex-1 border-0 bg-transparent text-[17px] outline-none placeholder:text-ink-3"
            />
            <button type="submit" className="btn btn-ink btn-lg">
              Continue
            </button>
          </form>

          <button
            type="button"
            onClick={() => onStart('luminaskin.com')}
            className="mt-5 rounded-lg border-0 bg-transparent px-2.5 py-1.5 text-[14.5px] text-ink-3 hover:text-ink"
          >
            Or try it with{' '}
            <u className="decoration-line-2 underline-offset-[3px]">luminaskin.com</u>
          </button>
        </motion.div>
      </main>

      <p className="px-6 pb-10 text-center text-[13px] text-ink-3">
        Nothing goes out without your approval.
      </p>
    </div>
  )
}
