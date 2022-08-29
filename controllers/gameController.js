const { User } = require("../models");

module.exports = {
  async getHighScore(req, res) {
    const highScore = await User.findAll({
      order: [["total_score", "DESC"]],
    });
    if (!highScore) {
      return res.status(404).json({
        error: "No high score found",
      });
    }
    return res.status(200).json(highScore);
  },

  async updateScore(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    const score = parseInt(req.body.total_score, 10);
    const newScore = user.total_score + score;
    const updatedUser = await User.update(
      { total_score: newScore },
      { where: { id } }
    );
    if (!updatedUser) {
      return res.status(404).json({
        error: "No user found",
      });
    }
    return res.status(200).json(updatedUser);
  },
};
