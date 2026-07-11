import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import type { Cause } from '../data'

interface DonationScreenProps {
  cause: Cause
  onBack: () => void
  onSuccess: () => void
}

const AMOUNTS = [200, 500, 1000, 2500]

export function DonationScreen({ cause, onBack, onSuccess }: DonationScreenProps) {
  const [selected, setSelected] = useState(500)
  const [custom, setCustom] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const amount = isCustom ? (parseInt(custom) || 0) : selected
  const tier = cause.impact.find(t => parseInt(t.amount.replace(/[^0-9]/g, '')) === amount) || cause.impact[1]

  const handlePay = () => {
    if (paying || paid) return
    setPaying(true)

    setTimeout(() => {
      setPaid(true)
      setPaying(false)
      setTimeout(() => onSuccess(), 2400)
    }, 1800)
  }

  return (
    <div className="w-full min-h-screen bg-[#FAFAF7] text-[#1D1D1F] flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl px-6 md:px-12 pt-12 pb-6 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-neutral-50 transition-colors shadow-sm border border-black/5"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-right">
          <p className="text-xs font-semibold tracking-widest text-[#1D1D1F]/40 uppercase">
            Support
          </p>
          <p className="text-lg font-serif font-medium">{cause.person}</p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl px-6 md:px-12 pb-32 flex flex-col items-center">
        
        {/* Pass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-black/5 mb-12 flex flex-col items-center"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] overflow-hidden mb-8 shadow-sm">
            <img src={cause.heroImage} alt={cause.name} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Continue the Story
          </h2>

          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            {AMOUNTS.map(amt => {
              const active = !isCustom && selected === amt
              return (
                <button
                  key={amt}
                  onClick={() => { setSelected(amt); setIsCustom(false) }}
                  className={`py-6 rounded-[24px] border ${active ? 'border-[#2C5530] bg-[#2C5530]/5' : 'border-black/5 bg-transparent'} transition-all hover:border-[#2C5530]/30`}
                >
                  <div className={`text-2xl font-serif mb-1 ${active ? 'text-[#2C5530]' : 'text-[#1D1D1F]'}`}>
                    ₹{amt.toLocaleString()}
                  </div>
                </button>
              )
            })}
          </div>
          
          <input
            placeholder="Other Amount (₹)"
            value={custom}
            onChange={e => { setCustom(e.target.value); setIsCustom(true) }}
            onFocus={() => setIsCustom(true)}
            className={`w-full py-5 px-6 rounded-[24px] border ${isCustom ? 'border-[#2C5530] bg-[#2C5530]/5 text-[#2C5530]' : 'border-black/5 bg-transparent text-[#1D1D1F]'} text-lg font-serif text-center outline-none transition-all placeholder:text-[#1D1D1F]/30 mb-8`}
          />

          {amount > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full bg-neutral-50 rounded-[24px] p-6 text-center border border-black/5"
            >
              <p className="text-xs font-semibold tracking-widest text-[#1D1D1F]/40 uppercase mb-3">Your Impact</p>
              <p className="text-lg font-serif text-[#1D1D1F] mb-2">{tier?.result || 'Makes a difference'}</p>
              {tier && (
                <p className="text-sm font-medium text-[#2C5530]">🔓 {tier.chapter}</p>
              )}
            </motion.div>
          )}

        </motion.div>

        {/* Action Area */}
        <div className="w-full max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {paid ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-6 rounded-[32px] bg-[#2C5530] text-white flex flex-col items-center gap-3 shadow-[0_20px_50px_rgba(44,85,48,0.3)]"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Check size={24} className="text-white" strokeWidth={3} />
                </div>
                <p className="text-xl font-medium tracking-wide">Story Unlocked</p>
                <p className="text-sm text-white/80">You're part of this journey now.</p>
              </motion.div>
            ) : (
              <motion.button
                key="pay"
                whileTap={!paying ? { scale: 0.98 } : {}}
                onClick={handlePay}
                disabled={paying || amount <= 0}
                className={`w-full py-6 rounded-full font-medium text-lg tracking-wide shadow-[0_16px_40px_rgba(44,85,48,0.25)] flex items-center justify-center gap-3 transition-all
                  ${paying ? 'bg-[#2C5530]/80 text-white cursor-default' : amount <= 0 ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none' : 'bg-[#2C5530] text-white hover:bg-[#234526] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(44,85,48,0.35)]'}
                `}
              >
                {paying ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="fill-current opacity-80" />
                    {amount > 0 ? `Give ₹${amount.toLocaleString()}` : 'Select Amount'}
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
          <p className="text-xs text-[#1D1D1F]/40 text-center mt-6">
            100% of your donation reaches {cause.person.split(' ')[0]}.
          </p>
        </div>

      </div>
    </div>
  )
}
