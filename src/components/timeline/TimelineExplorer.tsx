import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronRight, Milestone, Clock, Zap } from 'lucide-react';
import { TIMELINE } from '../../constants/content';

export function TimelineExplorer() {
  const [activePhase, setActivePhase] = useState(TIMELINE[0]);

  return (
    <div className="p-6 md:p-10 space-y-16 pb-40 max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary rounded-full border border-secondary/20 mb-2">
           <Zap size={14} className="fill-secondary" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Democratic Path</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">Election Roadmap</h2>
        <p className="text-slate-500 font-bold text-lg">Follow the journey from announcement to results.</p>
      </div>

      {/* Swirl Path Timeline */}
      <div className="relative pt-12">
        {/* SVG Path Background (Dynamic looking swirl) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-slate-100/50 rounded-full z-0 overflow-hidden">
           <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height: '100%' }}
             viewport={{ once: true }}
             className="w-full bg-gradient-to-b from-primary via-secondary to-rose-500 rounded-full opacity-20"
           />
        </div>

        <div className="relative z-10 space-y-24">
          {TIMELINE.map((phase, idx) => {
            const swirlPos = idx % 3;
            const offsetClass = 
              swirlPos === 0 ? '-translate-x-12 md:-translate-x-24' :
              swirlPos === 1 ? 'translate-x-0' :
              'translate-x-12 md:translate-x-24';
            
            const isLeft = swirlPos === 0;
            const isActive = activePhase.id === phase.id;

            return (
              <div key={phase.id} className="relative flex flex-col items-center">
                {/* Pointer Label Content (Visible only for descriptive purposes on large screens) */}
                <motion.div 
                   initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   className={`absolute top-1/2 -translate-y-1/2 hidden xl:flex flex-col max-w-[280px] ${
                     swirlPos === 0 ? 'left-[calc(50%+6rem)]' : 
                     swirlPos === 2 ? 'right-[calc(50%+6rem)] text-right' :
                     'left-[calc(50%+8rem)]' // center position offset
                   }`}
                >
                   <div className={`p-6 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl relative ${
                     isActive ? 'ring-4 ring-primary/10 border-primary/20' : ''
                   }`}>
                      <h5 className="font-black text-slate-800 text-lg mb-2">{phase.title}</h5>
                      <p className="text-slate-500 font-bold text-sm leading-relaxed">{phase.details}</p>
                      {/* Triangle Pointer */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-slate-100 rotate-[-45deg] ${
                        swirlPos === 0 ? '-left-2' : swirlPos === 2 ? '-right-2 rotate-[135deg]' : '-left-2'
                      }`} />
                   </div>
                </motion.div>

                <div className={`relative flex flex-col items-center ${offsetClass}`}>
                  <motion.button
                    id={`timeline-node-${phase.id}`}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActivePhase(phase)}
                    className={`w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] flex items-center justify-center relative shadow-2xl transition-all border-4 border-white ${
                      isActive 
                        ? `${phase.color} border-white ring-[12px] ring-slate-100 z-30` 
                        : 'bg-white border-slate-100 grayscale-[0.5] opacity-80'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                       <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-white text-slate-800' : 'bg-slate-100 text-slate-400'}`}>
                          <Milestone size={isActive ? 48 : 32} strokeWidth={2.5} />
                       </div>
                    </div>
                    
                    {isActive && (
                       <motion.div 
                         layoutId="timeline-active-glow"
                         className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-pulse"
                       />
                    )}
                  </motion.button>

                  <div className="mt-8 text-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-slate-50 shadow-sm">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                      Phase 0{idx + 1}
                    </p>
                    <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{phase.title}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details View (Mobile & Tablet specialized) */}
      <div className="xl:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden ${activePhase.color}`}
          >
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Deep Dive</span>
                <h3 className="text-4xl font-black">{activePhase.title}</h3>
              </div>
              <p className="text-lg font-bold opacity-90 leading-relaxed italic">{activePhase.description}</p>
              <div className="p-6 bg-black/10 rounded-2xl border border-white/10">
                <p className="font-bold text-sm leading-relaxed">{activePhase.details}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
