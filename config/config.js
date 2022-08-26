require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "postgres",
    database: process.env.DB_DEV || "ch9-challange_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME_TEST || "postgres",
    password: process.env.DB_PASSWORD_TEST || "postgres",
    database: process.env.DB_TEST || "ch9-challange_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "postgres",
    database: process.env.DB_DEV || "ch9-challange_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
