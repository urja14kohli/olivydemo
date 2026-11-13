type Props = {
  label: string
  active?: boolean
  onClick?: () => void
}

export default function ChannelPill({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-8 items-center rounded-full border-0 px-3.5 text-[13px] font-medium transition ${
        active ? 'bg-accent text-on-accent' : 'bg-fill text-ink-3 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}
