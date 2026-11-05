import { useState } from 'react'
import { Check } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'
import { Icon } from '../components/Icons'
import Thumb from '../components/Thumb'
import { EARLIER, READY, STATE_LABEL, THINKING } from '../lib/lumina'
import type { Day, ItemState, ReadyPiece } from '../lib/lumina'
import { stateOf } from '../lib/schedule'

type Props = {
  days: Day[]
  approved: Set<string>
  setApproved: (id: string, on: boolean) => void
}

export default function Today({ days, approved, setApproved }: Props) {
  return (
    <main className="mx-auto max-w-[960px] px-5 pb-40 pt-9 sm:px-8 sm:pt-14">
      <p className="mb-2.5 text-sm text-ink-3">Thursday, November 5</p>
      <h1 className="display mb-3.5 max-w-[20ch] text-[clamp(32px,4.4vw,44px)] tracking-[-0.032em]">
        Good morning. Two things are ready for you.
      </h1>
      <p className="voice m-0 max-w-[34em] text-[21px] text-ink-2">
        Since yesterday I posted your evening story, finished two drafts, and rewrote 7 of your page
        titles. Your first TikTok reached more people than any Instagram post you’ve made.
      </p>

      <Section title="Ready for your yes" aside="Takes about a minute">
        <div className="grid gap-5 md:grid-cols-2">
          {READY.map((p) => (
            <Piece
              key={p.id}
              piece={p}
              done={approved.has(p.id)}
              onApprove={() => setApproved(p.id, true)}
              onUndo={() => setApproved(p.id, false)}
            />
          ))}
        </div>
      </Section>

      <Section title="What I’m thinking">
        <div className="flex flex-col gap-4">
          {THINKING.map((d) => (
            <Decision key={d.id} decision={d} />
          ))}
        </div>
      </Section>

      <Section title="Next seven days" aside={<a href="#calendar" className="text-sm text-ink-3 no-underline hover:text-ink">Open calendar</a>}>
        <div className="no-scrollbar -mx-5 grid auto-cols-[minmax(110px,1fr)] grid-flow-col gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid-cols-7 sm:px-0">
          {days.map((day) => (
            <div key={day.n} className="flex min-w-0 flex-col gap-2">
              <div className="flex items-baseline gap-1.5 px-0.5 pb-1">
                <b className={`text-sm font-semibold ${day.now ? 'text-accent-text' : ''}`}>{day.d}</b>
                <span className="text-[13px] text-ink-3">{day.now ? `${day.n} Today` : day.n}</span>
              </div>
              {day.items.map((it) => {
                const s = stateOf(it, approved)
                return (
                  <div key={it.id} title={it.title} className="relative transition-transform hover:-translate-y-0.5">
                    <Thumb
                      src={it.image}
                      alt={it.title}
                      channel={it.ch}
                      radius={12}
                      className={`${ring(s)} ${s === 'posted' ? 'opacity-55' : ''}`}
                    />
                    {s && (
                      <span
                        className={`absolute right-1.5 top-1.5 rounded-full px-[7px] py-0.5 text-[11px] font-semibold ${
                          s === 'idea'
                            ? 'bg-accent text-on-accent'
                            : s === 'posted'
                              ? 'bg-white/90 text-[#1d1d1f]'
                              : 'bg-ink text-[var(--bg)]'
                        }`}
                      >
                        {STATE_LABEL[s]}
                      </span>
                    )}
                    <span className="mt-1 block px-0.5 text-xs text-ink-3">{it.time}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-[18px] text-[12.5px] text-ink-3">
          <Key label="Scheduled" className="bg-fill-2" />
          <Key label="Needs your yes" className="shadow-[inset_0_0_0_1.5px_var(--ink)]" />
          <Key label="Olivy’s idea" className="shadow-[inset_0_0_0_1.5px_var(--accent)]" />
        </div>
      </Section>

      <Section title="Earlier">
        <div className="flex flex-col gap-3.5">
          <div className="max-w-[420px] self-end rounded-[18px_18px_6px_18px] bg-ink px-4 py-2.5 text-[var(--bg)]">
            {EARLIER.me}
          </div>
          <div className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3">
            <OlivyOrb size={28} />
            <p className="voice m-0 max-w-[32em] text-lg">
              {EARLIER.her}
              <time className="mt-1 block font-sans text-[12.5px] text-ink-3">{EARLIER.time}</time>
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}

/** Ink ring needs your yes, accent ring is Olivy's idea. */
function ring(s: ItemState | undefined) {
  if (s === 'need') return 'shadow-[0_0_0_2px_var(--bg),0_0_0_3.5px_var(--ink)]'
  if (s === 'idea') return 'shadow-[0_0_0_2px_var(--bg),0_0_0_3.5px_var(--accent)]'
  return 'shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
}

function Key({ label, className }: { label: string; className: string }) {
  return (
    <span className="inline-flex items-center gap-[7px]">
      <i className={`size-3 rounded ${className}`} />
      {label}
    </span>
  )
}

function Section({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-14" aria-label={title}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="display m-0 text-xl tracking-[-0.02em]">{title}</h2>
        {typeof aside === 'string' ? <span className="text-sm text-ink-3">{aside}</span> : aside}
      </div>
      {children}
    </section>
  )
}

function Piece({
  piece,
  done,
  onApprove,
  onUndo,
}: {
  piece: ReadyPiece
  done: boolean
  onApprove: () => void
  onUndo: () => void
}) {
  return (
    <article className="flex flex-col rounded-[22px] bg-surface p-3 shadow-lift transition-shadow hover:shadow-lift-hi">
      {piece.kind === 'reel' ? (
        <Thumb src={piece.image} alt="Reel preview" aspect="4 / 3" radius={14}>
          <span className="absolute inset-x-3 top-2.5 z-10 flex gap-1" aria-hidden>
            <i className="h-[2.5px] flex-1 rounded-sm bg-white" />
            <i className="h-[2.5px] flex-1 rounded-sm bg-white/55" />
            <i className="h-[2.5px] flex-1 rounded-sm bg-white/55" />
          </span>
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="absolute bottom-3.5 left-3.5 text-[15px] font-semibold text-white">{piece.caption}</span>
          <span className="absolute bottom-3 right-3 rounded-md bg-black/35 px-[7px] py-0.5 text-xs font-medium text-white backdrop-blur-md">
            {piece.duration}
          </span>
        </Thumb>
      ) : (
        <div className="aspect-[4/3] rounded-[14px] bg-surface-2 px-6 py-[22px] shadow-[inset_0_0_0_1px_var(--line)]">
          <p className="voice mb-3 max-w-[18em] text-[19px] leading-tight">
            The best natural moisturizers in 2026, and how to pick one
          </p>
          {[100, 86, 100, 72, 100, 92, 100, 58].map((w, i) => (
            <div key={i} className="mb-[9px] h-[7px] rounded bg-fill" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}

      <div className="px-2 pb-2 pt-4">
        <p className="mb-1 flex items-center gap-1.5 text-[13px] text-ink-3">
          <Icon name={piece.kind === 'reel' ? 'ig' : 'blog'} className="size-3.5" />
          {piece.label}
        </p>
        <h3 className="mb-2 mt-0 text-[17px] font-semibold leading-snug tracking-[-0.015em]">{piece.title}</h3>
        <p className="m-0 text-sm leading-[1.45] text-ink-2">{piece.why}</p>
      </div>

      {done ? (
        <div className="mt-auto flex items-center gap-2 px-2 pb-1.5 pt-4 text-sm font-medium text-accent-text" aria-live="polite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="draw-check size-5" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {piece.scheduled}
          <button type="button" onClick={onUndo} className="btn btn-plain btn-sm ml-auto">
            Undo
          </button>
        </div>
      ) : (
        <div className="mt-auto flex flex-wrap items-center gap-2 px-2 pb-1.5 pt-4">
          <button type="button" onClick={onApprove} className="btn btn-ink">
            Approve
          </button>
          <button type="button" className="btn">
            {piece.secondary}
          </button>
          <span className="ml-auto text-[13px] text-ink-3">{piece.when}</span>
        </div>
      )}
    </article>
  )
}

function Decision({ decision }: { decision: (typeof THINKING)[number] }) {
  const [reply, setReply] = useState<string | null>(null)
  return (
    <div className="grid gap-5 rounded-[22px] bg-surface p-[22px] shadow-lift sm:grid-cols-[44px_minmax(0,1fr)] sm:p-7">
      <OlivyOrb size={44} />
      <div>
        <p className="voice m-0 mb-1.5 max-w-[32em] text-[21px]">{decision.body}</p>
        <p className="mb-5 mt-2.5 text-[13.5px] text-ink-3">{decision.meta}</p>
        {reply ? (
          <span className="inline-flex items-center gap-2 text-[14.5px] font-medium text-accent-text" aria-live="polite">
            <Check className="size-[18px]" strokeWidth={2.2} />
            {reply}
          </span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {decision.choices.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setReply(c.reply)}
                className={`btn ${c.primary ? 'btn-accent' : c.label === 'Tell me more' ? '' : 'btn-plain'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
