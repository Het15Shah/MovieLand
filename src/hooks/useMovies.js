import { useState, useCallback } from "react";
import { fetchMovies } from "../utils/api";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = useCallback(async (search, page = 1, type = "") => {
    if (!search || !search.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchMovies(search, page, type);
      
      // If it's page 1, replace the list. Otherwise, append to the list.
      if (page === 1) {
        setMovies(data.movies);
      } else {
        setMovies((prev) => [...prev, ...data.movies]);
      }
      setTotalResults(data.totalResults);
    } catch (err) {
      if (page === 1) setMovies([]);
      setError(err.message || "Failed to fetch movies.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { movies, isLoading, error, totalResults, searchMovies };
};
