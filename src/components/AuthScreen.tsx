import React from 'react';
import { motion } from 'motion/react';
import { Vote, ShieldCheck, ChevronRight } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

export function AuthScreen() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-6 md:p-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Vote size={32} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Election Explorer</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 text-primary border border-blue-100 rounded-full text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> 
            Education • Non-Political • Free
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Master the <span className="text-primary italic">Power</span> of Your Vote.
          </h2>
          
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Join thousands of citizens learning about elections through gamified levels, interactive simulations, and AI-powered insights.
          </p>

          <div className="pt-8">
            <button
              id="login-button"
              onClick={handleLogin}
              className="bg-slate-900 text-white font-bold text-xl px-12 py-5 rounded-[2rem] flex items-center gap-4 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-300 mx-auto"
            >
              Sign in with Google
              <div className="bg-white/20 p-1 rounded-full">
                <ChevronRight size={20} />
              </div>
            </button>
            <p className="mt-6 text-slate-400 text-sm font-medium">
              Join for free. Progress stays synced across devices.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="p-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-medium">
        <p>© 2026 Election Explorer • Built for Civics Education</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary">Terms</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
      </footer>
    </div>
  );
}
