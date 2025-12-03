const express = require("express");
const Theatre = require("../models/theatre.model");

const theatreRoute = express.Router();

// add theatre

theatreRoute.post("/add", async (req, res) => {
  try {
    console.log("received data in add", req.body);
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();

    res.send({
      success: true,
      message: "New theatre added",
      data: newTheatre,
    });
  } catch (error) {
    console.log("error in add theatre", error);

    res.send({
      success: false,
      message: error.message || "Failed to add a new theatre",
    });
  }
});

// get theatre

theatreRoute.get("/all", async (req, res) => {
  try {
    const allTheatres = await Theatre.find();
    res.send({
      success: true,
      message: "Successfully fetched all theatres",
      data: allTheatres,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

// update theatre

theatreRoute.put("/update", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (error) {
    console.log("error in update", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete theatre

theatreRoute.delete("/delete", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "The theatre has been deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
});

// get all theatres by owners

theatreRoute.post("get-all-theatres-by-owner", async (req, res) => {
  try {
    const allTheatresOfOwner = await Theatre.find({ owner: req.body.owner });
    res.send({
      success: true,
      message: "All theatres fetched successfully",
      data: allTheatresOfOwner,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong. Unable to fetch theares.",
    });
  }
});

module.exports = theatreRoute;
