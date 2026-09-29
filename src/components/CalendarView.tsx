import { motion } from 'framer-motion'
import { KIND_STYLE, WEEK } from '../lib/plan'

const EASE = [0.22, 1, 0.36, 1] as const

/** The week Olivy is proposing, one column per day. */
export default function CalendarView({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="grid w-full grid-cols-7 gap-2.5"
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {WEEK.map((day) => (
        <motion.div
          key={day.day}
          variants={{
            hidden: { opacity: 0, y: 22 },
            shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
          }}
          className="surface flex min-h-[118px] flex-col gap-2 rounded-[16px] p-2.5"
        >
          <div className="flex items-baseline justify-between px-0.5">
            <span className="text-[12px] font-bold tracking-[-0.01em] text-ink">{day.day}</span>
            <span className="numeric text-[11px] text-ink-faint">{day.date}</span>
          </div>

          {day.items.map((item) => {
            const style = KIND_STYLE[item.kind]
            const Icon = style.icon
            return (
              <div
                key={item.label + item.note}
                className="flex-1 rounded-[11px] px-2 py-2"
                style={{
                  background: `${style.accent}12`,
                  boxShadow: `inset 2px 0 0 ${style.accent}`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="size-[11px]" style={{ color: style.accent }} strokeWidth={2.4} />
                  <span
                    className="text-[11px] font-bold tracking-[-0.01em]"
                    style={{ color: style.accent }}
                  >
                    {item.label}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-[1.35] text-ink-soft">{item.note}</p>
              </div>
            )
          })}
        </motion.div>
      ))}
    </motion.div>
  )
}
