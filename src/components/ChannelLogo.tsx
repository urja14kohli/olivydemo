type Props = { name: string; size?: number }

const norm = (n: string) => n.toLowerCase()

/** Small brand marks for the places Olivy publishes to. */
export default function ChannelLogo({ name, size = 18 }: Props) {
  const n = norm(name)
  const s = { width: size, height: size }
  if (n.includes('instagram'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="Instagram">
        <defs>
          <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.35" stopColor="#FA7E1E" />
            <stop offset="0.6" stopColor="#D62976" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6.5" fill="url(#ig)" />
        <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
      </svg>
    )
  if (n.includes('facebook'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="Facebook">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path d="M13.4 19.5v-6.3h2.1l.4-2.6h-2.5V9.1c0-.8.3-1.3 1.4-1.3h1.2V5.5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.200-3.3 3.400v1.800H8.700v2.600h2.100v6.300h2.600Z" fill="#fff" />
      </svg>
    )
  if (n.includes('google'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="Google">
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.300-.2-1.900H12v3.700h5.400a4.600 4.600 0 0 1-2 3v2.500h3.200c1.900-1.700 3-4.300 3-7.300Z" />
        <path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.400l-3.200-2.500c-.9.600-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.400 13.900a6 6 0 0 1 0-3.800V7.500H3.100a10 10 0 0 0 0 9l3.300-2.600Z" />
        <path fill="#EA4335" d="M12 5.900c1.500 0 2.800.5 3.800 1.500l2.900-2.900A10 10 0 0 0 3.100 7.500l3.300 2.600C7.200 7.700 9.400 5.900 12 5.900Z" />
      </svg>
    )
  if (n.includes('tiktok'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="TikTok">
        <rect width="24" height="24" rx="6.500" fill="#000" />
        <path d="M13.300 5.500h2.100c.1 1.400 1 2.500 2.500 2.700v2.100c-.9 0-1.800-.3-2.500-.8v4.500a4 4 0 1 1-4-4v2.100a1.900 1.900 0 1 0 1.900 1.900V5.500Z" fill="#fff" />
        <path d="M13.300 5.500h2.100" stroke="#25F4EE" strokeWidth=".6" opacity=".8" />
      </svg>
    )
  if (n.includes('pinterest'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="Pinterest">
        <circle cx="12" cy="12" r="12" fill="#E60023" />
        <path d="M12.200 5.500c-3.300 0-5 2.200-5 4.200 0 1.200.5 2.200 1.400 2.600.2.100.3 0 .3-.2l.2-.8c0-.2 0-.3-.1-.4-.3-.4-.5-.9-.5-1.500 0-1.900 1.400-3.200 3.300-3.200 1.800 0 2.800 1.100 2.800 2.600 0 1.900-.9 3.500-2.100 3.500-.7 0-1.200-.6-1-1.300.2-.9.600-1.800.6-2.400 0-.6-.3-1-.9-1-.7 0-1.300.8-1.300 1.800 0 .7.200 1.100.2 1.100l-.9 3.700c-.2.900-.1 2 0 2.700 0 .1.100.1.200 0 .1-.1 1-1.300 1.300-2.500l.5-1.900c.3.500 1 .9 1.800.9 2.400 0 4-2.200 4-5.100 0-2.200-1.900-4.300-4.800-4.300Z" fill="#fff" />
      </svg>
    )
  if (n.includes('youtube'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="YouTube">
        <rect x="0" y="4" width="24" height="16" rx="5" fill="#FF0000" />
        <path d="M10 8.800v6.400l5.500-3.200L10 8.800Z" fill="#fff" />
      </svg>
    )
  if (n.includes('linkedin'))
    return (
      <svg {...s} viewBox="0 0 24 24" aria-label="LinkedIn">
        <rect width="24" height="24" rx="5" fill="#0A66C2" />
        <path d="M7 10h2.200v7H7v-7Zm1.100-3.200a1.300 1.300 0 1 1 0 2.600 1.300 1.300 0 0 1 0-2.600ZM10.800 10h2.100v1c.3-.6 1-1.200 2.200-1.200 2.300 0 2.700 1.500 2.700 3.500V17h-2.200v-3.300c0-.8 0-1.800-1.100-1.800s-1.300.9-1.300 1.800V17h-2.200v-7Z" fill="#fff" />
      </svg>
    )
  return (
    <span className="grid place-items-center rounded-md bg-fill text-[9px] font-semibold text-ink-2" style={s}>
      {name.slice(0, 2)}
    </span>
  )
}

export const CHANNELS = ['Instagram', 'Facebook', 'Google', 'TikTok', 'Pinterest', 'YouTube', 'LinkedIn']

export function channelsOf(meta?: string) {
  if (!meta) return []
  return CHANNELS.filter((c) => meta.includes(c))
}
