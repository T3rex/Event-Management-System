const { Event } = require("../models/index");

class EventRepository {
  constructor() {
    this.Event = Event;
  }

  async create(data) {
    try {
      const event = await this.Event.create(data);
      return event;
    } catch (error) {
      throw new Error("Error creating event: " + error.message);
    }
  }

  async getEventByProfileIds(profileIds) {
    try {
      const events = await this.Event.find({ profiles: { $in: profileIds } });
      return events;
    } catch (error) {
      throw new Error("Error fetching events: " + error.message);
    }
  }
}

module.exports = EventRepository;
