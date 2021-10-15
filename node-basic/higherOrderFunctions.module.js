// map filter/find reduce
const addPointsToMath = function (ArrayObj, points) {
  const newArray = ArrayObj.map(function (currentElement) {
    currentElement.math += points;
    return currentElement;
  });

  console.log(newArray);
};

const studentsLessThanGrade = function (ArrayObj, grade) {
  const newArrayFilter = ArrayObj.filter(function (currentElement) {
    return currentElement.math <= grade;
  });
  console.log(newArrayFilter);
  const newArrayFind = ArrayObj.find(function (currentElement) {
    return currentElement.math <= grade;
  });
  console.log(newArrayFind);
};

const getSumOfMathGrades = function (ArrayObj) {
  const sum = ArrayObj.reduce(function (accumulator, currentElement) {
    accumulator += currentElement.math;
    return accumulator;
  }, 0);
  console.log(sum);
};

module.exports.addPointsToMath = addPointsToMath;
module.exports.studentsLessThanGrade = studentsLessThanGrade;
module.exports.getSumOfMathGrades = getSumOfMathGrades;
