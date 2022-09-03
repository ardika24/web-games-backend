const { Op } = require('sequelize');
const { User } = require('../models');

class UserController {
  static async getUsers(req, res) {
    const conditions = [];
    const { email, username, total_score, bio, city, social_media_url } =
      req.query;

    if (email) {
      conditions.push({ email });
    }
    if (username) {
      conditions.push({ username });
    }
    if (total_score) {
      conditions.push({ total_score });
    }
    if (bio) {
      conditions.push({ bio });
    }
    if (city) {
      conditions.push({ city });
    }
    if (social_media_url) {
      conditions.push({ social_media_url });
    }
    const data = await User.findAll({
      where: {
        [Op.and]: conditions,
      },
    });

    if (!data) {
      return res.status(404).json({
        error: 'No user found',
      });
    }
    return res.status(200).json(data);
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        result: 'Not Found',
        message: `User with ${id} not found`,
      });
    }
    return res.status(200).json({
      result: 'Success',
      data: user,
    });
  }

  static async updateUser(req, res) {
    // const { id } = req.params;

    // const user = await User.findByPk(id);
    // if (!user) {
    //   return res.status(404).json({
    //     result: 'Not Found',
    //     message: `User with ${id} not found`,
    //   });
    // }

    // const updatedUser = await User.update(req.body, {
    //   where: { id },
    // });
    // if (!updatedUser) {
    //   return res.status(400).json({
    //     result: 'Failed',
    //     message: 'Failed to update user',
    //   });
    // }
    // return res.status(200).json({
    //   result: 'Success',
    //   message: `User with id: ${id} successfully updated`,
    // });
    // if (updatedUser.error) {
    //   return res.status(400);
    // }

    // if (updatedUser === 1) {
    // return res.status(200).json({
    //   result: "Success",
    //   message: `User with id: ${id} successfully updated`,
    // });
    // } 
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({
          result: "Failed",
          message: `User with ${id} not Found`,
        });
      }
      const updatedUser = await User.update(req.body,
        {
          where: { id },
        }
      );

      if (!updatedUser) {
        return res.status(500).json({
          result: "Failed",
          message: "Failed to update",
        });
      }
      return res.status(200).json({
        result: "Success",
        message: `User with id: ${id} successfully updated`,
      });


    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await User.destroy({
        where: { id },
      });
      if (destroyed === 1) {
        res.status(200).json({
          result: 'Success',
          message: `User with id: ${id}, was deleted successfully`,
        });
      } else {
        res.status(400).json({
          result: 'Failed',
          message: `Cannot delete User with id: ${id}`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
