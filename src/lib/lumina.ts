/**
 * Everything the screens show, in one place, for Lumina (luminaskin.com).
 * Shaped so a real scan and a real account can replace it later.
 */
import { BRAND } from './brand'

export type ChannelId = 'ig' | 'search' | 'short' | 'blog'
export type ItemState = 'need' | 'idea' | 'posted'

export const IMG = {
  morning: '/brand/reel-morning.jpg',
  evening: '/brand/reel-evening.jpg',
  pour: '/brand/reel-pour.jpg',
  shelf: '/brand/reel-shelf.jpg',
  hero: BRAND.hero,
  bottle: BRAND.bottle,
  blog: BRAND.blog,
}

export const CHANNEL_NAME: Record<ChannelId, string> = {
  ig: 'Instagram',
  search: 'Search',
  short: 'TikTok',
  blog: 'Blog',
}

/* ---------- Scan ---------- */

export type ScanRow = {
  icon: 'brand' | 'products' | 'look' | ChannelId | 'ai'
  title: string
  detail: string
  tag: { label: string; tone: 'ok' | 'warn' }
  extra?: 'swatches' | 'posts'
}

export const SCAN_STEPS = [
  'Looking at your site',
  'Finding your products',
  'Learning your look and voice',
  'Reading your last 47 posts',
  'Checking Google',
  'Checking your blog',
  'Asking AI assistants about you',
]

export const SCAN_GROUPS: { title: string; rows: ScanRow[] }[] = [
  {
    title: 'Your brand',
    rows: [
      {
        icon: 'brand',
        title: 'Lumina',
        detail: 'Clean skincare for women 28 to 42, since 2024',
        tag: { label: 'Found', tone: 'ok' },
      },
      {
        icon: 'products',
        title: '6 products',
        detail: 'Cold pressed face oil, daily barrier cream and 4 more',
        tag: { label: 'Found', tone: 'ok' },
      },
      {
        icon: 'look',
        title: 'Look and voice',
        detail: BRAND.voice.tone,
        tag: { label: 'Found', tone: 'ok' },
        extra: 'swatches',
      },
    ],
  },
  {
    title: 'Where people find you today',
    rows: [
      {
        icon: 'ig',
        title: 'Instagram',
        detail: '2.3K followers, a post every 12 days, about 89 views each',
        tag: { label: 'Quiet', tone: 'warn' },
        extra: 'posts',
      },
      {
        icon: 'search',
        title: 'Google search',
        detail: 'Not ranking for any keyword yet',
        tag: { label: 'Not set up', tone: 'warn' },
      },
      {
        icon: 'blog',
        title: 'Blog',
        detail: 'No blog on your site',
        tag: { label: 'Not set up', tone: 'warn' },
      },
      {
        icon: 'ai',
        title: 'AI assistants',
        detail: 'Not mentioned when people ask ChatGPT or Gemini about skincare',
        tag: { label: 'Not set up', tone: 'warn' },
      },
    ],
  },
]

export const SCAN_POSTS = [IMG.pour, IMG.shelf, IMG.hero]

/* ---------- Channels ---------- */

export type ChannelPlan = {
  id: 'ig' | 'search' | 'short'
  name: string
  cadence: string
  reason: string
  /** Seven days, Monday first. True means a piece goes out that day. */
  rhythm?: boolean[]
  connect: string
  connectNote: string
}

export const FOCUS: ChannelPlan[] = [
  {
    id: 'ig',
    name: 'Instagram',
    cadence: '5 reels and daily stories a week',
    reason:
      'Your routine videos already reach 3x more people than your product shots. I’ll make more of what works.',
    rhythm: [true, false, true, true, true, false, true],
    connect: 'Connect Instagram',
    connectNote: 'So I can post for you',
  },
  {
    id: 'search',
    name: 'Search',
    cadence: 'Google, your blog and AI assistants',
    reason:
      'People look up natural moisturizers every day, on Google and in ChatGPT. The pages showing up are thin. You can win these.',
    rhythm: [false, true, false, false, true, false, false],
    connect: 'Connect Shopify',
    connectNote: 'So I can publish on your site',
  },
]

export const TRYING: ChannelPlan = {
  id: 'short',
  name: 'TikTok',
  cadence: 'Your Instagram reels, recut for TikTok',
  reason:
    'The younger end of your audience is here, and it costs you nothing extra since I reuse your reels. If it brings people to your site, it stays. If not, I’ll try Pinterest next.',
  connect: 'Connect TikTok',
  connectNote: 'Nothing new to make, just one connection',
}

export const PARKED = [
  {
    icon: 'ads' as const,
    name: 'Ads',
    reason: 'Once we know which posts people love. No point paying to guess.',
  },
  {
    icon: 'mail' as const,
    name: 'Email',
    reason: 'Once you have a few hundred buyers to write to.',
  },
]

/* ---------- Today ---------- */

export type ReadyPiece = {
  id: 'p1' | 'p2'
  kind: 'reel' | 'blog'
  image: string
  caption?: string
  duration?: string
  label: string
  title: string
  why: string
  secondary: string
  when: string
  scheduled: string
}

export const READY: ReadyPiece[] = [
  {
    id: 'p1',
    kind: 'reel',
    image: IMG.morning,
    caption: 'Three steps. Two minutes.',
    duration: '0:24',
    label: 'Reel for Instagram and TikTok',
    title: 'Morning glow routine',
    why: 'Your three best posts were all short routines, so I kept this under 30 seconds and opened on the product.',
    secondary: 'Edit',
    when: 'Monday, 9:00 AM',
    scheduled: 'Scheduled for Monday, 9:00 AM',
  },
  {
    id: 'p2',
    kind: 'blog',
    image: IMG.blog,
    label: 'Blog post, 1,240 words',
    title: 'Natural moisturizers, explained',
    why: 'Written for people searching “natural moisturizer”, the easiest of your 12 keywords to win.',
    secondary: 'Read draft',
    when: 'Tuesday',
    scheduled: 'Goes live Tuesday',
  },
]

export type Decision = {
  id: string
  body: string
  meta: string
  choices: { label: string; reply: string; primary?: boolean }[]
}

export const THINKING: Decision[] = [
  {
    id: 't1',
    body: 'Your routine reels keep doing about twice as well as your product shots. I’d like to turn Friday’s product post into a routine too.',
    meta: 'Same product, shown being used. I’ll have it ready by tomorrow morning.',
    choices: [
      { label: 'Sounds good', reply: 'Got it. Friday is a routine now.', primary: true },
      { label: 'Keep it as is', reply: 'Okay, I’ll leave it.' },
    ],
  },
  {
    id: 't2',
    body: 'People searching for “cold pressed face oil” keep landing on competitors with pretty thin pages. You sell exactly that. I can write one focused page for it by Wednesday.',
    meta: 'About two hours of my time, none of yours.',
    choices: [
      { label: 'Yes, do it', reply: 'On it. You’ll see the draft Wednesday.', primary: true },
      { label: 'Tell me more', reply: 'I’ll walk you through it in chat.' },
      { label: 'Not now', reply: 'Okay, I’ll leave it.' },
    ],
  },
]

export const WORKING = {
  now: [
    { icon: 'search' as const, title: 'Rewriting your page titles', detail: '7 of 19 pages', progress: 0.37 },
    {
      icon: 'ig' as const,
      title: 'Editing Friday’s reel',
      detail: 'Three ingredients, cut for Instagram and TikTok',
    },
    {
      icon: 'ai' as const,
      title: 'Telling AI assistants about your products',
      detail: '3 of 8 done',
      progress: 0.38,
    },
  ],
  waiting: [
    {
      icon: 'ads' as const,
      title: 'Ads',
      detail: 'Nothing needed yet. I’ll ask when it makes sense.',
    },
  ],
}

export const EARLIER = {
  me: 'can we post less on weekends? feels like a lot',
  her: 'Done. Weekends are one story each now, and I moved the blog to Tuesday. Your weekday posts do better anyway.',
  time: 'Yesterday, 6:14 PM',
}

/* ---------- Calendar ---------- */

export type Item = {
  id: string
  ch: ChannelId
  /** Which filter chip this belongs to. Blog posts belong to Search. */
  filter: 'ig' | 'search' | 'short'
  image: string
  title: string
  time: string
  state?: ItemState
  /** Approving this piece clears the "needs yes" state on every item sharing it. */
  approves?: ReadyPiece['id']
}

export type Day = { d: string; n: number; now?: boolean; items: Item[] }

export const WEEK: Day[] = [
  {
    d: 'Thu',
    n: 5,
    now: true,
    items: [
      { id: 'a1', ch: 'ig', filter: 'ig', image: IMG.evening, title: 'Evening routine story', time: '7:30 PM', state: 'posted' },
      { id: 'a2', ch: 'short', filter: 'short', image: IMG.shelf, title: 'Behind the formula', time: '6:00 PM', state: 'posted' },
    ],
  },
  {
    d: 'Fri',
    n: 6,
    items: [
      { id: 'b1', ch: 'ig', filter: 'ig', image: IMG.pour, title: 'Three ingredients', time: '9:00 AM' },
      { id: 'b2', ch: 'short', filter: 'short', image: IMG.pour, title: 'Three ingredients', time: '6:00 PM' },
    ],
  },
  {
    d: 'Sat',
    n: 7,
    items: [{ id: 'c1', ch: 'ig', filter: 'ig', image: IMG.hero, title: 'Weekend story', time: '10:00 AM' }],
  },
  {
    d: 'Sun',
    n: 8,
    items: [
      { id: 'd1', ch: 'ig', filter: 'ig', image: IMG.bottle, title: 'Sunday reset story', time: '11:00 AM' },
      { id: 'd2', ch: 'short', filter: 'short', image: IMG.bottle, title: 'Sunday reset', time: '6:00 PM' },
    ],
  },
  {
    d: 'Mon',
    n: 9,
    items: [
      { id: 'e1', ch: 'ig', filter: 'ig', image: IMG.morning, title: 'Morning glow routine', time: '9:00 AM', state: 'need', approves: 'p1' },
      { id: 'e2', ch: 'short', filter: 'short', image: IMG.morning, title: 'Morning glow routine', time: '6:00 PM', state: 'need', approves: 'p1' },
      { id: 'e3', ch: 'ig', filter: 'ig', image: IMG.shelf, title: 'Behind the formula', time: '8:00 PM' },
    ],
  },
  {
    d: 'Tue',
    n: 10,
    items: [
      { id: 'f1', ch: 'blog', filter: 'search', image: IMG.blog, title: 'Natural moisturizers, explained', time: '8:00 AM', state: 'need', approves: 'p2' },
      { id: 'f2', ch: 'ig', filter: 'ig', image: IMG.hero, title: 'Customer before and after', time: '9:00 AM' },
    ],
  },
  {
    d: 'Wed',
    n: 11,
    items: [
      { id: 'g1', ch: 'search', filter: 'search', image: IMG.bottle, title: 'Cold pressed face oil page', time: 'Draft by noon', state: 'idea' },
      { id: 'g2', ch: 'ig', filter: 'ig', image: IMG.pour, title: 'Why cold pressed matters', time: '9:00 AM' },
      { id: 'g3', ch: 'short', filter: 'short', image: IMG.pour, title: 'Why cold pressed matters', time: '6:00 PM' },
    ],
  },
]

export const STATE_LABEL: Record<ItemState, string> = {
  need: 'Needs yes',
  idea: 'Idea',
  posted: 'Posted',
}
