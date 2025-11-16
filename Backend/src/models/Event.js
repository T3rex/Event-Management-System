// models/Event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  profiles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  ],
  timezone: { type: String, required: true, default: "UTC" },
  startUTC: { type: Date, required: true },
  endUTC: { type: Date, required: true },

  createdAtUTC: { type: Date, default: Date.now },
  updatedAtUTC: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
