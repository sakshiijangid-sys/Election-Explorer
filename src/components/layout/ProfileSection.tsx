import React from 'react';
import { motion } from 'motion/react';
import { User, Award, Zap, Flame, LogOut, Medal, BookMarked, History, Settings, Mail, Shield, Camera, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { BADGES, getBadgeIcon } from '../../constants/content';

export function ProfileSection() {
  const { profile, user, logout } = useUser();

  if (!profile || !user) return null;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 pb-40">
      {/* Header Profile Card */}
      <div className="card-vibrant-primary overflow-hidden relative pt-16">
        <div className="absolute top-0 left-0 right-0 h-32 bg-primary" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="w-32 h-32 rounded-full border-8 border-white shadow-2xl bg-blue-400 overflow-hidden relative group">
             <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="avatar" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Camera className="text-white" />
             </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">{user.displayName || 'Voter'}</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Citizen Explorer</p>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="bg-orange-50 px-6 py-4 rounded-3xl border-b-4 border-orange-200 text-center shrink-0">
              <span className="text-xs font-black text-orange-500 uppercase block tracking-widest">Streak</span>
               <span className="text-2xl font-black text-orange-700">{profile.streak} Days</span>
            </div>
            <div className="bg-blue-50 px-6 py-4 rounded-3xl border-b-4 border-blue-200 text-center shrink-0">
              <span className="text-xs font-black text-blue-500 uppercase block tracking-widest">Experience</span>
               <span className="text-2xl font-black text-blue-700">{profile.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Badges Collection */}
        <div className="card-vibrant space-y-8 border-primary/20">
          <div className="flex items-center justify-between border-b-2 border-slate-50 pb-4">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Medal className="text-primary" size={28} />
              BADGE CASE
            </h3>
            <span className="bg-blue-50 text-primary font-black px-3 py-1 rounded-full text-xs">
              {profile.badges.length}/{BADGES.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {BADGES.map((badge) => {
              const Icon = getBadgeIcon(badge.icon);
              const isOwned = profile.badges.some(b => b.id === badge.id);

              return (
                <div key={badge.id} className="flex flex-col items-center gap-2 group">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isOwned 
                      ? 'bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-lg scale-110' 
                      : 'bg-slate-100 opacity-20 grayscale'
                  }`}>
                    <Icon size={28} className={isOwned ? "text-white drop-shadow-md" : "text-slate-400"} />
                  </div>
                  <span className={`text-[9px] font-black uppercase text-center tracking-tighter ${isOwned ? 'text-slate-800' : 'text-slate-300'}`}>
                    {badge.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Controls */}
        <div className="space-y-6">
          <div className="card-vibrant space-y-6 border-secondary/20">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Shield className="text-primary" size={28} />
              ACCOUNT
            </h3>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all font-bold text-slate-600">
                <div className="flex items-center gap-4">
                  <Mail size={20} />
                  <span>Update Email</span>
                </div>
                <ChevronRight size={18} />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all font-bold text-slate-600">
                <div className="flex items-center gap-4">
                   <Settings size={20} />
                   <span>Notifications</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>

            <button
               id="profile-logout"
               onClick={logout}
               className="w-full btn-vibrant-secondary bg-rose-500 border-rose-800 hover:bg-rose-600 active:bg-rose-700"
            >
              LOGOUT EXPLORER
            </button>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl border-b-8 border-black">
            <div className="absolute right-0 top-0 p-4 opacity-20 rotate-12 group-hover:rotate-0 transition-transform">
               <Zap size={64} className="text-yellow-400" />
            </div>
            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">Member Since</p>
            <p className="text-2xl font-black">MAY 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
