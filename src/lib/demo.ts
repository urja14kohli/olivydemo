import { BRAND, IMG } from './brand'

export type MatchOption = {
  id: string
  image: string
  title: string
  caption: string
  duration?: string
  subject?: string
  heading?: string
  body?: string
  cta?: string
  video?: string
  handle?: string
  avatar?: string
}

export type MatchRound = {
  id: string
  kind: 'reel' | 'still' | 'newsletter'
  prompt: string
  typeLabel: string
  a: MatchOption
  b: MatchOption
}

export const MATCH_ROUNDS: MatchRound[] = [
  {
    id: 'reel',
    kind: 'reel',
    prompt: 'Which reel feels more like you?',
    typeLabel: 'Instagram Reels · Round 1 of 5',
    a: {
      id: 'r-ritual',
      image: IMG.roses,
      title: 'Evening ritual',
      caption: 'Candle lit. Box open. Pick tonight’s scent by how the day felt.',
      duration: '0:18',
      video: '/brand/reels/evening-ritual.mp4',
    },
    b: {
      id: 'r-studio',
      image: IMG.goldBox,
      title: 'Studio reveal',
      caption: 'Black box. Gold pattern. No noise. Just the perfume.',
      duration: '0:22',
      video: '/brand/reels/unboxing.mp4',
    },
  },
  {
    id: 'product',
    kind: 'still',
    prompt: 'Which product post feels right?',
    typeLabel: 'Product posts · Round 2 of 5',
    a: {
      id: 'p-product',
      image: IMG.openSet,
      title: 'Product first',
      caption: 'The Perféro Discovery Set. Seven scents to find your signature.',
      duration: '0:12',
    },
    b: {
      id: 'p-life',
      image: IMG.vials,
      title: 'Lived in',
      caption: 'On the table after dinner. Friends asking what you’re wearing. That’s the set.',
      duration: '0:14',
    },
  },
  {
    id: 'newsletter',
    kind: 'newsletter',
    prompt: 'Which email sounds like you?',
    typeLabel: 'Newsletter · Round 3 of 5',
    a: {
      id: 'n-quiet',
      image: IMG.openSet,
      title: 'Quiet and precise',
      subject: 'Seven scents. One journey.',
      heading: 'Find the one that stays with you.',
      body: 'The Discovery Set holds seven compositions in travel-size vials. Wear one a night. Notice what the day does to it. The right scent will not need a hard sell.',
      cta: 'Shop the Discovery Set',
      caption: 'Seven compositions. One box. Take your time with each. The right scent will not need a hard sell.',
    },
    b: {
      id: 'n-warm',
      image: IMG.roses,
      title: 'Warm and close',
      subject: 'A small ritual, just for you',
      heading: 'Light a candle. Open the box.',
      body: 'Choose the scent that matches tonight. Keep the rest for the days that ask for something different. We made the set so you never have to guess.',
      cta: 'Open your Discovery Set',
      caption: 'Open the set when the house is quiet. Try one tonight. Leave the rest for days that ask for something different.',
    },
  },
  {
    id: 'ad',
    kind: 'still',
    prompt: 'Which ad would you run?',
    typeLabel: 'Ads · Round 4 of 5',
    a: {
      id: 'a-line',
      image: IMG.goldBox,
      title: 'One line',
      caption: 'Find your signature. Shop the Discovery Set.',
    },
    b: {
      id: 'a-proof',
      image: IMG.vials,
      title: 'Seven scents',
      caption: 'Seven scents, one box. Try them all before you choose.',
    },
  },
  {
    id: 'influencer',
    kind: 'still',
    prompt: 'Which creator fits your brand?',
    typeLabel: 'Creators · Round 5 of 5',
    a: {
      id: 'i-maya',
      image: '/brand/posts/p05.jpg',
      video: '/brand/ugc/u1.mp4',
      handle: '@maya.at.home',
      avatar: '/brand/av2.jpg',
      title: 'Unboxing at home',
      caption: 'Warm, curious, talks to the camera like a friend.',
    },
    b: {
      id: 'i-daniel',
      image: '/brand/posts/p08.jpg',
      video: '/brand/ugc/u2.mp4',
      handle: '@daniel.dresses',
      avatar: '/brand/av1.jpg',
      title: 'Getting ready',
      caption: 'Calm, precise, shows the ritual rather than selling it.',
    },
  },
]

export function composeFirstPost(picks: MatchOption[]) {
  const visual = picks[0] ?? MATCH_ROUNDS[0].a
  const voice = picks[2] ?? picks[0] ?? visual
  return {
    id: 'first',
    image: visual.image,
    title: visual.title,
    caption: voice.caption,
    duration: visual.duration ?? '0:20',
    label: 'Reel for Instagram and TikTok',
    when: 'Tuesday, 9:00 AM',
  }
}

export type HubColumn = 'social' | 'blogs' | 'newsletter' | 'influencer' | 'ads'

export type HubCard = {
  id: string
  column: HubColumn
  kind: string
  image: string
  title: string
  snippet: string
  status: 'ready' | 'queued' | 'live'
  sub?: string
  meta?: string
  video?: string
  isNew?: boolean
  crop?: { z: number; x: string; y: string }
  avatar?: string
}

export const HUB_COLUMNS: { id: HubColumn; label: string }[] = [
  { id: 'social', label: 'Social Media' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'influencer', label: 'Influencer' },
  { id: 'ads', label: 'Ads' },
]

export const HUB_FILTERS = ['Social Media', 'Blogs', 'Newsletter', 'Influencer', 'Ads'] as const

export const HUB_CARDS: HubCard[] = [
  {
    id: 'h1',
    column: 'social',
    kind: 'Reel',
    image: '/brand/posts/p01.jpg',
    title: 'Evening ritual',
    snippet: 'Candle lit. Box open. Pick tonight’s scent by how the day felt.',
    status: 'ready',
    meta: '0:18',
    video: '/brand/reels/evening-ritual.mp4',
  },
  {
    id: 'h2',
    column: 'social',
    kind: 'Post',
    image: '/brand/posts/p02.jpg',
    title: 'Seven scents. One journey.',
    snippet: 'Seven scents. One journey. Find the one that stays with you.',
    status: 'ready',
  },
  {
    id: 'h3',
    column: 'social',
    kind: 'Reel',
    image: '/brand/posts/p11.jpg',
    title: 'The unboxing, slowed down',
    snippet: 'Gold foil catches the light. The lid lifts. Seven vials, one decision.',
    status: 'ready',
    meta: '0:14',
    video: '/brand/reels/unboxing.mp4',
  },
  {
    id: 'h12',
    column: 'social',
    kind: 'Post',
    image: '/brand/posts/p12.jpg',
    title: 'Black box. Gold leaf.',
    snippet: 'Quiet packaging for a loud memory. The Discovery Set, now shipping.',
    status: 'ready',
  },
  {
    id: 'h13',
    column: 'social',
    kind: 'Reel',
    image: '/brand/posts/p08.jpg',
    title: 'Pick tonight’s scent',
    snippet: 'One vial for the dinner, one for the walk home.',
    status: 'ready',
    meta: '0:21',
    video: '/brand/reels/tonight.mp4',
  },
  {
    id: 'h14',
    column: 'social',
    kind: 'Carousel',
    image: '/brand/posts/p04.jpg',
    title: 'Which scent are you?',
    snippet: 'Seven slides. Seven moods. Swipe to find yours.',
    status: 'ready',
    meta: '7 slides',
  },
  {
    id: 'h4',
    column: 'blogs',
    kind: 'Blog',
    image: '/brand/posts/p06.jpg',
    title: 'How to wear a discovery set',
    snippet: 'One scent a night. Notes on skin, not on paper. A quiet way to decide.',
    status: 'ready',
    meta: '6 min read · targets “fragrance sampler set”',
  },
  {
    id: 'h5',
    column: 'blogs',
    kind: 'Blog',
    image: '/brand/posts/p07.jpg',
    title: 'Why we kept the box black',
    snippet: 'What Perféro’s quiet packaging says about the juice inside.',
    status: 'ready',
    meta: '4 min read · brand story',
  },
  {
    id: 'h15',
    column: 'blogs',
    kind: 'Blog',
    image: '/brand/posts/p10.jpg',
    title: 'The luxury perfume gift guide',
    snippet: 'Seven gifts by personality, with the Discovery Set at the center.',
    status: 'ready',
    meta: '8 min read · ranks #14, aiming for top 5',
  },
  {
    id: 'h10',
    column: 'newsletter',
    kind: 'Newsletter',
    image: '/brand/posts/p13.jpg',
    title: 'A small ritual, just for you',
    snippet: 'Open the set when the house is quiet. Try one tonight.',
    status: 'ready',
    sub: 'Subject: A small ritual, just for you',
    meta: 'Warm tone · sends Wed 6:00 PM',
  },
  {
    id: 'h11',
    column: 'newsletter',
    kind: 'Newsletter',
    image: '/brand/posts/p05.jpg',
    title: 'Your Discovery Set is ready',
    snippet: 'Seven compositions. One box. Take your time with each.',
    status: 'ready',
    sub: 'Subject: Your Discovery Set is ready',
    meta: 'Quiet tone · welcome flow',
  },
  {
    id: 'h16',
    column: 'newsletter',
    kind: 'Newsletter',
    image: '/brand/posts/p16.jpg',
    title: 'The holiday edit',
    snippet: 'Three ways to give a scent without guessing the size, the note, or the person.',
    status: 'ready',
    sub: 'Subject: Giving a scent, without the guesswork',
    meta: 'Segment: past buyers',
  },
  {
    id: 'u1',
    column: 'influencer',
    kind: 'UGC',
    image: '/brand/posts/p05.jpg',
    crop: { z: 1.2, x: '50%', y: '40%' },
    title: 'Unboxing at home',
    snippet: '“Okay, I did not expect the box to feel this heavy.” A creator opens the Discovery Set in her kitchen.',
    status: 'ready',
    sub: '@maya.at.home',
    meta: '0:15 · Unboxing',
    video: '/brand/ugc/u1.mp4',
    avatar: '/brand/av2.jpg',
  },
  {
    id: 'u2',
    column: 'influencer',
    kind: 'UGC',
    image: '/brand/posts/p08.jpg',
    crop: { z: 1.5, x: '70%', y: '50%' },
    title: 'Getting ready',
    snippet: 'He tries all seven scents before dinner and picks one on camera.',
    status: 'ready',
    sub: '@daniel.dresses',
    meta: '0:18 · Get ready with me',
    video: '/brand/ugc/u2.mp4',
    avatar: '/brand/av1.jpg',
  },
  {
    id: 'u3',
    column: 'influencer',
    kind: 'UGC',
    image: '/brand/posts/p03.jpg',
    crop: { z: 1.4, x: '40%', y: '60%' },
    title: 'The gift reaction',
    snippet: 'A friend opens the gold box and reads the note out loud.',
    status: 'ready',
    sub: '@jo.and.co',
    meta: '0:12 · Gifting',
    video: '/brand/ugc/u3.mp4',
    avatar: '/brand/av4.jpg',
  },
  {
    id: 'h8',
    column: 'ads',
    kind: 'Ad',
    image: '/brand/posts/p03.jpg',
    title: 'Find your signature',
    snippet: 'Static ad. Product on stone. One line. Shop the set.',
    status: 'ready',
    sub: 'Shop the set',
    meta: 'Instagram, Facebook, Google · $40/day',
  },
  {
    id: 'h9',
    column: 'ads',
    kind: 'Ad',
    image: '/brand/posts/p17.jpg',
    title: 'Still thinking about it?',
    snippet: 'Shown to people who visited the site but did not buy. A closer look at the set.',
    status: 'ready',
    sub: 'Complete your order',
    meta: 'Instagram, Facebook · for past visitors',
  },
  {
    id: 'h17',
    column: 'ads',
    kind: 'Ad',
    image: '/brand/posts/p18.jpg',
    title: 'Holiday gifting',
    snippet: 'Wrapped, ready, and ships in two days.',
    status: 'ready',
    sub: 'Gift the Discovery Set',
    meta: 'Google, Instagram, Facebook · starts Nov 24',
  },
]

export const CAMPAIGN_CARDS: HubCard[] = [
  {
    id: 'k1',
    column: 'social',
    kind: 'Reel',
    image: '/brand/posts/p10.jpg',
    crop: { z: 1.8, x: '12%', y: '85%' },
    title: 'Gift it before they ask',
    snippet: 'A hand-wrapped Discovery Set, opened by someone who did not expect it.',
    status: 'ready',
    isNew: true,
    meta: '0:16',
    video: '/brand/reels/gifting.mp4',
  },
  {
    id: 'k2',
    column: 'social',
    kind: 'Post',
    image: '/brand/posts/p01.jpg',
    crop: { z: 2, x: '92%', y: '12%' },
    title: 'Wrapped and ready',
    snippet: 'The holiday box. Ships in two days. Gift note included.',
    status: 'ready',
    isNew: true,
  },
  {
    id: 'k3',
    column: 'newsletter',
    kind: 'Newsletter',
    image: '/brand/posts/p15.jpg',
    title: 'Twelve days of scent',
    snippet: 'A short note each day. One vial, one story, one reason to smell it again.',
    status: 'ready',
    isNew: true,
    sub: 'Subject: Twelve days, twelve scents',
    meta: 'Segment: everyone',
  },
  {
    id: 'k4',
    column: 'ads',
    kind: 'Ad',
    image: '/brand/posts/p12.jpg',
    crop: { z: 1.8, x: '25%', y: '15%' },
    title: 'The gift that needs no size',
    snippet: 'One box. Seven scents. Always the right fit.',
    status: 'ready',
    isNew: true,
    sub: 'Shop gifts',
    meta: 'Instagram + Search · $60/day',
  },
]

export const WORKING = [
  'Writing a blog draft about how to wear the Discovery Set',
  'Scheduling Tuesday’s reel for 9:00 AM',
  'Reviewing what similar fragrance accounts posted this week',
]

export type Notif = {
  id: string
  when: string
  body: string
  action?: string
  alt?: string
}

export const NOTIFS: Notif[] = [
  {
    id: 'n1',
    when: 'Just now',
    body: 'Your Tuesday reel is set for 9:00 AM. That is when Perféro’s Instagram audience is usually online.',
  },
  {
    id: 'n2',
    when: '2 hours ago',
    body: 'I finished the blog draft on how to wear the Discovery Set. It is in your Hub when you want to review it.',
    action: 'Review now',
  },
  {
    id: 'n3',
    when: '5 hours ago',
    body: 'Your last product still did about twice the usual saves. I made two more in that same quiet style.',
    action: 'See them',
  },
  {
    id: 'n4',
    when: 'Yesterday',
    body: 'I think the newsletter can sound a little warmer. Want a second version that feels closer?',
    action: 'Yes, try it',
    alt: 'Keep as is',
  },
  {
    id: 'n6',
    when: 'This morning',
    body: 'I replied to 12 comments on your last reel and flagged two that sound like buying questions.',
  },
  {
    id: 'n7',
    when: 'This morning',
    body: 'One retargeting ad was spending without clicks. I paused it and moved the budget to the gifting ad.',
  },
  {
    id: 'n8',
    when: 'Last night',
    body: 'A fragrance brand you compete with launched a sampler set. I drafted a response post if you want it.',
    action: 'See the draft',
  },
  {
    id: 'n5',
    when: '2 days ago',
    body: 'The SEO page for “fragrance discovery set” is sitting around page two. I tightened the title and linked it to the product.',
  },
]

export type CalItem = {
  id: string
  day: number
  time: string
  title: string
  kind: 'social' | 'blog' | 'newsletter' | 'ads'
  image: string
  olivyPick?: boolean
}

export const WEEK_DAYS = [
  { d: 'Mon', n: 10 },
  { d: 'Tue', n: 11, now: true },
  { d: 'Wed', n: 12 },
  { d: 'Thu', n: 13 },
  { d: 'Fri', n: 14 },
  { d: 'Sat', n: 15 },
  { d: 'Sun', n: 16 },
]

export const CAL_ITEMS: CalItem[] = [
  { id: 'c1', day: 0, time: '10:00 AM', title: 'Product still', kind: 'social', image: IMG.openSet },
  {
    id: 'c2',
    day: 1,
    time: '9:00 AM',
    title: 'Evening ritual reel',
    kind: 'social',
    image: IMG.roses,
    olivyPick: true,
  },
  { id: 'c3', day: 1, time: '11:00 AM', title: 'How to wear the set', kind: 'blog', image: IMG.tea },
  {
    id: 'c4',
    day: 2,
    time: '6:00 PM',
    title: 'Warm newsletter',
    kind: 'newsletter',
    image: IMG.goldBox,
    olivyPick: true,
  },
  { id: 'c5', day: 3, time: '9:00 AM', title: 'Studio reveal', kind: 'social', image: IMG.vials },
  { id: 'c6', day: 4, time: '12:00 PM', title: 'Signature ad', kind: 'ads', image: IMG.goldBox },
  { id: 'c7', day: 5, time: '10:00 AM', title: 'Weekend story', kind: 'social', image: IMG.roses },
]

export const QUEUE = CAL_ITEMS.filter((i) => i.olivyPick)

export const CHAT_SEED = [
  {
    from: 'olivy' as const,
    text: `Your week is set up for ${BRAND.name}. Drafts are ready in Hub. Tell me what to change, or tell me to handle it.`,
  },
] as { from: 'olivy' | 'me'; text: string }[]

export const GEN_STEPS = [
  'Reading your site',
  'Learning your products and voice',
  'Choosing the channels that matter',
  'Drafting your first content',
]

export const AUTOMATED = [
  'Replied to 12 comments',
  'Paused 1 weak ad',
  'Refreshed 2 meta descriptions',
  'Reordered Thursday’s queue',
]

export const COMPETITOR_CARDS: Record<string, HubCard> = {
  blog: {
    id: 'x1',
    column: 'blogs',
    kind: 'Blog',
    image: '/brand/posts/p14.jpg',
    title: 'Discovery sets compared: what to look for',
    snippet: 'Five scents or seven? Sizes, longevity, and how to choose a sampler you will finish.',
    status: 'ready',
    meta: '7 min read · targets “perfume sampler set”',
    isNew: true,
  },
  ad: {
    id: 'x2',
    column: 'ads',
    kind: 'Ad',
    image: '/brand/posts/p09.jpg',
    title: 'Two more scents',
    snippet: 'Seven scents, one box. Two more than the rest.',
    status: 'ready',
    sub: 'Seven scents, one box',
    meta: 'Search + Instagram · counters the rival launch',
    isNew: true,
  },
}
