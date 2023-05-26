const request = require("supertest");
const app = require("../app");
require('../models')

let directorsId;

test("POST/ directors return status 201", async () => {
  const body = {
    firstName: "jose",
    lastName: "brazon",
    nationality: "venezuela",
    image: "http://image.jpg",
    birthday: "1984-11-16",
  };
  const res = await request(app).post("/directors").send(body);
  directorsId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors return todos 200", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)
});

test("PUT /directors/:id actualiza directors", async () => {
  const update = {
    firstName: "nada actualizado",
  };
  const res = await request(app).put(`/directors/${directorsId}`).send(update);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(update.firstName);
});

test("DELETE /directors/:id elimina directors", async () => {
  const res = await request(app).delete(`/directors/${directorsId}`);
  expect(res.status).toBe(204);
});
