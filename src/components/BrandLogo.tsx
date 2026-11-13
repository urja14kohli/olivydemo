import {
  siInstagram, siTiktok, siFacebook, siYoutube, siPinterest, siX, siThreads, siSnapchat, siReddit,
  siMeta, siGoogleads, siGoogle, siMailchimp, siShopify, siWoocommerce, siStripe,
  siGooglesearchconsole, siGoogleanalytics, siWordpress, siWebflow, siNotion, siGoogledrive,
  siSemrush, siHubspot, siZendesk, siIntercom, siDiscord, siTrustpilot, siEtsy, siSquarespace,
  siBigcommerce, siMixpanel, siHotjar, siBrevo, siAspire,
} from 'simple-icons'

type Icon = { path: string; hex: string; title: string }

const ICONS: Record<string, Icon> = {
  ig: siInstagram, tt: siTiktok, fb: siFacebook, yt: siYoutube, pin: siPinterest, x: siX, thr: siThreads,
  snap: siSnapchat, red: siReddit, meta: siMeta, gads: siGoogleads, ttads: siTiktok, pinads: siPinterest,
  snapads: siSnapchat, mail: siMailchimp, shopemail: siShopify, shop: siShopify, woo: siWoocommerce,
  stripe: siStripe, gsc: siGooglesearchconsole, ga: siGoogleanalytics, wp: siWordpress, web: siWebflow,
  notion: siNotion, drive: siGoogledrive, semrush: siSemrush, hub: siHubspot, zen: siZendesk,
  inter: siIntercom, disc: siDiscord, trust: siTrustpilot, etsy: siEtsy, sq: siSquarespace,
  bc: siBigcommerce, mix: siMixpanel, hotjar: siHotjar, brevo: siBrevo, aspire: siAspire,
  ttcm: siTiktok, pixel: siMeta, gbp: siGoogle,
}

const luminance = (hex: string) => {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

type Props = { id: string; name: string; color: string; glyph: string; size?: number }

/** A brand tile: the real mark where we have it, a clean monogram where we do not. */
export default function BrandLogo({ id, name, color, glyph, size = 44 }: Props) {
  const radius = size * 0.26
  const base = {
    width: size,
    height: size,
    borderRadius: radius,
  }

  // Hand-drawn marks for brands the icon set no longer includes
  if (id === 'li')
    return (
      <span className="grid shrink-0 place-items-center" style={{ ...base, background: '#0A66C2' }} aria-label={name}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="#fff"><path d="M4 9h3.500v11H4V9Zm1.750-5.500a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10 9h3.350v1.500c.5-.9 1.700-1.800 3.450-1.800 3.600 0 4.200 2.300 4.200 5.400V20h-3.500v-5.200c0-1.300 0-2.900-1.800-2.900s-2.100 1.400-2.100 2.800V20H10V9Z" /></svg>
      </span>
    )
  if (id === 'slack')
    return (
      <span className="grid shrink-0 place-items-center bg-white shadow-[inset_0_0_0_1px_var(--line)]" style={base} aria-label={name}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
          <rect x="10" y="1.500" width="4" height="9" rx="2" fill="#36C5F0" />
          <rect x="13.500" y="10" width="9" height="4" rx="2" fill="#2EB67D" />
          <rect x="10" y="13.500" width="4" height="9" rx="2" fill="#ECB22E" />
          <rect x="1.500" y="10" width="9" height="4" rx="2" fill="#E01E5A" />
        </svg>
      </span>
    )
  if (id === 'amz' || id === 'amzads')
    return (
      <span className="grid shrink-0 place-items-center bg-white shadow-[inset_0_0_0_1px_var(--line)]" style={base} aria-label={name}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
          <text x="12" y="14" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="15" fill="#232F3E">a</text>
          <path d="M4 17.500c5 3 11 3 16 0" stroke="#FF9900" strokeWidth="1.800" strokeLinecap="round" />
        </svg>
      </span>
    )

  const icon = ICONS[id]
  if (icon) {
    const light = luminance(icon.hex) > 0.8
    return (
      <span
        className="grid shrink-0 place-items-center"
        style={{ ...base, background: light ? `#${icon.hex}` : '#fff', boxShadow: light ? undefined : 'inset 0 0 0 1px var(--line)' }}
        aria-label={name}
      >
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill={light ? '#111' : `#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  return (
    <span className="grid shrink-0 place-items-center text-white" style={{ ...base, background: color, fontSize: size * 0.3, fontWeight: 600 }} aria-label={name}>
      {glyph}
    </span>
  )
}
