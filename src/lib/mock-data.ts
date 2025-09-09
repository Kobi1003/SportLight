export type Player = {
  id: string;
  name: string;
  avatar: string;
  sport: 'Football' | 'Basketball' | 'Tennis' | 'Cricket' | 'Long Jump' | 'High Jump' | 'Archery' | 'Shooting' | 'Badminton' | 'Javelin';
  age: number;
  location: string;
  height: number;
  weight: number;
  gender: 'Male' | 'Female';
  dreamClub: string;
  skills: string[];
  verified: boolean;
  achievementsText: string;
  achievementsImage: string;
};

export const players: Player[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    avatar: 'https://picsum.photos/id/237/200/200',
    sport: 'Cricket',
    age: 22,
    location: 'Mumbai, India',
    height: 180,
    weight: 75,
    gender: 'Male',
    dreamClub: 'Mumbai Indians',
    skills: ['Batting', 'Pace Bowling', 'Fielding'],
    verified: true,
    achievementsText: 'A dynamic all-rounder with a knack for scoring crucial runs. I have been playing since I was 8 and have won multiple state-level tournaments.',
    achievementsImage: 'https://picsum.photos/seed/achievement1/400/300'
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'https://picsum.photos/id/1027/200/200',
    sport: 'Badminton',
    age: 19,
    location: 'Hyderabad, India',
    height: 175,
    weight: 68,
    gender: 'Female',
    dreamClub: 'Awadhe Warriors',
    skills: ['Smash', 'Net Play', 'Drop Shot'],
    verified: true,
    achievementsText: 'Singles player with exceptional court coverage and leadership skills. Ready to take my game to the professional level.',
    achievementsImage: 'https://picsum.photos/seed/achievement2/400/300'
  },
  {
    id: '3',
    name: 'Rohan Kumar',
    avatar: 'https://picsum.photos/id/1012/200/200',
    sport: 'Football',
    age: 24,
    location: 'Kolkata, India',
    height: 185,
    weight: 80,
    gender: 'Male',
    dreamClub: 'FC Barcelona',
    skills: ['Dribbling', 'Passing', 'Finishing'],
    verified: false,
    achievementsText: 'Aggressive forward with a powerful shot. Seeking a club to further develop my skills and compete in the national league.',
    achievementsImage: 'https://picsum.photos/seed/achievement3/400/300'
  },
  {
    id: '4',
    name: 'Saanvi Reddy',
    avatar: 'https://picsum.photos/id/1005/200/200',
    sport: 'Archery',
    age: 20,
    location: 'Delhi, India',
    height: 178,
    weight: 72,
    gender: 'Female',
    dreamClub: 'Hyundai Archery',
    skills: ['Targeting', 'Consistency', 'Focus'],
    verified: true,
    achievementsText: 'A rock-solid archer with great precision. Captain of my university team for two consecutive years.',
    achievementsImage: 'https://picsum.photos/seed/achievement4/400/300'
  },
  {
    id: '5',
    name: 'Aditya Singh',
    avatar: 'https://picsum.photos/id/1011/200/200',
    sport: 'Javelin',
    age: 21,
    location: 'Pune, India',
    height: 190,
    weight: 85,
    gender: 'Male',
    dreamClub: 'Athletics Federation of India',
    skills: ['Throwing Power', 'Technique', 'Run-up'],
    verified: false,
    achievementsText: 'Dominant thrower with a strong presence. I excel at achieving long distances and have a personal best of 85 meters.',
    achievementsImage: 'https://picsum.photos/seed/achievement5/400/300'
  },
  {
    id: '6',
    name: 'Diya Gupta',
    avatar: 'https://picsum.photos/id/338/200/200',
    sport: 'Tennis',
    age: 23,
    location: 'Bangalore, India',
    height: 170,
    weight: 65,
    gender: 'Female',
    dreamClub: 'Sania Mirza Tennis Academy',
    skills: ['Backhand', 'Slice', 'Footwork'],
    verified: true,
    achievementsText: 'A strategic player with a versatile all-court game. My two-handed backhand is my biggest weapon.',
    achievementsImage: 'https://picsum.photos/seed/achievement6/400/300'
  },
    {
    id: '7',
    name: 'Vihaan Joshi',
    avatar: 'https://picsum.photos/id/433/200/200',
    sport: 'Football',
    age: 18,
    location: 'Goa, India',
    height: 182,
    weight: 78,
    gender: 'Male',
    dreamClub: 'Real Madrid',
    skills: ['Pace', 'Finishing', 'Agility'],
    verified: false,
    achievementsText: 'Lightning-fast winger who loves to take on defenders. Top scorer in my youth league last season.',
    achievementsImage: 'https://picsum.photos/seed/achievement7/400/300'
  },
  {
    id: '8',
    name: 'Ananya Iyer',
    avatar: 'https://picsum.photos/id/669/200/200',
    sport: 'Basketball',
    age: 20,
    location: 'Chennai, India',
    height: 168,
    weight: 62,
    gender: 'Female',
    dreamClub: 'Los Angeles Lakers',
    skills: ['3-Point Shooting', 'Ball Handling', 'Speed'],
    verified: true,
    achievementsText: 'Sharpshooter with deep range and quick release. Confident in my ability to spread the floor and create opportunities.',
    achievementsImage: 'https://picsum.photos/seed/achievement8/400/300'
  },
];
