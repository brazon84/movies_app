const request = require("supertest");
const app = require("../app");
require('../models')

let actorsId;

test("POST/ actors return status 201", async () => {
  const body = {
    firstName: "jose",
    lastName: "brazon",
    nationality: "venezuela",
    image: "http://image.jpg",
    birthday: 1984 - 11 - 16,
  };
  const res = await request(app).post("/actors").send(body);
  actorsId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors return  200", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)
});

test("PUT /actors/:id actualiza actors", async () => {
  const update = {
    firstName: "nada actualizado",
  };
  const res = await request(app).put(`/actors/${actorsId}`).send(update);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(update.firstName);
});

test("DELETE /actors/:id elimina actors", async () => {
  const res = await request(app).delete(`/actors/${actorsId}`);
  expect(res.status).toBe(204);
});
