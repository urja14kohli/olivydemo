import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import NavBar from '../components/NavBar'
import ChannelLogo, { channelsOf } from '../components/ChannelLogo'
import NewsletterMail from '../components/NewsletterMail'
import OlivyCursor from '../components/OlivyCursor'
import SidePlayground from '../components/SidePlayground'
import { approveCard, proactiveHello, rejectCard, setHubTab, setOpenCard, setPlayground, useStore } from '../lib/store'
import { HUB_CARDS, AUTOMATED } from '../lib/demo'
import type { HubCard } from '../lib/demo'

const EASE = [0.22, 1, 0.36, 1] as const
const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }
const TABS = [
  { id: 'all', label: 'Everything', active: true },
  { id: 'social', label: 'Social', active: true },
  { id: 'blogs', label: 'Blogs', active: true },
  { id: 'newsletter', label: 'Newsletter', active: true },
  { id: 'influencer', label: 'Creators', active: true },
  { id: 'ads', label: 'Ads', active: true },
]
const RATIOS = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/5]', 'aspect-[5/4]']

export default function Hub() {
  const [full, setFull] = useState(false)
  const { approved, rejected, queue, activity, autopilot, extraCards, fx, hubTab: tab, openCard } = useStore()
  const cards = [...extraCards, ...HUB_CARDS]
  const open: HubCard | null = cards.find((c) => c.id === openCard) ?? null
  const setTab = setHubTab
  const setOpen = (c: HubCard | null) => setOpenCard(c ? c.id : null)
  useEffect(() => {
    proactiveHello()
  }, [])
  useEffect(() => {
    setPlayground(open ? (full ? 'full' : 'side') : 'none')
    return () => setPlayground('none')
  }, [open, full])

  const visible = cards.filter((c) => !rejected.includes(c.id)).filter((c) => tab === 'all' || c.column === tab)
  const waiting = cards.filter((c) => !approved.includes(c.id) && !rejected.includes(c.id)).length
  const slotOf = (id: string) => queue.find((q) => q.id === id)?.label

  const status = activity
    ? activity
    : autopilot
      ? 'Autopilot is on. Olivy is handling it.'
      : waiting
        ? `${waiting} drafts are ready for your eye.`
        : 'Everything is queued. Nothing needs you.'

  return (
    <div className="min-h-screen">
      <NavBar tab="hub" />

      <div className={`mx-auto grid max-w-[1280px] transition-[grid-template-columns] duration-300 ${open && !full ? 'lg:grid-cols-[1fr_50%]' : 'grid-cols-1'}`}>
        <div className="min-w-0 px-4 pb-40 sm:px-6 pt-[clamp(28px,6vh,64px)]">
          <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-10 max-w-[980px]">
            <p className="m-0 mb-3 text-[13px] text-ink-3">Tuesday, November 11</p>
            <h1 className="m-0 text-[clamp(36px,4.6vw,60px)] font-normal leading-[1.02] tracking-[-0.015em] text-ink" style={SERIF}>
              Good morning. Your week is drafted.
            </h1>
            <p className="mt-4 flex items-center gap-2.5 text-[16px] text-ink-3">
              <span className={`size-1.5 shrink-0 rounded-full bg-accent ${activity ? 'animate-pulse' : ''}`} />
              <span className={activity ? 'shimmer font-medium' : ''}>{status}</span>
            </p>
          </motion.header>

          <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-ink-3">
            <span className="font-medium text-ink-2">Handled for you</span>
            {AUTOMATED.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-success" strokeWidth={2.6} /> {a}
              </span>
            ))}
          </div>

          <nav className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-line" aria-label="Filter">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                data-card={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`-mb-px shrink-0 border-0 border-b-2 bg-transparent px-0 pb-3 text-[14px] font-medium transition-colors ${
                  tab === t.id ? 'border-ink text-ink' : t.active ? 'border-transparent text-ink-2 hover:text-ink' : 'border-transparent text-ink-3/60 hover:text-ink-3'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {visible.length === 0 ? (
            <p className="py-24 text-center text-[17px] text-ink-3" style={SERIF}>
              Olivy is not focusing on this yet.
            </p>
          ) : (
            <div className={`gap-5 [column-fill:_balance] ${open && !full ? 'columns-1 sm:columns-2' : 'columns-1 sm:columns-2 xl:columns-3'}`}>
              {visible.map((card, i) => {
                const slot = slotOf(card.id)
                const f = fx[card.id]
                const view: HubCard = f?.title ? { ...card, title: f.title, sub: card.column === 'newsletter' ? f.title : card.sub } : card
                return (
                  <motion.article
                    key={card.id}
                    data-card={card.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                    onClick={() => setOpen(card)}
                    className="group mb-8 block cursor-pointer break-inside-avoid"
                  >
                    <Visual card={view} ratio={RATIOS[i % RATIOS.length]}>
                      {f?.note && (
                        <span className={`absolute left-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-medium text-accent backdrop-blur ${slot ? 'top-12' : 'top-3'}`}>{f.note}</span>
                      )}
                      {f?.channels && (
                        <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/92 py-1.5 pl-2 pr-3 text-[12px] font-medium text-ink shadow-lift backdrop-blur">
                          {f.channels.map((c) => <ChannelLogo key={c} name={c} size={16} />)}
                          <span className="ml-0.5">{f.budget ?? 'Posted'}</span>
                        </span>
                      )}
                      {card.isNew && !slot && (
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-white">New</span>
                      )}
                      {slot && (
                        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 py-1 pl-2 pr-3 text-[12px] font-medium text-ink backdrop-blur">
                          <Check className="size-3.5 text-success" strokeWidth={2.6} /> {slot}
                        </span>
                      )}
                      {!slot && (
                        <div className={`absolute right-3 z-10 flex gap-2 opacity-0 transition group-hover:opacity-100 ${card.column === 'ads' ? 'top-14' : card.column === 'social' || card.kind === 'UGC' ? 'bottom-3' : 'top-3'}`}>
                          <button type="button" aria-label="Reject" onClick={(e) => { e.stopPropagation(); rejectCard(card.id) }} className="grid size-10 place-items-center rounded-full border-0 bg-white/90 text-ink backdrop-blur hover:bg-white">
                            <X className="size-[18px]" strokeWidth={2.2} />
                          </button>
                          <button type="button" aria-label="Approve" onClick={(e) => { e.stopPropagation(); approveCard(card.id) }} className="grid size-10 place-items-center rounded-full border-0 bg-accent text-white hover:brightness-110">
                            <Check className="size-[18px]" strokeWidth={2.4} />
                          </button>
                        </div>
                      )}
                    </Visual>
                    <div className="px-0.5 pt-3">
                      {card.column === 'ads' ? (
                        <p className="m-0 flex items-center gap-2 text-[12px] text-ink-3">
                          <span className="flex items-center gap-1">
                            {channelsOf(card.meta).map((c) => (
                              <ChannelLogo key={c} name={c} size={16} />
                            ))}
                          </span>
                          <span>{card.meta?.split(' · ').slice(1).join(' · ')}</span>
                        </p>
                      ) : (
                        <p className="m-0 text-[12px] text-ink-3">{card.kind}{card.meta ? ` · ${card.meta}` : ''}</p>
                      )}
                      {(card.column === 'social' || card.kind === 'UGC') && (
                        <h3 className="m-0 mt-0.5 text-[17px] font-medium leading-snug tracking-[-0.015em]">{card.title}</h3>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>

        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={full ? 'fixed inset-0 z-50' : 'fixed inset-y-0 right-0 z-40 w-[min(100%,480px)] lg:sticky lg:inset-y-auto lg:top-[57px] lg:h-[calc(100vh-57px)] lg:w-auto lg:self-start'}
          >
            <SidePlayground key={open.id} card={open} full={full} onToggleFull={() => setFull((v) => !v)} onClose={() => { setOpen(null); setFull(false) }} />
          </motion.div>
        )}
      </div>
      <OlivyCursor />
    </div>
  )
}

function Visual({ card, ratio, children }: { card: HubCard; ratio: string; children: React.ReactNode }) {
  const serif = { fontFamily: "'Instrument Serif', Georgia, serif" }

  if (card.column === 'newsletter') {
    return (
      <div className="relative">
        {children}
        <NewsletterMail headline={card.sub?.replace('Subject: ', '') ?? card.title} body={card.snippet} image={card.image} compact />
      </div>
    )
  }
  if (card.column === 'blogs') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_var(--line)]">
        {children}
        <CardImg card={card} className="aspect-[16/10] w-full object-cover" />
        <div className="p-5">
          <p className="m-0 text-[26px] leading-[1.1] text-ink" style={serif}>{card.title}</p>
          <p className="m-0 mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-3">{card.snippet}</p>
        </div>
      </div>
    )
  }
  if (card.kind === 'UGC') {
    return (
      <div className="relative aspect-[9/15] overflow-hidden rounded-2xl bg-fill">
        {card.video ? (
          <video src={card.video} poster={card.image} autoPlay muted loop playsInline className="size-full object-cover" />
        ) : (
          <CardImg card={card} className="size-full object-cover" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/60 to-transparent p-3.5 pt-12">
          <img src={card.avatar} alt="" className="size-8 rounded-full object-cover ring-2 ring-white/80" />
          <div className="min-w-0 text-white">
            <p className="m-0 text-[13px] font-medium leading-tight">{card.sub}</p>
            <p className="m-0 text-[11.5px] leading-tight opacity-80">{card.meta?.split(' · ')[1]}</p>
          </div>
        </div>
        {children}
      </div>
    )
  }
  if (card.column === 'influencer') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_var(--line)]">
        {children}
        <CardImg card={card} className="aspect-[4/3] w-full object-cover" />
        <div className="p-5">
          <p className="m-0 text-[15px] font-medium">{card.sub}</p>
          <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-ink-3">{card.snippet}</p>
        </div>
      </div>
    )
  }
  if (card.column === 'ads') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_var(--line)]">
        {children}
        <div className="flex items-center justify-between px-4 py-3 text-[12px] text-ink-3">
          <span className="font-medium text-ink-2">Perféro</span>
          <span>Sponsored</span>
        </div>
        <CardImg card={card} className="aspect-square w-full object-cover" />
        <div className="flex items-center justify-between bg-fill px-4 py-3">
          <span className="text-[14px] font-medium">{card.title}</span>
          <span className="rounded-md bg-white px-3 py-1.5 text-[12.5px] font-medium shadow-[inset_0_0_0_1px_var(--line)]">{card.sub}</span>
        </div>
      </div>
    )
  }
  const reel = card.kind === 'Reel'
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-fill ${reel ? 'aspect-[9/14]' : ratio}`}>
      {card.video ? (
        <video src={card.video} poster={card.image} autoPlay muted loop playsInline className="size-full object-cover" />
      ) : (
        <CardImg card={card} className="size-full object-cover" />
      )}
      {reel && (
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
          <svg width="9" height="10" viewBox="0 0 9 10" fill="white"><path d="M0 0l9 5-9 5z" /></svg>
          {card.meta}
        </span>
      )}
      {children}
    </div>
  )
}

function CardImg({ card, className }: { card: HubCard; className: string }) {
  const c = card.crop
  return (
    <img
      src={card.image}
      alt=""
      className={className}
      style={c ? { transform: `scale(${c.z})`, transformOrigin: `${c.x} ${c.y}`, objectPosition: `${c.x} ${c.y}` } : undefined}
    />
  )
}
