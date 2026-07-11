import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SplashScreen } from './components/SplashScreen'
import { OnboardingScreen } from './components/OnboardingScreen'
import { HomeScreen } from './components/HomeScreen'
import { CauseDetailScreen } from './components/CauseDetailScreen'
import { DonationScreen } from './components/DonationScreen'
import { TimelineScreen } from './components/TimelineScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { BottomNav } from './components/BottomNav'
import type { Cause, Screen } from './data'
import { CAUSES } from './data'

const EASE = [0.22, 1, 0.36, 1] as const
const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: EASE },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [selectedCause, setSelectedCause] = useState<Cause>(CAUSES[0])

  const goTo = useCallback((s: Screen) => setScreen(s), [])

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
    if (s === 'cause') setScreen('home')
    else goTo(s)
  }, [goTo])

  return (
    <div style={{
      width: '100vw', height: '100dvh',
      background: '#030308',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      {/* Ambient background for desktop */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(0,232,124,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 80% 50%, rgba(79,179,255,0.03) 0%, transparent 60%)',
      }} />

      {/* Phone shell */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 430,
        height: '100%',
        maxHeight: '100dvh',
        overflow: 'hidden',
        borderRadius: 'min(44px, 4vw)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
        background: '#070712',
      }}>
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div key="splash" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <SplashScreen onComplete={() => setScreen('onboarding')} />
            </motion.div>
          )}

          {screen === 'onboarding' && (
            <motion.div key="onboarding" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <OnboardingScreen onComplete={() => setScreen('home')} />
            </motion.div>
          )}

          {screen === 'home' && (
            <motion.div key="home" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <HomeScreen onSelectCause={handleSelectCause} />
              <BottomNav screen={screen} onNavigate={handleNavigation} />
            </motion.div>
          )}

          {screen === 'cause' && (
            <motion.div key="cause" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <CauseDetailScreen
                cause={selectedCause}
                onBack={() => setScreen('home')}
                onDonate={handleDonate}
                onTimeline={handleTimeline}
              />
            </motion.div>
          )}

          {screen === 'donate' && (
            <motion.div key="donate" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <DonationScreen
                cause={selectedCause}
                onBack={() => setScreen('cause')}
                onSuccess={() => setScreen('timeline')}
              />
            </motion.div>
          )}

          {screen === 'timeline' && (
            <motion.div key="timeline" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <TimelineScreen
                cause={selectedCause}
                onBack={() => setScreen('cause')}
                onDonate={handleDonate}
              />
              <BottomNav screen={screen} onNavigate={handleNavigation} />
            </motion.div>
          )}

          {screen === 'profile' && (
            <motion.div key="profile" {...PAGE_TRANSITION} style={{ position: 'absolute', inset: 0 }}>
              <ProfileScreen onSelectCause={handleSelectCause} />
              <BottomNav screen={screen} onNavigate={handleNavigation} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
