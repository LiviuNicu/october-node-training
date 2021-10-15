const employeeModel = require("../models/employee.model");

module.exports.addEmployeeAPI = async function (req, res) {
  try {
    const response = await employeeModel.addEmployee(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAllEmployeesAPI = async function (req, res) {
  try {
    const response = await employeeModel.getAllEmployees();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateEmployeeAPI = async function (req, res) {
  try {
    const response = await employeeModel.updateEmployee(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.removeEmployeeAPI = async function (req, res) {
  try {
    const response = await employeeModel.removeEmployee(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getEmployeeByIdAPI = async function (req, res) {
  try {
    // http://localhost:3000/api/employees/23431kh4324h2j4h23kj4h?name=dan req.params req.query
    const response = await employeeModel.getEmployeeById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).jeson(error);
  }
};
