const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    res.send({ msg: "User already exists, try logging in" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send("Something went wrong, please try again later");
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
      });
      try {
        await new_user.save();
        res.send({ msg: "Sign up successfull" });
      } catch (err) {
        res.send({ msg: "Something went wrong, please try again" });
      }
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;
  console.log(user);
  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong, try again later" });
    }
    if (result) {
      const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
      res.send({ message: "Login successfull", token });
    } else {
      res.send({ msg: "Login failed" });
    }
  });
};

const getProfile = async (req, res) => {
  const { user_id } = req.body;
  const user = await UserModel.findOne({ _id: user_id });
  const { name, email } = user;
  res.send({ name, email });
};

module.exports = { register, loginUser, getProfile };
