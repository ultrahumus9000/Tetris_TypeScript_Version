import create from "zustand";

type Music = {
  music: boolean;
  playMusic: () => void;
  stopMusic: () => void;
};

export const useMusic = create<Music>((set, get) => ({
  music: false,
  playMusic: () => {
    set({ music: true });
  },
  stopMusic: () => {
    set({ music: false });
  },
}));
