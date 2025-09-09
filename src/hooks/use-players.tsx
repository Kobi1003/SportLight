"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Player, players as initialPlayers } from "@/lib/mock-data";

const PLAYERS_STORAGE_KEY = "sportlight-players";

type PlayersContextType = {
  players: Player[];
  setPlayers: (players: Player[] | ((prev: Player[]) => Player[])) => void;
  addPlayer: (player: Player) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayersState] = useState<Player[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This effect runs once on mount to load from localStorage.
    try {
      const storedPlayers = localStorage.getItem(PLAYERS_STORAGE_KEY);
      if (storedPlayers) {
        setPlayersState(JSON.parse(storedPlayers));
      } else {
        // If no players in storage, load mock data as a default.
        setPlayersState(initialPlayers);
      }
    } catch (error) {
      console.error("Failed to load players from localStorage", error);
      // Fallback to mock data if there's an error.
      setPlayersState(initialPlayers);
    } finally {
        setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    // This effect runs whenever `players` state changes, to save to localStorage.
    if (isInitialized) {
        try {
            localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
        } catch (error) {
            console.error("Failed to save players to localStorage", error);
        }
    }
  }, [players, isInitialized]);

  const addPlayer = (player: Player) => {
    setPlayersState((prevPlayers) => [player, ...prevPlayers]);
  };

  const setPlayers = (newPlayers: Player[] | ((prev: Player[]) => Player[])) => {
    setPlayersState(newPlayers);
  }

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
