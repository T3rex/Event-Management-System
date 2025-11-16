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

module.exports = {
  createEvent,
};
