import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronRight, Bookmark } from 'lucide-react'
import type { Cause } from '../data'
import { CAUSES, USER } from '../data'
import { auth } from '../../lib/firebase'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'

interface HomeScreenProps {
  onSelectCause: (cause: Cause) => void
}

export function HomeScreen({ onSelectCause }: HomeScreenProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const followedCauses = CAUSES.slice(0, 2)
  const discoverCauses = CAUSES

  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 150], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <div className="w-full min-h-screen pb-32">
      {/* Header */}
      <motion.div 
        style={{ y: headerY, opacity: headerOpacity }}
        className="pt-24 px-8 md:px-12 lg:px-24 max-w-5xl mx-auto"
      >
        <p className="text-[#1D1D1F]/50 font-medium tracking-wide text-sm md:text-base uppercase mb-4">
          {greeting}, {(user?.displayName || USER.name).split(' ')[0]}
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] font-serif max-w-2xl">
          A journal of your impact on the world.
        </h1>
      </motion.div>

      {/* Hero Story / Latest Update */}
      <div className="mt-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="group cursor-pointer relative rounded-[32px] overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)] transition-shadow duration-700"
          onClick={() => onSelectCause(followedCauses[0])}
        >
          <div className="aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden relative">
            <motion.img 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={followedCauses[0].journalEntries[0]?.image || followedCauses[0].heroImage} 
              alt={followedCauses[0].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wide mb-4 border border-white/30">
                Latest Memory
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium leading-snug max-w-2xl text-shadow-sm">
                "{followedCauses[0].journalEntries[0]?.text}"
              </h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Discover Causes (Photo Journal Style) */}
      <div className="mt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#1D1D1F]">
            More stories waiting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {discoverCauses.map((cause, i) => (
            <JournalCard key={cause.id} cause={cause} index={i} onClick={() => onSelectCause(cause)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function JournalCard({ cause, index, onClick }: { cause: Cause; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={cause.heroImage}
          alt={cause.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-medium text-[#1D1D1F] border border-black/5 shadow-sm">
            {cause.location}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <ChevronRight className="w-5 h-5 text-[#1D1D1F]" />
        </div>
      </div>
      
      <div className="px-2">
        <p className="text-sm text-[#1D1D1F]/50 font-medium mb-2">{cause.tag}</p>
        <h3 className="text-2xl font-serif text-[#1D1D1F] leading-tight mb-3 group-hover:text-[#2C5530] transition-colors">
          {cause.name}
        </h3>
        <p className="text-base text-[#1D1D1F]/70 leading-relaxed line-clamp-3">
          {cause.shortDesc}
        </p>
      </div>
    </motion.div>
  )
}
