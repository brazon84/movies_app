const request = require("supertest");
const app = require("../app");
const Genres = require("../models/Genres");
const Actors = require("../models/Actors");
const Directors = require("../models/Directors");
require("../models");

let moviesId;

test("POST/ movies return status 201", async () => {
  const body = {
    name: "nada",
    image: "http://image.jpg",
    synopsis: "hola soy una pelicula",
    releaseYear: "2000",
  };
  const res = await request(app).post("/movies").send(body);
  moviesId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies return todos 200", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
});

test("PUT /movies/:id actualiza movies", async () => {
  const update = {
    name: "nada actualizado",
  };
  const res = await request(app).put(`/movies/${moviesId}`).send(update);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(update.name);
});

test("POST /movies/:id/genres crea y trae un genres relacionado con la movies", async () => {
  const genre = await Genres.create({ name: "nada" });
  const res = await request(app)
    .post(`/movies/${moviesId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/actors crea y trae un actors relacionado con la movies", async () => {
  const actors = await Actors.create({
    firstName: "jose",
    lastName: "brazon",
    nationality: "venezuela",
    image: "http://image.jpg",
    birthday: 1984 - 11 - 16,
  });
  const res = await request(app)
    .post(`/movies/${moviesId}/actors`)
    .send([actors.id]);
  await actors.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors crea y trae un directors relacionado con la movie", async () => {
  const directors = await Directors.create({
    firstName: "jose",
    lastName: "brazon",
    nationality: "venezuela",
    image: "http://image.jpg",
    birthday: 1984-11-16
  });
  const res = await request(app)
    .post(`/movies/${moviesId}/directors`)
    .send([directors.id]);
  await directors.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
});

test("DELETE /movies/:id elimina movies", async () => {
  const res = await request(app).delete(`/movies/${moviesId}`);
  expect(res.status).toBe(204);
});
