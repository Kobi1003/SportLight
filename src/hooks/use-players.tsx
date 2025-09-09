"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Player } from "@/lib/mock-data";

type PlayersContextType = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [player, ...prevPlayers]);
  };

  return (
    <PlayersContext.Provider value={{ players, setPlayers, addPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
}
