import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, MapPin, Users, ChevronRight, Lock } from 'lucide-react'
import type { Cause } from '../data'

interface CauseDetailScreenProps {
  cause: Cause
  onBack: () => void
  onDonate: (cause: Cause) => void
  onTimeline: (cause: Cause) => void
}

export function CauseDetailScreen({ cause, onBack, onDonate, onTimeline }: CauseDetailScreenProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const progress = cause.raised / cause.goal

  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: '#070712', fontFamily: 'Inter, sans-serif',
      paddingBottom: 100,
    }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img
          src={cause.heroImage}
          alt={cause.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'opacity 0.6s ease',
            opacity: imgLoaded ? 1 : 0,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #070712 0%, rgba(7,7,18,0.4) 40%, transparent 70%)',
        }} />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          style={{
            position: 'absolute', top: 48, left: 20,
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(7,7,18,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#f8f8ff" />
        </motion.button>

        {/* Tag */}
        <div style={{
          position: 'absolute', top: 48, right: 20,
          padding: '6px 12px', borderRadius: 99,
          background: cause.tagColor + '22',
          border: `1px solid ${cause.tagColor}55`,
          fontSize: 12, fontWeight: 600, color: cause.tagColor,
          backdropFilter: 'blur(12px)',
        }}>
          {cause.tag}
        </div>

        {/* Chapter badge */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          padding: '8px 14px', borderRadius: 12,
          background: 'rgba(7,7,18,0.7)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: 12, color: 'rgba(248,248,255,0.7)', textAlign: 'center',
        }}>
          <span style={{ fontSize: 18, display: 'block', marginBottom: 2 }}>📖</span>
          Ch {cause.chapter}/{cause.totalChapters}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 24px' }}>
        {/* Title & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 700, color: '#f8f8ff',
            letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 10,
          }}>
            {cause.name}
          </h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={12} color="rgba(248,248,255,0.35)" />
              <span style={{ fontSize: 12, color: 'rgba(248,248,255,0.35)' }}>{cause.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={12} color="rgba(248,248,255,0.35)" />
              <span style={{ fontSize: 12, color: 'rgba(248,248,255,0.35)' }}>{cause.backers.toLocaleString()} following</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(248,248,255,0.55)', lineHeight: 1.7 }}>
            {cause.description}
          </p>
        </motion.div>

        {/* Latest Update */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            padding: '14px', borderRadius: 16,
            background: 'rgba(0,232,124,0.06)',
            border: '1px solid rgba(0,232,124,0.15)',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>📝</span>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(0,232,124,0.7)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Latest Update · {cause.lastUpdate}</p>
              <p style={{ fontSize: 13, color: 'rgba(248,248,255,0.65)', lineHeight: 1.6 }}>{cause.lastUpdateText}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#f8f8ff' }}>
              ₹{cause.raised.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(248,248,255,0.35)' }}>
              of ₹{cause.goal.toLocaleString('en-IN')} goal
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 8 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${cause.tagColor}, ${cause.tagColor}aa)`, borderRadius: 99 }}
            />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.3)' }}>{Math.round(progress * 100)}% funded · {cause.backers.toLocaleString()} supporters</p>
        </motion.div>

        {/* Impact Tiers */}
        <SectionTitle title="Choose Your Impact" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {cause.impact.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              style={{
                padding: '14px 16px', borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: cause.tagColor, marginBottom: 3 }}>{tier.amount}</p>
                <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.5)' }}>{tier.result}</p>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: 99,
                background: cause.tagColor + '15',
                border: `1px solid ${cause.tagColor}30`,
              }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: cause.tagColor }}>{tier.chapter}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Preview */}
        <SectionTitle title="Story Timeline" />
        <div style={{ marginBottom: 28 }}>
          {cause.milestones.slice(0, 4).map((ms, i) => (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              style={{ display: 'flex', gap: 14, marginBottom: 0, position: 'relative' }}
            >
              {/* Line */}
              {i < 3 && (
                <div style={{
                  position: 'absolute', left: 18, top: 36, width: 2, height: 40,
                  background: ms.unlocked ? `${cause.tagColor}30` : 'rgba(255,255,255,0.06)',
                }} />
              )}
              <div style={{
                flexShrink: 0, width: 36, height: 36, borderRadius: 12,
                background: ms.unlocked ? cause.tagColor + '18' : 'rgba(255,255,255,0.04)',
                border: ms.unlocked ? `1px solid ${cause.tagColor}40` : '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: ms.unlocked ? 16 : 14,
              }}>
                {ms.unlocked ? ms.mood : <Lock size={12} color="rgba(248,248,255,0.2)" />}
              </div>
              <div style={{ paddingBottom: 28 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: ms.unlocked ? '#f8f8ff' : 'rgba(248,248,255,0.25)', marginBottom: 2 }}>{ms.title}</p>
                <p style={{ fontSize: 11, color: ms.unlocked ? 'rgba(248,248,255,0.4)' : 'rgba(248,248,255,0.15)' }}>{ms.date}</p>
              </div>
            </motion.div>
          ))}
          <button
            onClick={() => onTimeline(cause)}
            style={{
              width: '100%', padding: '14px', borderRadius: 14,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(248,248,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            View Full Timeline <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        padding: '16px 24px',
        background: 'rgba(7,7,18,0.9)', backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        zIndex: 50,
      }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onDonate(cause)}
          style={{
            width: '100%', padding: '18px', borderRadius: 16,
            background: `linear-gradient(135deg, ${cause.tagColor} 0%, ${cause.tagColor}cc 100%)`,
            color: '#040d08', fontSize: 16, fontWeight: 700,
            fontFamily: 'Inter, sans-serif', border: 'none', cursor: 'pointer',
            boxShadow: `0 8px 32px ${cause.tagColor}40`,
            letterSpacing: '0.01em',
          }}
        >
          Support {cause.person.split(' ')[0]}'s Journey
        </motion.button>
      </div>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f8f8ff', marginBottom: 14, letterSpacing: '-0.01em' }}>
      {title}
    </h3>
  )
}
