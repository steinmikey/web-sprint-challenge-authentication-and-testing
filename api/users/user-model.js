const db = require("../../data/dbConfig");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username", "password").where({ id }).first();
}

async function addUser({ username, password }) {
  const [id] = await db("users").insert({ username, password });
  return findById(id);
}

module.exports = {
  find,
  findBy,
  findById,
  addUser
};
