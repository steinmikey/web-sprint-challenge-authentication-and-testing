// import find by username from model?

function checkAvailableUsername(req, res, next) {
  // 4- On FAILED registration due to the `username` being taken,
  //   the response body should include a string exactly as follows: "username taken".
  next();
}

function checkCredentials(req, res, next) {
  // 3- On FAILED registration due to `username` or `password` missing from the request body,
  //   the response body should include a string exactly as follows: "username and password required".
  next();
}

module.exports = {
  checkAvailableUsername,
  checkCredentials
};
