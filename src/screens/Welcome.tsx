import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { BRAND } from '../lib/brand'

type Props = { onStart: (site: string) => void }

const EASE = [0.22, 1, 0.36, 1] as const

const AVATARS = ['av1', 'av2', 'av3', 'av4', 'av5']

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PARTNERS = [
  {
    name: 'NVIDIA Inception',
    logo: (
      <>
        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden>
          <path d="M1 9c3-5 8-7 12-7s9 2 12 7c-3 5-8 7-12 7S4 14 1 9Z" stroke="#76B900" strokeWidth="2.4" />
          <circle cx="13" cy="9" r="3.4" fill="#76B900" />
        </svg>
        <b className="font-bold tracking-[-0.04em] text-[1.25em] text-[#1a1a2e]">NVIDIA.</b>
      </>
    ),
    label: 'Inception',
  },
  {
    name: 'Microsoft for Startups',
    logo: (
      <svg width="23" height="23" viewBox="0 0 23 23" aria-hidden>
        <rect width="11" height="11" fill="#555" />
        <rect x="12" width="11" height="11" fill="#555" />
        <rect y="12" width="11" height="11" fill="#555" />
        <rect x="12" y="12" width="11" height="11" fill="#555" />
      </svg>
    ),
    label: 'Microsoft for Startups',
  },
  {
    name: 'Google for Startups',
    logo: (
      <span className="text-[1.45em] font-medium tracking-[-0.03em]" style={{ fontFamily: "'Product Sans','DM Sans',sans-serif" }}>
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
      </span>
    ),
    label: 'for Startups',
  },
  {
    name: 'AWS Startups',
    logo: (
      <svg width="50" height="30" viewBox="0 0 50 30" fill="none" aria-hidden>
        <text x="2" y="15" fontFamily="DM Sans, sans-serif" fontWeight="500" fontSize="19" fill="#232f3e">aws</text>
        <path d="M6 21c10 5 24 5 35 0" stroke="#ff9900" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M37 18l5 2-3 4" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Startups',
  },
  {
    name: 'Intel Liftoff',
    logo: <b className="text-[1.55em] font-bold tracking-[-0.06em] text-[#0068b5]">intel.</b>,
    label: 'Liftoff',
  },
]

export default function Welcome({ onStart }: Props) {
  const [site, setSite] = useState('')
  const start = () => onStart(BRAND.domain)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onStart(site.trim().replace(/^https?:\/\//, '').replace(/\/$/, '') || BRAND.domain)
  }

  return (
    <div className="landing flex h-screen min-h-[640px] flex-col overflow-hidden">
      <header className="landing-header flex w-full shrink-0 items-center justify-between px-[clamp(20px,11.4vw,260px)] pt-[clamp(14px,1.6vw,28px)]">
        <a href="#welcome" className="inline-flex items-center gap-2 no-underline" aria-label="Olivy">
          <span className="grid size-[30px] place-items-center rounded-[9px] bg-accent">
            <span className="size-[15px] rounded-full border-[3px] border-white" />
          </span>
          <span className="text-[22px] font-semibold tracking-[-0.04em] text-accent">Olivy</span>
        </a>
        <nav className="flex items-center gap-[clamp(16px,2vw,32px)]">
          <a href="#how" className="hidden text-[15px] text-ink-2 no-underline sm:inline">How it works</a>
          <a href="#pricing" className="hidden text-[15px] text-ink-2 no-underline sm:inline">Pricing</a>
          <button type="button" onClick={start} className="h-[46px] rounded-xl bg-accent px-[22px] text-[15px] font-medium text-white shadow-[0_4px_14px_rgba(107,63,160,.3)] transition hover:brightness-110">
            Join waitlist
          </button>
        </nav>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="landing-glow" aria-hidden />
        <motion.div
          className="relative z-[1] flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="mb-[clamp(16px,2.4vh,28px)] inline-flex items-center gap-2 rounded-full bg-white py-[4px] pl-[4px] pr-3.5 text-[13px] text-ink-2 shadow-[inset_0_0_0_1px_var(--line),0_1px_2px_rgba(26,26,46,.04)]">
            <span className="rounded-full bg-accent-tint px-3 py-[5px] font-medium text-accent">Early access</span>
            <span className="inline-flex items-center gap-2">Your AI marketing partner <Arrow /></span>
          </div>

          <h1 className="landing-headline text-[clamp(34px,min(4.3vw,7.2vh),76px)] font-bold leading-[1.02] tracking-[-0.055em] text-ink">
            You built something great.
            <br />
            Now let&apos;s get it{' '}
            <span className="landing-noticed">
              noticed.
              <svg className="landing-underline" viewBox="0 0 340 14" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M3 9c60-6 150-8 250-4 30 1 60 1 84-1" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-[clamp(18px,3vh,36px)] max-w-[34em] text-[clamp(14px,min(1.2vw,2vh),18px)] leading-[1.6] text-ink-3">
            Olivy is the marketing partner that learns your brand, figures out what actually works for your business, and handles it. Social, SEO, blogs, ads, launches.{' '}
            <span className="text-ink">It doesn&apos;t wait for you to figure it out.</span>
          </p>

          <form onSubmit={submit} className="landing-cta mt-[clamp(20px,3.6vh,44px)] flex w-[min(520px,100%)] items-center rounded-2xl bg-white p-[7px] shadow-[inset_0_0_0_1px_var(--line),0_6px_24px_rgba(26,26,46,.05)]">
            <label className="sr-only" htmlFor="site">Website</label>
            <input
              id="site"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              spellCheck={false}
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="yourwebsite.com"
              className="h-[38px] min-w-0 flex-1 border-0 bg-transparent px-3 text-[15px] text-ink outline-none placeholder:text-ink-3/70"
            />
            <button type="submit" className="inline-flex h-[44px] shrink-0 items-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-medium text-white transition hover:brightness-110">
              Get started <Arrow />
            </button>
          </form>

          <div className="mt-[clamp(14px,2vh,22px)] flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((a) => (
                <img key={a} src={`/brand/${a}.jpg`} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-white" />
              ))}
            </div>
            <p className="text-[14px] text-ink-3"><b className="font-semibold text-ink">500+ founders</b> already on the waitlist</p>
          </div>
        </motion.div>
      </main>

      <footer className="shrink-0 px-6 pb-[clamp(16px,3vh,36px)] text-center">
        <p className="mb-[clamp(10px,2vh,22px)] text-[14px] text-ink-3">Backed by startup programs from</p>
        <ul className="landing-partners flex flex-wrap items-center justify-center gap-x-[clamp(24px,3.4vw,56px)] gap-y-3">
          {PARTNERS.map((p) => (
            <li key={p.name} aria-label={p.name} className="inline-flex items-center gap-2 text-[17px] font-medium text-[#444]">
              {p.logo}
              <span>{p.label}</span>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}
