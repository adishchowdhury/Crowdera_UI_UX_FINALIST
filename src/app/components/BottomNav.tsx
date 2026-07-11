import { motion } from 'motion/react'
import { Home, Compass, Clock, User } from 'lucide-react'
import type { Screen } from '../data'

interface BottomNavProps {
  screen: Screen
  onNavigate: (screen: Screen) => void
}

const NAV_ITEMS = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'cause' as Screen, icon: Compass, label: 'Discover' },
  { id: 'timeline' as Screen, icon: Clock, label: 'Journeys' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
]

export function BottomNav({ screen, onNavigate }: BottomNavProps) {
  const activeScreens: Screen[] = ['home', 'cause', 'donate', 'thanks', 'timeline', 'profile']
  if (!activeScreens.includes(screen)) return null

  const activeId = screen === 'donate' || screen === 'thanks' ? 'cause' : screen

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(7,7,18,0.85)',
      backdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 64 }}>
        {NAV_ITEMS.map(item => {
          const active = activeId === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => onNavigate(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 4, background: 'none', border: 'none',
                cursor: 'pointer', padding: '8px 0',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon
                  size={22}
                  color={active ? '#00e87c' : 'rgba(248,248,255,0.3)'}
                  strokeWidth={active ? 2.2 : 1.6}
                />
                {active && (
                  <motion.div
                    layoutId="nav-dot"
                    style={{
                      position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%', background: '#00e87c',
                    }}
                  />
                )}
              </div>
              <span style={{
                fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: active ? 600 : 400,
                color: active ? '#00e87c' : 'rgba(248,248,255,0.25)',
                letterSpacing: '0.03em',
              }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
