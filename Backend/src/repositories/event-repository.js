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
      const events = await this.Event.find({
        profiles: { $in: profileIds },
      }).populate("profiles");
      return events;
    } catch (error) {
      throw new Error("Error fetching events: " + error.message);
    }
  }

  async update(eventId, updateData) {
    try {
      const updatedEvent = await this.Event.findByIdAndUpdate(
        eventId,
        updateData,
        { new: true }
      ).populate("profiles");
      return updatedEvent;
    } catch (error) {
      throw new Error("Error updating event: " + error.message);
    }
  }
}

module.exports = EventRepository;
