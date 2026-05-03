export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: Question[];
  xp: number;
}

export interface Level {
  id: number;
  title: string;
  modules: Module[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  xp: number;
  streak: number;
  lastActive: string;
  completedModules: string[];
  badges: Badge[];
  currentLevel: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  awardedAt?: string;
}

export interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  date?: string;
  color: string;
  details: string;
}
