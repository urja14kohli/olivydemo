import { motion } from 'framer-motion'

/**
 * The room the whole product sits in: a lavender-to-white wash with three
 * slow-drifting colour fields and a film grain so the gradient never bands.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(168deg, #E8E0F0 0%, #F1ECF8 38%, #F8F6FC 68%, #FFFFFF 100%)',
        }}
      />

      <Field
        className="-left-[18vw] -top-[22vh] h-[75vh] w-[75vh]"
        color="rgba(167,139,250,0.40)"
        duration={26}
        drift={[0, 46, -22, 0]}
        rise={[0, -30, 26, 0]}
      />
      <Field
        className="-right-[14vw] top-[6vh] h-[62vh] w-[62vh]"
        color="rgba(96,165,250,0.28)"
        duration={32}
        drift={[0, -38, 20, 0]}
        rise={[0, 34, -18, 0]}
      />
      <Field
        className="bottom-[-26vh] left-[24vw] h-[70vh] w-[70vh]"
        color="rgba(192,132,252,0.26)"
        duration={38}
        drift={[0, 30, -34, 0]}
        rise={[0, -22, 14, 0]}
      />

      {/* Grain keeps large soft gradients from looking flat or banded. */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}

type FieldProps = {
  className: string
  color: string
  duration: number
  drift: number[]
  rise: number[]
}

function Field({ className, color, duration, drift, rise }: FieldProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[90px] ${className}`}
      style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 68%)` }}
      animate={{ x: drift, y: rise, scale: [1, 1.08, 0.96, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
