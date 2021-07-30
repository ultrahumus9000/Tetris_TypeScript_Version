import create from "zustand";

export type Score = {
  id: number;
  history: number;
};
type History = {
  history: Score[];
  fetchHistory: () => void;
};

export const useGameHistory = create<History>((set, get) => ({
  history: [],
  fetchHistory: () => {
    fetch(" http://localhost:4000/score")
      .then((resp) => resp.json())
      .then((historyFromServer) => {
        set({ history: historyFromServer });
      });
  },
}));
