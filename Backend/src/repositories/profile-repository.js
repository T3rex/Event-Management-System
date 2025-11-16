const { Profile } = require("../models/index");

class ProfileRepository {
  constructor() {
    this.Profile = Profile;
  }

  async create(data) {
    try {
      const profile = await this.Profile.create(data);
      return profile;
    } catch (error) {
      throw new Error("Error creating profile: " + error.message);
    }
  }

  async get() {
    try {
      const profile = await this.Profile.find();
      return profile;
    } catch (error) {
      throw new Error("Error fetching profile: " + error.message);
    }
  }
}

module.exports = ProfileRepository;
