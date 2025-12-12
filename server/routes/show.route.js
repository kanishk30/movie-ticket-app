const express = require("express");
const Show = require("../models/show.model");

const showRouter = express.Router();

// create a show
showRouter.post("/add", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show added",
      data: newShow,
    });
  } catch (error) {
    console.log("error in add show", error);
    res.send({
      success: false,
      message: error.message || "Failed to add a new show",
    });
  }
});

// Delete show
showRouter.delete("/delete", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

// update show
showRouter.put("/update", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "Show updated successfully",
    });
  } catch (error) {
    console.log("error in update", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all shows & theatres for a movie for a given date

showRouter.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date })
      .populate("movie")
      .populate("theatre");

    // map shows with unique theatres.
    // filtering out shows with unique theatre.
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );

      if (!isTheatre) {
        let showsofThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );

        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsofThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "Shows fetched successfully",
      shows: uniqueTheatres,
    });
  } catch (error) {
    console.log("error", error);
    res.send({
      success: false,
      message: "Couldnt fetch shows",
    });
  }
});

// get details of a show by ID

showRouter.post("/get-show-by-id", async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("theatre")
      .populate("movie");
    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: show,
    });
  } catch (error) {
    console.log("error", error);
    res.send({
      success: false,
      message: "Couldnt fetch show",
    });
  }
});

// get all shows..

showRouter.post("/get-all-shows", async (req, res) => {
  // theatreId
  try {
    const allShows = await Show.find({ theatre: req.body.theatreId })
      .populate("movie")
      .populate("theatre");
    console.log(allShows, "allShows");
    res.send({
      success: true,
      message: "All shows fetched successfully",
      data: allShows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: `Not able to fetch shows ${error}`,
    });
  }
});
module.exports = showRouter;
