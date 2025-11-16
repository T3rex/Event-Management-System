const ProfileService = require("../services/profile-service");

const profileService = new ProfileService();

async function createProfile(req, res) {
  try {
    console.log("Request Body:", req.body);
    const profile = await profileService.createProfile(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getProfile(req, res) {
  try {
    const profile = await profileService.getProfile();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createProfile,
  getProfile,
};
