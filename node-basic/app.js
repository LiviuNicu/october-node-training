const loggerModule = require("./logger.module");
const callbackModule = require("./callback.module");
const promiseModule = require("./promise.module");
const higherOrder = require("./higherOrderFunctions.module");
const fsModule = require("./fs.module");
const osModule = require("./os.module");
const httpModule = require("./http.module");

loggerModule.logFunction("TEST ITS WORKING");

callbackModule.count(2, 3, "add", function (number) {
  console.log(number);
});
callbackModule.count(2, 3, "multiply", function (number) {
  console.log(number);
});

callbackModule.count(2, 3, undefined, function (number) {
  console.log(number);
});

//ES5

promiseModule
  .promise("test")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
promiseModule
  .promise(1)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

//ES6 async await

async function checkPromise(str) {
  try {
    const response = await promiseModule.promise(str);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
checkPromise("TEST ASYNC");
checkPromise(4);

let ArrayObj = [
  { name: "Merry", math: 8 },
  { name: "Paul", math: 5 },
  { name: "Nick", math: 9 },
];

let NumberArray = [1, 2, 3];
let clone = Array.from(NumberArray);
higherOrder.addPointsToMath(JSON.parse(JSON.stringify(ArrayObj)), 1);
higherOrder.studentsLessThanGrade(ArrayObj, 9);
higherOrder.getSumOfMathGrades(ArrayObj);

fsModule.getFilesSync("./");
fsModule.getFilesAsync("./");

osModule.getOSInfo();

httpModule.startServer();
