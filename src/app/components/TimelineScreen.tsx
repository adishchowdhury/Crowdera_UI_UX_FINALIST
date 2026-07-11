import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { ArrowLeft, Lock } from 'lucide-react'
import type { Cause, Milestone } from '../data'

interface TimelineScreenProps {
  cause: Cause
  onBack: () => void
  onDonate: (cause: Cause) => void
}

export function TimelineScreen({ cause, onBack, onDonate }: TimelineScreenProps) {
  const { scrollY } = useScroll()

  return (
    <div className="w-full min-h-screen bg-[#FAFAF7] text-[#1D1D1F]">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFAF7] to-transparent z-50 flex items-center px-6 md:px-12">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-white transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="pt-32 pb-48 max-w-5xl mx-auto px-6 md:px-12">
        
        <div className="mb-24 text-center">
          <p className="text-sm font-semibold tracking-widest text-[#1D1D1F]/40 uppercase mb-4">
            Memories
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-[#1D1D1F] font-medium tracking-tight">
            {cause.person.split(' ')[0]}'s Journey
          </h2>
        </div>

        <div className="space-y-32 md:space-y-48">
          {cause.milestones.map((ms, index) => (
            <MemoryNode
              key={ms.id}
              milestone={ms}
              index={index}
            />
          ))}
        </div>

        {/* Unlock CTA */}
        {cause.milestones.some(m => !m.unlocked) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/5 mb-8">
              <Lock size={28} className="text-[#1D1D1F]/30" />
            </div>
            <h3 className="text-3xl font-serif text-[#1D1D1F] mb-4">
              More chapters waiting
            </h3>
            <p className="text-[#1D1D1F]/50 max-w-md mx-auto mb-10">
              Support {cause.person.split(' ')[0]}'s journey to reveal what happens next in the story.
            </p>
            <button
              onClick={() => onDonate(cause)}
              className="px-10 py-4 bg-[#2C5530] text-white rounded-full shadow-[0_12px_30px_rgba(44,85,48,0.25)] hover:shadow-[0_20px_40px_rgba(44,85,48,0.35)] hover:bg-[#234526] transition-all transform hover:-translate-y-1 font-medium text-lg tracking-wide"
            >
              Continue the Story
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MemoryNode({ milestone, index }: { milestone: Milestone, index: number }) {
  const isEven = index % 2 === 0;

  if (!milestone.unlocked) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center py-12"
      >
        <div className="w-2 h-2 rounded-full bg-[#1D1D1F]/10" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden bg-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {milestone.image ? (
            <img 
              src={milestone.image} 
              alt={milestone.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {milestone.mood}
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-0 text-center md:text-left">
        <div className="text-sm font-medium text-[#1D1D1F]/40 tracking-wider uppercase mb-4">
          {milestone.date}
        </div>
        <h3 className="text-3xl md:text-5xl font-serif text-[#1D1D1F] leading-tight mb-6">
          {milestone.title}
        </h3>
        <p className="text-xl md:text-2xl text-[#1D1D1F]/60 font-light leading-relaxed">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  )
}
