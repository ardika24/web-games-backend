"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Games", [
      {
        name: "Paper Rock Scissors",
        description:
          "Paper Rock Scissors is a game where you can play against the computer and win or lose",
        play_count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tic Tac Toe",
        description:
          "Tic Tac Toe is a game where you can play against the computer and win or lose",
        play_count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
