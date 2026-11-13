import { useEffect, useRef, useState } from 'react'
import { Check, Maximize2, Minimize2, X } from 'lucide-react'
import type { HubCard } from '../lib/demo'
import ChannelLogo from './ChannelLogo'
import NewsletterMail from './NewsletterMail'
import { SLOTS, approveCard, rejectCard, useStore } from '../lib/store'

type Props = {
  card: HubCard
  full: boolean
  onToggleFull: () => void
  onClose: () => void
}

const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }
const IMAGES = ['p01', 'p02', 'p03', 'p05', 'p06', 'p07', 'p10', 'p11', 'p13'].map((p) => `/brand/posts/${p}.jpg`)

const ALTS: Record<string, string[]> = {
  social: [
    'Quiet packaging for a loud memory. Seven scents, one box.',
    'Some nights ask for a scent. Start with one of seven.',
    'Seven scents. One evening. Find the one that stays.',
  ],
  blogs: [
    'Seven vials, seven moods. Here is how to choose the one you will actually finish.',
    'Most people pick a scent in seconds. A sampler lets you pick it over days.',
  ],
  newsletter: [
    'Open the set when the house is quiet. Try one tonight, and leave the rest for another day.',
    'We made the set so you never have to guess. Start with whichever one you reach for first.',
  ],
  ads: ['Seven scents, one box. Always the right fit.', 'Find your signature. Two more scents than the rest.'],
  influencer: ['Say what you noticed first. Keep it short.', 'Open the box on camera and react honestly.'],
}

const BODIES: Record<string, string> = {
  newsletter:
    'The Discovery Set holds seven compositions in travel-size vials. Wear one a night and notice what the day does to it. When you find the one that stays with you, we will send the full bottle.',
  blogs:
    'Choosing a fragrance in a shop takes seconds and ten minutes later it is gone. A discovery set changes that. Seven scents, worn one evening at a time, tell you what you actually like.',
}

const DIST: Record<string, { label: string; options: string[]; defaults: string[] }> = {
  social: { label: 'Post to', options: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts', 'Pinterest'], defaults: ['Instagram', 'TikTok'] },
  influencer: { label: 'Post to', options: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts'], defaults: ['Instagram', 'TikTok'] },
  blogs: { label: 'Publish to', options: ['perferofragrance.com', 'Pinterest', 'Facebook', 'LinkedIn'], defaults: ['perferofragrance.com'] },
  newsletter: { label: 'Send to', options: ['All subscribers', 'Past buyers', 'New this month'], defaults: ['Past buyers'] },
  ads: { label: 'Run on', options: ['Instagram', 'Facebook', 'Google Search', 'TikTok', 'Pinterest'], defaults: ['Instagram', 'Facebook', 'Google Search'] },
}

const CHIPS = ['Shorter', 'Warmer', 'More product']

const shorter = (t: string) => (t.split(/(?<=[.!?])\s/)[0] || t).trim()

export default function SidePlayground({ card, full, onToggleFull, onClose }: Props) {
  const { queue, ghost: gh, fx, listening } = useStore()
  const vref = useRef<HTMLVideoElement>(null)
  const hearing = listening === card.id
  useEffect(() => {
    const v = vref.current
    if (!v) return
    v.muted = !hearing
    if (hearing) {
      v.currentTime = 0
      void v.play().catch(() => { v.muted = true })
    }
  }, [hearing])
  const g = gh && gh.id === card.id ? gh : null
  const ghostText = fx[card.id]?.text
  const fxTitle = fx[card.id]?.title
  const fxCh = fx[card.id]?.channels?.join(',')
  const queued = queue.find((q) => q.id === card.id)
  const isVideo = Boolean(card.video)
  const col = card.column

  const [image, setImage] = useState(card.image)
  const [headline, setHeadline] = useState(col === 'newsletter' ? (card.sub ?? '').replace('Subject: ', '') : col === 'blogs' ? card.title : card.title)
  const [text, setText] = useState(BODIES[col] && (col === 'newsletter' || col === 'blogs') ? BODIES[col] : card.snippet)
  const [ask, setAsk] = useState('')
  const [working, setWorking] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [time, setTime] = useState(false)
  const [regen, setRegen] = useState(false)
  const [alt, setAlt] = useState(0)
  const dist = DIST[col] ?? DIST.social
  const [on, setOn] = useState<string[]>(dist.defaults)
  const [budget, setBudget] = useState(40)
  const toggle = (c: string) => setOn((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]))
  const reach = `${(on.length * 3.2 * (budget / 40)).toFixed(0)}K to ${(on.length * 4.6 * (budget / 40)).toFixed(0)}K`

  useEffect(() => {
    if (ghostText) setText(ghostText)
  }, [ghostText])

  useEffect(() => {
    if (fxTitle) setHeadline(fxTitle)
  }, [fxTitle])
  useEffect(() => {
    if (fxCh) setOn(fxCh.split(',').map((c) => (c === 'Google' && col === 'ads' ? 'Google Search' : c)))
  }, [fxCh])

  const run = (label: string, fn: () => void) => {
    setWorking(label)
    setNote(null)
    setTimeout(() => {
      fn()
      setWorking(null)
      setNote('Updated.')
    }, 900)
  }

  const applyAsk = (q: string) => {
    const k = q.toLowerCase()
    run('Olivy is rewriting', () => {
      if (/short|trim|cut/.test(k)) setText((t) => shorter(t))
      else if (/warm|friend|soft/.test(k)) setText((t) => `${shorter(t)} Take your time with it.`)
      else if (/product|set|scent/.test(k)) setText((t) => `The Discovery Set. ${shorter(t)}`)
      else setText((t) => `${shorter(t)} Quiet, and in your voice.`)
    })
    setAsk('')
  }

  const regenerate = (scope: string) => {
    setRegen(false)
    if (scope !== 'This one') {
      setNote(`Olivy is regenerating ${scope.toLowerCase()} in the Hub.`)
      return
    }
    const list = ALTS[col] ?? ALTS.social
    run('Olivy is writing a new version', () => {
      setText(list[alt % list.length])
      setAlt((a) => a + 1)
    })
  }

  const labelOf = col === 'newsletter' ? 'Email' : col === 'blogs' ? 'Blog' : col === 'ads' ? 'Ad' : card.kind
  const ghost = 'border-0 bg-transparent p-0 text-[14px] text-ink-3 transition hover:text-ink'
  const link = 'border-0 bg-transparent p-0 text-[14px] font-medium text-accent hover:underline'

  return (
    <aside className="flex h-full flex-col border-l border-line bg-surface shadow-lift-hi">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <p className="m-0 flex-1 text-[13px] text-ink-3">
          <span className="font-medium text-ink">{labelOf}</span>
          <span className="mx-2">·</span>
          {queued ? <span className="text-success">Queued for {queued.label}</span> : 'Draft'}
        </p>
        <button type="button" onClick={onToggleFull} aria-label={full ? 'Exit full screen' : 'Full screen'} className="grid size-8 place-items-center rounded-lg border-0 bg-transparent text-ink-3 hover:bg-fill">
          {full ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </button>
        <button type="button" onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-lg border-0 bg-transparent text-ink-3 hover:bg-fill">
          <X className="size-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className={`mx-auto w-full px-6 py-6 ${full ? 'grid max-w-[1100px] grid-cols-2 gap-12 py-10' : 'max-w-[520px]'}`}>
          {/* Preview */}
          <div className="min-w-0">
            {col === 'newsletter' && (
              <p className="m-0 mb-3 text-[13px] text-ink-3">Subject <span className="ml-2 text-ink">{headline}</span></p>
            )}
            {isVideo ? (
              <div className={`relative mx-auto overflow-hidden rounded-2xl bg-black ${full ? 'aspect-[9/14]' : 'aspect-[9/12]'}`}>
                <video ref={vref} key={card.video} src={card.video} poster={image} controls autoPlay muted loop playsInline className="size-full object-cover" />
              </div>
            ) : col === 'newsletter' ? (
              <NewsletterMail headline={headline} body={text} image={image} />
            ) : col === 'blogs' ? (
              <div className="overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_var(--line)]">
                <img src={image} alt="" className="aspect-[16/9] w-full object-cover" />
                <div className="px-6 py-6">
                  <p className="m-0 text-[12.5px] text-ink-3">{card.meta}</p>
                  <p className="m-0 mt-2 text-[32px] leading-[1.06]" style={SERIF}>{headline}</p>
                  <p className="m-0 mt-3 text-[15px] leading-relaxed text-ink-2">{text}</p>
                </div>
              </div>
            ) : col === 'ads' ? (
              <div className="overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_var(--line)]">
                <div className="flex items-center justify-between px-4 py-3 text-[12px] text-ink-3"><b className="font-medium text-ink-2">Perféro</b><span>Sponsored</span></div>
                <img src={image} alt="" className="aspect-[16/11] w-full object-cover" />
                <div className="flex items-center justify-between bg-fill px-4 py-3">
                  <span className="text-[14px] font-medium">{headline}</span>
                  <span className="rounded-md bg-white px-3 py-1.5 text-[12.5px] font-medium shadow-[inset_0_0_0_1px_var(--line)]">{card.sub ?? 'Shop now'}</span>
                </div>
              </div>
            ) : (
              <img src={image} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            )}

            {!isVideo && (
              <div className="mt-4">
                <p className="m-0 mb-2 text-[12px] text-ink-3">Image</p>
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {[card.image, ...IMAGES.filter((i) => i !== card.image)].map((src) => (
                    <button key={src} type="button" onClick={() => setImage(src)} className={`size-14 shrink-0 overflow-hidden rounded-lg border-0 p-0 ring-offset-2 transition ${image === src ? 'ring-2 ring-accent' : 'opacity-70 hover:opacity-100'}`}>
                      <img src={src} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Edit */}
          <div className="min-w-0 pt-6 first:pt-0">
            {(col === 'newsletter' || col === 'blogs') && (
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                aria-label={col === 'newsletter' ? 'Subject' : 'Title'}
                className="mb-3 w-full border-0 border-b border-transparent bg-transparent p-0 pb-2 text-[26px] leading-tight outline-none transition focus:border-accent"
                style={SERIF}
              />
            )}
            <textarea
              data-pg="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={full ? 8 : col === 'newsletter' || col === 'blogs' ? 5 : 3}
              aria-label="Text"
              className="w-full resize-none border-0 border-b border-transparent bg-transparent p-0 pb-2 text-[16px] leading-relaxed text-ink outline-none transition focus:border-accent"
            />

            <div className="mt-6">
              <div className="flex items-center gap-3 border-b border-line pb-2 transition focus-within:border-accent">
                <input
                  data-pg="ask"
                  value={g ? g.ask : ask}
                  onChange={(e) => setAsk(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && ask.trim() && applyAsk(ask)}
                  placeholder="Tell Olivy what to change"
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[15px] outline-none placeholder:text-ink-3/70"
                />
                <span className="text-[12px] text-ink-3">Enter</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px]">
                {CHIPS.map((c) => (
                  <button key={c} type="button" onClick={() => applyAsk(c)} className={ghost + ' underline decoration-line underline-offset-4 hover:decoration-ink'}>
                    {c}
                  </button>
                ))}
              </div>
              <p className={`m-0 mt-3 h-5 text-[13.5px] ${working || g?.working ? 'shimmer font-medium' : 'text-ink-3'}`}>{g?.working ?? working ?? note ?? ''}</p>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <p className="m-0 mb-3 text-[13px] text-ink-3">{dist.label}</p>
              <div className="flex flex-wrap gap-2">
                {dist.options.map((o) => {
                  const active = on.includes(o)
                  return (
                    <button
                      key={o}
                      type="button"
                      data-pg={`ch-${o}`}
                      onClick={() => toggle(o)}
                      className={`inline-flex items-center gap-1.5 rounded-full border-0 px-3.5 py-1.5 text-[13.5px] transition ${active ? 'bg-accent-tint text-accent' : 'bg-fill text-ink-3 hover:text-ink'}`}
                    >
                      {col === 'ads' || col === 'social' || col === 'influencer' ? <ChannelLogo name={o} size={16} /> : active && <Check className="size-3.5" strokeWidth={2.6} />} {o}
                    </button>
                  )
                })}
              </div>
              {col === 'ads' && (
                <div className="mt-5 space-y-3 text-[14px]">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-3">Daily budget</span>
                    <span className="flex items-center gap-3">
                      <button type="button" onClick={() => setBudget((b) => Math.max(10, b - 10))} className="size-7 rounded-full border-0 bg-fill text-ink-2">−</button>
                      <b className="w-12 text-center font-medium">${budget}</b>
                      <button type="button" onClick={() => setBudget((b) => b + 10)} className="size-7 rounded-full border-0 bg-fill text-ink-2">+</button>
                    </span>
                  </div>
                  <div className="flex items-center justify-between"><span className="text-ink-3">Audience</span><span>Past buyers and lookalikes, chosen by Olivy</span></div>
                  <div className="flex items-center justify-between"><span className="text-ink-3">Estimated reach</span><span>{on.length ? `${reach} a day` : 'Pick a channel'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-ink-3">Olivy will</span><span>Resize for each channel and pause what does not work</span></div>
                </div>
              )}
              {col === 'newsletter' && (
                <p className="m-0 mt-4 text-[13.5px] text-ink-3">About 3,200 people. Olivy sends it when each reader is most likely to open.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decide */}
      <div className="border-t border-line bg-surface px-6 py-4">
        {time && !queued && (
          <div className="mx-auto mb-3 flex max-w-[520px] flex-wrap gap-2">
            {SLOTS.slice(0, 5).map((sl) => (
              <button
                key={sl.label}
                type="button"
                onClick={() => {
                  approveCard(card.id, sl)
                  setTime(false)
                }}
                className="rounded-full border-0 bg-fill px-3.5 py-1.5 text-[13px] text-ink-2 transition hover:bg-accent-tint hover:text-accent"
              >
                {sl.label}
              </button>
            ))}
          </div>
        )}
        <div className="mx-auto flex max-w-[520px] items-center gap-5">
          {queued ? (
            <p className="m-0 flex flex-1 items-center gap-2 text-[15px] font-medium text-success">
              <Check className="size-4" strokeWidth={2.6} /> Olivy will post {queued.label}
            </p>
          ) : (
            <button type="button" data-pg="approve" onClick={() => approveCard(card.id)} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border-0 bg-accent px-5 text-[15px] font-medium text-white transition hover:brightness-110">
              {col === 'ads' ? `Launch on ${on.length || 0} channel${on.length === 1 ? '' : 's'} · $${budget}/day` : col === 'newsletter' ? 'Approve · Olivy picks the send time' : on.length > 1 ? `Approve · post to ${on.length} channels` : 'Approve · Olivy picks the time'}
            </button>
          )}
          {!queued && (
            <button type="button" onClick={() => setTime((v) => !v)} className={link}>
              Pick a time
            </button>
          )}
          <div className="relative">
            <button type="button" onClick={() => setRegen((v) => !v)} className={ghost}>
              Regenerate
            </button>
            {regen && (
              <ul className="absolute bottom-full right-0 mb-3 w-44 overflow-hidden rounded-xl bg-surface p-1 text-[13.5px] shadow-lift-hi">
                {['This one', 'All social', 'All blogs', 'All newsletters'].map((o) => (
                  <li key={o}>
                    <button type="button" onClick={() => regenerate(o)} className="w-full rounded-lg border-0 bg-transparent px-3 py-2 text-left hover:bg-fill">
                      {o}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              rejectCard(card.id)
              onClose()
            }}
            className={ghost}
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  )
}
