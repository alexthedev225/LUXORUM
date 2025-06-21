import { create } from "zustand";

export interface SettingsState {
  siteName: string | null;
  siteDescription: string | null;
  maintenanceMode: boolean | null;
  theme: "dark" | "light" | null;
  language: string | null;
  setSettings: (settings: Partial<Omit<SettingsState, "setSettings">>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  siteName: null,
  siteDescription: null,
  maintenanceMode: null,
  theme: null,
  language: null,
  setSettings: (settings) =>
    set((state) => ({
      ...state,
      ...settings,
    })),
}));
