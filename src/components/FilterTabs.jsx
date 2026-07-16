import React from "react";

const FilterTabs = ({ activeType, handleTypeChange }) => {
  const types = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "Series", value: "series" },
    { label: "Episodes", value: "episode" },
    { label: "Favorites 💖", value: "favorites" },
  ];

  return (
    <div className="filter-tabs">
      {types.map((type) => (
        <button
          key={type.value}
          className={`filter-btn ${activeType === type.value ? "active" : ""}`}
          onClick={() => handleTypeChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
