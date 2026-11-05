import type { ComponentType } from 'react'
import { Globe, Link2, Megaphone, PenLine, Search } from 'lucide-react'
import { Instagram } from '../components/BrandGlyphs'
import type { GlyphProps } from '../components/BrandGlyphs'

export type AgentIcon = ComponentType<GlyphProps>

export type AgentId = 'social' | 'seo' | 'blog' | 'geo' | 'backlinks' | 'ads'

export type AgentStatus = 'running' | 'queued' | 'inactive'

export type TimelineStep = {
  label: string
  /** How long the step stays in its running state, in milliseconds. */
  duration: number
  /** Optional trailing value, shown right-aligned once the step lands. */
  value?: string
  /** Draw a determinate progress bar while this step runs. */
  bar?: boolean
}

export type DetailItem = {
  title: string
  meta: string
  state: 'done' | 'running' | 'queued'
}

export type Agent = {
  id: AgentId
  name: string
  role: string
  icon: AgentIcon
  accent: string
  /** Position on the radial ring, degrees clockwise from 3 o'clock. */
  angle: number
  status: AgentStatus
  /** Seconds after mount that the card flies in. */
  entrance: number
  steps: TimelineStep[]
  /** Shown once the timeline finishes, or in place of it when inactive. */
  next: string
  detail: {
    summary: string
    stats: { label: string; value: string }[]
    items: DetailItem[]
  }
}

export const AGENTS: Agent[] = [
  {
    id: 'social',
    name: 'Social',
    role: 'Instagram',
    icon: Instagram,
    accent: '#38BDF8',
    angle: 180,
    status: 'running',
    entrance: 0.35,
    steps: [
      { label: 'Best posts analysed', duration: 2400, value: '12' },
      { label: 'Reel: Morning glow routine', duration: 3000 },
      { label: 'Scheduled Monday 9:00am', duration: 2400 },
      { label: 'Reel: Three ingredients', duration: 3200 },
      { label: 'Writing captions', duration: 3600, bar: true },
      { label: 'Storyboarding reel three', duration: 4000 },
    ],
    next: 'Wednesday story sequence',
    detail: {
      summary:
        'Three reels and two stories are lined up for this week, built from the formats your audience already responds to.',
      stats: [
        { label: 'Scheduled', value: '5' },
        { label: 'Avg. views now', value: '89' },
        { label: 'Projected', value: '640' },
      ],
      items: [
        { title: 'Reel: Morning glow routine', meta: 'Monday, 9:00am', state: 'done' },
        { title: 'Reel: Three ingredients, one serum', meta: 'Wednesday, 6:00pm', state: 'done' },
        { title: 'Story: Behind the formula', meta: 'Wednesday, 8:00pm', state: 'running' },
        { title: 'Reel: Customer before and after', meta: 'Friday, 9:00am', state: 'queued' },
        { title: 'Story: Weekend restock', meta: 'Saturday, 11:00am', state: 'queued' },
      ],
    },
  },
  {
    id: 'seo',
    name: 'SEO',
    role: 'Search',
    icon: Search,
    accent: '#818CF8',
    angle: 300,
    status: 'running',
    entrance: 0.95,
    steps: [
      { label: 'Crawled your site', duration: 2400, value: '34 pages' },
      { label: 'Keyword openings', duration: 2800, value: '12 found' },
      { label: 'Rewriting page titles', duration: 3800, bar: true },
      { label: 'Internal links fixed', duration: 3200, value: '19' },
      { label: 'Building keyword cluster', duration: 4200 },
    ],
    next: 'Submit sitemap to Search Console',
    detail: {
      summary:
        'Your pages were never set up to be found. Titles, structure and internal links are being rebuilt around twelve terms you can realistically win.',
      stats: [
        { label: 'Keywords', value: '12' },
        { label: 'Pages fixed', value: '19' },
        { label: 'Est. reach', value: '4.1K' },
      ],
      items: [
        { title: 'best natural moisturizers 2026', meta: 'Difficulty 14, 2.9K searches', state: 'done' },
        { title: 'natural face serum', meta: 'Difficulty 21, 1.8K searches', state: 'done' },
        { title: 'squalane vs hyaluronic acid', meta: 'Difficulty 9, 940 searches', state: 'running' },
        { title: 'clean skincare for sensitive skin', meta: 'Difficulty 26, 1.2K searches', state: 'queued' },
      ],
    },
  },
  {
    id: 'blog',
    name: 'Blog',
    role: 'Long form',
    icon: PenLine,
    accent: '#00D4AA',
    angle: 120,
    status: 'running',
    entrance: 1.55,
    steps: [
      { label: 'Outlined: Natural moisturizers', duration: 2600 },
      { label: 'Draft ready', duration: 3000, value: '1,240 words' },
      { label: 'Selecting images', duration: 3000, bar: true },
      { label: 'Drafting: Cold pressed oils', duration: 4000 },
    ],
    next: 'Publishes Tuesday at 7:00am',
    detail: {
      summary:
        'Two posts this week, both written against keywords the SEO agent already validated. Nothing publishes without your approval.',
      stats: [
        { label: 'Drafts', value: '2' },
        { label: 'Words', value: '2,380' },
        { label: 'Read time', value: '6 min' },
      ],
      items: [
        { title: 'Best natural moisturizers 2026', meta: 'Draft ready, 1,240 words', state: 'done' },
        { title: 'Why cold pressed oils matter', meta: 'Drafting, 1,140 words', state: 'running' },
        { title: 'How to layer a minimal routine', meta: 'Outlined for next week', state: 'queued' },
      ],
    },
  },
  {
    id: 'geo',
    name: 'GEO',
    role: 'AI search',
    icon: Globe,
    accent: '#22D3EE',
    angle: 240,
    status: 'queued',
    entrance: 2.15,
    steps: [
      { label: 'Checking AI search presence', duration: 2800, bar: true },
      { label: 'AI engine coverage', duration: 2600, value: '0 of 8' },
      { label: 'Publishing entity data', duration: 3800, bar: true },
      { label: 'Submitting to engines', duration: 4000 },
    ],
    next: 'Rechecks coverage in 7 days',
    detail: {
      summary:
        'When someone asks an assistant for a clean moisturizer, Lumina does not come up. This agent makes your brand readable to those systems.',
      stats: [
        { label: 'Engines', value: '0 / 8' },
        { label: 'Entities', value: '6' },
        { label: 'First check', value: '7 days' },
      ],
      items: [
        { title: 'Structured product data', meta: 'Published', state: 'done' },
        { title: 'Brand entity profile', meta: 'Publishing', state: 'running' },
        { title: 'Answer engine submissions', meta: 'Queued behind blog content', state: 'queued' },
      ],
    },
  },
  {
    id: 'backlinks',
    name: 'Backlinks',
    role: 'Authority',
    icon: Link2,
    accent: '#52525B',
    angle: 60,
    status: 'inactive',
    entrance: 2.7,
    steps: [],
    next: 'Starts once your first post is live',
    detail: {
      summary:
        'Outreach only works when there is something worth linking to. This agent wakes up the day your first post publishes.',
      stats: [
        { label: 'Targets', value: '38' },
        { label: 'Domain rating', value: '4' },
        { label: 'Starts', value: 'Tuesday' },
      ],
      items: [
        { title: 'Prospect list built', meta: '38 skincare and wellness sites', state: 'done' },
        { title: 'Outreach sequence', meta: 'Waiting on published content', state: 'queued' },
      ],
    },
  },
  {
    id: 'ads',
    name: 'Ads',
    role: 'Paid',
    icon: Megaphone,
    accent: '#52525B',
    angle: 0,
    status: 'inactive',
    entrance: 3.2,
    steps: [],
    next: 'Connect an ad account to activate',
    detail: {
      summary:
        'Worth turning on once organic gives us creative that already performs. Spending before then is guesswork.',
      stats: [
        { label: 'Suggested', value: 'Month 2' },
        { label: 'Budget', value: '$40 / day' },
        { label: 'Creative', value: 'From reels' },
      ],
      items: [
        { title: 'Recommended start', meta: 'After four weeks of organic data', state: 'queued' },
        { title: 'Creative source', meta: 'Top three performing reels', state: 'queued' },
      ],
    },
  },
]

export const ACTIVITY_EVENTS = [
  { time: '10:31', agent: 'Social', text: 'Pulled your 12 best performing posts' },
  { time: '10:32', agent: 'Social', text: 'Created Instagram reel for Monday, 9:00am' },
  { time: '10:33', agent: 'SEO', text: 'Found keyword opening: natural face serum' },
  { time: '10:33', agent: 'Blog', text: 'Started draft: Best natural moisturizers 2026' },
  { time: '10:34', agent: 'SEO', text: 'Rewrote page titles across 19 pages' },
  { time: '10:35', agent: 'GEO', text: 'Checked 8 AI engines, found 0 mentions of Lumina' },
  { time: '10:36', agent: 'Blog', text: 'Draft ready for review, 1,240 words' },
  { time: '10:37', agent: 'Social', text: 'Created reel: Three ingredients, one serum' },
  { time: '10:38', agent: 'GEO', text: 'Published structured product data' },
  { time: '10:39', agent: 'SEO', text: 'Built internal links into the moisturizer cluster' },
  { time: '10:40', agent: 'Social', text: 'Scheduled Wednesday story sequence' },
  { time: '10:41', agent: 'Blog', text: 'Started draft: Why cold pressed oils matter' },
  { time: '10:42', agent: 'Backlinks', text: 'Built prospect list of 38 sites, holding for content' },
  { time: '10:43', agent: 'Social', text: 'Writing captions for reel two' },
]

export const AGENT_ACCENTS: Record<string, string> = {
  Social: '#38BDF8',
  SEO: '#818CF8',
  Blog: '#00D4AA',
  GEO: '#22D3EE',
  Backlinks: '#71717A',
  Ads: '#71717A',
}
