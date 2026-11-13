import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import { NOTIFS, WORKING } from '../lib/demo'
import { respondToCompetitor, useStore } from '../lib/store'

const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }
const EASE = [0.22, 1, 0.36, 1] as const

const TOP = [
  { label: 'Best reel', big: '84K', unit: 'views · 6.2K saves', why: 'Opens on the box, then the candle. Quiet and product first.', video: '/brand/reels/evening-ritual.mp4', image: '/brand/posts/p01.jpg' },
  { label: 'Best creator video', big: '61K', unit: 'views · 3.4K shares', why: 'A real reaction in the first two seconds. No script.', video: '/brand/ugc/u1.mp4', image: '/brand/posts/p05.jpg' },
  { label: 'Best post', big: '4.8K', unit: 'saves · 2x your usual', why: 'A flat lay with candlelight. People kept it for later.', video: '', image: '/brand/posts/p02.jpg' },
]

const NEXT = [
  { d: 'Tue', t: 'Post the evening ritual reel at 9:00 AM.' },
  { d: 'Wed', t: 'Send the newsletter at 6:00 PM, in the warmer voice.' },
  { d: 'Thu', t: 'Publish the comparison blog and track “perfume sampler set”.' },
  { d: 'Fri', t: 'Start creator outreach, if you say yes.' },
  { d: 'Sat', t: 'Test the gifting ad against the retargeting ad.' },
]

const LEDGER = [
  { n: '14', what: 'pieces drafted', note: 'Social, blogs, email, ads and creators.' },
  { n: '47', what: 'comments answered', note: 'In your voice. Three flagged as buying questions.' },
  { n: '$112', what: 'saved on ads', note: 'One retargeting ad paused. Budget moved to gifting.' },
  { n: '#9', what: 'for “luxury perfume gift guide”', note: 'Up from #14 after I rewrote the title.' },
  { n: '3', what: 'competitor moves caught', note: 'A rival launched a sampler set. I drafted a response.' },
]

const SOURCES = [
  { name: 'Instagram', pct: 52, c: '#6B3FA0' },
  { name: 'Email', pct: 24, c: '#8B7EC8' },
  { name: 'Search', pct: 16, c: '#B9AEDD' },
  { name: 'Creators', pct: 8, c: '#DDD6F0' },
]

const LEARNED = [
  'Quiet beats loud',
  'Lead with the product',
  'Evenings over mornings',
  'Never discount, always gift',
  'Seven scents, not “collection”',
]

const DECISIONS = [
  {
    id: 'd1',
    q: 'The newsletter can sound warmer.',
    why: 'Quiet emails get opened. Warm ones get clicked. I wrote a second version.',
    yes: 'Use the warmer version',
    no: 'Keep as is',
    done: 'Switched. The next send uses the warmer version.',
  },
  {
    id: 'd2',
    q: 'Start a creator program for the Discovery Set?',
    why: 'Five creators already post tables and rituals like yours. I can send each a set and a short brief.',
    yes: 'Reach out to all five',
    no: 'Not now',
    done: 'Done. I am reaching out to five creators today.',
  },
]

export default function Brief() {
  const [idx, setIdx] = useState(0)
  const [resolved, setResolved] = useState<Record<string, string>>({})
  const { log, activity, extraCards } = useStore()
  const made = (id: string) => extraCards.some((c) => c.id === id)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORKING.length), 3200)
    return () => clearInterval(t)
  }, [])

  const earlier = [
    ...log.map((l) => ({ id: l.id, when: l.when, body: l.body, action: undefined as string | undefined })),
    ...NOTIFS.filter((n) => n.id !== 'n4'),
  ]
  const open = DECISIONS.filter((d) => !resolved[d.id])
  const link = 'inline-flex items-center gap-1 border-0 bg-transparent p-0 text-[15px] font-medium text-accent hover:underline'

  return (
    <div className="min-h-screen">
      <NavBar tab="notifs" />
      <main className="mx-auto max-w-[1180px] px-5 pb-48 pt-14 sm:px-8">
        <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-[860px]">
          <p className="m-0 mb-4 flex items-center gap-2 text-[13px] text-ink-3">
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
            <span className={activity ? 'shimmer font-medium' : ''}>{activity ?? WORKING[idx]}</span>
          </p>
          <h1 className="m-0 text-[clamp(40px,5vw,66px)] font-normal leading-[1.02] tracking-[-0.015em]" style={SERIF}>
            Reach is up 38% this week. Here is how.
          </h1>
          <p className="mt-6 max-w-[640px] text-[19px] leading-[1.55] text-ink-2">
            I posted six times, answered 47 comments, and moved $112 of ad spend to what was working.
            {open.length ? ` ${open.length === 1 ? 'One thing needs' : 'Two things need'} your call below.` : ' Nothing needs you.'}
          </p>
        </motion.header>

        <section className="mt-16">
          <h2 className="m-0 mb-5 text-[13px] font-medium text-ink-3">Best of the week</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {TOP.map((t, i) => (
              <motion.figure key={t.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }} className="m-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-fill">
                  {t.video ? (
                    <video src={t.video} poster={t.image} autoPlay muted loop playsInline className="size-full object-cover" />
                  ) : (
                    <img src={t.image} alt="" className="size-full object-cover" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-medium text-ink backdrop-blur">{t.label}</span>
                </div>
                <figcaption className="pt-4">
                  <p className="m-0 text-[40px] leading-none tracking-[-0.01em] text-accent" style={SERIF}>{t.big}</p>
                  <p className="m-0 mt-1 text-[13px] text-ink-3">{t.unit}</p>
                  <p className="m-0 mt-3 text-[15.5px] leading-snug text-ink">{t.why}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <div className="mt-20 grid gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0">
            <section>
              <h2 className="m-0 mb-5 text-[13px] font-medium text-ink-3">Needs your call</h2>
              <div className="flex flex-col">
                {DECISIONS.map((d) => (
                  <motion.article layout key={d.id} className="border-t border-line py-6">
                    <p className="m-0 text-[24px] leading-snug tracking-[-0.015em]" style={SERIF}>{d.q}</p>
                    {resolved[d.id] ? (
                      <p className="m-0 mt-3 text-[15px] text-success">{resolved[d.id]}</p>
                    ) : (
                      <>
                        <p className="m-0 mt-2 max-w-[520px] text-[15.5px] leading-relaxed text-ink-3">{d.why}</p>
                        <div className="mt-4 flex items-center gap-6">
                          <button type="button" onClick={() => setResolved((r) => ({ ...r, [d.id]: d.done }))} className={link}>
                            {d.yes} <span aria-hidden>→</span>
                          </button>
                          <button type="button" onClick={() => setResolved((r) => ({ ...r, [d.id]: 'Okay. Left as is.' }))} className="border-0 bg-transparent p-0 text-[15px] text-ink-3 hover:text-ink">
                            {d.no}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="m-0 mb-5 text-[13px] font-medium text-ink-3">Competitor watch</h2>
              <div className="border-t border-line py-6">
                <p className="m-0 mb-1 text-[13px] text-ink-3">Atelier Noor · two days ago</p>
                <p className="m-0 text-[24px] leading-snug tracking-[-0.015em]" style={SERIF}>
                  Launched a five-scent sampler at $48 and is bidding on “perfume sampler set”.
                </p>
                <p className="m-0 mt-2 max-w-[540px] text-[15.5px] leading-relaxed text-ink-3">
                  Your set has two more scents. They are spending on Instagram and Search to own this phrase. You can answer with content, and I can have it ready now.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {made('x1') ? (
                    <a href="#hub" className={link + ' no-underline'}>Comparison blog is in your Hub <span aria-hidden>→</span></a>
                  ) : (
                    <button type="button" onClick={() => respondToCompetitor('blog')} className={link}>
                      Publish a comparison blog <span aria-hidden>→</span>
                    </button>
                  )}
                  {made('x2') ? (
                    <a href="#hub" className={link + ' no-underline'}>Counter ad is in your Hub <span aria-hidden>→</span></a>
                  ) : (
                    <button type="button" onClick={() => respondToCompetitor('ad')} className="border-0 bg-transparent p-0 text-[15px] font-medium text-ink-2 hover:text-ink">
                      Counter with an ad
                    </button>
                  )}
                </div>
              </div>
              <div className="border-t border-line py-6">
                <p className="m-0 mb-1 text-[13px] text-ink-3">Atelier Noor · last night</p>
                <p className="m-0 text-[24px] leading-snug tracking-[-0.015em]" style={SERIF}>A dinner-table reel reached 210K views.</p>
                <p className="m-0 mt-2 max-w-[540px] text-[15.5px] leading-relaxed text-ink-3">It is the same style as your best post. I wrote two in your voice.</p>
                <a href="#hub" className={link + ' mt-4 no-underline'}>See the drafts <span aria-hidden>→</span></a>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="m-0 mb-2 text-[13px] font-medium text-ink-3">Next week I will</h2>
              <ul className="m-0 list-none p-0">
                {NEXT.map((n) => (
                  <li key={n.d} className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-t border-line py-4 first:border-0">
                    <span className="text-[13px] text-ink-3">{n.d}</span>
                    <span className="text-[16.5px]">{n.t}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="min-w-0">
            <section>
              <h2 className="m-0 mb-2 text-[13px] font-medium text-ink-3">What I did this week</h2>
              <ul className="m-0 list-none p-0">
                {LEDGER.map((l) => (
                  <li key={l.what} className="grid grid-cols-[84px_1fr] items-baseline gap-3 border-t border-line py-4 first:border-0">
                    <span className="text-[34px] leading-none tracking-[-0.01em]" style={SERIF}>{l.n}</span>
                    <div>
                      <p className="m-0 text-[15.5px] font-medium leading-snug">{l.what}</p>
                      <p className="m-0 mt-0.5 text-[13.5px] leading-snug text-ink-3">{l.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="m-0 mb-4 text-[13px] font-medium text-ink-3">Where the reach came from</h2>
              <div className="flex h-2.5 overflow-hidden rounded-full">
                {SOURCES.map((x) => (
                  <span key={x.name} style={{ width: `${x.pct}%`, background: x.c }} />
                ))}
              </div>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[14px] text-ink-2">
                {SOURCES.map((x) => (
                  <li key={x.name} className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: x.c }} />
                    {x.name} <span className="text-ink-3">{x.pct}%</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="m-0 mb-2 text-[13px] font-medium text-ink-3">What I have learned about Perféro</h2>
              <p className="m-0 mb-4 text-[14.5px] text-ink-3">I apply these to everything I make.</p>
              <p className="m-0 text-[22px] leading-[1.5] tracking-[-0.01em]" style={SERIF}>
                {LEARNED.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < LEARNED.length - 1 && <span className="mx-2.5 text-ink-3/50">/</span>}
                  </span>
                ))}
              </p>
            </section>
          </aside>
        </div>

        <section className="mt-20 max-w-[760px]">
          <h2 className="m-0 mb-2 text-[13px] font-medium text-ink-3">Earlier</h2>
          <ul className="m-0 list-none p-0">
            {earlier.map((n) => (
              <li key={n.id} className="grid grid-cols-[100px_1fr] gap-4 border-t border-line py-4 first:border-0">
                <time className="text-[13px] text-ink-3">{n.when}</time>
                <div>
                  <p className="m-0 text-[15.5px] leading-snug">{n.body}</p>
                  {n.action && (
                    <a href="#hub" className="mt-1.5 inline-block text-[14px] font-medium text-accent no-underline hover:underline">
                      {n.action} <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
