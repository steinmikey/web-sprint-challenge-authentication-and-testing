const server = require("./server");
let request = require("supertest");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

test("environment", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

////////////////////////////////

describe("POST /register", function () {
  describe("when passed a username and password", () => {
    it("should respond with a 201 status code", async () => {
      const response = await request(server).post("/api/auth/register").send({
        username: "username",
        password: "password"
      });

      expect(response.status).toBe(201);
    });
    it("should respond with json containing id, username, and password", async () => {
      const response = await request(server).post("/api/auth/register").send({
        username: "username",
        password: "password"
      });
      expect(response.body).toMatchObject({
        id: 1,
        username: "username",
        password: /.*?/
      });
    });
  });

  describe("when username or password is missing", () => {
    it("should respond with a 422 status code", async () => {
      const response = await request(server).post("/api/auth/register").send({ username: "username" });
      expect(response.status).toBe(422);
    });
    it("should respond with error message: ", async () => {
      const response = await request(server).post("/api/auth/register").send({
        username: "username"
      });
      expect(response.body.message).toBe("username and password required");
    });
  });
});

describe("[POST] /login", () => {
  describe("when passed a username and password", () => {
    it("should respond with a 200 status code", async () => {
      await request(server).post("/api/auth/register").send({ username: "username", password: "password" });
      const response = await request(server).post("/api/auth/login").send({
        username: "username",
        password: "password"
      });
      expect(response.status).toBe(200);
    });
    it("should respond with json containing welcome message", async () => {
      await request(server).post("/api/auth/register").send({ username: "username", password: "password" });
      const response = await request(server).post("/api/auth/login").send({
        username: "username",
        password: "password"
      });
      expect(response.body.message).toBe(`welcome, username`);
    });
  });
});

// describe("[GET] /", () => {
//   let res;
//   beforeEach(async () => {
//     res = await request(server).get("/api/jokes");
//   });
//   it("responds with 401 w/out token", async () => {
//     expect(res.status).toBe(401);
//   });
//   it.todo("");
// });

// describe("[GET] /", () => {
//   let res;
//   beforeEach(async () => {
//     res = await request(server).get("/api/jokes");
//   });
//   it("responds with 401 w/out token", async () => {
//     expect(res.status).toBe(401);
//   });
//   it.todo("responds with 401");
// });
