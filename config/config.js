require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "postgres",
    database: process.env.DB_DEV || "ch9-challange_development",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME_TEST || "postgres",
    password: process.env.DB_PASSWORD_TEST || "postgres",
    database: process.env.DB_TEST || "ch9-challange_test",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "postgres",
    database: process.env.DB_DEV || "ch9-challange_development",
    host: "localhost",
    dialect: "postgres",
  },
};
