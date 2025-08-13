import React, { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

// Utility to read from localStorage safely
const readList = (key) => {
  if (!isBrowser) return [];
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

// Utility to write to localStorage and trigger update event
const writeList = (key, data) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event("localStorageUpdated"));
};

const SavedMovies = () => {
  const [activeTab, setActiveTab] = useState("favourites");
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load lists and handle live updates
  useEffect(() => {
    if (!isBrowser) return;

    const loadLists = () => {
      setFavourites(readList("favourites"));
      setWatchlist(readList("watchlist"));
      setIsLoading(false);
    };

    loadLists();

    const handleStorageUpdate = () => loadLists();

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("localStorageUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    };
  }, []);

  const handleRemove = (imdbID, listType) => {
    const storageKey = listType === "favourites" ? "favourites" : "watchlist";
    const list = listType === "favourites" ? favourites : watchlist;
    const updatedList = list.filter((movie) => movie.imdbID !== imdbID);
    writeList(storageKey, updatedList);
  };

  const handleClearAll = (listType) => {
    const storageKey = listType === "favourites" ? "favourites" : "watchlist";
    writeList(storageKey, []);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse text-gray-500">Loading your movies...</div>
      </div>
    );
  }

  const currentList = activeTab === "favourites" ? favourites : watchlist;
  const listName = activeTab === "favourites" ? "Favorites" : "Watchlist";

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className={`px-4 py-2 font-medium ${
              activeTab === "favourites"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("favourites")}
          >
            Favorites ({favourites.length})
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium ${
              activeTab === "watchlist"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("watchlist")}
          >
            Watchlist ({watchlist.length})
          </button>
        </div>

        {/* Clear all for current tab */}
        {currentList.length > 0 && (
          <button
            type="button"
            onClick={() => handleClearAll(activeTab)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === "favourites"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
          >
            Clear {listName}
          </button>
        )}
      </div>

      {/* List Content */}
      {currentList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Your {listName.toLowerCase()} is empty
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {activeTab === "favourites"
              ? "Mark movies as favorites to see them here!"
              : "Add movies to your watchlist to track them!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentList.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <div className="relative h-64">
                <img
                  src={
                    movie.Poster?.replace("SX300", "SX600") ||
                    "/placeholder-movie.jpg"
                  }
                  alt={`Poster for ${movie.Title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-movie.jpg";
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(movie.imdbID, activeTab)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  aria-label={`Remove ${movie.Title} from ${listName}`}
                  title={`Remove from ${listName}`}
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {movie.Title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600 dark:text-gray-300">{movie.Year}</p>
                  {movie.imdbRating && (
                    <span className="flex items-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs">
                      ⭐ {movie.imdbRating}
                    </span>
                  )}
                </div>
                {movie.Genre && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {movie.Genre.split(",").map((g, i) => (
                      <span
                        key={i}
                        className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-full"
                      >
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
