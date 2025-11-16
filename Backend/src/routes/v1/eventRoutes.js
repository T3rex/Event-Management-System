const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
} = require("../../controllers/event-controller");

router.post("/", createEvent);
router.get("/", getEvents);
router.put("/:id", updateEvent);

module.exports = router;
