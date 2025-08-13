import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import "animate.css";

const Search = () => {
  const [movie, setMovie] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef();
  const cardRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = movie.trim();

    if (!input) {
      setMessage("⚠️ Please enter a movie name! 🙈");
      setData(null);
      return;
    }

    setIsLoading(true);
    try {
      const { data: movieData } = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          input
        )}&apikey=fb90ec0f`
      );

      if (movieData.Response === "True") {
        setData(movieData);
        setMessage("");
        setMovie("");
      } else {
        setData(null);
        setMessage(`❌ "${input}" not found`);
      }
    } catch {
      setMessage("⚠️ Something went wrong! Please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClose = () => {
    if (!cardRef.current) return;

    setIsClosing(true);
    cardRef.current.classList.add("animate__animated", "animate__hinge");

    const onAnimationEnd = () => {
      setData(null);
      setMessage("");
      setIsClosing(false);
      inputRef.current?.focus();
      cardRef.current?.classList.remove("animate__animated", "animate__hinge");
      cardRef.current?.removeEventListener("animationend", onAnimationEnd);
    };

    cardRef.current.addEventListener("animationend", onAnimationEnd);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-3 sm:px-4 md:px-6 lg:px-10 max-w-screen-xl mx-auto">
      {/* Search Bar */}
      <div className="inline-block text-white rounded-lg px-4 py-2 animated-gradient w-full max-w-sm sm:max-w-md md:max-w-lg">
        <form className="flex items-center w-full" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter a movie name!"
            onChange={(e) => setMovie(e.target.value)}
            value={movie}
            ref={inputRef}
            className="flex-grow bg-transparent outline-none placeholder-white text-sm sm:text-base text-white"
            aria-label="Movie search input"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            aria-label="Search movie"
          >
            {isLoading ? "⏳" : "🔎"}
          </button>
        </form>
        {message && (
          <p className="mt-2 text-xs sm:text-sm text-red-400">{message}</p>
        )}
      </div>

      {/* Movie Details */}
      {data && (
        <div
          ref={cardRef}
          className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl flex justify-center"
        >
          <MovieDetails data={data} />
          <button
            onClick={handleClose}
            disabled={isClosing}
            aria-label="Close movie details"
            className="absolute top-2 right-2 z-[50] text-white bg-gray-800 bg-opacity-70 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            &#x2715;
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;