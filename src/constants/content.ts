import { Level, TimelinePhase, Badge } from '../types';
import { Vote, Target, GraduationCap, Flame, Shield, Award, Map, History, Users, Globe } from 'lucide-react';

export const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Vote': return Vote;
    case 'Target': return Target;
    case 'GraduationCap': return GraduationCap;
    case 'Flame': return Flame;
    case 'Shield': return Shield;
    case 'Award': return Award;
    case 'Map': return Map;
    case 'History': return History;
    case 'Users': return Users;
    case 'Globe': return Globe;
    default: return Award;
  }
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Why Elections Matter",
    modules: [
      {
        id: "m1-1",
        title: "The Power of One Vote",
        description: "Learn how a single vote can change the course of a nation.",
        content: "Elections are the foundation of democracy. They allow citizens to choose who leads them and what policies are implemented. Every vote acts as a voice in the collective decision-making process.",
        xp: 50,
        quiz: [
          {
            id: "q1",
            text: "What is the primary purpose of an election?",
            options: ["To choose leaders", "To make money", "To delay decisions", "To increase population"],
            correctAnswer: 0,
            explanation: "Elections are held primarily to select representatives and leaders in a democratic system."
          },
          {
            id: "q1-2",
            text: "Which of these is a key feature of a fair election?",
            options: ["Only some people can vote", "Secret ballot", "Public voting", "Pre-determined winners"],
            correctAnswer: 1,
            explanation: "A secret ballot ensures that voters can make their choice without fear of intimidation."
          },
          {
            id: "q1-3",
            text: "What does 'Sovereignty' mean in a democracy?",
            options: ["Rules are made by kings", "Power belongs to the people", "Rules never change", "Only the wealthy govern"],
            correctAnswer: 1,
            explanation: "Popular sovereignty means that the authority of a state is created and sustained by the consent of its people."
          }
        ]
      },
      {
        id: "m1-2",
        title: "Democracy Basics",
        description: "Understanding the different forms of government.",
        content: "In a direct democracy, citizens vote on all laws. In a representative democracy (like most modern countries), citizens elect officials to make decisions on their behalf.",
        xp: 50,
        quiz: [
          {
            id: "q2",
            text: "What type of democracy involves electing officials to make laws?",
            options: ["Direct", "Representative", "Absolute Monarchy", "Autocracy"],
            correctAnswer: 1,
            explanation: "Most modern democracies use the representative model where citizens elect leaders to act on their behalf."
          },
          {
            id: "q2-2",
            text: "Where did democracy famously originate?",
            options: ["Ancient Rome", "Ancient Greece", "Modern USA", "Imperial China"],
            correctAnswer: 1,
            explanation: "Athens, Greece is often cited as the birthplace of democracy."
          },
          {
            id: "q2-3",
            text: "Which of these is NOT a pillar of democracy?",
            options: ["Justice", "Equality", "Dictatorship", "Liberty"],
            correctAnswer: 2,
            explanation: "Dictatorship is the opposite of a democratic system."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Types of Elections",
    modules: [
      {
        id: "m2-1",
        title: "General vs. Local",
        description: "National elections vs. municipal elections.",
        content: "General elections decide the national leadership, while local or municipal elections focus on immediate community issues like roads, schools, and sanitation.",
        xp: 75,
        quiz: [
          {
            id: "q3",
            text: "Which election affects your immediate neighborhood most directly?",
            options: ["General Election", "Presidential Election", "Local/Municipal Election", "Global Summit"],
            correctAnswer: 2,
            explanation: "Local elections focus on issues closer to home, like school boards and city councils."
          },
          {
            id: "q3-2",
            text: "How often do general elections usually occur in most democracies?",
            options: ["Every year", "Every 4-6 years", "Every 10 years", "Only when the leader wants"],
            correctAnswer: 1,
            explanation: "Most democracies have a fixed term of 4 to 6 years for national leadership."
          },
          {
            id: "q3-3",
            text: "Which of these is a common topic for local elections?",
            options: ["Nuclear treaties", "Zoning and land use", "Interstate trade", "Military alliance"],
            correctAnswer: 1,
            explanation: "Local governments handle community-specific issues like land use and zoning."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Election Process",
    modules: [
      {
        id: "m3-1",
        title: "Registration 101",
        description: "How to get on the voter roll.",
        content: "Voter registration is the first step. You must be of legal age (usually 18) and a citizen. This ensures that only eligible people vote and prevents fraud.",
        xp: 100,
        quiz: [
          {
            id: "q4-1",
            text: "What is the typical minimum age for voting in most democracies?",
            options: ["16", "21", "18", "25"],
            correctAnswer: 2,
            explanation: "In most countries, 18 is the standard age for voter eligibility."
          },
          {
            id: "q4-2",
            text: "Why is voter registration important?",
            options: ["To collect taxes", "To verify eligibility and prevent fraud", "To track people's movements", "To choose winners early"],
            correctAnswer: 1,
            explanation: "Registration ensures that only those who meet the legal requirements can cast a ballot."
          },
          {
            id: "q4-3",
            text: "What is usually required besides age for registration?",
            options: ["Owning property", "Citizenship", "Having a high income", "Being married"],
            correctAnswer: 1,
            explanation: "Citizenship is a standard requirement for voting in national elections."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Timeline & Phases",
    modules: [
      {
        id: "m4-1",
        title: "The Campaign Trail",
        description: "What happens before the voting day.",
        content: "Campaigning involves candidates sharing their plans, visions, and promises. It’s the time for voters to research and decide who aligns with their values.",
        xp: 100,
        quiz: [
          {
            id: "q5-1",
            text: "What is a key purpose of political campaigning?",
            options: ["To confuse voters", "To share plans and visions", "To hide information", "To stop the election"],
            correctAnswer: 1,
            explanation: "Campaigning is the process by which candidates present their platforms and persuade voters."
          },
          {
            id: "q5-2",
            text: "What is a 'manifesto' in an election?",
            options: ["A list of candidates", "A document detailing a party's promises/policies", "A type of ballot box", "A law passed by the commission"],
            correctAnswer: 1,
            explanation: "A manifesto outlines what a candidate or party intends to do if elected."
          },
          {
            id: "q5-3",
            text: "When does the 'silence period' usually occur?",
            options: ["A year before the election", "Right before voting begins", "During counting", "After results are out"],
            correctAnswer: 1,
            explanation: "Many countries have a silence period (no campaigning) 24-48 hours before polls open."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Your Role as a Voter",
    modules: [
      {
        id: "m5-1",
        title: "Ethical Voting",
        description: "Making an informed and fair choice.",
        content: "An ethical voter researches candidates, avoids misinformation, and votes based on policies rather than identity or peer pressure.",
        xp: 150,
        quiz: [
          {
            id: "q6-1",
            text: "What is one characteristic of an informed voter?",
            options: ["Voting based on peer pressure", "Ignoring policy manifestos", "Researching multiple candidates", "Spreading misinformation"],
            correctAnswer: 2,
            explanation: "An informed voter takes the time to research candidates and their proposed policies."
          },
          {
            id: "q6-2",
            text: "What should you do if you see political misinformation online?",
            options: ["Share it immediately", "Verify with credible sources", "Ignore it and hope it's true", "Assume it's always correct"],
            correctAnswer: 1,
            explanation: "Verifying information with cross-checked, credible sources is vital in a democracy."
          },
          {
            id: "q6-3",
            text: "Why is 'secret voting' important?",
            options: ["To hide from the law", "To prevent bribery and intimidation", "To save time", "Because public voting is too expensive"],
            correctAnswer: 1,
            explanation: "Secrets ballots protect voters from being pressured into voting for a specific candidate."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Global Democracy",
    modules: [
      {
        id: "m6-1",
        title: "Systems Around the World",
        description: "How different nations practice democracy.",
        content: "From proportional representation to first-past-the-post, different countries use various systems to ensure fair representation. Some use compulsory voting to ensure maximum participation.",
        xp: 200,
        quiz: [
          {
            id: "q7-1",
            text: "What is 'Compulsory Voting'?",
            options: ["Voting is optional", "Voting is required by law", "Only the military votes", "Voting is done by robots"],
            correctAnswer: 1,
            explanation: "In countries like Australia, voting is a legal requirement for citizens."
          },
          {
            id: "q7-2",
            text: "Which system awards seats based on the percentage of total votes received?",
            options: ["First-past-the-post", "Proportional Representation", "Dictatorship", "Monarchy"],
            correctAnswer: 1,
            explanation: "Proportional representation ensures that parties get a share of seats roughly equal to their share of the vote."
          },
          {
            id: "q7-3",
            text: "What is the primary goal of international election observers?",
            options: ["To choose the winner", "To ensure the process is free and fair", "To run the polling booths", "To count the money"],
            correctAnswer: 1,
            explanation: "Observers verify that the election process follows democratic standards and is transparent."
          }
        ]
      }
    ]
  }
];

export const TIMELINE: TimelinePhase[] = [
  {
    id: "announcement",
    title: "Announcement",
    description: "The election commission announces dates.",
    color: "bg-blue-500",
    details: "The formal start of the election cycle where rules (Model Code of Conduct) often kick in."
  },
  {
    id: "nominations",
    title: "Nominations",
    description: "Candidates file their papers.",
    color: "bg-indigo-500",
    details: "Potential leaders submit their credentials and affidavits for scrutiny."
  },
  {
    id: "campaign",
    title: "Campaigning",
    description: "Candidates talk to the people.",
    color: "bg-orange-500",
    details: "Rallies, manifestos, and public debates dominate this high-energy phase."
  },
  {
    id: "voting",
    title: "Voting Day",
    description: "Citizens cast their ballots.",
    color: "bg-green-600",
    details: "The most critical day where voters visit polling booths to record their choice."
  },
  {
    id: "counting",
    title: "Counting",
    description: "Electronic or manual tallying.",
    color: "bg-purple-600",
    details: "Votes are calculated under strict supervision of observers."
  },
  {
    id: "results",
    title: "Results",
    description: "Declaration of winners.",
    color: "bg-rose-600",
    details: "The final outcome is declared, and the transition of power begins."
  }
];

export const BADGES: Badge[] = [
  { id: "first-vote", title: "First Vote Ready", description: "Completed Level 1!", icon: "Vote" },
  { id: "ballot-master", title: "Ballot Master", description: "Completed Level 2!", icon: "Map" },
  { id: "polling-pro", title: "Polling Pro", description: "Completed Level 3!", icon: "Target" },
  { id: "informed-citizen", title: "Informed Citizen", description: "Completed Level 4!", icon: "Shield" },
  { id: "democracy-defender", title: "Democracy Defender", description: "Completed Level 5!", icon: "Users" },
  { id: "global-envoy", title: "Global Envoy", description: "Completed Level 6!", icon: "Globe" },
  { id: "civics-scholar", title: "Civics Scholar", description: "Mastered all levels!", icon: "GraduationCap" },
  { id: "streak-3", title: "Consistency King", description: "Learned for 3 consecutive days.", icon: "Flame" }
];
