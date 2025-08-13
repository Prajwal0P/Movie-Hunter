import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import moviesList from "../assets/omdb_top_220_movies.json";
import "animate.css";

const API_KEY = "fb90ec0f"; // OMDB API key

const RandomMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);

    const shuffled = [...moviesList].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 9);

    try {
      const requests = selected.map((title) =>
        axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
        )
      );

      const responses = await Promise.all(requests);
      const validMovies = responses
        .map((res) => res.data)
        .filter((movie) => movie.Response === "True");

      setMovies(validMovies);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col items-center my-8 w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-16 max-w-screen-xl mx-auto">
      {/* Heading */}
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center animate__animated animate__fadeInDown">
        🎬 Movies Collection
      </h1>

      {/* Randomize Button */}
      <button
        type="button"
        onClick={fetchMovies}
        disabled={isLoading}
        className="mb-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed animate__animated animate__pulse animate__infinite"
      >
        {isLoading ? "Loading..." : "Randomize"}
      </button>

      {/* Movies Grid */}
      {isLoading ? (
        <p className="text-white text-base sm:text-lg animate__animated animate__flash animate__infinite">
          Loading movies...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {movies.map((movie, index) => (
            <div
              key={movie.imdbID}
              className="animate__animated animate__zoomIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieDetails data={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomMovies;
