import { useSyncExternalStore } from 'react'
import { HUB_CARDS, CAMPAIGN_CARDS, COMPETITOR_CARDS, CHAT_SEED } from './demo'
import type { HubCard } from './demo'

type Msg = { from: 'olivy' | 'me'; text: string }
export type QueueEntry = { id: string; day: number; time: string; label: string }
export type Fx = { text?: string; title?: string; channels?: string[]; note?: string; budget?: string }
type LogEntry = { id: string; when: string; body: string }

type State = {
  approved: string[]
  rejected: string[]
  queue: QueueEntry[]
  autopilot: boolean
  activity: string | null
  cursor: string | null
  chat: Msg[]
  chatOpen: boolean
  log: LogEntry[]
  extraCards: HubCard[]
  playground: 'none' | 'side' | 'full'
  fx: Record<string, Fx>
  toasts: { id: string; text: string; typing: boolean }[]
  hubTab: string
  openCard: string | null
  ghost: { id: string; ask: string; working: string | null } | null
  reason: string | null
  listening: string | null
}

export const SLOTS = [
  { day: 1, time: '9:00 AM', label: 'Tue 9:00 AM' },
  { day: 2, time: '6:00 PM', label: 'Wed 6:00 PM' },
  { day: 3, time: '12:00 PM', label: 'Thu 12:00 PM' },
  { day: 4, time: '9:00 AM', label: 'Fri 9:00 AM' },
  { day: 5, time: '11:00 AM', label: 'Sat 11:00 AM' },
  { day: 6, time: '10:00 AM', label: 'Sun 10:00 AM' },
  { day: 0, time: '8:00 AM', label: 'Mon 8:00 AM' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMES = ['9:00 AM', '12:00 PM', '6:00 PM']
const nextSlot = (n: number) => {
  const day = (n + 1) % 7
  const time = TIMES[(Math.floor(n / 7) + (n % 3)) % 3]
  return { day, time, label: `${DAYS[day]} ${time}` }
}
export const setHubTab = (hubTab: string) => set({ hubTab })
export const setOpenCard = (openCard: string | null) => set({ openCard })
let toastN = 0
/** Olivy texts you: a typing indicator, then the message, above the input. */
export async function notify(text: string, typingMs = 1100) {
  const id = `t${++toastN}`
  set({ toasts: [...state.toasts.slice(-2), { id, text: '', typing: true }] })
  await sleep(typingMs)
  set({
    toasts: state.toasts.map((t) => (t.id === id ? { ...t, text, typing: false } : t)),
    chat: [...state.chat, { from: 'olivy', text }],
  })
  setTimeout(() => set({ toasts: state.toasts.filter((t) => t.id !== id) }), 7500)
}

let greeted = false
export function proactiveHello() {
  if (greeted) return
  greeted = true
  setTimeout(() => {
    if (!busy) notify('Morning. Your Tuesday reel is set for 9:00 AM. I also have two blog ideas if you want them.', 1600)
  }, 6000)
}

export const setFx = (id: string, patch: Fx) => set({ fx: { ...state.fx, [id]: { ...state.fx[id], ...patch } } })

let state: State = {
  approved: [],
  rejected: [],
  queue: [],
  autopilot: false,
  activity: null,
  cursor: null,
  chat: [...CHAT_SEED],
  chatOpen: false,
  log: [],
  extraCards: [],
  playground: 'none',
  fx: {},
  toasts: [],
  hubTab: 'all',
  openCard: null,
  ghost: null,
  reason: null,
  listening: null,
}
const subs = new Set<() => void>()
const set = (p: Partial<State>) => {
  state = { ...state, ...p }
  subs.forEach((f) => f())
}
export const useStore = () =>
  useSyncExternalStore(
    (f) => {
      subs.add(f)
      return () => subs.delete(f)
    },
    () => state,
  )

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
let busy = false

export const setPlayground = (playground: 'none' | 'side' | 'full') => set({ playground })
export const setChatOpen = (chatOpen: boolean) => set({ chatOpen })

export function approveCard(id: string, slot?: (typeof SLOTS)[number]) {
  if (state.approved.includes(id)) return
  const s = slot ?? nextSlot(state.queue.length)
  set({
    approved: [...state.approved, id],
    queue: [...state.queue, { id, day: s.day, time: s.time, label: s.label }],
  })
}

export function rejectCard(id: string) {
  set({ rejected: [...state.rejected, id] })
}

async function work(steps: string[], each = 650) {
  for (const s of steps) {
    set({ activity: s })
    await sleep(each)
  }
}

export const allCards = () => [...HUB_CARDS, ...state.extraCards]
const say = (text: string) => set({ activity: null, chat: [...state.chat, { from: 'olivy', text }] })

export const finish = async (id: string, ms = 350) => {
  approveCard(id)
  await sleep(ms)
}

export async function runAutopilot() {
  if (busy) return
  busy = true
  // Fresh run every time so the demo can be repeated
  set({ autopilot: true, approved: [], rejected: [], queue: [], fx: {}, ghost: null, openCard: null, hubTab: 'social', cursor: null, reason: null, listening: null })
  window.location.hash = 'hub'
  await sleep(500)

  const goTab = async (tab: string, label: string, why: string) => {
    set({ openCard: null, cursor: `tab-${tab}`, activity: label, reason: why })
    await sleep(1500)
    set({ hubTab: tab })
    await sleep(600)
  }
  const look = async (id: string, activity: string, why: string, ms = 1900) => {
    set({ cursor: id, activity, reason: why })
    await sleep(ms)
  }
  const pick = async (id: string, activity: string, why: string) => {
    await look(id, activity, why)
    approveCard(id)
    await sleep(500)
  }
  const type = async (id: string, text: string) => {
    set({ ghost: { id, ask: '', working: null } })
    for (let i = 1; i <= text.length; i++) {
      set({ ghost: { id, ask: text.slice(0, i), working: null } })
      await sleep(36)
    }
    await sleep(400)
    set({ ghost: { id, ask: '', working: 'Olivy is rewriting' } })
    await sleep(1300)
  }
  /** Open a card in the playground, type an edit, apply it, approve it. */
  const edit = async (id: string, why: string, ask: string, patch: Fx, after: string, chans: string[] = []) => {
    await look(id, 'Opening it to edit', why, 1700)
    set({ openCard: id, cursor: null })
    await sleep(1100)
    set({ activity: 'Editing live', reason: 'Writing the change' })
    set({ cursor: 'pg:ask' })
    await sleep(900)
    await type(id, ask)
    const { channels, ...rest } = patch
    setFx(id, rest)
    set({ ghost: null, cursor: 'pg:text', reason: 'Updated the text' })
    await sleep(1700)
    if (channels) {
      const shown: string[] = []
      for (const c of chans.length ? chans : channels) {
        set({ cursor: `pg:ch-${c === 'Google' && id === 'h8' ? 'Google Search' : c}`, reason: `Adding ${c}` })
        await sleep(1100)
        shown.push(c)
        setFx(id, { channels: [...state.fx[id]?.channels ?? [], c].filter((v, i, a) => a.indexOf(v) === i) })
        await sleep(500)
      }
    }
    set({ cursor: 'pg:approve', reason: 'Approving it', activity: after })
    await sleep(1500)
    approveCard(id)
    set({ cursor: null, reason: null })
    await sleep(1500)
    set({ openCard: null })
    await sleep(700)
  }

  void notify('On it. I will pick the best from each channel and edit as I go.', 900)
  await work(['Reading your drafts', 'Choosing the strongest from each channel'], 800)

  // SOCIAL
  await goTab('social', 'Starting with Social', 'Social first: this is where most of your reach comes from.')
  await pick('h1', 'Picking the evening reel', 'Best pick: it opens on the product, which held viewers twice as long.')
  await edit('h2', 'Second pick: strong image, but the caption can be tighter.', 'Make it shorter and mention the Discovery Set',
    { text: 'Seven scents. One journey. The Discovery Set.', channels: ['Instagram', 'TikTok', 'Facebook'] }, 'Posting to Instagram, TikTok and Facebook')
  void notify('Cross-posting that one to Instagram, TikTok and Facebook.')
  set({ reason: 'Leaving the other drafts for later. Two a day is enough.' })
  await sleep(1800)

  // BLOGS
  await goTab('blogs', 'Now the blogs', 'Blogs next: they build search ranking over time.')
  await edit('h4', 'This blog targets a phrase people search, but the headline is flat.', 'Make the headline more specific',
    { title: 'Seven vials, seven moods: how to wear a discovery set', note: 'Rewritten by Olivy' }, 'Approving the blog')
  await pick('h15', 'Picking the gift guide', 'The gift guide already ranks #14. One push could reach the top five.')

  // NEWSLETTER
  await goTab('newsletter', 'Newsletters next', 'Email converts best, so I check the subject lines.')
  await edit('h10', 'Warm subject lines get clicked more than quiet ones.', 'Make the subject warmer',
    { title: 'Tonight, one scent, just for you', note: 'Rewritten by Olivy' }, 'Scheduling the email')
  await pick('h16', 'Picking the holiday edit', 'Past buyers open gift emails most. This one goes to them.')

  // CREATORS
  await goTab('influencer', 'Checking the creator videos', 'Creator videos feel real, so they earn trust fastest.')
  await look('u1', 'Opening the unboxing video', 'Let me watch this one properly.', 1500)
  set({ openCard: 'u1', cursor: null })
  await sleep(1200)
  set({ listening: 'u1', activity: 'Watching with sound', reason: null })
  await sleep(3500)
  void notify('Listening to it now. Her voice is clear and the line lands in the first two seconds.')
  await sleep(4200)
  set({ cursor: 'pg:approve', reason: 'Sounds natural, not scripted. Approving it.', activity: 'Approving the unboxing' })
  await sleep(1800)
  approveCard('u1')
  set({ listening: null, cursor: null, reason: null })
  await sleep(1200)
  set({ openCard: null })
  await sleep(700)
  await pick('u3', 'Picking the gift reaction', 'Gifting is your best season, and this one fits it.')

  // ADS
  await goTab('ads', 'Last, the ads', 'Ads last: I only spend where content already works.')
  await edit('h8', 'This ad has the cleanest image. I will widen where it runs.', 'Run it on Instagram, Facebook and Google',
    { channels: ['Instagram', 'Facebook', 'Google'], budget: '$40/day' }, 'Launching the ad')
  void notify('Your ad is live on Instagram, Facebook and Google at $40 a day.')
  await pick('h17', 'Picking the holiday ad', 'Holiday gifting starts Nov 24, so it should be ready now.')

  set({ cursor: null, reason: null })
  await work(['Choosing the best times', 'Filling your calendar'], 1100)
  const total = state.queue.length
  set({
    log: [{ id: `l${Date.now()}`, when: 'Just now', body: `I picked ${total} of the strongest drafts across five channels, edited four, cross-posted to three channels, launched an ad, and filled your calendar.` }, ...state.log],
  })
  set({ activity: null, hubTab: 'all' })
  void notify(`All done. ${total} items are scheduled across the week.`, 1200)
  busy = false
  window.location.hash = 'calendar'
}

export async function planCampaign() {
  if (busy) return
  if (state.extraCards.length) {
    say('The holiday gifting campaign is already in your Hub.')
    return
  }
  busy = true
  await work(['Looking at last December’s gifting sales', 'Planning the holiday campaign', 'Drafting reels, posts, an email series and ads'], 900)
  for (const c of CAMPAIGN_CARDS) {
    set({ extraCards: [...state.extraCards, c] })
    await sleep(500)
  }
  set({
    log: [{ id: `l${Date.now()}`, when: 'Just now', body: 'I planned a holiday gifting campaign: 2 social posts, a 12-day email series and an ad.' }, ...state.log],
  })
  say('Your holiday gifting campaign is in the Hub: a reel, a post, a 12-day email series, and an ad. Say the word and I will queue it.')
  busy = false
}

export async function respondToCompetitor(kind: 'blog' | 'ad') {
  if (busy) return
  const card = COMPETITOR_CARDS[kind]
  if (state.extraCards.some((c) => c.id === card.id)) return
  busy = true
  await work(kind === 'blog' ? ['Comparing the two sets', 'Writing the comparison'] : ['Reading the rival’s ad', 'Drafting a counter'], 1000)
  set({ extraCards: [card, ...state.extraCards] })
  set({
    log: [{ id: `l${Date.now()}`, when: 'Just now', body: kind === 'blog' ? 'I wrote a comparison blog against the rival sampler set. It is in your Hub.' : 'I drafted a counter ad that leads with your two extra scents. It is in your Hub.' }, ...state.log],
  })
  set({ activity: null })
  busy = false
}

export async function sendChat(text: string) {
  set({ chat: [...state.chat, { from: 'me', text }] })
  if (busy) return
  if (/campaign|holiday|black friday|gifting|christmas/i.test(text)) {
    await planCampaign()
    return
  }
  if (/decide|handle|everything|post it|autopilot|you do|take over|run it|go ahead|queue it|do it/i.test(text)) {
    await work(['Thinking'], 600)
    await runAutopilot()
    return
  }
  busy = true
  await work(['Thinking', 'Reading your drafts', 'Rewriting'], 600)
  const reply = /reel|product/i.test(text)
    ? 'Done. All reels now open on the Discovery Set, then cut to the room. Check them in Hub.'
    : /short|caption|tone|warm/i.test(text)
      ? 'Done. I made the copy shorter and warmer across your drafts.'
      : 'Got it. I will apply that to everything I draft from now on.'
  say(reply)
  busy = false
}

export function setAutopilot(on: boolean) {
  if (on) runAutopilot()
  else set({ autopilot: false })
}
