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

/* Lucide no longer ships brand marks, so these are drawn by hand. */
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

/** Filled Instagram glyph for connect / platform chips. */
export function InstagramLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="ig-fill" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-fill)" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  )
}

/** Filled TikTok glyph for connect / platform chips. */
export function TikTokLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#000"
        d="M16.6 5.82A4.74 4.74 0 0 1 14.8 3h-2.6v12.4a2.6 2.6 0 1 1-1.86-2.5V10.2a5.2 5.2 0 1 0 4.46 5.14V9.34a7.2 7.2 0 0 0 4.2 1.36V8.1a4.74 4.74 0 0 1-2.4-2.28Z"
      />
      <path
        fill="#25F4EE"
        d="M16.6 5.32A4.74 4.74 0 0 1 14.8 2.5h-.7v12.4a2.6 2.6 0 1 1-1.86-2.5V9.2a5.2 5.2 0 1 0 4.46 5.14V8.84a7.2 7.2 0 0 0 3.5 1.12V7.6a4.74 4.74 0 0 1-3.6-2.28Z"
        opacity=".85"
      />
      <path
        fill="#FE2C55"
        d="M17.3 6.32A4.74 4.74 0 0 1 15.5 3.5h-.7v12.4a2.6 2.6 0 1 1-1.86-2.5V10.2a5.2 5.2 0 1 0 4.46 5.14V9.84a7.2 7.2 0 0 0 4.2 1.36V8.6a4.74 4.74 0 0 1-4.3-2.28Z"
        opacity=".85"
      />
      <path
        fill="#fff"
        d="M16.6 5.82A4.74 4.74 0 0 1 14.8 3h-2.6v12.4a2.6 2.6 0 1 1-1.86-2.5V10.2a5.2 5.2 0 1 0 4.46 5.14V9.34a7.2 7.2 0 0 0 4.2 1.36V8.1a4.74 4.74 0 0 1-2.4-2.28Z"
      />
    </svg>
  )
}

/** Shopify bag mark for connect / platform chips. */
export function ShopifyLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#95BF47"
        d="M15.34 4.3c-.1 0-.2 0-.28.02-.03-.1-.07-.23-.12-.37C14.7 3.2 14.1 2.8 13.4 2.8c-.05 0-.1 0-.16.01-.01 0-.1-.1-.27-.1-.84 0-1.85.63-2.46 1.7-.43.75-.6 1.6-.66 2.2-1.03.32-1.75.54-1.78.55-.53.16-.55.18-.62.68-.05.38-1.4 10.8-1.4 10.8l10.66 1.96.2-13.8c0-.5-.18-.69-.75-.7Zm-2.1-.2c-.24.08-.5.15-.78.23.1-.4.3-.9.62-1.2.14-.13.36-.28.58-.35.16.53.02 1.08-.42 1.32Zm-.86-1.66c.18 0 .33.04.46.1-.25.12-.5.32-.7.52-.4.42-.66 1.1-.78 1.68-.35.11-.7.22-1.01.32.17-1.16.9-2.62 2.03-2.62Z"
      />
      <path
        fill="#5E8E3E"
        d="M15.34 4.3c-.1 0-.2 0-.28.02l-.2 13.86 5.34-.98s-1.2-8.7-1.23-8.9c-.05-.3-.2-.42-.5-.5-.3-.08-2.4-.73-3.13-1.5Z"
        opacity=".55"
      />
      <path
        fill="#fff"
        d="M14.05 9.2s-.35-.18-.72.1c0 0-.35.28-1.03.5-.4.13-.88.2-1.2.12 1.55-.45 2.25-1.52 2.25-1.52s-.55.7-2.5 1.05c-2.3.4-2.68-.2-2.68-.2s-.4-.65.8-.97c1.2-.32 2.4-.2 3.22-.4.9-.2 1.4-.9 1.4-.9s.55 1.4.46 2.22Z"
      />
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
