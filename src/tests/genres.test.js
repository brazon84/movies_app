const request = require("supertest");
const app = require("../app");
require('../models')

let genresId;

test("POST/ genres return status 201", async () => {
  const body = {
    name: "nada",
  };
  const res = await request(app).post("/genres").send(body);
  genresId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres return 200", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1)
});

test("PUT /genres/:id actualiza genres", async () => {
  const update = {
    name: "nada actualizado",
  };
  const res = await request(app).put(`/genres/${genresId}`).send(update);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(update.name);
});

test("DELETE /genres/:id elimina genres", async () => {
  const res = await request(app).delete(`/genres/${genresId}`);
  expect(res.status).toBe(204);
});
