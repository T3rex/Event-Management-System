import { create } from "zustand";

const useEvent = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  updateEvent: (updatedEvent) =>
    set((state) => {
      const updatedEvents = state.events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      return { events: updatedEvents };
    }),
}));
export default useEvent;
