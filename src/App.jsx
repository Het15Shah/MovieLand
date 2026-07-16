import React, { useState, useEffect, useCallback } from "react";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";
import { useURLSync } from "./hooks/useURLSync";
import { POPULAR_SEARCHES } from "./constants";

import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import MovieModal from "./components/MovieModal";
import SkeletonCard from "./components/SkeletonCard";

import "./App.css";

const defaultSearch = POPULAR_SEARCHES[Math.floor(Math.random() * POPULAR_SEARCHES.length)];

const App = () => {
  const [searchTerm, setSearchTerm] = useState(defaultSearch);
  const [submittedSearch, setSubmittedSearch] = useState(defaultSearch);
  const [activeType, setActiveType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedMovieId, setSelectedMovieId] = useURLSync("movie");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { movies, isLoading, error, totalResults, searchMovies } = useMovies();

  // Initial Fetch Only
  useEffect(() => {
    searchMovies(defaultSearch, 1, "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback((termToSearch = searchTerm) => {
    if (termToSearch.trim() !== "") {
      setSubmittedSearch(termToSearch);
      if (activeType === "favorites") setActiveType("all");
      setCurrentPage(1);
      searchMovies(termToSearch, 1, activeType === "favorites" ? "all" : activeType);
    }
  }, [activeType, searchMovies, searchTerm]);

  const handleTypeChange = (newType) => {
    setActiveType(newType);
    if (newType !== "favorites") {
      setCurrentPage(1);
      searchMovies(submittedSearch, 1, newType);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    searchMovies(submittedSearch, nextPage, activeType);
  };

  const displayedMovies = activeType === "favorites" ? favorites : movies;
  const showSkeletons = isLoading && currentPage === 1 && activeType !== "favorites";

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch} 
      />
      
      <FilterTabs 
        activeType={activeType} 
        handleTypeChange={handleTypeChange} 
      />

      {error && displayedMovies.length === 0 && activeType !== "favorites" ? (
        <div className="empty">
          <h2>{error}</h2>
        </div>
      ) : showSkeletons ? (
        <div className="container">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : displayedMovies?.length > 0 ? (
        <>
          <div className="container">
            {displayedMovies.map((movie, index) => (
              <MovieCard 
                key={`${movie.imdbID}-${index}`} 
                movie={movie} 
                onClick={setSelectedMovieId} 
              />
            ))}
          </div>
          
          {activeType !== "favorites" && movies.length < totalResults && (
            <div className="load-more-container">
              <button 
                className="load-more-btn" 
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          {error && activeType !== "favorites" && (
            <p className="error-toast">{error}</p>
          )}
        </>
      ) : (
        <div className="empty">
          <h2>{activeType === "favorites" ? "No favorites added yet. Click a movie to add it!" : "No content found"}</h2>
        </div>
      )}

      {selectedMovieId && (
        <MovieModal 
          imdbID={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
          isFavorite={isFavorite(selectedMovieId)}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default App;