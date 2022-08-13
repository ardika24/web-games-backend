const authRouter = require("express").Router();
const AuthController = require("../../controllers/authController");

authRouter.get("/", (_, res) => {
  res.send("from auth");
});

// @ /api/v1/auth

// Middlewares
const restrict = require("../../middlewares/restrict");

// /api/v1/auth

// Register
authRouter.post("/register", AuthController.register);

// Login
authRouter.post("/login", AuthController.login);

// Whoami
authRouter.get("/whoami", restrict, AuthController.whoami);

module.exports = authRouter;
