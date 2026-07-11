import { motion } from 'motion/react'
import { Settings, Share2, ChevronRight, Flame } from 'lucide-react'
import { USER, CAUSES } from '../data'
import type { Cause } from '../data'

interface ProfileScreenProps {
  onSelectCause: (cause: Cause) => void
}

export function ProfileScreen({ onSelectCause }: ProfileScreenProps) {
  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: '#070712', fontFamily: 'Inter, sans-serif',
      paddingBottom: 90,
    }}>
      {/* Header */}
      <div style={{ position: 'relative', padding: '56px 24px 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 250,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,232,124,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: 'linear-gradient(135deg, #00e87c, #00b85c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: '#040d08',
              boxShadow: '0 0 30px rgba(0,232,124,0.3)',
            }}>
              {USER.name[0]}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, fontWeight: 600, color: '#f8f8ff',
                letterSpacing: '-0.01em',
              }}>
                {USER.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <Flame size={14} color="#f5a623" />
                <span style={{ fontSize: 12, color: '#f5a623', fontWeight: 600 }}>{USER.streak}-day streak</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Share2, Settings].map((Icon, i) => (
              <motion.button key={i} whileTap={{ scale: 0.9 }} style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon size={16} color="rgba(248,248,255,0.5)" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { value: USER.livesTouched, label: 'Lives touched', icon: '💚' },
            { value: USER.journeysFollowing, label: 'Following', icon: '📖' },
            { value: `₹${(USER.totalDonated / 1000).toFixed(1)}K`, label: 'Given', icon: '✨' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                padding: '16px 12px', borderRadius: 16, textAlign: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ fontSize: 20, display: 'block', marginBottom: 6 }}>{stat.icon}</span>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#f8f8ff', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: 'rgba(248,248,255,0.35)', marginTop: 4 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Streak Grid */}
      <SectionTitle title="Activity" />
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{
          padding: '16px', borderRadius: 20,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: 35 }).map((_, i) => {
              const rand = (i * 7 + 13) % 17
              const active = rand > 5
              const high = active && rand > 11
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 4,
                  background: high ? '#00e87c' : active ? 'rgba(0,232,124,0.25)' : 'rgba(255,255,255,0.06)',
                }} />
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.3)', marginTop: 10 }}>
            {USER.streak} days active this year
          </p>
        </div>
      </div>

      {/* Badges */}
      <SectionTitle title="Achievements" />
      <div style={{ padding: '0 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {USER.badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '16px 12px', borderRadius: 16, textAlign: 'center',
                background: badge.unlocked ? 'rgba(0,232,124,0.06)' : 'rgba(255,255,255,0.03)',
                border: badge.unlocked ? '1px solid rgba(0,232,124,0.2)' : '1px solid rgba(255,255,255,0.06)',
                opacity: badge.unlocked ? 1 : 0.45,
              }}
            >
              <span style={{ fontSize: 28, display: 'block', marginBottom: 6, filter: badge.unlocked ? 'none' : 'grayscale(1)' }}>
                {badge.icon}
              </span>
              <p style={{ fontSize: 10, fontWeight: 600, color: badge.unlocked ? '#f8f8ff' : 'rgba(248,248,255,0.3)', lineHeight: 1.3 }}>
                {badge.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Following */}
      <SectionTitle title="Stories I'm Following" />
      <div style={{ padding: '0 24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CAUSES.map((cause, i) => (
          <motion.button
            key={cause.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCause(cause)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px',
              borderRadius: 16, background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <img src={cause.heroImage} alt={cause.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f8f8ff', marginBottom: 3 }}>{cause.person}</p>
              <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)' }}>Chapter {cause.chapter}/{cause.totalChapters} · {cause.lastUpdate}</p>
              <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', marginTop: 8, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99, background: cause.tagColor,
                  width: `${(cause.chapter / cause.totalChapters) * 100}%`,
                }} />
              </div>
            </div>
            <ChevronRight size={16} color="rgba(248,248,255,0.2)" />
          </motion.button>
        ))}
      </div>

      {/* Memory Book teaser */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{
          padding: '20px', borderRadius: 20, textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(255,95,126,0.08))',
          border: '1px solid rgba(245,166,35,0.18)',
        }}>
          <span style={{ fontSize: 32, display: 'block', marginBottom: 10 }}>📚</span>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#f8f8ff', marginBottom: 6 }}>Your Memory Book</p>
          <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.4)', lineHeight: 1.6, marginBottom: 14 }}>
            Every moment you've been part of, compiled into one beautiful story.
          </p>
          <div style={{
            padding: '10px 20px', borderRadius: 10, display: 'inline-block',
            background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)',
            fontSize: 12, fontWeight: 600, color: '#f5a623',
          }}>
            View 2025 Review →
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', padding: '0 24px 12px', letterSpacing: '-0.01em' }}>
      {title}
    </h3>
  )
}
