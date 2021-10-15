const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { checkAvailableUsername, checkCredentials } = require("./auth-middleware");
const Users = require("../users/user-model");
const buildToken = require("./token-builder");

router.post("/register", checkCredentials, checkAvailableUsername, (req, res, next) => {
  let user = req.body;

  const round = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, round);

  user.password = hash;

  Users.addUser(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", checkCredentials, (req, res, next) => {
  let { password, user } = req.body;

  if (bcrypt.compareSync(password, user.password)) {
    const token = buildToken(user);
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: token
    });
  } else {
    next({ status: 401, message: `invalid credentials` });
  }
});

module.exports = router;
