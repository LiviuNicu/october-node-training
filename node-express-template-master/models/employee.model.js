const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const employee = mongoose.model("employee", EmployeeSchema);

module.exports.addEmployee = function (userRequestFields) {
  const newEmp = new employee();
  newEmp.set("name", userRequestFields.name);
  newEmp.set("email", userRequestFields.email);

  return new Promise(function (resolve, reject) {
    newEmp.save(function (err, addedEmployee) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ message: "inserted", employee: addedEmployee });
      }
    });
  });
};

module.exports.getAllEmployees = function () {
  return new Promise(function (resolve, reject) {
    employee
      .find()
      .sort({ _id: -1 })
      .exec(function (err, employees) {
        if (err) {
          reject({ err: err });
        } else {
          resolve(employees);
        }
      });
  });
};

module.exports.updateEmployee = function (userRequestFields) {
  const query = { _id: userRequestFields._id };
  const update = {
    name: userRequestFields.name,
    email: userRequestFields.email,
  };
  const options = { upsert: false, new: true };

  return new Promise(function (resolve, reject) {
    employee.findOneAndUpdate(
      query,
      update,
      options,
      function (err, updatedEmployee) {
        if (err) {
          reject({ err: err });
        } else {
          resolve({ employee: updatedEmployee });
        }
      }
    );
  });
};

module.exports.removeEmployee = function (userRequestFields) {
  const query = { _id: userRequestFields._id };

  return new Promise(function (resolve, reject) {
    employee.findOneAndDelete(query, function (err) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ message: "user deleted" });
      }
    });
  });
};

module.exports.getEmployeeById = function (id) {
  return new Promise(function (resolve, reject) {
    employee.findOne({ _id: id }).exec(function (err, selectedUser) {
      if (err) {
        reject({ err: err });
      } else {
        resolve(selectedUser);
      }
    });
  });
};
