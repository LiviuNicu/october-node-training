const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "test";

module.exports.generateToken = function (obj) {
  return jwt.sign(obj, JWT_PRIVATE_KEY, { expiresIn: 30000 });
};

module.exports.checkToken = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, JWT_PRIVATE_KEY);
    req.loggedUser = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};
