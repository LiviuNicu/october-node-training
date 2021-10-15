const readXlsxFile = require("read-excel-file/node");
const inventoryModel = require("../models/inventory.model");

module.exports.readExcelFileFromFileSystemAPI = function (req, res) {
  const schema = {
    InventoryCode: { prop: "inventoryCode", type: String },
    Name: { prop: "name", type: String },
    Quantity: { prop: "quantity", type: Number },
    Category: { prop: "category", type: String },
  };

  readXlsxFile("public/demo.xlsx", { schema }).then(function ({
    rows,
    errors,
  }) {
    //rows [{name:'LG 123223', category:"",quantity:"",inventoryCode:""}]
    for (let i = 0; i <= rows.length - 1; i++) {
      const item = rows[i];
      let PromiseArray = [];
      for (let j = 0; j <= item.quantity - 1; j++) {
        PromiseArray.push(inventoryModel.addInvetory(item));
      }

      Promise.all(PromiseArray)
        .then(function (response) {
          console.log("Inventory added");
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    }
    res.status(200).json({ message: "All inventories are added" });
  });
};
