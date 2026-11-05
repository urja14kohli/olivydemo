import type { FormEvent } from 'react'
import OlivyOrb from '../components/OlivyOrb'
import Wordmark from '../components/Wordmark'

export default function SignIn({ onDone }: { onDone: () => void }) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onDone()
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="size-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(170,150,240,.2), rgba(255,193,166,.1) 40%, transparent 65%)',
          }}
        />
      </div>

      <header className="relative mx-auto flex max-w-[1280px] items-center px-5 py-5 sm:px-8">
        <Wordmark />
      </header>

      <div className="relative grid min-h-[calc(100vh-80px)] place-items-center p-6">
        <div className="w-[min(400px,100%)] rounded-3xl bg-surface px-8 pb-7 pt-9 text-center shadow-lift-hi">
          <div className="grid place-items-center">
            <OlivyOrb size={64} breathe />
          </div>
          <h1 className="display mb-2 mt-6 text-[26px] tracking-[-0.025em]">Save Lumina’s plan</h1>
          <p className="mb-7 text-ink-2">Your first reel is waiting. I’ll keep working while you’re away.</p>

          <div className="flex flex-col gap-2.5">
            <button type="button" onClick={onDone} className="btn btn-ink h-12 w-full">
              Continue with Apple
            </button>
            <button type="button" onClick={onDone} className="btn btn-outline h-12 w-full">
              Continue with Google
            </button>
          </div>

          <div className="my-[18px] flex items-center gap-3 text-[13px] text-ink-3 before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
            or
          </div>

          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourbrand.com"
              className="mb-2.5 h-12 w-full rounded-xl border-0 bg-fill px-3.5 text-[15px] outline-none placeholder:text-ink-3 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
            />
            <button type="submit" className="btn h-12 w-full">
              Continue with email
            </button>
          </form>

          <p className="mb-0 mt-5 text-[12.5px] text-ink-3">
            By continuing you agree to the Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
