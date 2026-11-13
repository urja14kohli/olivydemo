import { Check, X } from 'lucide-react'
import type { HubCard } from '../lib/demo'
import { motion } from 'framer-motion'

type Props = {
  item: HubCard
  onOpen: () => void
  onApprove?: () => void
  onReject?: () => void
}

export default function ContentCard({ item, onOpen, onApprove, onReject }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-card bg-surface shadow-lift transition hover:shadow-lift-hi"
    >
      <button type="button" onClick={onOpen} className="block w-full border-0 bg-transparent p-0 text-left">
        <div className="relative aspect-[4/5] overflow-hidden bg-fill">
          <img src={item.image} alt="" className="size-full object-cover" />
          <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-ink backdrop-blur-sm">
            {item.kind}
          </span>
        </div>
        <div className="p-3">
          <h3 className="m-0 text-[14px] font-semibold tracking-[-0.015em]">{item.title}</h3>
          <p className="mt-1 mb-0 line-clamp-2 text-[12.5px] leading-snug text-ink-3">{item.snippet}</p>
        </div>
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
        {onApprove && (
          <button
            type="button"
            aria-label="Approve"
            onClick={onApprove}
            className="grid size-10 place-items-center rounded-full border-0 bg-success text-white"
          >
            <Check className="size-5" />
          </button>
        )}
        {onReject && (
          <button
            type="button"
            aria-label="Reject"
            onClick={onReject}
            className="grid size-10 place-items-center rounded-full border-0 bg-white text-ink"
          >
            <X className="size-5" />
          </button>
        )}
      </div>
    </motion.article>
  )
}
