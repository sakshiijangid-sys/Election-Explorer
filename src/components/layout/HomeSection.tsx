import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, Clock, ChevronRight, Award, Target, Vote, GraduationCap, Flame, BookOpen } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { BADGES, LEVELS, getBadgeIcon } from '../../constants/content';

export function HomeSection({ setSection }: { setSection: (s: string) => void }) {
  const { profile } = useUser();

  if (!profile) return null;

  const totalModules = LEVELS.reduce((acc, l) => acc + l.modules.length, 0);
  const progress = Math.round((profile.completedModules.length / totalModules) * 100);

  return (
    <div className="p-6 md:p-10 space-y-10">
      {/* Hero Progression Banner */}
      <div className="relative">
        <button 
          id="continue-learning"
          onClick={() => setSection('learn')}
          className="w-full text-left bg-white p-8 md:p-12 rounded-[3rem] border-b-[12px] border-primary relative overflow-hidden group shadow-2xl transition-all hover:translate-y-[-4px] active:translate-y-2 active:border-b-0"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-white shadow-lg shrink-0 rotate-3 group-hover:rotate-6 transition-transform">
              <BookOpen size={48} />
            </div>
            <div className="flex-1 space-y-2">
              <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Current Journey</span>
              <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                {profile.currentLevel > LEVELS.length 
                  ? "Mastered!" 
                  : `Level ${profile.currentLevel}`}
              </h3>
              <p className="text-lg text-slate-500 font-bold">
                {profile.currentLevel > LEVELS.length 
                  ? "You have completed all levels! Re-visit any module." 
                  : "Pick up where you left off!"}
              </p>
              
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden mt-6 border-2 border-slate-50">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary" 
                />
              </div>
              <div className="flex justify-between items-center w-full text-xs font-black uppercase text-slate-400 mt-2">
                <span>{progress}% Completed</span>
                <span className="text-primary flex items-center gap-1">Resume <ChevronRight size={14} /></span>
              </div>
            </div>
          </div>
          {/* Decorative accents from theme */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 rounded-full opacity-50 shrink-0" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Secondary Action Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            id="goto-simulator"
            onClick={() => setSection('simulator')}
            className="card-vibrant-secondary group cursor-pointer hover:translate-y-[-4px] active:translate-y-2 active:border-b-0"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Vote size={32} />
            </div>
            <h4 className="text-2xl font-black mb-2 text-slate-800">MOCK SIMULATOR</h4>
            <p className="text-slate-500 mb-6 font-bold text-sm">Experience voting at a polling station through a mini-game.</p>
            <div className="flex items-center gap-2 text-xs font-black text-secondary tracking-widest group-hover:gap-4 transition-all">
              PLAY NOW <ChevronRight size={16} />
            </div>
          </div>

          <div 
            id="goto-timeline"
            onClick={() => setSection('timeline')}
            className="card-vibrant group cursor-pointer hover:translate-y-[-4px] active:translate-y-2 active:border-b-0 border-primary/20"
          >
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Clock size={32} />
            </div>
            <h4 className="text-2xl font-black mb-2 text-slate-800">VISUAL TIMELINE</h4>
            <p className="text-slate-500 mb-6 font-bold text-sm">Explore election phases from announcement to results.</p>
            <div className="flex items-center gap-2 text-xs font-black text-primary tracking-widest group-hover:gap-4 transition-all">
              EXPLORE PHASES <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Badges/Achievements Card (Theme specified style) */}
        <div className="space-y-6">
          <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full border-b-[12px] border-blue-950">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-800 rounded-full opacity-30 shrink-0" />
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Trophy className="text-yellow-400" />
              RECENT BADGES
            </h3>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 relative z-10">
              {BADGES.map((badge) => {
                const isOwned = profile.badges.some(b => b.id === badge.id);
                const Icon = getBadgeIcon(badge.icon);
                
                return (
                  <div key={badge.id} className="flex flex-col items-center gap-3">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                      isOwned 
                        ? 'bg-gradient-to-tr from-yellow-400 to-orange-500 scale-110' 
                        : 'bg-slate-800/50 border-2 border-dashed border-white/20'
                    }`}>
                      {isOwned ? (
                         <Icon size={32} className="text-white drop-shadow-md" />
                      ) : (
                        <span className="text-2xl opacity-20 text-white">?</span>
                      )}
                    </div>
                    <span className={`text-[10px] font-black uppercase text-center tracking-widest ${isOwned ? 'text-blue-100' : 'text-blue-500'}`}>
                      {isOwned ? badge.title : 'Locked'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button 
              id="view-badges-full"
              onClick={() => setSection('profile')}
              className="w-full mt-12 bg-white/10 hover:bg-white/20 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-colors"
            >
              Collection Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
