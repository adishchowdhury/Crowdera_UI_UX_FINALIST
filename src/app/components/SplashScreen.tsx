import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { WavesBackground } from './WavesBackground'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1500)
    const t3 = setTimeout(() => onComplete(), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: '#070712' }}>
      <WavesBackground strokeColor="rgba(0, 232, 124, 0.18)" backgroundColor="#070712" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,232,124,0.06) 0%, transparent 70%)'
      }} />

      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 12vw, 88px)',
            fontWeight: 400,
            color: '#f8f8ff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            display: 'block',
          }}>
            echoes
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 3vw, 18px)',
            fontWeight: 300,
            color: 'rgba(248,248,255,0.5)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: 8,
          }}>
            of impact
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ marginTop: 32 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(248,248,255,0.35)',
            letterSpacing: '0.05em',
          }}>
            Every donation has a story.
          </p>
        </motion.div>

        {/* Pulsing dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: [0, 0.6, 0.6, 0] } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          style={{ marginTop: 48 }}
        >
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00e87c',
            boxShadow: '0 0 12px rgba(0,232,124,0.8)',
          }} />
        </motion.div>
      </div>
    </div>
  )
}
