import type { ReactNode } from 'react'
import { Icon } from './Icons'
import type { ChannelId } from '../lib/lumina'

type Props = {
  src: string
  alt: string
  /** CSS aspect-ratio, for example "4 / 5". */
  aspect?: string
  /** Small channel mark in the corner. */
  channel?: ChannelId
  radius?: number
  className?: string
  children?: ReactNode
}

/** A piece of content as it will look when it goes out. */
export default function Thumb({
  src,
  alt,
  aspect = '4 / 5',
  channel,
  radius = 10,
  className = '',
  children,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-fill ${className}`}
      style={{ aspectRatio: aspect, borderRadius: radius }}
    >
      <img src={src} alt={alt} loading="lazy" draggable={false} className="absolute inset-0 size-full object-cover" />
      {channel && (
        <span className="absolute left-1.5 top-1.5 grid size-[22px] place-items-center rounded-[7px] bg-white/90 text-[#1d1d1f] backdrop-blur-md">
          <Icon name={channel} className="size-[13px]" />
        </span>
      )}
      {children}
    </div>
  )
}
