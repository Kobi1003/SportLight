export type Player = {
  id: string;
  name: string;
  avatar: string;
  sport: 'Football' | 'Basketball' | 'Tennis';
  age: number;
  location: string;
  skills: string[];
  verified: boolean;
  achievementsText: string;
  achievementsImage: string;
};

export const players: Player[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://picsum.photos/id/237/200/200',
    sport: 'Football',
    age: 22,
    location: 'London, UK',
    skills: ['Dribbling', 'Passing', 'Shooting'],
    verified: true,
    achievementsText: 'A dynamic forward with a knack for scoring crucial goals. I have been playing since I was 5 and have won multiple local tournaments.',
    achievementsImage: 'https://picsum.photos/seed/achievement1/400/300'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: 'https://picsum.photos/id/1027/200/200',
    sport: 'Basketball',
    age: 19,
    location: 'Madrid, Spain',
    skills: ['Shooting', 'Defense', 'Playmaking'],
    verified: true,
    achievementsText: 'Point guard with exceptional court vision and leadership skills. Ready to take my game to the professional level.',
    achievementsImage: 'https://picsum.photos/seed/achievement2/400/300'
  },
  {
    id: '3',
    name: 'Chen Wei',
    avatar: 'https://picsum.photos/id/1012/200/200',
    sport: 'Tennis',
    age: 24,
    location: 'Shanghai, China',
    skills: ['Forehand', 'Serve', 'Volley'],
    verified: false,
    achievementsText: 'Aggressive baseliner with a powerful forehand. Seeking a club to further develop my skills and compete internationally.',
    achievementsImage: 'https://picsum.photos/seed/achievement3/400/300'
  },
  {
    id: '4',
    name: 'Sam Miller',
    avatar: 'https://picsum.photos/id/1005/200/200',
    sport: 'Football',
    age: 20,
    location: 'New York, USA',
    skills: ['Tackling', 'Heading', 'Positioning'],
    verified: true,
    achievementsText: 'A rock-solid defender with great game-reading abilities. Captain of my college team for two consecutive years.',
    achievementsImage: 'https://picsum.photos/seed/achievement4/400/300'
  },
  {
    id: '5',
    name: 'Fatima Al-Fassi',
    avatar: 'https://picsum.photos/id/1011/200/200',
    sport: 'Basketball',
    age: 21,
    location: 'Rabat, Morocco',
    skills: ['Rebounding', 'Blocking', 'Post Moves'],
    verified: false,
    achievementsText: 'Dominant center with a strong presence in the paint. I excel at rebounding and protecting the rim.',
    achievementsImage: 'https://picsum.photos/seed/achievement5/400/300'
  },
  {
    id: '6',
    name: 'Kenji Tanaka',
    avatar: 'https://picsum.photos/id/338/200/200',
    sport: 'Tennis',
    age: 23,
    location: 'Tokyo, Japan',
    skills: ['Backhand', 'Slice', 'Footwork'],
    verified: true,
    achievementsText: 'A strategic player with a versatile all-court game. My two-handed backhand is my biggest weapon.',
    achievementsImage: 'https://picsum.photos/seed/achievement6/400/300'
  },
    {
    id: '7',
    name: 'Liam Smith',
    avatar: 'https://picsum.photos/id/433/200/200',
    sport: 'Football',
    age: 18,
    location: 'Manchester, UK',
    skills: ['Pace', 'Finishing', 'Agility'],
    verified: false,
    achievementsText: 'Lightning-fast winger who loves to take on defenders. Top scorer in my youth league last season.',
    achievementsImage: 'https://picsum.photos/seed/achievement7/400/300'
  },
  {
    id: '8',
    name: 'Chloe Williams',
    avatar: 'https://picsum.photos/id/669/200/200',
    sport: 'Basketball',
    age: 20,
    location: 'Los Angeles, USA',
    skills: ['3-Point Shooting', 'Ball Handling', 'Speed'],
    verified: true,
    achievementsText: 'Sharpshooter with deep range and quick release. Confident in my ability to spread the floor and create opportunities.',
    achievementsImage: 'https://picsum.photos/seed/achievement8/400/300'
  },
];
