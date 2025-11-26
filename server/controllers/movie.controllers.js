const Movie = require("../models/movie.model");

const addMovies = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.send({
      success: true,
      message: "New movie added",
      movie: newMovie,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Failed to add a new movie",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndUpdate(movieId, req.body);
    res.send({
      success: true,
      message: "Movie updated successfully",
      movie: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to add a new movie",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndDelete(movieId);
    res.send({
      success: true,
      message: "Movie updated successfully",
      movie: movie,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "Successfully fetched all movies",
      data: allMovies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.send({
      success: true,
      message: "Successfully fetched all movies",
      data: movie,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addMovies,
  updateMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
};
