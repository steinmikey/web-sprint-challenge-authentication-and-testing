const jwt = require("jsonwebtoken");
const { SECRET } = require("../secrets");

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  const token = jwt.sign(payload, SECRET, options);
  return token;
};
