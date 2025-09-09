"use client";

import { PlayerDashboard } from '@/components/dashboard/player-dashboard';
import { usePlayers } from '@/hooks/use-players';

export default function DashboardPage() {
  const { players } = usePlayers();

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Player Dashboard</h1>
        <p className="text-muted-foreground">Discover talented players from around the world.</p>
      </div>
      <PlayerDashboard players={players} />
    </div>
  );
}
