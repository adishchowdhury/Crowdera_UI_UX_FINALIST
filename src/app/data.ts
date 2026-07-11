export type Screen =
  | 'splash'
  | 'onboarding'
  | 'landing'
  | 'auth'
  | 'home'
  | 'cause'
  | 'donate'
  | 'thanks'
  | 'timeline'
  | 'profile'

export interface Milestone {
  id: string
  date: string
  title: string
  description: string
  mood: string
  image?: string
  unlocked: boolean
  type: 'donation' | 'delivery' | 'achievement' | 'moment' | 'milestone'
}

export interface JournalEntry {
  id: string
  date: string
  text: string
  image?: string
  type: 'text' | 'photo' | 'voice'
  emotion: string
}

export interface ImpactTier {
  amount: string
  result: string
  chapter: string
}

export interface Cause {
  id: string
  name: string
  person: string
  age: number
  tag: string
  tagColor: string
  location: string
  heroImage: string
  personImage: string
  raised: number
  goal: number
  backers: number
  shortDesc: string
  description: string
  chapter: number
  totalChapters: number
  lastUpdate: string
  lastUpdateText: string
  impact: ImpactTier[]
  milestones: Milestone[]
  journalEntries: JournalEntry[]
}

export const CAUSES: Cause[] = [
  {
    id: 'riya',
    name: "Riya's Education",
    person: "Riya Sharma",
    age: 12,
    tag: "Education",
    tagColor: "#00e87c",
    location: "Rajasthan, India",
    heroImage: "https://images.unsplash.com/photo-1627423896085-e3e694d88e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    personImage: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 48500,
    goal: 75000,
    backers: 847,
    shortDesc: "Riya walked 8km daily to reach her dream. Your support brought school to her village.",
    description: "Born in a village with no school, Riya walked 8km each way for years just to attend classes. At 12, she still dreams of becoming a teacher. Your support funds a community school — so she never has to walk alone again.",
    chapter: 5,
    totalChapters: 8,
    lastUpdate: "Yesterday",
    lastUpdateText: "Riya scored 94% in semester exams! She called it 'the best day of her life' 🌟",
    impact: [
      { amount: "₹200", result: "Stationery for 2 children", chapter: "Unlocks Chapter 1" },
      { amount: "₹500", result: "School books for one child", chapter: "Unlocks Chapter 2" },
      { amount: "₹1,000", result: "One month's education expenses", chapter: "Unlocks Chapter 3" },
      { amount: "₹2,500", result: "Full term materials for a class", chapter: "Unlocks All Chapters" },
    ],
    milestones: [
      {
        id: 'm1',
        date: 'Mar 15, 2024',
        title: 'The Journey Begins',
        description: "Your donation arrived. Riya didn't know it yet, but someone halfway around the world had just decided she deserved a future.",
        mood: '💚',
        image: "https://images.unsplash.com/photo-1627423896085-e3e694d88e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'donation'
      },
      {
        id: 'm2',
        date: 'Apr 3, 2024',
        title: 'Books Ordered',
        description: "150 textbooks ordered for the first batch of students. Riya's name is on the list.",
        mood: '📚',
        image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'delivery'
      },
      {
        id: 'm3',
        date: 'May 10, 2024',
        title: 'Books Delivered',
        description: "The truck arrived at 7am. Children ran to meet it. Riya held her first new textbook and pressed it to her chest.",
        mood: '🎒',
        image: "https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'delivery'
      },
      {
        id: 'm4',
        date: 'Jun 1, 2024',
        title: 'First School Day',
        description: "Riya walked into the new classroom not as a visitor, but as a student. She sat in the front row.",
        mood: '🏫',
        image: "https://images.unsplash.com/photo-1632932693914-89b90ae3d16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'milestone'
      },
      {
        id: 'm5',
        date: 'Aug 18, 2024',
        title: "Riya's First Drawing",
        description: "She drew a butterfly. She said, 'It's me — free.' Her teacher photographed it and sent it to us.",
        mood: '🦋',
        image: "https://images.unsplash.com/photo-1547496613-4e19af6736dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'moment'
      },
      {
        id: 'm6',
        date: 'Mar 10, 2025',
        title: 'Semester Complete — 94%',
        description: "Riya scored 94% in her first term. She wants to be a mathematics teacher now.",
        mood: '⭐',
        unlocked: false,
        type: 'achievement'
      },
      {
        id: 'm7',
        date: 'Jul 2025',
        title: 'Class Representative',
        description: "Coming next — Riya is running for class representative...",
        mood: '🗳️',
        unlocked: false,
        type: 'milestone'
      },
      {
        id: 'm8',
        date: 'Dec 2025',
        title: 'Graduation — Primary School',
        description: "The final chapter. Riya graduates primary school.",
        mood: '🎓',
        unlocked: false,
        type: 'achievement'
      },
    ],
    journalEntries: [
      {
        id: 'j1',
        date: 'Jun 1, 2024',
        text: "Today Riya read her first storybook out loud. She stumbled on some words but didn't stop. She never stops.",
        image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=800",
        type: 'photo',
        emotion: '😊'
      },
      {
        id: 'j2',
        date: 'Aug 18, 2024',
        text: "Riya drew a butterfly in art class. She named it 'Freedom'. She said that's what school feels like.",
        type: 'text',
        emotion: '🦋'
      },
      {
        id: 'j3',
        date: 'Dec 5, 2024',
        text: "She helped two younger students with their homework today. At 12, she's already becoming the teacher she dreams of being.",
        image: "https://images.unsplash.com/photo-1627423896085-e3e694d88e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGpveSUyMEFmcmljYXxlbnwxfHx8fDE3ODM3NTcwNzN8MA&ixlib=rb-4.1.0&q=80&w=800",
        type: 'photo',
        emotion: '💙'
      },
    ]
  },
  {
    id: 'aman',
    name: "Aman's Reforestation",
    person: "Aman Verma",
    age: 24,
    tag: "Environment",
    tagColor: "#4ade80",
    location: "Himachal Pradesh, India",
    heroImage: "https://images.unsplash.com/photo-1760624683181-7570791efd52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    personImage: "https://images.unsplash.com/photo-1758599668360-48ba8ba71b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 32000,
    goal: 60000,
    backers: 512,
    shortDesc: "Aman planted his first tree at 10. Now he's leading a mission to restore 10,000 acres of forest.",
    description: "Aman grew up watching the forests of Himachal Pradesh shrink. At 24, he's organized a community of 200 villagers to replant what was lost. Your support funds seedlings, tools, and hope.",
    chapter: 3,
    totalChapters: 6,
    lastUpdate: "2 days ago",
    lastUpdateText: "Aman planted the 5,000th tree today! The hill is turning green again 🌳",
    impact: [
      { amount: "₹200", result: "Plants 5 native saplings", chapter: "Unlocks Chapter 1" },
      { amount: "₹500", result: "Plants 15 saplings + irrigation", chapter: "Unlocks Chapter 2" },
      { amount: "₹1,000", result: "Restores 0.5 acres of forest", chapter: "Unlocks Chapter 3" },
      { amount: "₹2,500", result: "Full acre restoration + monitoring", chapter: "Unlocks All Chapters" },
    ],
    milestones: [
      {
        id: 'm1',
        date: 'Jan 10, 2024',
        title: 'First 500 Trees',
        description: "Aman and 20 volunteers planted the first 500 saplings on the barren hillside.",
        mood: '🌱',
        image: "https://images.unsplash.com/photo-1760624683181-7570791efd52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'milestone'
      },
      {
        id: 'm2',
        date: 'Mar 22, 2024',
        title: '2,000 Trees — Earth Day',
        description: "On Earth Day, the community gathered. Aman led 80 volunteers. The hill is showing the first patches of green.",
        mood: '🌍',
        image: "https://images.unsplash.com/photo-1758599668360-48ba8ba71b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'achievement'
      },
      {
        id: 'm3',
        date: 'Jun 15, 2024',
        title: '5,000 Trees',
        description: "A milestone nobody thought possible. The first birds returned to nest in the restored forest.",
        mood: '🦅',
        image: "https://images.unsplash.com/photo-1769501379161-4a4a43c2c4c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'moment'
      },
      {
        id: 'm4',
        date: 'Dec 2024',
        title: '10,000 Trees',
        description: "The halfway point. Aman says the forest is remembering how to breathe.",
        mood: '🌲',
        unlocked: false,
        type: 'milestone'
      },
    ],
    journalEntries: [
      {
        id: 'j1',
        date: 'Mar 22, 2024',
        text: "Today Aman planted his 2,000th tree. He said, 'Each one is a letter to the future. I hope they write back.'",
        image: "https://images.unsplash.com/photo-1760624683181-7570791efd52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3QlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc4Mzc1NzA3OHww&ixlib=rb-4.1.0&q=80&w=800",
        type: 'photo',
        emotion: '🌱'
      },
      {
        id: 'j2',
        date: 'Jun 16, 2024',
        text: "A family of birds moved into the restored grove this morning. Aman watched them for an hour. No words.",
        type: 'text',
        emotion: '🦅'
      },
    ]
  },
  {
    id: 'fatima',
    name: "Fatima's Health Journey",
    person: "Fatima Shaikh",
    age: 34,
    tag: "Healthcare",
    tagColor: "#f59e0b",
    location: "Maharashtra, India",
    heroImage: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    personImage: "https://images.unsplash.com/photo-1583971663176-dd7180de1b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 61000,
    goal: 80000,
    backers: 1204,
    shortDesc: "Fatima runs the only women's health clinic in 3 villages. She's treated 400+ families who had nowhere else to turn.",
    description: "Fatima gave up a city career to return to her village and open a health clinic. For 3 years, she's been the only medical professional within 40km. Your support keeps her clinic open and medicine stocked.",
    chapter: 6,
    totalChapters: 7,
    lastUpdate: "3 days ago",
    lastUpdateText: "Fatima scored 92% in her advanced medical certification exam! 🎉",
    impact: [
      { amount: "₹200", result: "Medicines for one family", chapter: "Unlocks Chapter 1" },
      { amount: "₹500", result: "Full checkup for 5 patients", chapter: "Unlocks Chapter 2" },
      { amount: "₹1,000", result: "Emergency medical kit", chapter: "Unlocks Chapter 3" },
      { amount: "₹2,500", result: "Monthly clinic operations", chapter: "Unlocks All Chapters" },
    ],
    milestones: [
      {
        id: 'm1',
        date: 'Feb 1, 2024',
        title: 'Clinic Opens',
        description: "After 6 months of construction, Fatima's clinic opens its doors. The first patient arrives within minutes.",
        mood: '🏥',
        image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'milestone'
      },
      {
        id: 'm2',
        date: 'Apr 20, 2024',
        title: '100 Patients Treated',
        description: "100 people have now received care they couldn't afford before. Fatima works 14-hour days without complaint.",
        mood: '💊',
        image: "https://images.unsplash.com/photo-1583971663176-dd7180de1b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'achievement'
      },
      {
        id: 'm3',
        date: 'Jul 8, 2024',
        title: '400 Families Helped',
        description: "The clinic now serves 400 families across 3 villages. A volunteer nurse joined from the city.",
        mood: '❤️',
        image: "https://images.unsplash.com/photo-1509099896299-af46ad97ff57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        unlocked: true,
        type: 'achievement'
      },
      {
        id: 'm4',
        date: 'Jan 2025',
        title: 'Advanced Certification',
        description: "Fatima passed her advanced medical certification — she can now handle complex cases.",
        mood: '🎓',
        unlocked: false,
        type: 'milestone'
      },
    ],
    journalEntries: [
      {
        id: 'j1',
        date: 'Apr 20, 2024',
        text: "Today Fatima held a new mother's baby while she signed the discharge papers. The baby's name is Fatima too. The mother said, 'So she grows up brave like you.'",
        image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwdmlsbGFnZSUyMGhvcGV8ZW58MXx8fHwxNzgzNzU3MDc3fDA&ixlib=rb-4.1.0&q=80&w=800",
        type: 'photo',
        emotion: '💙'
      },
      {
        id: 'j2',
        date: 'Jul 8, 2024',
        text: "Fatima scored 92% in her medical certification exam today. She cried in the parking lot, then went straight back to the clinic.",
        type: 'text',
        emotion: '🌟'
      },
    ]
  }
]

export const USER = {
  name: "Arjun",
  avatar: "A",
  livesTouched: 47,
  journeysFollowing: 3,
  streak: 34,
  totalDonated: 8500,
  badges: [
    { id: 'b1', name: 'Story Starter', icon: '📖', description: 'Followed your first story', unlocked: true },
    { id: 'b2', name: 'Chapter Champion', icon: '🏆', description: 'Unlocked 5 story chapters', unlocked: true },
    { id: 'b3', name: 'Monthly Guardian', icon: '🛡️', description: '30-day giving streak', unlocked: true },
    { id: 'b4', name: 'Life Changer', icon: '✨', description: 'Touched 50 lives', unlocked: false },
    { id: 'b5', name: 'Season Keeper', icon: '🌿', description: 'Followed a story for 6 months', unlocked: false },
    { id: 'b6', name: 'Voice Donor', icon: '🎙️', description: 'Sent a voice message', unlocked: false },
  ]
}
