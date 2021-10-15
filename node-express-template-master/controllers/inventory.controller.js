const inventoryModel = require("../models/inventory.model");

module.exports.addInventoryAPI = function (req, res) {
  //{name:"",inventoryCode:"",category:"",quantity:4}
  let PromiseArray = [];
  for (let i = 0; i <= req.body.quantity - 1; i++) {
    PromiseArray.push(inventoryModel.addInvetory(req.body));
  }

  Promise.all(PromiseArray)
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

module.exports.getAllInventoriesAPI = async function (req, res) {
  try {
    const response = await inventoryModel.getAllInventories(
      req.query.page ? parseInt(req.query.page) : 0,
      req.query.size ? parseInt(req.query.size) : 4,
      req.query.name,
      req.query.inventoryCode,
      req.query.category
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.addEmployeeToInventoryAPI = async function (req, res) {
  try {
    const response = await inventoryModel.addEmployeeToInventory(
      req.params.inventory,
      req.params.employee
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
