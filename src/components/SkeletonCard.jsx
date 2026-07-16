import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="movie skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-info">
        <div className="skeleton-text short"></div>
        <div className="skeleton-text long"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
