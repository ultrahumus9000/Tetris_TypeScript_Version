import create from "zustand";

export const useMusic = create((set, get) => ({
  music: false,
  playMusic: () => {
    set({ music: true });
  },
  stopMusic: () => {
    set({ music: false });
  },
}));
