const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JWT = require("../middlewares/jwt");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const user = mongoose.model("user", UserSchema);

module.exports.register = function (userRequestFields) {
  let newUser = new user();
  newUser.set("email", userRequestFields.email);
  newUser.set("firstName", userRequestFields.firstName);
  newUser.set("lastName", userRequestFields.lastName);
  newUser.set("password", userRequestFields.password);

  return new Promise(function (resolve, reject) {
    newUser.save(function (err, insertedUser) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ success: "User inserted", user: insertedUser });
      }
    });
  });
};

module.exports.registerWithCallbacks = function (
  userRequestFields,
  successCallback,
  errorCallback
) {
  let newUser = new user();
  newUser.set("email", userRequestFields.email);
  newUser.set("firstName", userRequestFields.firstName);
  newUser.set("lastName", userRequestFields.lastName);
  newUser.set("password", userRequestFields.password);

  newUser.save(function (err, insertedUser) {
    if (err) {
      errorCallback({ err: err });
    } else {
      successCallback({ success: "User inserted", user: insertedUser });
    }
  });
};

module.exports.login = function (userRequestFields) {
  return new Promise(function (resolve, reject) {
    user
      .findOne({ email: userRequestFields.email })
      .exec(function (err, userFromDB) {
        if (err) {
          reject({ err: err });
        } else {
          if (!userFromDB) {
            reject({ message: "User not found" });
          } else {
            if (userFromDB.password === userRequestFields.password) {
              const token = JWT.generateToken({
                email: userFromDB.email,
                id: userFromDB._id,
              });
              resolve({ user: userFromDB, token: token });
            } else {
              reject({ message: "Wrong password" });
            }
          }
        }
      });
  });
};

module.exports.User = user;
