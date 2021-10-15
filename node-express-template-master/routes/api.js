const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const employeeController = require("../controllers/employee.controller");
const inventoryController = require("../controllers/inventory.controller");
const xlsxController = require("../controllers/xlsx.controller");

const logger = require("../middlewares/logger");
const JWT = require("../middlewares/jwt");

// auth
router.post("/auth/register", logger.log, authController.regiterAPI);
router.post("/auth/login", logger.log, authController.loginAPI);

//employee
router.post(
  "/employee/add",
  logger.log,
  JWT.checkToken,
  employeeController.addEmployeeAPI
);
router.get(
  "/employee/all",
  logger.log,
  JWT.checkToken,
  employeeController.getAllEmployeesAPI
);
router.post(
  "/employee/update",
  logger.log,
  JWT.checkToken,
  employeeController.updateEmployeeAPI
);
router.post(
  "/employee/remove",
  logger.log,
  JWT.checkToken,
  employeeController.removeEmployeeAPI
);
router.get(
  "/employee/:id",
  logger.log,
  JWT.checkToken,
  employeeController.getEmployeeByIdAPI
);

//Invetory
router.post(
  "/inventory/add",
  logger.log,
  JWT.checkToken,
  inventoryController.addInventoryAPI
);
router.get(
  "/inventory/all",
  logger.log,
  JWT.checkToken,
  inventoryController.getAllInventoriesAPI
);
router.post(
  "/inventory/addEmployee/:employee/inventory/:inventory",
  logger.log,
  JWT.checkToken,
  inventoryController.addEmployeeToInventoryAPI
);

//xlsx imports

router.get(
  "/inventory/import",
  logger.log,
  JWT.checkToken,
  xlsxController.readExcelFileFromFileSystemAPI
);

module.exports = router;
