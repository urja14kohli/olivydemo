import type { CSSProperties } from 'react'

export type GlyphProps = {
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

/** Brand marks Lucide no longer ships, drawn to match its 24px grid. */

export function Instagram({ className, style, strokeWidth = 2 }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Google's four-colour mark, used on the Search Console connector. */
export function GoogleMark({ className, style }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

/** Shopify bag mark, used on the CMS connector. */
export function ShopifyMark({ className, style }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        fill="#95BF47"
        d="M7 8.5V7a5 5 0 0 1 10 0v1.5h1.5l-1.4 12.1A2 2 0 0 1 15.1 23H8.9a2 2 0 0 1-2-1.9L5.5 8.5H7zm1.7 0h6.6V7a3.3 3.3 0 0 0-6.6 0v1.5z"
      />
    </svg>
  )
}

/** Stand-in mark for the customer's own site or CMS. */
export function SiteMark({ className, style, strokeWidth = 2 }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      <rect x="2.5" y="4" width="19" height="16" rx="3" />
      <path d="M2.5 9h19" />
      <circle cx="6.2" cy="6.5" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="9" cy="6.5" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  )
}
