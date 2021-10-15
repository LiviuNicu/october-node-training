const userModel = require("../models/user.model");

module.exports.regiterAPI = async function (req, res) {
  try {
    const response = await userModel.register(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.registerWithCallbacksAPI = function (req, res) {
  userModel.registerWithCallbacks(
    req.body,
    function (response) {
      res.status(200).json(response);
    },
    function (err) {
      res.status(500).json(err);
    }
  );
};

module.exports.loginAPI = async function (req, res) {
  try {
    const response = await userModel.login(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
