const v1 = require("express").Router();
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const gameRouter = require("./game.router");

v1.get("/", (_, res) => {
  res.send("from v1");
});

v1.use("/games", gameRouter);
v1.use("/user", userRouter);
v1.use("/auth", authRouter);

module.exports = v1;
