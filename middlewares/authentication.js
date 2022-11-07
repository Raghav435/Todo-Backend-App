const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.user_id;
    req.body.user_id = user_id;
    next();
  } catch (err) {
    res.send({ "msg": "Please login again" });
  }
  if (!token) {
    res.send({ "msg": "Not authenticated No token" });
  }
};

module.exports = { authentication };
