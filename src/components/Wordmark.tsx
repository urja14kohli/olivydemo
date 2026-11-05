import OlivyOrb from './OlivyOrb'

export default function Wordmark() {
  return (
    <a
      href="#welcome"
      className="display inline-flex items-center gap-2.5 text-[17px] no-underline"
      style={{ lineHeight: 1.2 }}
    >
      <OlivyOrb size={26} />
      Olivy
    </a>
  )
}
