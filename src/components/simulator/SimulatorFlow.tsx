import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, UserCircle, Vote, Box, Search, Award, Fingerprint, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUser } from '../../context/UserContext';

const SIMULATOR_STEPS = [
  {
    id: 'intro',
    title: 'Ready to Experience Your First Vote?',
    description: 'Welcome to the Election Simulator. Walk through the steps of a real election in this mock environment.',
    icon: Vote,
    color: 'bg-blue-50 text-primary border-blue-100',
    action: 'Start Simulation'
  },
  {
    id: 'register',
    title: 'Step 1: Identity Verification',
    description: 'Present your identification document to the polling office for verification against the electoral roll.',
    action: 'Verify My ID',
    icon: Search,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: 'booth',
    title: 'Step 2: Enter the Booth',
    description: 'Your finger is marked with indelible ink. Present your ID and get your signature recorded.',
    action: 'Identify Self',
    icon: UserCircle,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
  },
  {
    id: 'choice',
    title: 'Step 3: Make Your Choice',
    description: 'Inside the private booth, select your preferred candidate. Your vote is secret and secure.',
    candidates: ['Eagle Party', 'Lion League', 'Dolphin Alliance', 'NOTA'],
    icon: Box,
    color: 'bg-green-50 text-green-600 border-green-100',
    action: 'Cast Vote'
  },
  {
    id: 'complete',
    title: 'Step 4: Vote Cast Successfully!',
    description: 'Your vote has been recorded securely. Remember, your vote is your power in a democracy.',
    icon: PartyPopper,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    action: 'Start Over'
  }
];

export function SimulatorFlow() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<string | null>(null);
  const { addXp } = useUser();

  const handleNext = async () => {
    if (step < SIMULATOR_STEPS.length - 1) {
      if (step === SIMULATOR_STEPS.length - 2) {
        await addXp(100);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#f59e0b', '#10b981', '#ef4444']
        });
      }
      setStep(step + 1);
    } else {
      setStep(0);
      setSelection(null);
    }
  };

  const current = SIMULATOR_STEPS[step];

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-10 pb-40">
      <div className="text-center space-y-2">
        <span className="text-xs font-black text-secondary uppercase tracking-[0.3em]">Interactive Simulation</span>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Vote Sim 2024</h2>
        <div className="flex justify-center gap-2 pt-4">
          {SIMULATOR_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-3 rounded-full transition-all duration-300 ${i <= step ? 'w-10 bg-primary' : 'w-3 bg-slate-200'}`} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 1 }}
          className="card-vibrant-primary text-center p-10 md:p-14 relative"
        >
          <div className={`w-24 h-24 mx-auto rounded-[2rem] ${current.color} border-2 flex items-center justify-center mb-8 shadow-inner`}>
            <current.icon size={48} strokeWidth={2.5} />
          </div>

          <h3 className="text-3xl font-black mb-4 text-slate-800 leading-tight">{current.title}</h3>
          <p className="text-slate-500 mb-10 font-bold text-lg leading-relaxed">
            {current.description}
          </p>

          {current.candidates && (
            <div className="grid grid-cols-2 gap-4 mb-10">
              {current.candidates.map((c) => (
                <button
                  id={`candidate-${c.toLowerCase()}`}
                  key={c}
                  onClick={() => setSelection(c)}
                  className={`p-5 rounded-2xl border-4 font-black transition-all ${
                    selection === c 
                      ? 'border-primary bg-primary/5 text-primary scale-105 shadow-lg' 
                      : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <button
            id={`simulator-next-${step}`}
            onClick={handleNext}
            disabled={current.id === 'choice' && !selection}
            className="btn-vibrant-secondary w-full text-xl"
          >
            {current.action || "Continue"}
          </button>
          
          {step === SIMULATOR_STEPS.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 bg-green-50 border-2 border-dashed border-green-200 rounded-3xl flex flex-col items-center gap-3 text-green-700"
            >
              <CheckCircle2 size={32} className="text-green-500" />
              <p className="font-black uppercase text-sm tracking-widest text-center">Reward Unlocked</p>
              <span className="text-4xl font-black">+100 XP</span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white border-b-8 border-black">
        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Did you know?</h4>
        <p className="text-blue-100 font-medium leading-relaxed italic opacity-80">
          In many democratic systems, the identity verification process is designed to be rigorous yet accessible, ensuring every legitimate voter has their voice heard once and only once.
        </p>
      </div>
    </div>
  );
}
