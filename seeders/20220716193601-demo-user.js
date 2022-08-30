const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "superman@gmail.com",
        username: "superman423",
        password: bcrypt.hash("WRsuperman", 10),
        total_score: 100,
        bio: "Jekardah",
        city: "Indonesia",
        social_media_url: "https://twitter.com/superman",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "radityadika@gmail.com",
        username: "raditya123",
        password: bcrypt.hash("radityadika12", 10),
        total_score: 50,
        bio: "Bali",
        city: "Indonesia",
        social_media_url: "https://twitter.com/radityadika",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
