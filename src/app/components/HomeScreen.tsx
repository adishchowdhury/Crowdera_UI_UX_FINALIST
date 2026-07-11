import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Bell, Sparkles, Lock, ChevronRight } from 'lucide-react'
import type { Cause } from '../data'
import { CAUSES, USER } from '../data'

interface HomeScreenProps {
  onSelectCause: (cause: Cause) => void
}

function formatCurrency(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress >= 1) clearInterval(interval)
    }, 16)
    return () => clearInterval(interval)
  }, [target, duration])
  return <span>{value}</span>
}

export function HomeScreen({ onSelectCause }: HomeScreenProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const followedCauses = CAUSES.slice(0, 2)
  const discoverCauses = CAUSES

  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: '#070712',
      fontFamily: 'Inter, sans-serif',
      paddingBottom: 80,
    }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 20px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          background: 'radial-gradient(ellipse 80% 80% at 50% -10%, rgba(0,232,124,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(248,248,255,0.35)', marginBottom: 4, letterSpacing: '0.02em' }}>
              {greeting} 👋
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 600, color: '#f8f8ff',
              letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              {USER.name}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative',
              }}
            >
              <Bell size={18} color="rgba(248,248,255,0.6)" />
              <div style={{
                position: 'absolute', top: 8, right: 8, width: 7, height: 7,
                borderRadius: '50%', background: '#00e87c',
                border: '2px solid #070712',
              }} />
            </motion.button>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #00e87c, #00b85c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: '#040d08',
            }}>
              {USER.name[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Impact Card */}
      <div style={{ padding: '0 24px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '20px 20px',
            background: 'linear-gradient(135deg, rgba(0,232,124,0.12) 0%, rgba(0,184,92,0.06) 100%)',
            borderRadius: 20,
            border: '1px solid rgba(0,232,124,0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(0,232,124,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                Your Impact
              </p>
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  <p style={{ fontSize: 26, fontWeight: 700, color: '#f8f8ff', lineHeight: 1 }}>
                    <AnimatedCounter target={USER.livesTouched} />
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.4)', marginTop: 3 }}>Lives touched</p>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <p style={{ fontSize: 26, fontWeight: 700, color: '#f8f8ff', lineHeight: 1 }}>
                    <AnimatedCounter target={USER.streak} />
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.4)', marginTop: 3 }}>Day streak 🔥</p>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <p style={{ fontSize: 26, fontWeight: 700, color: '#f8f8ff', lineHeight: 1 }}>
                    {formatCurrency(USER.totalDonated)}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.4)', marginTop: 3 }}>Given</p>
                </div>
              </div>
            </div>
            <Sparkles size={28} color="rgba(0,232,124,0.5)" />
          </div>
        </motion.div>
      </div>

      {/* Stories You're Following */}
      <SectionHeader title="Stories You're Following" subtitle="New chapters available" />
      <div style={{ overflowX: 'auto', paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: 'flex', gap: 16, paddingBottom: 4 }}>
          {followedCauses.map((cause, i) => (
            <FollowingCard key={cause.id} cause={cause} index={i} onClick={() => onSelectCause(cause)} />
          ))}
        </div>
      </div>

      {/* Chapter Unlocked Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ margin: '24px 24px 0', padding: '14px 16px', borderRadius: 16, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}
      >
        <div style={{ fontSize: 24 }}>🔓</div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#f5a623' }}>New Chapter Available</p>
          <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.4)', marginTop: 2 }}>Riya passed her semester exams! Chapter 5 is now unlocked.</p>
        </div>
      </motion.div>

      {/* Discover Causes */}
      <SectionHeader title="Discover Journeys" subtitle="Stories waiting to begin" />
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {discoverCauses.map((cause, i) => (
          <DiscoverCard key={cause.id} cause={cause} index={i} onClick={() => onSelectCause(cause)} />
        ))}
      </div>

      {/* Quote */}
      <div style={{ margin: '32px 24px', padding: '24px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', fontSize: 17,
          color: 'rgba(248,248,255,0.6)', lineHeight: 1.6, textAlign: 'center',
        }}>
          "The meaning of life is to find your gift.<br />The purpose of life is to give it away."
        </p>
        <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.25)', textAlign: 'center', marginTop: 12 }}>— Pablo Picasso</p>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ padding: '20px 24px 12px' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#f8f8ff', letterSpacing: '-0.01em' }}>{title}</h2>
      <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.35)', marginTop: 3 }}>{subtitle}</p>
    </div>
  )
}

function FollowingCard({ cause, index, onClick }: { cause: Cause; index: number; onClick: () => void }) {
  const progress = cause.raised / cause.goal

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        flexShrink: 0, width: 220, borderRadius: 20, overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      <div style={{ position: 'relative', height: 130, overflow: 'hidden' }}>
        <img
          src={cause.heroImage}
          alt={cause.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,18,0.85) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '4px 10px', borderRadius: 99,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: 10, color: '#f8f8ff', fontWeight: 500,
        }}>
          Ch {cause.chapter}/{cause.totalChapters}
        </div>
        <div style={{
          position: 'absolute', top: 10, right: 10, width: 8, height: 8,
          borderRadius: '50%', background: '#00e87c',
          boxShadow: '0 0 8px rgba(0,232,124,0.8)',
        }} />
      </div>
      <div style={{ padding: '12px 14px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#f8f8ff', marginBottom: 2 }}>{cause.person}</p>
        <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', marginBottom: 10 }}>{cause.lastUpdate}</p>
        <div style={{
          height: 3, borderRadius: 99,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: cause.tagColor, borderRadius: 99 }}
          />
        </div>
        <p style={{ fontSize: 10, color: 'rgba(248,248,255,0.25)', marginTop: 6 }}>
          {Math.round(progress * 100)}% funded
        </p>
      </div>
    </motion.button>
  )
}

function DiscoverCard({ cause, index, onClick }: { cause: Cause; index: number; onClick: () => void }) {
  const progress = cause.raised / cause.goal

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%', borderRadius: 20, overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={cause.heroImage}
          alt={cause.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,7,18,0.9) 0%, rgba(7,7,18,0.2) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 12, left: 14, right: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{
              padding: '3px 8px', borderRadius: 99,
              background: cause.tagColor + '22',
              border: `1px solid ${cause.tagColor}44`,
              fontSize: 10, fontWeight: 600, color: cause.tagColor,
            }}>
              {cause.tag}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(248,248,255,0.4)' }}>{cause.location}</span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', lineHeight: 1.3 }}>{cause.name}</p>
        </div>
      </div>
      <div style={{ padding: '12px 14px 16px' }}>
        <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.45)', lineHeight: 1.6, marginBottom: 12 }}>
          {cause.shortDesc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#f8f8ff' }}>
              ₹{cause.raised.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(248,248,255,0.3)' }}> / ₹{cause.goal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(248,248,255,0.4)' }}>
            {cause.backers.toLocaleString()} following <ChevronRight size={14} />
          </div>
        </div>
        <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(cause.raised / cause.goal) * 100}%` }}
            transition={{ delay: 0.4 + index * 0.1, duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: cause.tagColor, borderRadius: 99 }}
          />
        </div>
      </div>
    </motion.button>
  )
}
