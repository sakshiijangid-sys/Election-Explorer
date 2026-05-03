/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { Home, BookOpen, Vote, Clock, User as UserIcon, Loader2, Zap, Flame } from 'lucide-react';
import { HomeSection } from './components/layout/HomeSection';
import { LearnSection } from './components/learning/LearnSection';
import { SimulatorFlow } from './components/simulator/SimulatorFlow';
import { TimelineExplorer } from './components/timeline/TimelineExplorer';
import { ProfileSection } from './components/layout/ProfileSection';
import { AuthScreen } from './components/AuthScreen';
import { ChatAssistant } from './components/ai/ChatAssistant';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { user, profile, loading } = useUser();
  const [activeSection, setActiveSection] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection setSection={setActiveSection} />;
      case 'learn': return <LearnSection />;
      case 'simulator': return <SimulatorFlow />;
      case 'timeline': return <TimelineExplorer />;
      case 'profile': return <ProfileSection />;
      default: return <HomeSection setSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Vibrant Header */}
      <header className="w-full h-20 bg-white border-b-4 border-blue-100 md:px-8 px-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg rotate-3 shrink-0">
            E
          </div>
          <h1 className="text-lg md:text-2xl font-black tracking-tight text-primary italic leading-none">
            ELECTION<span className="text-secondary">EXPLORER</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden sm:flex items-center bg-orange-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-orange-200">
            <span className="text-orange-500 text-lg">🔥</span>
            <span className="font-black text-orange-700 ml-2 text-[10px] md:text-sm uppercase">{profile?.streak || 1} DAY STREAK</span>
          </div>
          <div className="flex items-center bg-blue-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-blue-200">
            <span className="text-blue-500 text-lg">💎</span>
            <span className="font-black text-blue-700 ml-2 text-[10px] md:text-sm uppercase">{profile?.xp.toLocaleString() || 0} XP</span>
          </div>
          <div 
            onClick={() => setActiveSection('profile')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white shadow-md bg-blue-400 overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
             <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pill Bottom Navigation */}
      <nav className="nav-pill-container">
        <NavPill 
          active={activeSection === 'home'} 
          onClick={() => setActiveSection('home')} 
          label="HOME" 
          icon={Home} 
        />
        <NavPill 
          active={activeSection === 'learn'} 
          onClick={() => setActiveSection('learn')} 
          label="LEARN" 
          icon={BookOpen} 
        />
        <NavPill 
          active={activeSection === 'simulator'} 
          onClick={() => setActiveSection('simulator')} 
          label="SIMULATOR" 
          icon={Vote} 
        />
        <NavPill 
          active={activeSection === 'timeline'} 
          onClick={() => setActiveSection('timeline')} 
          label="TIMELINE" 
          icon={Clock} 
        />
        <NavPill 
          active={activeSection === 'profile'} 
          onClick={() => setActiveSection('profile')} 
          label="PROFILE" 
          icon={UserIcon} 
        />
      </nav>

      <ChatAssistant />
    </div>
  );
}

function NavPill({ active, onClick, label, icon: Icon }: { active: boolean, onClick: () => void, label: string, icon: any }) {
  return (
    <button
      onClick={onClick}
      className={`nav-pill-item flex items-center gap-2 ${active ? 'nav-pill-item-active' : 'nav-pill-item-inactive'}`}
    >
      <Icon size={18} className={active ? '' : 'opacity-60'} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
