export type Reel = {
  id: string
  title: string
  caption: string
  slot: string
  duration: string
  /** Two stops that stand in for the reel thumbnail. */
  art: [string, string]
  /** Short line describing the frame, so the card is never just a colour. */
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
    art: ['#C9A7F0', '#F3D9C6'],
    frame: 'Hands warming serum in morning light',
    lift: '3x your average',
  },
  {
    id: 'r2',
    title: 'Three ingredients',
    caption: 'Squalane, oat, and nothing you cannot pronounce.',
    slot: 'Wednesday, 6:00pm',
    duration: '0:18',
    art: ['#A7C4F0', '#D9CEF3'],
    frame: 'Close up pour shot on a stone counter',
  },
  {
    id: 'r3',
    title: 'Customer before and after',
    caption: 'Six weeks, one bottle, no filter on either photo.',
    slot: 'Friday, 9:00am',
    duration: '0:26',
    art: ['#EFC9D8', '#CDB6EC'],
    frame: 'Split frame, week one beside week six',
  },
]

export const FOLLOW_UP_REELS: Reel[] = [
  {
    id: 'n1',
    title: 'Evening wind down',
    caption: 'The two minute version, for the nights you have nothing left.',
    slot: 'Thursday, 8:00pm',
    duration: '0:20',
    art: ['#B8A6EE', '#EBD3E6'],
    frame: 'Same lighting, same pace as Monday',
  },
  {
    id: 'n2',
    title: 'What I stopped using',
    caption: 'Four products out, one in. Here is what changed.',
    slot: 'Saturday, 10:00am',
    duration: '0:24',
    art: ['#A9D2EC', '#D6C7F2'],
    frame: 'Counter clear out, same hands, same shelf',
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
    text: 'Your week is set up. Three reels, two blog posts, and the search work is already running. Want me to walk you through it?',
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
