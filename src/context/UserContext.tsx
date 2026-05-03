import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile, Badge } from '../types';
import { LEVELS } from '../constants/content';

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  addXp: (amount: number) => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen for real-time updates to user profile
        const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            setProfile(data);
            
            // Retroactive Badge Sync
            const levelBadges: Record<number, { id: string, title: string, description: string, icon: string }> = {
              1: { id: 'first-vote', title: 'First Vote Ready', description: 'Completed Level 1!', icon: 'Vote' },
              2: { id: 'ballot-master', title: 'Ballot Master', description: 'Completed Level 2!', icon: 'Map' },
              3: { id: 'polling-pro', title: 'Polling Pro', description: 'Completed Level 3!', icon: 'Target' },
              4: { id: 'informed-citizen', title: 'Informed Citizen', description: 'Completed Level 4!', icon: 'Shield' },
              5: { id: 'democracy-defender', title: 'Democracy Defender', description: 'Completed Level 5!', icon: 'Users' },
              6: { id: 'global-envoy', title: 'Global Envoy', description: 'Completed Level 6!', icon: 'Globe' },
            };

            let updatedBadges = [...data.badges];
            let needsUpdate = false;

            LEVELS.forEach(level => {
              const allModulesDone = level.modules.every(m => data.completedModules.includes(m.id));
              if (allModulesDone) {
                const badgeToAward = levelBadges[level.id];
                if (badgeToAward && !updatedBadges.some(b => b.id === badgeToAward.id)) {
                  updatedBadges.push({
                    ...badgeToAward,
                    awardedAt: new Date().toISOString()
                  });
                  needsUpdate = true;
                }
              }
            });

            // Master badge check
            const allLevelsDone = LEVELS.every(level => 
              level.modules.every(m => data.completedModules.includes(m.id))
            );
            if (allLevelsDone && !updatedBadges.some(b => b.id === 'civics-scholar')) {
               updatedBadges.push({
                 id: 'civics-scholar',
                 title: 'Civics Scholar',
                 description: 'Mastered all levels!',
                 icon: 'GraduationCap',
                 awardedAt: new Date().toISOString()
               });
               needsUpdate = true;
            }

            if (needsUpdate) {
              updateDoc(userDocRef, { badges: updatedBadges }).catch(console.error);
            }
          } else {
            // Initialize user profile if it doesn't exist
            const initialProfile: UserProfile = {
              userId: firebaseUser.uid,
              email: firebaseUser.email || '',
              xp: 0,
              streak: 1,
              lastActive: new Date().toISOString(),
              completedModules: [],
              badges: [],
              currentLevel: 1
            };
            setDoc(userDocRef, initialProfile).catch(err => 
              handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`)
            );
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          setLoading(false);
        });

        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const addXp = async (amount: number) => {
    if (!user || !profile) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        xp: profile.xp + amount,
        lastActive: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!user || !profile) return;
    if (profile.completedModules.includes(moduleId)) return;
    
    const userDocRef = doc(db, 'users', user.uid);
    const newCompletedModules = [...profile.completedModules, moduleId];
    
    // Check if the current level is now complete
    const currentLevelData = LEVELS.find(l => l.id === profile.currentLevel);
    const allModulesInLevelDone = currentLevelData?.modules.every(m => 
      newCompletedModules.includes(m.id)
    );

    let nextLevel = profile.currentLevel;
    let newBadges = [...profile.badges];

    if (allModulesInLevelDone) {
      nextLevel = profile.currentLevel + 1;
      
      // Award badges based on level completion
      const levelBadges: Record<number, { id: string, title: string, description: string, icon: string }> = {
        1: { id: 'first-vote', title: 'First Vote Ready', description: 'Completed Level 1!', icon: 'Vote' },
        2: { id: 'ballot-master', title: 'Ballot Master', description: 'Completed Level 2!', icon: 'Map' },
        3: { id: 'polling-pro', title: 'Polling Pro', description: 'Completed Level 3!', icon: 'Target' },
        4: { id: 'informed-citizen', title: 'Informed Citizen', description: 'Completed Level 4!', icon: 'Shield' },
        5: { id: 'democracy-defender', title: 'Democracy Defender', description: 'Completed Level 5!', icon: 'Users' },
        6: { id: 'global-envoy', title: 'Global Envoy', description: 'Completed Level 6!', icon: 'Globe' },
      };

      const badgeToAward = levelBadges[profile.currentLevel];
      if (badgeToAward && !newBadges.some(b => b.id === badgeToAward.id)) {
        newBadges.push({
          ...badgeToAward,
          awardedAt: new Date().toISOString()
        });
      }

      // Check if ALL levels are complete for Civics Scholar
      const allLevelsDone = nextLevel > LEVELS.length;
      if (allLevelsDone) {
        if (!newBadges.some(b => b.id === 'civics-scholar')) {
          newBadges.push({
            id: 'civics-scholar',
            title: 'Civics Scholar',
            description: 'Mastered all levels!',
            icon: 'GraduationCap',
            awardedAt: new Date().toISOString()
          });
        }
      }
    }

    try {
      await updateDoc(userDocRef, {
        completedModules: newCompletedModules,
        currentLevel: nextLevel,
        badges: newBadges,
        lastActive: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const awardBadge = async (badgeId: string) => {
    if (!user || !profile) return;
    if (profile.badges.some(b => b.id === badgeId)) return;

    const userDocRef = doc(db, 'users', user.uid);
    const newBadge: Badge = {
      id: badgeId,
      title: '', // Titles/descriptions can be looked up from constants
      description: '',
      icon: '',
      awardedAt: new Date().toISOString()
    };

    try {
      await updateDoc(userDocRef, {
        badges: [...profile.badges, newBadge]
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, profile, loading, addXp, completeModule, awardBadge, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
