const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }

const PRODUCTS = [
  { name: 'Oud Noir', note: 'Smoke, amber, cedar', image: '/brand/posts/p07.jpg', pos: '60% 50%' },
  { name: 'Rose Éclat', note: 'Damask rose, pink pepper', image: '/brand/posts/p01.jpg', pos: '20% 20%' },
  { name: 'Santal Blanc', note: 'Sandalwood, milk, musk', image: '/brand/posts/p03.jpg', pos: '50% 50%' },
]

type Props = {
  headline: string
  body: string
  image: string
  cta?: string
  compact?: boolean
}

/** A newsletter the way it actually arrives: masthead, hero, story, products, offer, footer. */
export default function NewsletterMail({ headline, body, image, cta = 'Shop the Discovery Set', compact = false }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[inset_0_0_0_1px_var(--line)]">
      <div className="px-5 pb-3 pt-4 text-center">
        <p className="m-0 text-[15px] tracking-[0.28em]" style={SERIF}>PERFÉRO</p>
        {!compact && (
          <p className="m-0 mt-2 flex justify-center gap-5 text-[11.5px] text-ink-3">
            <span>Shop</span>
            <span>Discovery Set</span>
            <span>Journal</span>
          </p>
        )}
      </div>
      <img src={image} alt="" className={`w-full object-cover ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`} />
      <div className="px-6 pb-6 pt-6 text-center">
        <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-ink-3">The Discovery Set</p>
        <p className={`m-0 mt-2.5 leading-[1.08] ${compact ? 'text-[24px]' : 'text-[34px]'}`} style={SERIF}>{headline}</p>
        <p className={`mx-auto mt-3 text-ink-2 ${compact ? 'line-clamp-3 text-[13.5px] leading-relaxed' : 'max-w-[400px] text-[14.5px] leading-[1.65]'}`}>{body}</p>
        <span className="mt-5 inline-block bg-ink px-6 py-3 text-[12.5px] font-medium uppercase tracking-[0.1em] text-white">{cta}</span>
      </div>
      {!compact && (
        <>
          <div className="border-t border-line px-6 py-6">
            <p className="m-0 mb-4 text-center text-[11px] uppercase tracking-[0.16em] text-ink-3">Inside the box</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {PRODUCTS.map((p) => (
                <div key={p.name}>
                  <div className="aspect-square overflow-hidden rounded-lg bg-fill">
                    <img src={p.image} alt="" className="size-full object-cover" style={{ objectPosition: p.pos, transform: 'scale(1.5)', transformOrigin: p.pos }} />
                  </div>
                  <p className="m-0 mt-2 text-[13px] font-medium">{p.name}</p>
                  <p className="m-0 text-[11.5px] leading-tight text-ink-3">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-line bg-[#f7f5f2] px-6 py-4 text-center text-[11.5px] text-ink-2">
            <span>Free shipping over $60</span>
            <span>Gift note included</span>
            <span>30-day returns</span>
          </div>
          <p className="m-0 px-6 py-5 text-center text-[11px] leading-relaxed text-ink-3">
            Perféro · perferofragrance.com
            <br />
            You are receiving this because you joined the list. <u>Unsubscribe</u>
          </p>
        </>
      )}
    </div>
  )
}
