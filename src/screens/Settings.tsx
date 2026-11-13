import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import NavBar from '../components/NavBar'
import BrandLogo from '../components/BrandLogo'

const SERIF = { fontFamily: "'Instrument Serif', Georgia, serif" }
const EASE = [0.22, 1, 0.36, 1] as const

type Connector = { id: string; name: string; what: string; color: string; glyph: string; on?: boolean; soon?: boolean }
type Group = { title: string; note: string; items: Connector[] }

const GROUPS: Group[] = [
  {
    title: 'Social',
    note: 'Where Olivy posts and replies.',
    items: [
      { id: 'ig', name: 'Instagram', what: 'Posts, reels, stories, comments and DMs', color: '#E1306C', glyph: 'Ig', on: true },
      { id: 'tt', name: 'TikTok', what: 'Videos and comments', color: '#111111', glyph: 'Tt' },
      { id: 'fb', name: 'Facebook', what: 'Pages, posts and groups', color: '#1877F2', glyph: 'f' },
      { id: 'yt', name: 'YouTube', what: 'Shorts and long videos', color: '#FF0000', glyph: 'Yt' },
      { id: 'pin', name: 'Pinterest', what: 'Pins and boards', color: '#E60023', glyph: 'P' },
      { id: 'li', name: 'LinkedIn', what: 'Company page and posts', color: '#0A66C2', glyph: 'in' },
      { id: 'x', name: 'X', what: 'Posts and replies', color: '#000000', glyph: 'X' },
      { id: 'thr', name: 'Threads', what: 'Posts and replies', color: '#000000', glyph: '@', soon: true },
      { id: 'snap', name: 'Snapchat', what: 'Stories and Spotlight', color: '#FFFC00', glyph: 'Sn', soon: true },
      { id: 'red', name: 'Reddit', what: 'Community posts and replies', color: '#FF4500', glyph: 'Re', soon: true },
    ],
  },
  {
    title: 'Advertising',
    note: 'Where Olivy spends, tests and pauses.',
    items: [
      { id: 'meta', name: 'Meta Ads', what: 'Instagram and Facebook campaigns', color: '#0866FF', glyph: 'M', on: true },
      { id: 'gads', name: 'Google Ads', what: 'Search, Shopping and Performance Max', color: '#4285F4', glyph: 'G' },
      { id: 'ttads', name: 'TikTok Ads', what: 'In-feed and Spark ads', color: '#111111', glyph: 'Tt' },
      { id: 'pinads', name: 'Pinterest Ads', what: 'Promoted pins', color: '#E60023', glyph: 'P' },
      { id: 'snapads', name: 'Snapchat Ads', what: 'Story and Spotlight ads', color: '#FFFC00', glyph: 'Sn', soon: true },
      { id: 'amzads', name: 'Amazon Ads', what: 'Sponsored products', color: '#FF9900', glyph: 'a', soon: true },
      { id: 'bing', name: 'Microsoft Ads', what: 'Bing search ads', color: '#00A4EF', glyph: 'Bi', soon: true },
    ],
  },
  {
    title: 'Email and SMS',
    note: 'Newsletters, flows and texts.',
    items: [
      { id: 'klav', name: 'Klaviyo', what: 'Campaigns, flows and segments', color: '#1E1E1E', glyph: 'K' },
      { id: 'mail', name: 'Mailchimp', what: 'Newsletters and audiences', color: '#FFC21A', glyph: 'Mc' },
      { id: 'shopemail', name: 'Shopify Email', what: 'Store emails', color: '#5A863E', glyph: 'S' },
      { id: 'attn', name: 'Attentive', what: 'SMS campaigns', color: '#6E3FF3', glyph: 'A' },
      { id: 'omni', name: 'Omnisend', what: 'Email and SMS flows', color: '#1A1A1A', glyph: 'Om', soon: true },
      { id: 'brevo', name: 'Brevo', what: 'Email campaigns', color: '#0B996E', glyph: 'Br', soon: true },
    ],
  },
  {
    title: 'Store and sales',
    note: 'So Olivy can tie content to revenue.',
    items: [
      { id: 'shop', name: 'Shopify', what: 'Products, orders and customers', color: '#5A863E', glyph: 'S', on: true },
      { id: 'woo', name: 'WooCommerce', what: 'Products and orders', color: '#7F54B3', glyph: 'W' },
      { id: 'amz', name: 'Amazon', what: 'Listings and reviews', color: '#FF9900', glyph: 'a' },
      { id: 'stripe', name: 'Stripe', what: 'Payments and revenue', color: '#635BFF', glyph: 'St' },
      { id: 'bc', name: 'BigCommerce', what: 'Products and orders', color: '#121118', glyph: 'Bc', soon: true },
      { id: 'etsy', name: 'Etsy', what: 'Listings and shop stats', color: '#F1641E', glyph: 'E', soon: true },
      { id: 'sq', name: 'Squarespace', what: 'Store and site', color: '#111111', glyph: 'Sq', soon: true },
    ],
  },
  {
    title: 'Search and website',
    note: 'Rankings, traffic and your blog.',
    items: [
      { id: 'gsc', name: 'Google Search Console', what: 'Rankings and queries', color: '#34A853', glyph: 'Sc', on: true },
      { id: 'ga', name: 'Google Analytics', what: 'Traffic and conversions', color: '#E37400', glyph: 'Ga', on: true },
      { id: 'wp', name: 'WordPress', what: 'Publish blog posts', color: '#21759B', glyph: 'W' },
      { id: 'web', name: 'Webflow', what: 'Publish pages and posts', color: '#146EF5', glyph: 'Wf' },
      { id: 'gbp', name: 'Google Business Profile', what: 'Posts and reviews', color: '#4285F4', glyph: 'Gb' },
      { id: 'semrush', name: 'Semrush', what: 'Keywords and competitor rankings', color: '#FF642D', glyph: 'Se', soon: true },
      { id: 'ahrefs', name: 'Ahrefs', what: 'Backlinks and keywords', color: '#2F6BFF', glyph: 'Ah', soon: true },
    ],
  },
  {
    title: 'Creators and UGC',
    note: 'Find, brief and pay creators.',
    items: [
      { id: 'aspire', name: 'Aspire', what: 'Creator discovery and outreach', color: '#2A2A72', glyph: 'As', soon: true },
      { id: 'grin', name: 'Grin', what: 'Creator relationships', color: '#FF5C35', glyph: 'Gr', soon: true },
      { id: 'billo', name: 'Billo', what: 'UGC video orders', color: '#7B61FF', glyph: 'Bi', soon: true },
      { id: 'ttcm', name: 'TikTok Creator Marketplace', what: 'Creator partnerships', color: '#111111', glyph: 'Tt', soon: true },
    ],
  },
  {
    title: 'Reviews and community',
    note: 'What customers say, and where.',
    items: [
      { id: 'trust', name: 'Trustpilot', what: 'Reviews and replies', color: '#00B67A', glyph: 'Tp', soon: true },
      { id: 'yotpo', name: 'Yotpo', what: 'Reviews and loyalty', color: '#0042E4', glyph: 'Yo', soon: true },
      { id: 'disc', name: 'Discord', what: 'Community server', color: '#5865F2', glyph: 'Di', soon: true },
    ],
  },
  {
    title: 'Analytics',
    note: 'So every post is tied to a sale.',
    items: [
      { id: 'pixel', name: 'Meta Pixel', what: 'Conversions and audiences', color: '#0866FF', glyph: 'Px', on: true },
      { id: 'tw', name: 'Triple Whale', what: 'Blended ad performance', color: '#1F2D5C', glyph: 'Tw' },
      { id: 'hotjar', name: 'Hotjar', what: 'Heatmaps and recordings', color: '#FD3A5C', glyph: 'Hj', soon: true },
      { id: 'mix', name: 'Mixpanel', what: 'Product analytics', color: '#7856FF', glyph: 'Mx', soon: true },
    ],
  },
  {
    title: 'CRM and support',
    note: 'Customers and conversations.',
    items: [
      { id: 'hub', name: 'HubSpot', what: 'Contacts and deals', color: '#FF7A59', glyph: 'Hs' },
      { id: 'gorg', name: 'Gorgias', what: 'Support tickets and DMs', color: '#2B5BFF', glyph: 'Go' },
      { id: 'zen', name: 'Zendesk', what: 'Support conversations', color: '#03363D', glyph: 'Zd', soon: true },
      { id: 'inter', name: 'Intercom', what: 'Chat and messages', color: '#1F8DED', glyph: 'In', soon: true },
    ],
  },
  {
    title: 'Your team',
    note: 'Where Olivy reports and finds assets.',
    items: [
      { id: 'slack', name: 'Slack', what: 'Daily brief and approvals in a channel', color: '#4A154B', glyph: 'Sl' },
      { id: 'notion', name: 'Notion', what: 'Brand docs and content calendar', color: '#111111', glyph: 'N' },
      { id: 'drive', name: 'Google Drive', what: 'Photos, videos and brand files', color: '#1FA463', glyph: 'Dr' },
      { id: 'canva', name: 'Canva', what: 'Brand templates', color: '#00C4CC', glyph: 'Ca' },
    ],
  },
]

const RULES = [
  { id: 'r1', title: 'Reply to comments', body: 'Answers questions in your voice. Flags buying intent.', on: true },
  { id: 'r2', title: 'Keep the queue full', body: 'Drafts and schedules a week ahead, always.', on: true },
  { id: 'r3', title: 'Guard ad spend', body: 'Pauses ads that spend without results.', on: true },
  { id: 'r4', title: 'Watch competitors', body: 'Tells you when a rival launches something.', on: true },
  { id: 'r5', title: 'Improve rankings', body: 'Rewrites titles and links pages that sit on page two.', on: true },
  { id: 'r6', title: 'Post without asking', body: 'Publishes approved content at the best time. Off means Olivy waits for you.', on: false },
]

const SECTIONS = ['Connectors', 'Brain', 'Autopilot']

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full border-0 p-0 transition-colors" style={{ background: on ? 'var(--accent)' : 'var(--fill-2)' }}>
      <span className="absolute top-0.5 size-4 rounded-full bg-white shadow transition-all" style={{ left: on ? 18 : 2 }} />
    </button>
  )
}

function Row({ c }: { c: Connector }) {
  const [state, setState] = useState<'off' | 'busy' | 'on'>(c.on ? 'on' : 'off')
  const connect = () => {
    setState('busy')
    setTimeout(() => setState('on'), 1100)
  }
  return (
    <li className="flex items-center gap-4 border-t border-line py-4 first:border-0">
      <BrandLogo id={c.id} name={c.name} color={c.color} glyph={c.glyph} size={42} />
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[15.5px] font-medium">{c.name}</p>
        <p className="m-0 mt-0.5 truncate text-[13.5px] text-ink-3">{c.what}</p>
      </div>
      {c.soon ? (
        <span className="text-[13.5px] text-ink-3/70">Coming soon</span>
      ) : state === 'on' ? (
        <span className="inline-flex items-center gap-1.5 text-[14px] text-success">
          <Check className="size-4" strokeWidth={2.6} /> Connected
        </span>
      ) : state === 'busy' ? (
        <span className="shimmer text-[14px] font-medium">Connecting</span>
      ) : (
        <button type="button" onClick={connect} className="border-0 bg-transparent p-0 text-[14.5px] font-medium text-accent hover:underline">
          Connect
        </button>
      )}
    </li>
  )
}

export default function Settings() {
  const [rules, setRules] = useState<Record<string, boolean>>(Object.fromEntries(RULES.map((r) => [r.id, r.on])))
  const all = GROUPS.flatMap((g) => g.items)
  const connected = all.filter((i) => i.on).length
  const soon = all.filter((i) => i.soon).length
  const ready = all.length - connected - soon

  return (
    <div className="min-h-screen">
      <NavBar tab="settings" />
      <main className="mx-auto grid max-w-[1180px] gap-x-20 gap-y-10 px-5 pb-48 pt-14 sm:px-8 lg:grid-cols-[200px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <h1 className="m-0 text-[44px] font-normal leading-none tracking-[-0.01em]" style={SERIF}>Settings</h1>
          <nav className="mt-8 flex gap-5 lg:flex-col lg:gap-3">
            {SECTIONS.map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className="text-[15px] text-ink-2 no-underline hover:text-ink">
                {s}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 max-w-[760px]">
          <motion.section id="connectors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="scroll-mt-24">
            <h2 className="m-0 text-[34px] font-normal leading-tight tracking-[-0.01em]" style={SERIF}>Connectors</h2>
            <p className="mt-2 max-w-[520px] text-[16px] leading-relaxed text-ink-3">
              Everything Olivy can plug into, and what is coming next. {connected} connected, {ready} ready to connect, {soon} coming soon.
            </p>
            <div className="mt-10 flex flex-col gap-12">
              {GROUPS.map((g) => (
                <div key={g.title}>
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <h3 className="m-0 text-[13px] font-medium text-ink-3">{g.title}</h3>
                    <span className="text-[13px] text-ink-3">{g.note}</span>
                  </div>
                  <ul className="m-0 list-none border-t border-line p-0">
                    {g.items.map((c) => (
                      <Row key={c.id} c={c} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[14.5px] text-ink-3">
              Need one that is not here? Tell Olivy in the bar below. Every request goes on the roadmap.
            </p>
          </motion.section>

          <section id="brain" className="mt-24 scroll-mt-24">
            <Brain />
          </section>

          <section id="autopilot" className="mt-24 scroll-mt-24">
            <h2 className="m-0 text-[34px] font-normal leading-tight tracking-[-0.01em]" style={SERIF}>Autopilot</h2>
            <p className="mt-2 max-w-[520px] text-[16px] leading-relaxed text-ink-3">What Olivy does without asking. Turn off anything you want to approve yourself.</p>
            <ul className="m-0 mt-8 list-none border-t border-line p-0">
              {RULES.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-6 border-b border-line py-5">
                  <div>
                    <p className="m-0 text-[15.5px] font-medium">{r.title}</p>
                    <p className="m-0 mt-0.5 max-w-[460px] text-[14px] leading-snug text-ink-3">{r.body}</p>
                  </div>
                  <Switch on={rules[r.id]} onChange={(v) => setRules((s) => ({ ...s, [r.id]: v }))} />
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>
    </div>
  )
}

const EXAMPLES = [
  'Never use the word “sale”',
  'Always mention free shipping over $60',
  'Post on weekday evenings',
  'Keep captions under 20 words',
  'Never compare us to a competitor by name',
]

const FACTS0 = [
  'Quiet beats loud',
  'Lead with the product',
  'Evenings over mornings',
  'Never discount, always gift',
  'Seven scents, not “collection”',
]

const FILES0 = [
  { name: 'Perféro brand guidelines.pdf', size: '2.4 MB' },
  { name: 'Product catalog.csv', size: '38 KB' },
  { name: 'Past newsletters.zip', size: '5.1 MB' },
]

function Brain() {
  const [text, setText] = useState('Speak like a friend who knows fragrance. Never pushy. Always mention the Discovery Set when it fits. Ship dates and prices must be exact.')
  const [saved, setSaved] = useState(false)
  const [facts, setFacts] = useState(FACTS0)
  const [teach, setTeach] = useState('')
  const [files, setFiles] = useState(FILES0)
  const [cap, setCap] = useState('60')
  const [ask, setAsk] = useState<Record<string, boolean>>({ ads: true, neg: true, price: true, new: false })

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }
  const label = 'm-0 mb-3 text-[13px] font-medium text-ink-3'

  return (
    <div>
      <h2 className="m-0 text-[34px] font-normal leading-tight tracking-[-0.01em]" style={SERIF}>Brain</h2>
      <p className="mt-2 max-w-[560px] text-[16px] leading-relaxed text-ink-3">
        How Olivy thinks about your brand. Instructions apply to everything it writes, posts and answers. Change them any time.
      </p>

      <div className="mt-10">
        <p className={label}>Instructions</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-2xl border-0 bg-white p-5 text-[16px] leading-relaxed text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none transition focus:shadow-[inset_0_0_0_1.5px_var(--accent),0_0_0_4px_rgba(107,63,160,0.1)]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button key={e} type="button" onClick={() => setText((t) => `${t.trim()}\n${e}.`)} className="rounded-full border-0 bg-fill px-3.5 py-1.5 text-[13.5px] text-ink-2 transition hover:bg-accent-tint hover:text-accent">
              + {e}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button type="button" onClick={save} className="h-10 rounded-xl border-0 bg-accent px-5 text-[14.5px] font-medium text-white transition hover:brightness-110">
            Save instructions
          </button>
          <span className={`text-[14px] text-success transition ${saved ? 'opacity-100' : 'opacity-0'}`}>Saved. Olivy will use this from now on.</span>
        </div>
      </div>

      <div className="mt-14">
        <p className={label}>What Olivy remembers about Perféro</p>
        <ul className="m-0 list-none border-t border-line p-0">
          {facts.map((f) => (
            <li key={f} className="flex items-center justify-between border-b border-line py-3.5 text-[16px]">
              <span>{f}</span>
              <button type="button" onClick={() => setFacts((l) => l.filter((x) => x !== f))} className="border-0 bg-transparent p-0 text-[13.5px] text-ink-3 hover:text-ink">
                Forget
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex items-center gap-3 border-b border-line pb-2 transition focus-within:border-accent"
          onSubmit={(e) => {
            e.preventDefault()
            if (teach.trim()) setFacts((l) => [...l, teach.trim()])
            setTeach('')
          }}
        >
          <input value={teach} onChange={(e) => setTeach(e.target.value)} placeholder="Teach Olivy something" className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[15.5px] outline-none placeholder:text-ink-3/70" />
          <span className="text-[12px] text-ink-3">Enter</span>
        </form>
      </div>

      <div className="mt-14">
        <p className={label}>Knowledge</p>
        <p className="m-0 mb-4 max-w-[520px] text-[14.5px] text-ink-3">Files Olivy reads so it never invents a detail about your products.</p>
        <ul className="m-0 list-none border-t border-line p-0">
          {files.map((f) => (
            <li key={f.name} className="flex items-center justify-between border-b border-line py-3.5">
              <span className="text-[15.5px]">{f.name}</span>
              <span className="flex items-center gap-5 text-[13.5px] text-ink-3">
                {f.size}
                <button type="button" onClick={() => setFiles((l) => l.filter((x) => x.name !== f.name))} className="border-0 bg-transparent p-0 text-ink-3 hover:text-ink">Remove</button>
              </span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setFiles((l) => [...l, { name: 'Holiday brief.docx', size: '120 KB' }])} className="mt-4 border-0 bg-transparent p-0 text-[14.5px] font-medium text-accent hover:underline">
          Add a file
        </button>
      </div>

      <div className="mt-14">
        <p className={label}>Guardrails</p>
        <div className="flex items-center justify-between border-t border-line py-4">
          <div>
            <p className="m-0 text-[15.5px] font-medium">Daily ad spend cap</p>
            <p className="m-0 mt-0.5 text-[14px] text-ink-3">Olivy never spends more than this in a day, across all channels.</p>
          </div>
          <span className="flex items-baseline gap-1 text-[22px]" style={SERIF}>
            $<input value={cap} onChange={(e) => setCap(e.target.value.replace(/\D/g, ''))} className="w-14 border-0 border-b border-line bg-transparent p-0 text-right outline-none focus:border-accent" />
          </span>
        </div>
        {[
          { id: 'ads', t: 'Ask me before launching any ad', b: 'Ads always wait for your approval.' },
          { id: 'neg', t: 'Ask me before replying to a complaint', b: 'Negative comments come to you first.' },
          { id: 'price', t: 'Ask me before anything that mentions price', b: 'Prices, offers and shipping terms.' },
          { id: 'new', t: 'Ask me before posting a new type of content', b: 'The first time Olivy tries a format.' },
        ].map((g) => (
          <div key={g.id} className="flex items-start justify-between gap-6 border-t border-line py-4 last:border-b">
            <div>
              <p className="m-0 text-[15.5px] font-medium">{g.t}</p>
              <p className="m-0 mt-0.5 text-[14px] text-ink-3">{g.b}</p>
            </div>
            <Switch on={ask[g.id]} onChange={(v) => setAsk((s) => ({ ...s, [g.id]: v }))} />
          </div>
        ))}
      </div>
    </div>
  )
}
