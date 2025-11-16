const {
  createProfile,
  getProfile,
} = require("../../controllers/profile-controller");

const express = require("express");
const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfile);

module.exports = router;
