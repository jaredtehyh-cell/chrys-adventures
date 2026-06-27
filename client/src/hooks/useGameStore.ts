import { useState } from 'react';
import { Player } from '../lib/gameData';

const STORAGE_KEY = 'chrys_adventures_players';
const CURRENT_PLAYER_KEY = 'chrys_adventures_current_player';

function loadPlayers(): Player[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadCurrentPlayerId(): string | null {
  try {
    return localStorage.getItem(CURRENT_PLAYER_KEY);
  } catch {
    return null;
  }
}

export function useGameStore() {
  // Load synchronously so currentPlayer is available on the very first render
  const [players, setPlayers] = useState<Player[]>(() => loadPlayers());
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(() => loadCurrentPlayerId());

  const savePlayers = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlayers));
  };

  const createPlayer = (name: string, avatar: Player['avatar']) => {
    const newPlayer: Player = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      avatar,
      starsTotal: 0,
      progress: {
        numbers: { completed: false, stars: 0, lessonsCompleted: [] },
        operations: { completed: false, stars: 0, lessonsCompleted: [] },
        realworld: { completed: false, stars: 0, lessonsCompleted: [] },
        testNumbers: { completed: false, stars: 0, score: 0 },
        testOperations: { completed: false, stars: 0, score: 0 },
        testRealworld: { completed: false, stars: 0, score: 0 },
        testFinal: { completed: false, stars: 0, score: 0 },
      }
    };
    const newPlayers = [...players, newPlayer];
    savePlayers(newPlayers);
    selectPlayer(newPlayer.id);
    return newPlayer;
  };

  const selectPlayer = (id: string) => {
    setCurrentPlayerId(id);
    localStorage.setItem(CURRENT_PLAYER_KEY, id);
  };

  const updateProgress = (
    section: keyof Player['progress'],
    updates: Partial<Player['progress'][keyof Player['progress']]>
  ) => {
    if (!currentPlayerId) return;

    let earnedStars = 0;

    const newPlayers = players.map(p => {
      if (p.id === currentPlayerId) {
        const newProgress = { ...p.progress };
        const currentSection = { ...newProgress[section] };

        if ('stars' in updates && typeof updates.stars === 'number') {
          const oldStars = currentSection.stars;
          const newStars = updates.stars;
          if (newStars > oldStars) {
            earnedStars = newStars - oldStars;
          }
        }

        // @ts-ignore
        newProgress[section] = { ...currentSection, ...updates };

        return {
          ...p,
          starsTotal: p.starsTotal + earnedStars,
          progress: newProgress
        };
      }
      return p;
    });

    savePlayers(newPlayers);
  };

  return {
    players,
    currentPlayer: players.find(p => p.id === currentPlayerId) || null,
    createPlayer,
    selectPlayer,
    updateProgress,
  };
}
