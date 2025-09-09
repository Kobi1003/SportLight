export type Player = {
  id: string;
  name: string;
  avatar: string;
  sport: 'Football' | 'Basketball' | 'Tennis';
  age: number;
  location: string;
  skills: string[];
  verified: boolean;
  bio: string;
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
    bio: 'A dynamic forward with a knack for scoring crucial goals. I have been playing since I was 5 and have won multiple local tournaments.',
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
    bio: 'Point guard with exceptional court vision and leadership skills. Ready to take my game to the professional level.',
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
    bio: 'Aggressive baseliner with a powerful forehand. Seeking a club to further develop my skills and compete internationally.',
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
    bio: 'A rock-solid defender with great game-reading abilities. Captain of my college team for two consecutive years.',
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
    bio: 'Dominant center with a strong presence in the paint. I excel at rebounding and protecting the rim.',
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
    bio: 'A strategic player with a versatile all-court game. My two-handed backhand is my biggest weapon.',
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
    bio: 'Lightning-fast winger who loves to take on defenders. Top scorer in my youth league last season.',
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
    bio: 'Sharpshooter with deep range and quick release. Confident in my ability to spread the floor and create opportunities.',
  },
];
