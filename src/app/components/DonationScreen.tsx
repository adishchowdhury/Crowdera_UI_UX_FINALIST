import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import type { Cause } from '../data'

interface DonationScreenProps {
  cause: Cause
  onBack: () => void
  onSuccess: () => void
}

const AMOUNTS = [200, 500, 1000, 2500]

function Particle({ x, y, color }: { x: number; y: number; color: string }) {
  const angle = Math.random() * Math.PI * 2
  const speed = 40 + Math.random() * 120
  const tx = Math.cos(angle) * speed
  const ty = Math.sin(angle) * speed - 60

  return (
    <motion.div
      initial={{ x, y, opacity: 1, scale: 1 }}
      animate={{ x: x + tx, y: y + ty, opacity: 0, scale: 0 }}
      transition={{ duration: 0.8 + Math.random() * 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: color, pointerEvents: 'none', zIndex: 9999,
      }}
    />
  )
}

export function DonationScreen({ cause, onBack, onSuccess }: DonationScreenProps) {
  const [selected, setSelected] = useState(500)
  const [custom, setCustom] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  const amount = isCustom ? (parseInt(custom) || 0) : selected
  const tier = cause.impact.find(t => parseInt(t.amount.replace(/[^0-9]/g, '')) === amount) || cause.impact[1]

  const handlePay = () => {
    if (paying || paid) return
    setPaying(true)

    setTimeout(() => {
      setPaid(true)
      setPaying(false)

      // Burst particles
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const colors = [cause.tagColor, '#f5a623', '#ff5f7e', '#4fb3ff', '#ffffff']
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: cx,
          y: cy,
          color: colors[i % colors.length],
        }))
        setParticles(newParticles)
        setTimeout(() => setParticles([]), 1600)
      }

      setTimeout(() => onSuccess(), 2800)
    }, 1800)
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: '#070712',
      fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Particles */}
      {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} color={p.color} />)}

      {/* Header */}
      <div style={{ padding: '48px 24px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <ArrowLeft size={18} color="#f8f8ff" />
        </motion.button>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Supporting</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff' }}>{cause.person}</p>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px' }}>
        {/* Hero thumbnail */}
        <div style={{ borderRadius: 20, overflow: 'hidden', height: 140, marginBottom: 28 }}>
          <img src={cause.heroImage} alt={cause.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Amount selection */}
        <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(248,248,255,0.5)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Choose Amount
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {AMOUNTS.map(amt => {
            const active = !isCustom && selected === amt
            return (
              <motion.button
                key={amt}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setSelected(amt); setIsCustom(false) }}
                style={{
                  padding: '16px', borderRadius: 14, cursor: 'pointer',
                  background: active ? cause.tagColor + '18' : 'rgba(255,255,255,0.04)',
                  border: active ? `1px solid ${cause.tagColor}55` : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s ease',
                }}
              >
                <p style={{ fontSize: 18, fontWeight: 700, color: active ? cause.tagColor : '#f8f8ff' }}>₹{amt.toLocaleString()}</p>
                <p style={{ fontSize: 11, color: active ? cause.tagColor + 'aa' : 'rgba(248,248,255,0.3)', marginTop: 4 }}>
                  {cause.impact[AMOUNTS.indexOf(amt)]?.result || ''}
                </p>
              </motion.button>
            )
          })}
        </div>
        <input
          placeholder="Custom amount (₹)"
          value={custom}
          onChange={e => { setCustom(e.target.value); setIsCustom(true) }}
          onFocus={() => setIsCustom(true)}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            background: isCustom ? cause.tagColor + '12' : 'rgba(255,255,255,0.04)',
            border: isCustom ? `1px solid ${cause.tagColor}44` : '1px solid rgba(255,255,255,0.08)',
            color: '#f8f8ff', fontSize: 15, fontFamily: 'Inter, sans-serif',
            outline: 'none', boxSizing: 'border-box', marginBottom: 24,
            transition: 'all 0.2s ease',
          }}
        />

        {/* Impact preview */}
        {amount > 0 && (
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '16px', borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 24,
            }}
          >
            <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Impact</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: cause.tagColor }}>₹{amount.toLocaleString()}</span>
              <span style={{ fontSize: 16, color: 'rgba(248,248,255,0.3)' }}>→</span>
              <span style={{ fontSize: 13, color: 'rgba(248,248,255,0.6)' }}>{tier?.result || 'Makes a difference'}</span>
            </div>
            {tier && (
              <p style={{ fontSize: 11, color: cause.tagColor + 'aa', marginTop: 8 }}>🔓 {tier.chapter}</p>
            )}
          </motion.div>
        )}
      </div>

      {/* Pay button */}
      <div style={{ padding: '16px 24px 32px' }}>
        <AnimatePresence mode="wait">
          {paid ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: '100%', padding: '20px', borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0,232,124,0.2), rgba(0,184,92,0.1))',
                border: '1px solid rgba(0,232,124,0.3)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(0,232,124,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={24} color="#00e87c" strokeWidth={3} />
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#00e87c' }}>You're in!</p>
              <p style={{ fontSize: 13, color: 'rgba(248,248,255,0.5)', textAlign: 'center' }}>
                You're now following {cause.person.split(' ')[0]}'s story. New chapters await.
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="pay"
              ref={btnRef}
              whileTap={!paying ? { scale: 0.97 } : {}}
              onClick={handlePay}
              disabled={paying || amount <= 0}
              style={{
                width: '100%', padding: '20px', borderRadius: 16,
                background: paying
                  ? 'rgba(0,232,124,0.15)'
                  : `linear-gradient(135deg, ${cause.tagColor} 0%, ${cause.tagColor}cc 100%)`,
                color: paying ? cause.tagColor : '#040d08',
                fontSize: 16, fontWeight: 700, fontFamily: 'Inter, sans-serif',
                border: paying ? `1px solid ${cause.tagColor}44` : 'none',
                cursor: paying || amount <= 0 ? 'default' : 'pointer',
                boxShadow: paying ? 'none' : `0 8px 32px ${cause.tagColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.3s ease',
              }}
            >
              {paying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 18, height: 18, border: `2px solid ${cause.tagColor}`, borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {amount > 0 ? `Give ₹${amount.toLocaleString()} · Follow Story` : 'Choose an amount'}
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
        <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.2)', textAlign: 'center', marginTop: 12 }}>
          Secure payment · 100% goes to {cause.person.split(' ')[0]}
        </p>
      </div>
    </div>
  )
}
