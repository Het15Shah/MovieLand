import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../utils/api";
import { PLACEHOLDER_IMG } from "../constants";

const MovieModal = ({ imdbID, onClose, isFavorite, toggleFavorite }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(imdbID);
        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (imdbID) getDetails();
  }, [imdbID]);

  // Prevent closing when clicking inside the modal content
  const handleModalClick = (e) => e.stopPropagation();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWatchTrailer = () => {
    const query = encodeURIComponent(`${movieDetails.Title} ${movieDetails.Year} official trailer`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        {isLoading ? (
          <div className="loading" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="spinner"></div>
            <h3>Loading details...</h3>
          </div>
        ) : error ? (
          <div className="empty" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <h3>{error}</h3>
          </div>
        ) : movieDetails && (
          <div className="modal-body">
            <div className="modal-poster">
              <img 
                src={movieDetails.Poster !== 'N/A' && movieDetails.Poster ? movieDetails.Poster : PLACEHOLDER_IMG} 
                alt={movieDetails.Title} 
                onError={(e) => { e.target.src = PLACEHOLDER_IMG; e.target.onerror = null; }}
              />
            </div>
            
            <div className="modal-info">
              <h2>{movieDetails.Title} <span className="year">({movieDetails.Year})</span></h2>
              
              <div className="actions">
                <button 
                  className={`fav-action-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => toggleFavorite(movieDetails)}
                >
                  {isFavorite ? "💖 Remove Favorite" : "🤍 Add to Favorites"}
                </button>
                <button 
                  className="fav-action-btn share-btn"
                  onClick={handleShare}
                >
                  {copied ? "✅ Copied!" : "🔗 Share Link"}
                </button>
                <button 
                  className="fav-action-btn trailer-btn"
                  onClick={handleWatchTrailer}
                >
                  ▶️ Watch Trailer
                </button>
              </div>

              <div className="badges">
                <span className="badge">{movieDetails.Rated}</span>
                <span className="badge">{movieDetails.Runtime}</span>
                <span className="badge">{movieDetails.Genre}</span>
              </div>
              
              <div className="plot">
                <h3>Plot Summary</h3>
                <p>{movieDetails.Plot}</p>
              </div>

              <div className="details-grid">
                <div><strong>Director:</strong> {movieDetails.Director}</div>
                <div><strong>Actors:</strong> {movieDetails.Actors}</div>
                <div><strong>IMDB Rating:</strong> ⭐ {movieDetails.imdbRating}</div>
                <div><strong>Released:</strong> {movieDetails.Released}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
