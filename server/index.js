const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConfig = require("./dbConfig.js");

dotEnv.config();
const app = express();
dbConfig.connectDb();

const userRoutes = require("./routes/user.route.js");
const movieRoutes = require("./routes/movie.route.js");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/movie", movieRoutes);

app.listen(8001, () => {
  console.log("Server started..");
});
