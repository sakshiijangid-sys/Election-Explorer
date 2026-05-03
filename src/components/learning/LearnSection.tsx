import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2, Lock, ArrowRight, X, HelpCircle, Award } from 'lucide-react';
import { LEVELS } from '../../constants/content';
import { useUser } from '../../context/UserContext';
import { Module, Question } from '../../types';

export function LearnSection() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const { profile, completeModule, addXp } = useUser();

  const handleCompleteModule = async (module: Module) => {
    if (module.quiz && module.quiz.length > 0) {
      setShowQuiz(true);
    } else {
      await completeModule(module.id);
      await addXp(module.xp);
      setSelectedModule(null);
    }
  };

  const isModuleLocked = (levelId: number) => {
    if (!profile) return true;
    return levelId > (profile.currentLevel || 1);
  };

  const isModuleCompleted = (moduleId: string) => {
    return profile?.completedModules.includes(moduleId);
  };

  return (
    <div className="p-6 md:p-8 space-y-12 max-w-2xl mx-auto pb-40">
      <div className="text-center space-y-2 mb-8">
        <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Curriculum</span>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Your Journey</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border-b-8 border-blue-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center shrink-0">
             <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
            <p className="text-xl font-black text-slate-800">{profile?.xp.toLocaleString()} XP</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border-b-8 border-orange-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
             <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Badges</p>
            <p className="text-xl font-black text-slate-800">{profile?.badges.length} Unlocked</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
         <div className="flex justify-between items-end">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Progress</span>
           <span className="text-sm font-black text-primary">{Math.round(((profile?.completedModules.length || 0) / LEVELS.reduce((acc, l) => acc + l.modules.length, 0)) * 100)}%</span>
         </div>
         <div className="h-6 bg-slate-100 rounded-full border-2 border-slate-50 p-1">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((profile?.completedModules.length || 0) / LEVELS.reduce((acc, l) => acc + l.modules.length, 0)) * 100}%` }}
               className="h-full bg-primary rounded-full"
            />
         </div>
      </div>

      <div className="relative flex flex-col items-center pt-8 pb-12 overflow-visible">
        {/* Swivel Path Connection Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-slate-100 rounded-full z-0 opacity-50" />
        
        {LEVELS.map((level, idx) => {
          const locked = isModuleLocked(level.id);
          const current = (profile?.currentLevel || 1) === level.id;
          const completed = (profile?.currentLevel || 1) > level.id;
          
          // Refined swirl pattern: goes left, then center, then right, then center...
          const swirlPos = idx % 4;
          const offsetClass = 
            swirlPos === 0 ? '-translate-x-16 md:-translate-x-24' :
            swirlPos === 1 ? 'translate-x-0' :
            swirlPos === 2 ? 'translate-x-16 md:translate-x-24' :
            'translate-x-0';

          const isExtreme = swirlPos === 0 || swirlPos === 2;
          const isLeft = swirlPos === 0;

          return (
            <div key={level.id} className="relative w-full flex flex-col items-center mb-24 last:mb-0">
              {/* Descriptive Milestone Pointer */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`absolute top-1/2 -translate-y-1/2 hidden lg:flex flex-col z-20 ${
                  swirlPos === 0 ? 'left-[55%]' : 
                  swirlPos === 2 ? 'right-[55%] text-right' :
                  swirlPos === 1 ? 'left-[calc(50%+6rem)]' : 'right-[calc(50%+6rem)] text-right'
                }`}
              >
                <div className={`p-4 bg-white rounded-[1.5rem] border-2 border-slate-100 shadow-xl max-w-[220px] relative hover:border-primary/20 transition-colors ${
                  isLeft ? 'rounded-tl-none' : swirlPos === 2 ? 'rounded-tr-none' : 'rounded-none'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${completed ? 'bg-green-500' : current ? 'bg-primary animate-pulse' : 'bg-slate-300'}`} />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {completed ? "Achieved" : current ? "Unlock This" : "Locked"}
                    </p>
                  </div>
                  <p className="text-[13px] font-bold text-slate-700 leading-snug">
                    {idx === 0 && "Foundations of Power: Why your vote is your voice."}
                    {idx === 1 && "The Ballot Difference: Comparing National vs. Local impacts."}
                    {idx === 2 && "Eligibility Protocol: Documentation and identity checks."}
                    {idx === 3 && "Campaign Intelligence: Navigating the pre-election buzz."}
                    {idx === 4 && "Fact-Checking Mastery: Identifying real vs. fake news."}
                    {idx === 5 && "Global Perspectives: How the world practices voting."}
                  </p>
                </div>
              </motion.div>

              <div className={`relative flex flex-col items-center transition-all duration-700 ${offsetClass}`}>
                <motion.button
                  id={`level-node-${level.id}`}
                  whileHover={!locked ? { scale: 1.15, rotate: [0, -5, 5, 0] } : {}}
                  whileTap={!locked ? { y: 4, scale: 0.9 } : {}}
                  disabled={locked}
                  onClick={() => {
                    const firstIncomplete = level.modules.find(m => !isModuleCompleted(m.id)) || level.modules[0];
                    setSelectedModule(firstIncomplete);
                  }}
                  className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center relative z-10 transition-all border-white border-4 shadow-2xl ${
                    locked 
                      ? 'bg-slate-300 border-b-8 border-slate-400 opacity-60' 
                      : current 
                        ? 'bg-primary border-b-8 border-blue-900 ring-8 ring-blue-100 animate-pulse' 
                        : 'bg-green-500 border-b-8 border-green-800'
                  }`}
                >
                  <span className="text-white text-4xl md:text-5xl">
                    {locked ? '🔒' : current ? '🗳️' : '✅'}
                  </span>
                  
                  {current && (
                    <motion.div 
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-xl shadow-lg border-2 border-white whitespace-nowrap"
                    >
                      PICK UP HERE
                    </motion.div>
                  )}
                  {completed && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500">
                       <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                  )}
                </motion.button>
                
                <div className="mt-8 text-center bg-white/50 px-4 py-2 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                   <p className={`font-black uppercase text-xs tracking-widest ${locked ? 'text-slate-400' : current ? 'text-primary' : 'text-green-600'}`}>
                    Stage {level.id}
                   </p>
                   <h4 className={`font-black text-sm uppercase tracking-tight ${locked ? 'text-slate-400' : 'text-slate-800'}`}>{level.title}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Player Modal (Vibrant Styles) */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            id="module-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              id="module-modal-content"
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 2 }}
              className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col border-b-[12px] border-primary"
            >
              <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                {!showQuiz ? (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-black text-primary uppercase tracking-widest">Lesson Module</span>
                        <h3 className="text-3xl font-black text-slate-800 leading-tight">{selectedModule.title}</h3>
                      </div>
                      <button onClick={() => setSelectedModule(null)} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                        <X size={20} />
                      </button>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-2xl border-2 border-dashed border-blue-100 flex gap-4">
                      <HelpCircle className="text-primary shrink-0" />
                      <p className="text-sm font-bold text-slate-600 italic leading-relaxed">{selectedModule.description}</p>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed text-lg">
                      {selectedModule.content}
                    </div>
                    
                    <button
                      id={`start-quiz-${selectedModule.id}`}
                      onClick={() => handleCompleteModule(selectedModule)}
                      className="btn-vibrant-primary w-full"
                    >
                      {isModuleCompleted(selectedModule.id) ? "REVIEW LESSON" : "CHECK KNOWLEDGE"}
                    </button>
                  </>
                ) : (
                  <QuizView 
                    questions={selectedModule.quiz} 
                    onComplete={async (score) => {
                      setQuizScore(score);
                      await completeModule(selectedModule.id);
                      await addXp(selectedModule.xp + (score * 10));
                    }}
                    onClose={() => { setSelectedModule(null); setShowQuiz(false); }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizView({ questions, onComplete, onClose }: { questions: Question[], onComplete: (score: number) => void, onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = () => {
    if (selectedOpt === null) return;
    if (selectedOpt === questions[currentIdx].correctAnswer) setScore(s => s + 1);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      onComplete(score);
    }
  };

  if (finished) {
    return (
      <div className="text-center py-10 space-y-8">
        <div className="relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-white"
          >
            <CheckCircle2 size={64} strokeWidth={2.5} />
          </motion.div>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-2xl shadow-lg border-2 border-white"
          >
             <Award size={24} />
          </motion.div>
        </div>
        <div>
          <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Level Progressed!</h4>
          <p className="text-slate-500 font-bold">You've mastered this module with {score}/{questions.length} correct answers.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/10">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Knowledge XP</span>
             <p className="text-3xl font-black text-primary">+{10 * score}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100">
             <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-1">Module XP</span>
             <p className="text-3xl font-black text-green-600">+100</p>
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-2xl border-2 border-orange-100">
           <p className="text-sm font-bold text-orange-700 italic">"Check your Badge Case in your profile to see your new rewards!"</p>
        </div>

        <button id="quiz-finish" onClick={onClose} className="btn-vibrant-primary w-full shadow-xl">CONTINUE JOURNEY</button>
      </div>
    );
  }

  const current = questions[currentIdx];

  return (
    <div className="space-y-8">
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-black text-slate-800 leading-tight">{current.text}</h4>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {current.options.map((opt, i) => {
          let style = "border-slate-100 bg-slate-50 text-slate-700";
          if (showExplanation) {
             if (i === current.correctAnswer) style = "bg-green-50 border-green-500 text-green-700";
             else if (i === selectedOpt) style = "bg-red-50 border-red-500 text-red-500 opacity-60";
             else style = "opacity-40 grayscale pointer-events-none";
          } else if (selectedOpt === i) {
             style = "border-primary bg-primary/5 text-primary scale-[1.02]";
          }

          return (
            <button
              key={i}
              onClick={() => !showExplanation && setSelectedOpt(i)}
              className={`w-full text-left p-4 rounded-2xl border-2 font-black transition-all flex items-center gap-4 ${style}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                selectedOpt === i ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-primary/5 rounded-2xl border-2 border-primary/10 text-slate-600 text-sm italic font-bold">
          {current.explanation}
        </motion.div>
      )}

      <button
        id="quiz-action"
        onClick={showExplanation ? handleNext : handleAnswer}
        disabled={selectedOpt === null}
        className="btn-vibrant-primary w-full"
      >
        {showExplanation ? "CONTINUE" : "CHECK ANSWER"}
      </button>
    </div>
  );
}
