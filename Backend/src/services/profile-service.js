const { ProfileRepository } = require("../repositories/index");

class ProfileService {
  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  async createProfile(data) {
    try {
      const profile = await this.profileRepository.create(data);
      return profile;
    } catch (error) {
      throw new Error(
        "Error in ProfileService while creating profile: " + error.message
      );
    }
  }

  async getProfile() {
    try {
      const profile = await this.profileRepository.get();
      return profile;
    } catch (error) {
      throw new Error(
        "Error in ProfileService while fetching profile: " + error.message
      );
    }
  }
}

module.exports = ProfileService;
