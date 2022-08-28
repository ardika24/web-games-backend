const { User } = require("../models");

module.exports = {
  async getHighScore(req, res, next) {
    try {
      const highScore = await User.findAll({
        order: [["total_score", "DESC"]],
      });
      if (highScore) {
        return res.status(200).json({
          result: "Success",
          data: highScore,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async updateScore(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({
          result: "Failed",
          message: `User with ${id} not found`,
        });
      }
      const score = parseInt(user.total_score + req.body.total_score);
      const updatedScore = await User.update(
        { total_score: !score ? user.total_score : score },
        {
          where: { id },
        }
      );

      if (!updatedScore) {
        return res.status(400);
      }

      if (updatedScore === 1) {
        return res.status(200).json({
          result: "Success",
          message: `User with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: "Failed",
          message: "Failed to update score",
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
