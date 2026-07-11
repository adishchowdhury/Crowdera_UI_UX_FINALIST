import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Lock, ChevronDown } from 'lucide-react'
import type { Cause, Milestone } from '../data'

interface TimelineScreenProps {
  cause: Cause
  onBack: () => void
  onDonate: (cause: Cause) => void
}

export function TimelineScreen({ cause, onBack, onDonate }: TimelineScreenProps) {
  const [expanded, setExpanded] = useState<string | null>('m1')

  return (
    <div style={{
      width: '100%', height: '100%', background: '#070712',
      fontFamily: 'Inter, sans-serif', overflowY: 'auto',
      paddingBottom: 100,
    }}>
      {/* Header */}
      <div style={{ position: 'relative', padding: '48px 24px 24px' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200,
          background: `radial-gradient(ellipse 80% 60% at 30% 0%, ${cause.tagColor}0a 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} color="#f8f8ff" />
          </motion.button>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Impact Timeline
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 600, color: '#f8f8ff',
              letterSpacing: '-0.01em',
            }}>
              {cause.person}'s Journey
            </h2>
          </div>
        </div>

        {/* Chapter progress */}
        <div style={{
          padding: '14px 16px', borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.35)', marginBottom: 4 }}>Your chapters</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: cause.totalChapters }).map((_, i) => (
                <div key={i} style={{
                  width: 24, height: 4, borderRadius: 99,
                  background: i < cause.chapter ? cause.tagColor : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#f8f8ff' }}>{cause.chapter}</p>
            <p style={{ fontSize: 11, color: 'rgba(248,248,255,0.3)' }}>of {cause.totalChapters}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 24px' }}>
        {cause.milestones.map((ms, index) => (
          <TimelineNode
            key={ms.id}
            milestone={ms}
            index={index}
            isLast={index === cause.milestones.length - 1}
            isExpanded={expanded === ms.id}
            onExpand={() => setExpanded(expanded === ms.id ? null : ms.id)}
            accentColor={cause.tagColor}
          />
        ))}
      </div>

      {/* Unlock CTA */}
      {cause.milestones.some(m => !m.unlocked) && (
        <div style={{ padding: '0 24px 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '20px', borderRadius: 20,
              background: `linear-gradient(135deg, ${cause.tagColor}12, ${cause.tagColor}06)`,
              border: `1px solid ${cause.tagColor}20`,
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🔒</span>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#f8f8ff', marginBottom: 8 }}>
              {cause.totalChapters - cause.chapter} chapters to unlock
            </p>
            <p style={{ fontSize: 12, color: 'rgba(248,248,255,0.4)', lineHeight: 1.6, marginBottom: 16 }}>
              Support {cause.person.split(' ')[0]}'s journey to reveal what happens next in her story.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onDonate(cause)}
              style={{
                padding: '14px 28px', borderRadius: 14,
                background: `linear-gradient(135deg, ${cause.tagColor}, ${cause.tagColor}cc)`,
                color: '#040d08', fontSize: 14, fontWeight: 700,
                fontFamily: 'Inter, sans-serif', border: 'none', cursor: 'pointer',
                boxShadow: `0 6px 24px ${cause.tagColor}35`,
              }}
            >
              Unlock Next Chapter
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function TimelineNode({
  milestone, index, isLast, isExpanded, onExpand, accentColor
}: {
  milestone: Milestone
  index: number
  isLast: boolean
  isExpanded: boolean
  onExpand: () => void
  accentColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', gap: 16, position: 'relative' }}
    >
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute', left: 20, top: 44, width: 2,
          height: isExpanded ? 'calc(100% - 20px)' : 60,
          background: milestone.unlocked
            ? `linear-gradient(to bottom, ${accentColor}40, transparent)`
            : 'rgba(255,255,255,0.05)',
          transition: 'height 0.4s ease',
        }} />
      )}

      {/* Node icon */}
      <div style={{ flexShrink: 0, marginTop: 4 }}>
        <motion.div
          whileTap={milestone.unlocked ? { scale: 0.9 } : {}}
          style={{
            width: 40, height: 40, borderRadius: 14,
            background: milestone.unlocked
              ? `linear-gradient(135deg, ${accentColor}25, ${accentColor}10)`
              : 'rgba(255,255,255,0.04)',
            border: milestone.unlocked
              ? `1px solid ${accentColor}40`
              : '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            boxShadow: milestone.unlocked ? `0 0 16px ${accentColor}20` : 'none',
          }}
        >
          {milestone.unlocked ? milestone.mood : <Lock size={14} color="rgba(255,255,255,0.15)" />}
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 32 }}>
        <button
          onClick={milestone.unlocked ? onExpand : undefined}
          style={{
            width: '100%', textAlign: 'left', background: 'none', border: 'none',
            cursor: milestone.unlocked ? 'pointer' : 'default', padding: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{
                fontSize: 14, fontWeight: 600,
                color: milestone.unlocked ? '#f8f8ff' : 'rgba(248,248,255,0.2)',
                marginBottom: 3,
              }}>
                {milestone.unlocked ? milestone.title : '???'}
              </p>
              <p style={{
                fontSize: 11,
                color: milestone.unlocked ? 'rgba(248,248,255,0.35)' : 'rgba(248,248,255,0.1)',
              }}>
                {milestone.unlocked ? milestone.date : 'Not yet unlocked'}
              </p>
            </div>
            {milestone.unlocked && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} color="rgba(248,248,255,0.3)" />
              </motion.div>
            )}
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && milestone.unlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: 12 }}>
                {milestone.image && (
                  <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12, height: 160 }}>
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <p style={{
                  fontSize: 13, color: 'rgba(248,248,255,0.55)',
                  lineHeight: 1.7,
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                }}>
                  "{milestone.description}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
