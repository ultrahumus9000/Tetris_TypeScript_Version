import create from "zustand";

export const useGameHistory = create((set, get) => ({
  history: [],
  fetchHistory: () => {
    fetch(" http://localhost:4000/score")
      .then((resp) => resp.json())
      .then((historyFromServer) => {
        set({ history: historyFromServer });
      });
  },
}));
