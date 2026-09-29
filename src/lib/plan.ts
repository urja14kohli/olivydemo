import { Globe, Megaphone, PenLine, Search } from 'lucide-react'
import { Instagram } from '../components/BrandGlyphs'
import type { AgentIcon } from './agents'

export type Tone = 'weak' | 'missing' | 'off' | 'good' | 'later'

export const TONES: Record<Tone, { dot: string; text: string; bg: string }> = {
  weak: { dot: '#F0A830', text: '#A66A0B', bg: 'rgba(240,168,48,0.14)' },
  missing: { dot: '#E2574C', text: '#B93A30', bg: 'rgba(226,87,76,0.12)' },
  off: { dot: '#9B9BAF', text: '#71718A', bg: 'rgba(120,120,145,0.11)' },
  good: { dot: '#34C98A', text: '#1B8A5F', bg: 'rgba(52,201,138,0.14)' },
  later: { dot: '#8B7EC8', text: '#6B3FA0', bg: 'rgba(139,126,200,0.14)' },
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
    accent: '#8B5CF6',
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
    accent: '#3B82F6',
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
    accent: '#6B3FA0',
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
    accent: '#06B6D4',
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
    accent: '#7C8598',
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
  social: { accent: '#8B5CF6', icon: Instagram },
  blog: { accent: '#6B3FA0', icon: PenLine },
  seo: { accent: '#3B82F6', icon: Search },
  review: { accent: '#06B6D4', icon: Globe },
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
