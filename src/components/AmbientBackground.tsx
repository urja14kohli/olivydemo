import { motion } from 'framer-motion'

/**
 * The room everything sits in. Near black, with two slow cool glows and a
 * dot grid that only shows up near the light.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <motion.div
        className="absolute -left-[18vw] -top-[26vh] h-[82vh] w-[82vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,212,170,0.10) 0%, rgba(0,212,170,0.04) 34%, transparent 66%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 50, -24, 0], y: [0, -28, 22, 0], scale: [1, 1.1, 0.96, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[16vw] bottom-[-24vh] h-[76vh] w-[76vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.10) 0%, rgba(56,189,248,0.04) 36%, transparent 68%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, -40, 22, 0], y: [0, 26, -18, 0], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dot grid, masked to the centre so edges stay clean. */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 85%)',
        }}
      />

      {/* Vignette pulls focus to the middle of the screen. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
