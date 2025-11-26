import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { getAllMovies } from "../backend/movie.js";

const Home = () => {
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
    const movies = await getAllMovies();

    setMovies(movies.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar />

      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {movies &&
          movies.map((movieObj, index) => (
            <MovieCard key={movieObj._id} {...movieObj} />
          ))}
      </div>
    </>
  );
};

export default Home;
