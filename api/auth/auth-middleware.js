const { findBy } = require("../users/user-model");

async function checkAvailableUsername(req, res, next) {
  // 4- On FAILED registration due to the `username` being taken,
  //   the response body should include a string exactly as follows: "username taken".
  const { username } = req.body;
  const [existingUser] = await findBy({ username });
  if (existingUser) {
    next({ status: 422, message: "username taken" });
  } else {
    next();
  }
}

async function checkCredentials(req, res, next) {
  // 3- On FAILED registration due to `username` or `password` missing from the request body,
  //   the response body should include a string exactly as follows: "username and password required".

  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 422, message: `username and password required` });
  } else {
    const [user] = await findBy({ username });
    req.body.user = user;
    next();
  }
}

module.exports = {
  checkAvailableUsername,
  checkCredentials
};
