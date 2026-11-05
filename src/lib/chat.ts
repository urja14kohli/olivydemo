export type Reel = {
  id: string
  title: string
  caption: string
  slot: string
  duration: string
  image: string
  frame: string
  lift?: string
}

export const REELS: Reel[] = [
  {
    id: 'r1',
    title: 'Morning glow routine',
    caption: 'Three steps, four minutes, before the coffee goes cold.',
    slot: 'Monday, 9:00am',
    duration: '0:22',
    image: '/brand/reel-morning.jpg',
    frame: 'Hands warming serum in morning light',
    lift: '3x average',
  },
  {
    id: 'r2',
    title: 'Three ingredients',
    caption: 'Squalane, oat, and nothing you cannot pronounce.',
    slot: 'Wednesday, 6:00pm',
    duration: '0:18',
    image: '/brand/reel-pour.jpg',
    frame: 'Close up pour shot on a stone counter',
  },
  {
    id: 'r3',
    title: 'What left the shelf',
    caption: 'Six weeks, one bottle, the rest of it gone.',
    slot: 'Friday, 9:00am',
    duration: '0:26',
    image: '/brand/reel-shelf.jpg',
    frame: 'The old routine, before it was cleared',
  },
]

export const FOLLOW_UP_REELS: Reel[] = [
  {
    id: 'n1',
    title: 'Evening wind down',
    caption: 'The two minute version, for the nights you have nothing left.',
    slot: 'Thursday, 8:00pm',
    duration: '0:20',
    image: '/brand/reel-evening.jpg',
    frame: 'Same product, quieter light',
  },
  {
    id: 'n2',
    title: 'What I stopped using',
    caption: 'Four products out, one in. Here is what changed.',
    slot: 'Saturday, 10:00am',
    duration: '0:24',
    image: '/brand/reel-shelf.jpg',
    frame: 'The shelf, after the clear out',
  },
]

export type ChatMessage =
  | { id: string; from: 'olivy' | 'you'; kind: 'text'; text: string }
  | { id: string; from: 'olivy'; kind: 'reels'; text: string }

export const CONVERSATION: ChatMessage[] = [
  {
    id: 'm1',
    from: 'olivy',
    kind: 'text',
    text: 'Your week is set up. Three reels, two posts, and the search work is already running. Want me to walk you through it?',
  },
  { id: 'm2', from: 'you', kind: 'text', text: 'Show me the reels' },
  {
    id: 'm3',
    from: 'olivy',
    kind: 'reels',
    text: 'Here are the three I made for you this week.',
  },
  {
    id: 'm4',
    from: 'olivy',
    kind: 'text',
    text: 'Approve them as they are, or tell me what to change and I will redo it.',
  },
]
