import {
  Layers,
  Mail,
  Megaphone,
  Package,
  PenLine,
  Search,
  Sparkles,
  SwatchBook,
} from 'lucide-react'
import type { ChannelId } from '../lib/lumina'

type P = { className?: string }

/* Lucide no longer ships brand marks, so these two are drawn by hand. */
export function InstagramIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ShortVideoIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5z" />
    </svg>
  )
}

export type IconName = ChannelId | 'ai' | 'ads' | 'mail' | 'brand' | 'products' | 'look'

/** One icon vocabulary for the whole product: thin, 1.8 stroke, no fills. */
export function Icon({ name, className = 'size-4' }: { name: IconName; className?: string }) {
  const props = { className, strokeWidth: 1.8, 'aria-hidden': true } as const
  switch (name) {
    case 'ig':
      return <InstagramIcon className={className} />
    case 'short':
      return <ShortVideoIcon className={className} />
    case 'search':
      return <Search {...props} />
    case 'blog':
      return <PenLine {...props} />
    case 'ai':
      return <Sparkles {...props} />
    case 'ads':
      return <Megaphone {...props} />
    case 'mail':
      return <Mail {...props} />
    case 'brand':
      return <Layers {...props} />
    case 'products':
      return <Package {...props} />
    case 'look':
      return <SwatchBook {...props} />
  }
}

/** Square tile that holds an icon. */
export function IconTile({ name, large = false }: { name: IconName; large?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center bg-fill text-ink-2 ${
        large ? 'size-10 rounded-[11px]' : 'size-7 rounded-lg'
      }`}
    >
      <Icon name={name} className={large ? 'size-5' : 'size-4'} />
    </span>
  )
}
