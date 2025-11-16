import { create } from "zustand";

const useEvent = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),
}));
export default useEvent;
