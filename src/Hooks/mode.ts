import create from "zustand";

type Mode = {
  mode: string;
  toggleMode: () => void;
};

const useSwitch = create<Mode>((set, get) => ({
  mode: "Light",
  toggleMode: () => set({ mode: get().mode === "Light" ? "Dark" : "Light" }),
}));
export default useSwitch;
