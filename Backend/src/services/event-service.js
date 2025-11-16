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
}
module.exports = EventService;
