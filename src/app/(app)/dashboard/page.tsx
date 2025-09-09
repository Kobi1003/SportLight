import { players } from '@/lib/mock-data';
import { PlayerDashboard } from '@/components/dashboard/player-dashboard';

export default function DashboardPage() {
  // In a real app, this data would be fetched from a database.
  const allPlayers = players;

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Player Dashboard</h1>
        <p className="text-muted-foreground">Discover talented players from around the world.</p>
      </div>
      <PlayerDashboard players={allPlayers} />
    </div>
  );
}
