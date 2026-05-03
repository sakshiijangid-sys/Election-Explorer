import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Info, ChevronRight, Milestone, Clock, Zap, CheckCircle2, ListTodo, Lightbulb, TrendingUp } from 'lucide-react';
import { TIMELINE } from '../../constants/content';

// Locally defined detailed tasks for richer interactivity
const PHASE_TASKS: Record<string, string[]> = {
  announcement: ["Official Gazetting", "Model Code Activation", "Budget Approval"],
  nominations: ["Form Filling", "Security Deposit", "Affidavit Submission", "Symbol Allocation"],
  campaign: ["Public Rallies", "Media Interviews", "Manifesto Launch", "Door-to-door Visits"],
  voting: ["Booth Setup", "Voter Verification", "Button Pressing", "Ink Marking"],
  counting: ["Seal Verification", "Round-wise Tallying", "Candidate Observation"],
  results: ["Certificate Issuance", "Winner Notification", "Transition Preparation"]
};

const PHASE_FUN_FACTS: Record<string, string> = {
  announcement: "Did you know? In some countries, election dates must be a Sunday to maximize turnout.",
  nominations: "Candidates often file multiple sets of papers to ensure they aren't rejected on technicalities.",
  campaign: "The 'Silence Period' usually bans all political noise 48 hours before polling begins.",
  voting: "India's 2019 election required over 1 million polling stations!",
  counting: "VVPAT machines allow voters to verify that their vote went to the right candidate.",
  results: "The fastest result declaration ever recorded happened within minutes of polls closing in smaller jurisdictions."
};

export function TimelineExplorer() {
  const [maxOpenedIndex, setMaxOpenedIndex] = useState(0);

  const handlePhaseVisit = (idx: number) => {
    setMaxOpenedIndex(prev => Math.max(prev, idx));
  };

  const progress = useMemo(() => {
    return Math.round(((maxOpenedIndex + 1) / TIMELINE.length) * 100);
  }, [maxOpenedIndex]);

  return (
    <div className="p-6 md:p-10 space-y-16 pb-40 max-w-5xl mx-auto overflow-hidden">
      {/* Header with Discovery Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary rounded-full border border-secondary/20 mb-2">
            <Zap size={14} className="fill-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Interactive Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">Election Roadmap</h2>
          <p className="text-slate-500 font-bold text-lg max-w-md">Follow the journey from announcement to results.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-xl min-w-[200px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={48} />
          </div>
          <div className="relative z-10 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discovery Progress</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-primary leading-none">{progress}%</span>
              <span className="text-xs font-bold text-slate-400 mb-1">Explored</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <LayoutGroup>
        {/* Swirl Path Timeline */}
        <div className="relative pt-12">
          {/* SVG Path Background */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-slate-100/50 rounded-full z-0 overflow-hidden">
            <motion.div 
              style={{ originY: 0 }}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-rose-500 rounded-full opacity-20"
            />
          </div>

          <div className="relative z-10 space-y-48">
            {TIMELINE.map((phase, idx) => {
              const swirlPos = idx % 3;
              const offsetClass = 
                swirlPos === 0 ? '-translate-x-12 md:-translate-x-32' :
                swirlPos === 1 ? 'translate-x-0' :
                'translate-x-12 md:translate-x-32';
              
              const isLeft = swirlPos === 0;
              const isOpened = idx <= maxOpenedIndex;
              const isLatest = idx === maxOpenedIndex;

              return (
                <motion.div 
                  key={phase.id} 
                  className="relative flex flex-col items-center"
                >
                  {/* Contextual Desktop Summary (Visible only for descriptive purposes on large screens) */}
                  <motion.div 
                    initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`absolute top-1/2 -translate-y-1/2 hidden xl:flex flex-col max-w-[300px] transition-transform duration-500 ${isLatest ? 'scale-105 z-40' : 'scale-95 opacity-20'} ${
                      swirlPos === 0 ? 'left-[calc(50%+8rem)]' : 
                      swirlPos === 2 ? 'right-[calc(50%+8rem)] text-right' :
                      'left-[calc(50%+10rem)]' 
                    }`}
                  >
                    <div className={`p-8 bg-white rounded-[2.5rem] border-2 shadow-2xl relative transition-all duration-300 ${
                      isLatest ? 'border-primary/30 ring-8 ring-primary/5' : 'border-slate-100'
                    }`}>
                      <h5 className="font-black text-slate-800 text-xl tracking-tight mb-2">{phase.title}</h5>
                      <p className="text-slate-500 font-bold text-sm leading-relaxed italic">"{phase.description}"</p>
                      {/* Triangle Pointer */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-l-2 border-t-2 border-slate-100 rotate-[-45deg] ${
                        swirlPos === 0 ? '-left-2.5' : swirlPos === 2 ? '-right-2.5 rotate-[135deg]' : '-left-2.5'
                      }`} />
                    </div>
                  </motion.div>

                  <div className={`relative flex flex-col items-center w-full ${offsetClass}`}>
                    <motion.button
                      id={`timeline-node-${phase.id}`}
                      whileHover={{ scale: 1.1, rotate: isLeft ? -5 : 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePhaseVisit(idx)}
                      aria-label={`Phase ${idx + 1}: ${phase.title}. ${isLatest ? 'Current focus' : 'Phase details'}`}
                      className={`w-32 h-32 md:w-48 md:h-48 rounded-[3rem] flex items-center justify-center relative shadow-2xl transition-all border-4 border-white focus:outline-none focus:ring-8 focus:ring-primary/20 ${
                        isOpened 
                          ? `${phase.color} border-white ring-[16px] ring-slate-100 z-30` 
                          : 'bg-white border-slate-100 grayscale-[0.6] opacity-70 hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                         <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpened ? 'bg-white text-slate-800' : 'bg-slate-100 text-slate-400'}`}>
                            <Milestone size={isOpened ? 56 : 36} strokeWidth={2.5} />
                         </div>
                      </div>
                      
                      {isOpened && !isLatest && (
                         <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                           <CheckCircle2 size={20} />
                         </div>
                      )}
                    </motion.button>

                    <div className="mt-8 text-center bg-white/90 backdrop-blur-md px-8 py-4 rounded-[2rem] border-2 border-slate-50 shadow-xl w-fit">
                      <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isOpened ? 'text-primary' : 'text-slate-400'}`}>
                        Phase 0{idx + 1}
                      </p>
                      <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">{phase.title}</h4>
                    </div>

                    {/* Integrated Details Box (Stays open once discovered) */}
                    <AnimatePresence>
                      {isOpened && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, scale: 0.95 }}
                          animate={{ height: 'auto', opacity: 1, scale: 1 }}
                          exit={{ height: 0, opacity: 0, scale: 0.95 }}
                          className="mt-6 w-full max-w-[500px] overflow-hidden z-20"
                        >
                          <div className={`p-8 rounded-[3rem] text-white shadow-2xl relative ${phase.color}`}>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                              <Milestone size={120} />
                            </div>
                            
                            <div className="relative z-10 space-y-6 text-left">
                              <div className="space-y-2">
                                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-black uppercase tracking-widest">Phase Details</span>
                                <h3 className="text-3xl font-black tracking-tighter">{phase.title}</h3>
                              </div>

                              <p className="text-lg font-bold leading-relaxed">{phase.description}</p>
                              
                              <div className="p-5 bg-black/15 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="font-bold text-sm italic opacity-90 leading-relaxed">"{phase.details}"</p>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-white/60">
                                  <ListTodo size={16} />
                                  <span className="font-black text-[10px] uppercase tracking-widest">Key Milestones</span>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                  {PHASE_TASKS[phase.id]?.map((task, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/5">
                                       <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-[10px]">
                                         {i + 1}
                                       </div>
                                       <span className="font-black text-xs uppercase tracking-tight">{task}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="p-4 bg-amber-400/20 border border-amber-400/30 rounded-2xl flex gap-3">
                                <Lightbulb className="text-amber-300 shrink-0" size={18} />
                                <p className="text-xs font-bold text-amber-50 leading-relaxed">
                                  {PHASE_FUN_FACTS[phase.id]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}
