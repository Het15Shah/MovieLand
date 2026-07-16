import React from "react";
import { PLACEHOLDER_IMG } from "../constants";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={() => onClick(movie.imdbID)}>
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img 
          src={movie.Poster !== 'N/A' && movie.Poster ? movie.Poster : PLACEHOLDER_IMG} 
          alt={movie.Title} 
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; e.target.onerror = null; }}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
