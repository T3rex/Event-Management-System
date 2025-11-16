const EventService = require("../services/event-service");

const eventService = new EventService();

async function createEvent(req, res) {
  try {
    console.log("Received event data:", req.body);
    const eventData = req.body;
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getEvents(req, res) {
  try {
    const profileIds = req.query.profileIds
      ? req.query.profileIds.split(",")
      : [];
    console.log("Fetching events for profile IDs:", profileIds);
    const events = await eventService.getEventsByProfileIds(profileIds);
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateEvent(req, res) {
  try {
    const eventId = req.params.id;
    const updateData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId, updateData);
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
};
