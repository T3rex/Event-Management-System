const express = require("express");
const profileRoutes = require("./profileRoutes");
const eventRoutes = require("./eventRoutes");
const router = express.Router();

router.use("/profile", profileRoutes);
router.use("/event", eventRoutes);
module.exports = router;
