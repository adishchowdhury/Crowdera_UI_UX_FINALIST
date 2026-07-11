import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Settings, Share2, ChevronRight, Flame, LogOut, LogIn } from 'lucide-react'
import { USER, CAUSES } from '../data'
import type { Cause } from '../data'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth, signInWithGoogle, logOut } from '../../lib/firebase'

interface ProfileScreenProps {
  onSelectCause: (cause: Cause) => void
}

export function ProfileScreen({ onSelectCause }: ProfileScreenProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#FAFAF7] pb-32">
      {/* Header */}
      <div className="pt-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[28px] bg-gradient-to-br from-[#2C5530] to-[#142A17] flex items-center justify-center text-4xl md:text-5xl font-serif text-white shadow-[0_16px_40px_rgba(44,85,48,0.2)] border-2 border-white overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
            ) : (
              user?.displayName?.[0] || USER.name[0]
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1D1D1F] font-medium tracking-tight mb-2">
              {getGreeting()}, {(user?.displayName || USER.name).split(' ')[0]}
            </h1>
            <p className="text-[#1D1D1F]/50 text-base md:text-lg tracking-wide">
              {USER.streak}-day streak of impact
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-neutral-50 transition-colors shadow-sm border border-black/5">
            <Share2 size={20} />
          </button>
          {user ? (
            <button onClick={logOut} title="Log Out" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-neutral-50 transition-colors shadow-sm border border-black/5">
              <LogOut size={20} />
            </button>
          ) : (
            <button onClick={signInWithGoogle} title="Log In" className="w-12 h-12 bg-[#2C5530] rounded-full flex items-center justify-center text-white hover:bg-[#234526] transition-colors shadow-sm">
              <LogIn size={20} />
            </button>
          )}
        </div>
      </div>


      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto space-y-16">
        
        {/* Activity Heatmap */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-[#1D1D1F]">Impact Consistency</h2>
            <div className="flex items-center gap-2 text-sm text-[#1D1D1F]/50">
              <span className="flex items-center gap-1"><Flame size={14} className="text-orange-500" /> {USER.streak} day streak</span>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-2">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    // Randomize some activity for the visual effect
                    const rand = (weekIndex * 7 + dayIndex + 13) % 17
                    const active = rand > 12
                    const high = active && rand > 15
                    const past = weekIndex < 50
                    
                    if (!past) {
                      return <div key={dayIndex} className="w-4 h-4 rounded-sm bg-black/5" />
                    }
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`w-4 h-4 rounded-sm ${high ? 'bg-[#2C5530]' : active ? 'bg-[#2C5530]/40' : 'bg-black/5'}`} 
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Your Chapters */}
        <section>
          <h2 className="text-2xl font-serif text-[#1D1D1F] mb-8">Stories You're Following</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAUSES.map((cause, i) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectCause(cause)}
                className="group cursor-pointer bg-white rounded-[24px] p-4 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all border border-black/5"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-[16px] overflow-hidden flex-shrink-0">
                  <img src={cause.heroImage} alt={cause.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-[#1D1D1F] mb-1">{cause.person}</h3>
                  <p className="text-sm text-[#1D1D1F]/50">Chapter {cause.chapter} of {cause.totalChapters}</p>
                </div>
                <ChevronRight size={20} className="text-[#1D1D1F]/30 group-hover:text-[#1D1D1F]/60 mr-2" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Memory Book Teaser */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative rounded-[32px] overflow-hidden bg-[#2C5530] text-white p-12 shadow-[0_20px_60px_rgba(44,85,48,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-lg">
              <span className="text-4xl mb-6 block">📚</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Your Memory Book</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Every moment you've been part of, compiled into one beautiful story of hope and change.
              </p>
              <button className="px-8 py-3 bg-white text-[#2C5530] rounded-full font-medium text-sm tracking-wide hover:bg-neutral-50 transition-colors">
                View Your 2025 Review
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
