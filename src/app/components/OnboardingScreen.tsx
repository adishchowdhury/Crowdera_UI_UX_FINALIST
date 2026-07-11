import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

interface OnboardingScreenProps {
  onComplete: () => void
}

const CAUSES_LIST = [
  { id: 'education', label: 'Education', icon: '📚', desc: 'Children deserve to learn' },
  { id: 'health', label: 'Healthcare', icon: '💊', desc: 'Health is a human right' },
  { id: 'environment', label: 'Environment', icon: '🌿', desc: 'Restore the planet' },
  { id: 'women', label: 'Women', icon: '💜', desc: 'Empower communities' },
  { id: 'nutrition', label: 'Nutrition', icon: '🍎', desc: 'No child goes hungry' },
  { id: 'shelter', label: 'Shelter', icon: '🏡', desc: 'A home for everyone' },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const steps = [
    <StepWelcome key="welcome" onNext={() => setStep(1)} />,
    <StepCauses key="causes" selected={selected} toggle={toggle} onNext={() => setStep(2)} />,
    <StepReady key="ready" onComplete={onComplete} count={selected.length} />,
  ]

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#070712' }}>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full h-full"
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>

      {/* Step dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === step ? 24 : 6,
            height: 6,
            borderRadius: 99,
            background: i === step ? '#00e87c' : 'rgba(255,255,255,0.15)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col justify-between h-full px-8 py-16">
      <div />
      <div className="flex flex-col gap-6">
        <div style={{
          width: 72, height: 72, borderRadius: 24,
          background: 'linear-gradient(135deg, #00e87c 0%, #00b85c 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
          boxShadow: '0 0 40px rgba(0,232,124,0.3)',
        }}>
          ✨
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontWeight: 600,
            color: '#f8f8ff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            Follow stories<br />
            <span style={{ fontStyle: 'italic', color: '#00e87c' }}>that matter</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(248,248,255,0.5)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Instead of numbers and reports, you follow real journeys — milestones, moments, and lives unfolding in real time.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📖', text: 'Stories unlock chapter by chapter' },
            { icon: '🔔', text: 'Get notified when something happens' },
            { icon: '💚', text: 'Feel the impact you create' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: 'rgba(248,248,255,0.6)', fontFamily: 'Inter, sans-serif' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} style={{
        width: '100%', padding: '18px 0', borderRadius: 16,
        background: 'linear-gradient(135deg, #00e87c 0%, #00c96a 100%)',
        color: '#040d08', fontSize: 16, fontWeight: 600,
        fontFamily: 'Inter, sans-serif', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 8px 32px rgba(0,232,124,0.3)',
        marginBottom: 32,
      }}>
        Get Started <ArrowRight size={18} />
      </button>
    </div>
  )
}

function StepCauses({ selected, toggle, onNext }: { selected: string[]; toggle: (id: string) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col h-full px-6 py-14">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          What moves you?
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(248,248,255,0.4)', marginTop: 8, fontFamily: 'Inter, sans-serif' }}>
          Choose the stories you want to follow
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1, overflow: 'auto' }}>
        {CAUSES_LIST.map(cause => {
          const active = selected.includes(cause.id)
          return (
            <motion.button
              key={cause.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(cause.id)}
              style={{
                padding: '20px 16px', borderRadius: 20, textAlign: 'left', cursor: 'pointer',
                background: active ? 'rgba(0,232,124,0.1)' : 'rgba(255,255,255,0.04)',
                border: active ? '1px solid rgba(0,232,124,0.4)' : '1px solid rgba(255,255,255,0.08)',
                position: 'relative', transition: 'all 0.25s ease',
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute', top: 10, right: 10, width: 20, height: 20,
                  borderRadius: '50%', background: '#00e87c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={12} color="#040d08" strokeWidth={3} />
                </div>
              )}
              <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{cause.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: active ? '#00e87c' : '#f8f8ff', fontFamily: 'Inter, sans-serif', display: 'block' }}>{cause.label}</span>
              <span style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', fontFamily: 'Inter, sans-serif', marginTop: 2, display: 'block' }}>{cause.desc}</span>
            </motion.button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        disabled={selected.length === 0}
        style={{
          width: '100%', padding: '18px 0', borderRadius: 16, marginTop: 16,
          background: selected.length > 0 ? 'linear-gradient(135deg, #00e87c 0%, #00c96a 100%)' : 'rgba(255,255,255,0.08)',
          color: selected.length > 0 ? '#040d08' : 'rgba(255,255,255,0.3)',
          fontSize: 16, fontWeight: 600, fontFamily: 'Inter, sans-serif',
          border: 'none', cursor: selected.length > 0 ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          marginBottom: 32,
        }}
      >
        {selected.length > 0 ? `Continue with ${selected.length} cause${selected.length > 1 ? 's' : ''}` : 'Select at least one'}
      </button>
    </div>
  )
}

function StepReady({ onComplete, count }: { onComplete: () => void; count: number }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 gap-8 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 96, height: 96, borderRadius: 32,
          background: 'linear-gradient(135deg, #00e87c 0%, #00b85c 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44,
          boxShadow: '0 0 60px rgba(0,232,124,0.4)',
        }}
      >
        🌟
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32, fontWeight: 600, color: '#f8f8ff',
          letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Your journey<br />begins now
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(248,248,255,0.45)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          We've found {count > 0 ? `${count === 1 ? 'a story' : 'stories'}` : 'stories'} that need you. Every chapter you unlock brings someone's dream closer to reality.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onComplete}
        style={{
          padding: '18px 48px', borderRadius: 16,
          background: 'linear-gradient(135deg, #00e87c 0%, #00c96a 100%)',
          color: '#040d08', fontSize: 16, fontWeight: 700,
          fontFamily: 'Inter, sans-serif', border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,232,124,0.3)',
        }}
      >
        Enter Echoes
      </motion.button>
    </div>
  )
}
