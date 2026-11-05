import { Globe, Megaphone, PenLine, Search } from 'lucide-react'
import { Instagram } from '../components/BrandGlyphs'
import type { AgentIcon } from './agents'

export type Tone = 'weak' | 'missing' | 'off' | 'good' | 'later'

export const TONES: Record<Tone, { dot: string; text: string; bg: string }> = {
  weak: { dot: '#F0A830', text: '#F0A830', bg: 'rgba(240,168,48,0.10)' },
  missing: { dot: '#EF4444', text: '#EF4444', bg: 'rgba(239,68,68,0.10)' },
  off: { dot: '#71718A', text: '#9B9BAF', bg: 'rgba(120,120,145,0.08)' },
  good: { dot: '#00d4aa', text: '#00d4aa', bg: 'rgba(0,212,170,0.10)' },
  later: { dot: '#818CF8', text: '#818CF8', bg: 'rgba(129,140,248,0.10)' },
}

export type ChannelState = { detail: string; chip: string; tone: Tone }

export type Channel = {
  id: string
  name: string
  icon: AgentIcon
  accent: string
  before: ChannelState
  after: ChannelState
}

export const CHANNELS: Channel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    accent: '#38BDF8',
    before: {
      detail: '47 posts, 89 views each, one post every 12 days',
      chip: 'Weak',
      tone: 'weak',
    },
    after: {
      detail: 'Five posts a week, built from your best performers',
      chip: '5 a week',
      tone: 'good',
    },
  },
  {
    id: 'seo',
    name: 'Search',
    icon: Search,
    accent: '#818CF8',
    before: { detail: 'Not ranking for a single keyword', chip: 'None', tone: 'missing' },
    after: {
      detail: 'Twelve keywords targeted, nineteen pages rebuilt',
      chip: '12 keywords',
      tone: 'good',
    },
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: PenLine,
    accent: '#00D4AA',
    before: { detail: 'No blog on the site', chip: 'None', tone: 'missing' },
    after: {
      detail: 'Two posts a week, written against real searches',
      chip: '2 a week',
      tone: 'good',
    },
  },
  {
    id: 'geo',
    name: 'AI search',
    icon: Globe,
    accent: '#22D3EE',
    before: { detail: 'Invisible when people ask an assistant', chip: 'Invisible', tone: 'off' },
    after: {
      detail: 'Brand and product data published to eight engines',
      chip: 'Publishing',
      tone: 'good',
    },
  },
  {
    id: 'ads',
    name: 'Ads',
    icon: Megaphone,
    accent: '#52525B',
    before: { detail: 'No campaigns running', chip: 'Off', tone: 'off' },
    after: {
      detail: 'Held back until organic shows which creative works',
      chip: 'Month 2',
      tone: 'later',
    },
  },
]

export type PlanItem = {
  label: string
  note: string
  kind: 'social' | 'blog' | 'seo' | 'review'
}

export type PlanDay = { day: string; date: string; items: PlanItem[] }

export const KIND_STYLE: Record<PlanItem['kind'], { accent: string; icon: AgentIcon }> = {
  social: { accent: '#38BDF8', icon: Instagram },
  blog: { accent: '#00D4AA', icon: PenLine },
  seo: { accent: '#818CF8', icon: Search },
  review: { accent: '#22D3EE', icon: Globe },
}

export const WEEK: PlanDay[] = [
  {
    day: 'Mon',
    date: '29',
    items: [{ label: 'Reel', note: 'Morning glow routine', kind: 'social' }],
  },
  {
    day: 'Tue',
    date: '30',
    items: [{ label: 'Blog', note: 'Best natural moisturizers 2026', kind: 'blog' }],
  },
  {
    day: 'Wed',
    date: '1',
    items: [
      { label: 'Story', note: 'Behind the formula', kind: 'social' },
      { label: 'Reel', note: 'Three ingredients', kind: 'social' },
    ],
  },
  {
    day: 'Thu',
    date: '2',
    items: [{ label: 'Search', note: 'Moisturizer keyword cluster', kind: 'seo' }],
  },
  {
    day: 'Fri',
    date: '3',
    items: [{ label: 'Reel', note: 'Customer before and after', kind: 'social' }],
  },
  {
    day: 'Sat',
    date: '4',
    items: [{ label: 'Blog', note: 'Why cold pressed oils matter', kind: 'blog' }],
  },
  {
    day: 'Sun',
    date: '5',
    items: [{ label: 'Review', note: 'Olivy reads the numbers', kind: 'review' }],
  },
]
