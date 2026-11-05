import { useState } from 'react'
import { Check } from 'lucide-react'
import OlivyOrb from '../components/OlivyOrb'
import Wordmark from '../components/Wordmark'
import { IconTile } from '../components/Icons'
import Thumb from '../components/Thumb'
import { BRAND } from '../lib/brand'
import { FOCUS, IMG, PARKED, TRYING } from '../lib/lumina'
import type { ChannelPlan } from '../lib/lumina'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Channels() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark />
        <span className="text-sm text-ink-3">{BRAND.domain}</span>
      </header>

      <div className="mx-auto max-w-[1160px] px-5 pb-24 pt-4 sm:px-8">
        <div className="mb-12 mt-4 grid max-w-[820px] gap-5 sm:grid-cols-[56px_minmax(0,1fr)]">
          <OlivyOrb size={56} />
          <div>
            <h1 className="display mb-3.5 text-[clamp(32px,4.4vw,44px)] tracking-[-0.032em]">
              Here’s where Lumina should show up.
            </h1>
            <p className="voice m-0 max-w-[34em] text-[21px] text-ink-2">
              Three channels, picked from what your buyers already do. Two you’ll grow for sure, and
              one I’m trying out. If it works, it stays. If not, I swap it quietly.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[7fr_4fr]">
          <div>
            <Tier title="Focus" note="Where most of the effort goes">
              <div className="grid gap-4 md:grid-cols-2">
                {FOCUS.map((c) => (
                  <ChannelCard key={c.id} plan={c} />
                ))}
              </div>
            </Tier>

            <Tier title="Trying out" note="For the next 3 weeks">
              <ChannelCard plan={TRYING} />
            </Tier>

            <Tier title="Not yet" note="I’ll bring these up when they make sense">
              <div className="overflow-hidden rounded-card bg-surface shadow-lift">
                {PARKED.map((p, i) => (
                  <div
                    key={p.name}
                    className="relative grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3.5 px-5 py-4 opacity-75"
                  >
                    {i > 0 && <span className="absolute left-[62px] right-0 top-0 h-px bg-line" />}
                    <IconTile name={p.icon} />
                    <div>
                      <b className="block font-medium">{p.name}</b>
                      <span className="text-sm text-ink-3">{p.reason}</span>
                    </div>
                    <span className="tag">Later</span>
                  </div>
                ))}
              </div>
            </Tier>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
            <div className="rounded-[22px] bg-surface p-3.5 shadow-lift-hi">
              <Thumb src={IMG.morning} alt="Draft reel: Lumina face oil on warm sand" aspect="4 / 3" radius={14}>
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3.5 left-3.5 text-[15px] font-semibold text-white">
                  Three steps. Two minutes.
                </span>
              </Thumb>
              <div className="px-2 pb-1.5 pt-4">
                <p className="voice mb-1.5 text-[19px] leading-[1.4]">
                  I already drafted your first reel while you were reading.
                </p>
                <p className="m-0 text-[13.5px] text-ink-3">Built from your 3 best posts, in your voice.</p>
              </div>
            </div>

            <div className="rounded-[22px] bg-surface p-[22px] shadow-lift">
              <h3 className="mb-1 text-[15px] font-semibold">3 channels, about 12 posts a week</h3>
              <p className="mb-4 text-sm text-ink-3">You approve. I handle everything else.</p>
              <a href="#signin" className="btn btn-ink btn-lg w-full">
                Start with this plan
              </a>
              <button
                type="button"
                className="mx-auto mt-3 block border-0 bg-transparent text-[13.5px] text-ink-3 hover:text-ink"
              >
                Want a different channel? Tell me
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Tier({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <div className="mb-3.5 flex items-baseline gap-3">
        <h2 className="display m-0 text-xl tracking-[-0.02em]">{title}</h2>
        <span className="text-sm text-ink-3">{note}</span>
      </div>
      {children}
    </section>
  )
}

function ChannelCard({ plan }: { plan: ChannelPlan }) {
  const [connected, setConnected] = useState(false)
  return (
    <div className="flex flex-col gap-3.5 rounded-card bg-surface p-[22px] shadow-lift">
      <div className="flex items-center gap-3">
        <IconTile name={plan.id} large />
        <div>
          <b className="block text-[17px] font-semibold tracking-[-0.015em]">{plan.name}</b>
          <span className="text-[13.5px] text-ink-3">{plan.cadence}</span>
        </div>
      </div>
      <p className="m-0 text-[14.5px] text-ink-2">{plan.reason}</p>

      {plan.rhythm && (
        <div>
          <div className="flex h-[26px] items-end gap-1" aria-hidden>
            {plan.rhythm.map((on, i) => (
              <i
                key={i}
                className={`flex-1 rounded-[3px] ${on ? 'bg-accent' : 'bg-fill-2'}`}
                style={{ height: on ? '100%' : '40%' }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex gap-1 text-xs text-ink-3" aria-hidden>
            {DAYS.map((d, i) => (
              <span key={i} className="flex-1 text-center">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2.5 pt-1">
        <small className="text-[13px] text-ink-3">{plan.connectNote}</small>
        <button
          type="button"
          onClick={() => setConnected(true)}
          className={`btn btn-sm ${connected ? 'btn-done' : 'btn-ink'}`}
        >
          {connected ? (
            <>
              <Check className="size-3.5" strokeWidth={2.2} />
              Connected
            </>
          ) : (
            plan.connect
          )}
        </button>
      </div>
    </div>
  )
}
