import create from "zustand";

const useSwitch = create((set, get) => ({
  mode: "Light",
  toggleMode: () => set({ mode: get().mode === "Light" ? "Dark" : "Light" }),
}));
export default useSwitch;
