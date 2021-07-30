import create from "zustand";

type Game = {
  gameOver: boolean;
  stopGame: () => void;
  startGame: () => void;
};

const useGame = create<Game>((set, get) => ({
  gameOver: false,
  stopGame: () => set({ gameOver: true }),
  startGame: () => set({ gameOver: false }),
}));

export default useGame;
