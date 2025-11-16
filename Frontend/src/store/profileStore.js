import { create } from "zustand";

const useProfile = create((set) => ({
  profiles: [],
  currentProfiles: [],
  selectedProfiles: [],
  setProfiles: (profiles) => set({ profiles }),
  setCurrentProfiles: (profiles) => set({ currentProfiles: profiles }),
  setSelectedProfiles: (profiles) => set({ selectedProfiles: profiles }),
  addProfile: (profile) =>
    set((state) => ({ ...state, profiles: [...state.profiles, profile] })),
  addCurrentProfile: (profile) =>
    set((state) => ({
      ...state,
      currentProfiles: [...state.currentProfiles, profile],
    })),
  addSelectedProfile: (profile) =>
    set((state) => ({
      ...state,
      selectedProfiles: [...state.selectedProfiles, profile],
    })),
}));

export default useProfile;
