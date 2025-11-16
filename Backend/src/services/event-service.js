const EventRepository = require("../repositories/event-repository");

class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
  }
  async createEvent(data) {
    try {
      const event = await this.eventRepository.create(data);
      return event;
    } catch (error) {
      throw new Error("Error in EventService createEvent: " + error.message);
    }
  }

  async getEventsByProfileIds(profileIds) {
    try {
      const events = await this.eventRepository.getEventByProfileIds(
        profileIds
      );
      return events;
    } catch (error) {
      throw new Error(
        "Error in EventService getEventsByProfileIds: " + error.message
      );
    }
  }
  async updateEvent(eventId, updateData) {
    try {
      const updatedEvent = await this.eventRepository.update(
        eventId,
        updateData
      );
      return updatedEvent;
    } catch (error) {
      throw new Error("Error in EventService updateEvent: " + error.message);
    }
  }
}
module.exports = EventService;
