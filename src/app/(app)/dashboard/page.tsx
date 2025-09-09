"use client";

import { players as initialPlayers } from '@/lib/mock-data';
import { PlayerDashboard } from '@/components/dashboard/player-dashboard';
import { usePlayers } from '@/hooks/use-players';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { players, setPlayers } = usePlayers();

  useEffect(() => {
    // Load initial players if the player list is empty
    if (players.length === 0) {
      setPlayers(initialPlayers);
    }
  }, [players, setPlayers]);

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
