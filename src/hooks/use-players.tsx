"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Player } from "@/lib/mock-data";

type PlayersContextType = {
  players: Player[];
  setPlayers: (players: Player[] | ((prev: Player[]) => Player[])) => void;
  addPlayer: (player: Player) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => {
      // If the existing list contains only mock data, replace it.
      // A simple way to check is if the first player has a low integer ID.
      const isMockData = prevPlayers.length > 0 && Number(prevPlayers[0].id) < 10;
      if (isMockData) {
        return [player];
      }
      return [player, ...prevPlayers];
    });
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
