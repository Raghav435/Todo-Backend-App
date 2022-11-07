const express = require("express");
const {
  register,
  loginUser,
  getProfile,
} = require("../controllers/User.controller");
const { authentication } = require("../middlewares/authentication");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authentication, getProfile);

module.exports = userRouter;
