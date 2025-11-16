import { create } from "zustand";

const useEvent = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
export default useEvent;
