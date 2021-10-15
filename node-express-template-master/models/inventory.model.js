const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: { type: String, required: true },
  inventoryCode: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Unspecified", "Monitor", "Laptop", "Mobile Phone"],
    default: "Unspecified",
  },
  dateAdded: { type: Date, default: Date.now },
  _employee: {
    type: Schema.Types.ObjectId,
    ref: "employee",
  },
});
const inventory = mongoose.model("inventory", InventorySchema);

module.exports.addInvetory = function (userRequestFields) {
  const newInventory = new inventory();

  newInventory.set("name", userRequestFields.name);
  newInventory.set("inventoryCode", userRequestFields.inventoryCode);
  newInventory.set("category", userRequestFields.category);

  return new Promise(function (resolve, reject) {
    newInventory.save(function (err, addedInventory) {
      if (err) {
        reject({ err: err });
      } else {
        resolve({ message: "Inventory added", inventory: addedInventory });
      }
    });
  });
};

module.exports.getAllInventories = function (
  page = 0,
  size = 4,
  nameFilter,
  inventoryCodeFilter,
  categoryFilter
) {
  const query = {};
  if (nameFilter) {
    Object.assign(query, { name: nameFilter });
  }
  if (inventoryCodeFilter) {
    Object.assign(query, { inventoryCode: inventoryCodeFilter });
  }
  if (categoryFilter) {
    Object.assign(query, { category: categoryFilter });
  }
  return new Promise(function (resolve, reject) {
    inventory
      .find(query)
      .limit(size)
      .skip(size * page)
      .populate("_employee")
      .exec(function (err, inventories) {
        if (err) {
          reject({ err: err });
        } else {
          resolve(inventories);
        }
      });
  });
};

module.exports.addEmployeeToInventory = function (inventoryId, employeeId) {
  const query = { _id: inventoryId };
  const update = { _employee: employeeId };
  const options = { upsert: false, new: true };

  return new Promise(function (resolve, reject) {
    inventory.findOneAndUpdate(
      query,
      update,
      options,
      function (err, updatedInvetory) {
        if (err) {
          reject({ err: err });
        } else {
          resolve({ message: "updated", inventory: updatedInvetory });
        }
      }
    );
  });
};
