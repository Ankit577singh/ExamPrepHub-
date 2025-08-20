const jwt = require("jsonwebtoken");
const User = require("../model/userScema");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not Persent");

    const Paylode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = Paylode;
    if (!_id) throw new Error("Token Invalid");

    const userPersent = await User.findOne({ _id });
    if (!userPersent) throw new Error("User doen not exist");

    req.userPersent = userPersent;
    next();
  } catch (err) {
    // res.status(401).send("Error 1 : " + err);
    res.json({ success: false, message: "Error : " + err });
  }
};

module.exports = userMiddleware;
