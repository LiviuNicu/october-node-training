module.exports.log = function (req, res, next) {
  const requestBody = req.body;
  const params = req.params;
  const query = req.query;
  console.log(requestBody, params, query);
  next();
};
