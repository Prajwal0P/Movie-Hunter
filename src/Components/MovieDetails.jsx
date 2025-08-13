import React, { useEffect, useState } from "react";

const MovieDetails = ({ data }) => {
  const [isFav, setIsFav] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsFav(favs.some((movie) => movie.imdbID === data.imdbID));
    setIsWatchlisted(watchlist.some((movie) => movie.imdbID === data.imdbID));
  }, [data]);

  const handleToggle = (type) => {
    const storageKey = type === "favourite" ? "favourites" : "watchlist";
    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
    const exists = existing.some((movie) => movie.imdbID === data.imdbID);

    const updatedList = exists
      ? existing.filter((movie) => movie.imdbID !== data.imdbID)
      : [...existing, data];

    localStorage.setItem(storageKey, JSON.stringify(updatedList));

    if (type === "favourite") setIsFav(!isFav);
    else setIsWatchlisted(!isWatchlisted);
  };

  if (!data) return null;

  return (
    <div className="w-full max-w-[320px] md:max-w-[350px] h-auto flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-transform hover:scale-[1.02] duration-300">
      {/* Image */}
      <div className="relative w-full aspect-[2/3] bg-gray-800 flex-shrink-0">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
        )}
        <img
          src={data.Poster?.replace("SX300", "SX1000")}
          alt={data.Title}
          className={`w-full h-full object-cover object-top transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* Title + Ratings */}
        <div className="flex justify-between items-start gap-3">
          <h2 className="text-base md:text-lg font-bold text-white">
            {data.Title}
          </h2>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold">
              ⭐ {data.imdbRating}
            </span>
            {parseFloat(data.imdbRating) >= 8 && (
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                TOP
              </span>
            )}
          </div>
        </div>

        {/* Meta */}
        <p className="text-gray-400 text-xs italic">
          {data.Year} • {data.Rated} • {data.Runtime}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {data.Genre?.split(",").map((genre, idx) => (
            <span
              key={idx}
              className="bg-indigo-700/70 text-white text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/30"
            >
              {genre.trim()}
            </span>
          ))}
        </div>

        {/* Plot */}
        <p className="text-gray-300 text-xs leading-relaxed">{data.Plot}</p>

        {/* Extra Info */}
        <div className="text-xs text-gray-400 space-y-0.5">
          <p>
            <strong className="text-gray-200">Director:</strong> {data.Director}
          </p>
          <p>
            <strong className="text-gray-200">Cast:</strong> {data.Actors}
          </p>
          <p>
            <strong className="text-gray-200">Language:</strong>{" "}
            {data.Language}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 p-3 border-t border-gray-700 bg-black/30">
        <button
          onClick={() => handleToggle("favourite")}
          className={`flex-1 text-xs md:text-sm px-2 py-1 rounded-lg shadow-md transition-all duration-300 ${
            isFav
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-white/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
          }`}
        >
          {isFav ? "❤️ Fav" : "🤍 Fav"}
        </button>

        <button
          onClick={() => handleToggle("watchlist")}
          className={`flex-1 text-xs md:text-sm px-2 py-1 rounded-lg shadow-md transition-all duration-300 ${
            isWatchlisted
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-white/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-500/20"
          }`}
        >
          {isWatchlisted ? "📌 List" : "➕ List"}
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
