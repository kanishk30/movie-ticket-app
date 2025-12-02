const express = require("express");
const {
  addMovies,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
} = require("../controllers/movie.controllers");

const movieRouter = express.Router(); // router frome express.

// create a movie.

movieRouter.post("/add", addMovies);

// update
movieRouter.put("/update", updateMovie);

// delete
movieRouter.delete("/delete/:id", deleteMovie);

// get all movies
movieRouter.get("/all", getAllMovies);

// get movie by id
movieRouter.get("/:id", getMovie);

module.exports = movieRouter;
