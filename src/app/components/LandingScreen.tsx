import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Moon, Sun } from 'lucide-react'

interface LandingScreenProps {
  onEnter: () => void
}

function FloatingImages({ images, isDark }: { images: string[], isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 perspective-[1000px]">
      {images.map((img, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * -20;
        const duration = 20 + Math.random() * 10;
        const scale = 0.6 + Math.random() * 0.8;
        const z = -200 + Math.random() * 400; // Random depth
        const rotateY = -15 + Math.random() * 30; // Random tilt
        
        return (
          <motion.div
            key={i}
            className="absolute shadow-2xl rounded-2xl overflow-hidden"
            style={{
              left: `${randomX}%`,
              top: '110%',
              z,
              rotateY,
              scale
            }}
            animate={{
              top: '-30%',
              rotateZ: [0, 5, -5, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay: randomDelay
            }}
          >
            <div className={`w-32 h-40 md:w-56 md:h-72 transition-opacity duration-1000 ${isDark ? 'opacity-70' : 'opacity-90'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function LandingScreen({ onEnter }: LandingScreenProps) {
  const [isDark, setIsDark] = useState(true)

  const pexelsImages = [
    "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3404744/pexels-photo-3404744.jpeg?auto=compress&cs=tinysrgb&w=800",
  ]

  return (
    <div className={`w-full h-screen relative transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-[#FAFAF7] text-[#1D1D1F]'}`}>
      
      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 md:p-12 flex justify-between items-center">
        <h2 className="font-serif text-2xl tracking-wide font-medium">Echoes</h2>
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 ${isDark ? 'text-white/60' : 'text-black/40'}`}
        >
          The sound of impact
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[850px] font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-medium"
        >
          The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.
        </motion.h1>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={onEnter}
          className={`mt-16 pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wide transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'bg-[#2C5530] text-white shadow-[0_16px_40px_rgba(44,85,48,0.2)] hover:shadow-[0_20px_50px_rgba(44,85,48,0.3)]'}`}
        >
          Enter Echoes <ArrowRight size={18} />
        </motion.button>
      </div>

      {/* Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-[#FAFAF7]'}`}>
        <div className={`absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-white/10 via-transparent to-transparent' : 'from-[#2C5530]/10 via-transparent to-transparent'}`} />
      </div>

      <FloatingImages images={pexelsImages} isDark={isDark} />
    </div>
  )
}
