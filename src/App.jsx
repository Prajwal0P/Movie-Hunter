import React, { useRef, useState, useEffect } from "react";
import "animate.css";
import { gsap } from "gsap";
import Header from "./Components/Header";
import MiniHeader from "./Components/MiniHeader";
import Search from "./Components/Search";
import RandomMovies from "./Components/RandomMovies";
import SavedMovies from "./Components/SavedMovies";

const App = () => {
  const savedMoviesRef = useRef(null);
  const [showSavedMovies, setShowSavedMovies] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  // Toggle SavedMovies with animation
  const toggleSavedMovies = () => {
    if (showSavedMovies && savedMoviesRef.current) {
      setAnimatingOut(true);
      gsap.to(savedMoviesRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        onComplete: () => {
          setShowSavedMovies(false);
          setAnimatingOut(false);
        },
      });
    } else {
      setShowSavedMovies(true);
    }
  };

  // Animate SavedMovies when showing
  useEffect(() => {
    if (showSavedMovies && savedMoviesRef.current) {
      gsap.from(savedMoviesRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [showSavedMovies]);

  return (
    <div className="px-3 sm:px-5 md:px-8">
      {/* Header */}
      <div className="animate__animated animate__backInDown">
        <Header />
      </div>

      {/* Mini Header */}
      <div className="animate__animated animate__backInDown animate__delay-1s">
        <MiniHeader />
      </div>

      {/* Search */}
      <div className="py-5 animate__animated animate__zoomInUp animate__delay-2s">
        <Search />
      </div>


    <div className="py-5 animate__animated animate__zoomInUp animate__delay-3s">
    <RandomMovies/>

    </div>

      {/* Toggle Button */}
      <div className="flex justify-center my-8">
        <button
          type="button"
          onClick={toggleSavedMovies}
          disabled={animatingOut}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
        >
          {showSavedMovies ? "Hide My Collection" : "Show My Collection"}
        </button>
      </div>

     

      {/* Saved Movies */}
      {showSavedMovies && (
        <div ref={savedMoviesRef} className="py-10 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Your Movie Collection
          </h2>
          <SavedMovies />
        </div>
      )}
    </div>
  );
};

export default App;
