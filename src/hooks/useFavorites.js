import { useState, useEffect } from 'react';

export const useFavorites = (storageKey = 'movieFavorites') => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const toggleFavorite = (movieData) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.imdbID === movieData.imdbID);
      if (isFav) return prev.filter(f => f.imdbID !== movieData.imdbID);
      return [...prev, movieData];
    });
  };

  const isFavorite = (imdbID) => favorites.some(f => f.imdbID === imdbID);

  return { favorites, toggleFavorite, isFavorite };
};
