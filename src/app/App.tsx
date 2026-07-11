import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HomeScreen } from './components/HomeScreen'
import { CauseDetailScreen } from './components/CauseDetailScreen'
import { TimelineScreen } from './components/TimelineScreen'
import { DonationScreen } from './components/DonationScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { LandingScreen } from './components/LandingScreen'
import type { Cause, Screen } from './data'
import { CAUSES } from './data'
import { Home, History, User, Heart } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const
const PAGE_TRANSITION = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' },
  transition: { duration: 0.8, ease: EASE },
}

function FloatingNav({ currentScreen, onNavigate }: { currentScreen: Screen | 'landing', onNavigate: (s: Screen) => void }) {
  if (currentScreen === 'splash' || currentScreen === 'onboarding' || currentScreen === 'donate' || currentScreen === 'landing') return null;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      {[
        { id: 'home', icon: Home, label: 'Journal' },
        { id: 'profile', icon: User, label: 'Profile' }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as Screen)}
          className={`relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 ease-out ${
            currentScreen === item.id || (currentScreen === 'cause' && item.id === 'home') || (currentScreen === 'timeline' && item.id === 'home')
              ? 'text-white' 
              : 'text-neutral-500 hover:text-black hover:bg-black/5'
          }`}
        >
          { (currentScreen === item.id || (currentScreen === 'cause' && item.id === 'home') || (currentScreen === 'timeline' && item.id === 'home')) && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-[#1D1D1F] rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 font-medium text-sm tracking-wide">{item.label}</span>
        </button>
      ))}
    </motion.div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen | 'landing'>('landing')
  const [selectedCause, setSelectedCause] = useState<Cause>(CAUSES[0])

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen])

  const handleSelectCause = useCallback((cause: Cause) => {
    setSelectedCause(cause)
    setScreen('cause')
  }, [])

  const handleDonate = useCallback((cause: Cause) => {
    setSelectedCause(cause)
    setScreen('donate')
  }, [])

  const handleTimeline = useCallback((cause: Cause) => {
    setSelectedCause(cause)
    setScreen('timeline')
  }, [])

  const handleNavigation = useCallback((s: Screen) => {
    setScreen(s)
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#FAFAF7] text-[#1D1D1F] selection:bg-[#2C5530] selection:text-white">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" {...PAGE_TRANSITION} className="min-h-screen">
            <LandingScreen onEnter={() => setScreen('home')} />
          </motion.div>
        )}

        {screen === 'home' && (
          <motion.div key="home" {...PAGE_TRANSITION} className="min-h-screen">
            <HomeScreen onSelectCause={handleSelectCause} />
          </motion.div>
        )}

        {screen === 'cause' && (
          <motion.div key="cause" {...PAGE_TRANSITION} className="min-h-screen">
            <CauseDetailScreen
              cause={selectedCause}
              onBack={() => setScreen('home')}
              onDonate={handleDonate}
              onTimeline={handleTimeline}
            />
          </motion.div>
        )}

        {screen === 'timeline' && (
          <motion.div key="timeline" {...PAGE_TRANSITION} className="min-h-screen">
            <TimelineScreen
              cause={selectedCause}
              onBack={() => setScreen('cause')}
              onDonate={handleDonate}
            />
          </motion.div>
        )}

        {screen === 'donate' && (
          <motion.div key="donate" {...PAGE_TRANSITION} className="min-h-screen">
            <DonationScreen
              cause={selectedCause}
              onBack={() => setScreen('cause')}
              onSuccess={() => setScreen('timeline')}
            />
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div key="profile" {...PAGE_TRANSITION} className="min-h-screen">
            <ProfileScreen onSelectCause={handleSelectCause} />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingNav currentScreen={screen} onNavigate={handleNavigation} />
    </div>
  )
}
