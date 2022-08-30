const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
    // static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static async register({ email, username, password }) {
      if (!email || !username || !password) {
        return Promise.reject({
          message: "Data invalid",
          code: "auth/register-invalid",
        });
      }

      try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await this.create({
          email,
          username,
          password: encryptedPassword,
        });
        return Promise.resolve(user);

        // if (user) throw "Username already exist";
        // return this.create({
        //   email,
        //   username,
        //   password: this.#encrypt(password),
        // });
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          return Promise.reject({
            message: "User already exist",
            code: "auth/user-exist",
          });
        }

        return Promise.reject(error);
      }
    }

    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) {
          return Promise.reject({
            message: "User not Found!",
            code: "auth/user-not-found",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return Promise.reject({
            message: "Wrong password",
            code: "auth/user-not-found",
          });
        }
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    generateToken() {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const secret = process.env.APP_SECRET;
      if (!secret) throw new Error("Please set APP_SECRET on env");
      const token = jwt.sign(payload, secret);
      return token;
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email have been registered!",
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username already exist",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required, cannot be blank",
          },
          len: {
            args: [6],
            msg: "Password minimal 6 character",
          },
        },
      },
      total_score: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      city: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
