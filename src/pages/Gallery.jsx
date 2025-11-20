import React from 'react';
import ArtCard from '../components/ArtCard.jsx';
import { artworks } from '../data/artworks';

const Gallery = () => {
  return (
    <div className="page-container">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {artworks.map((art) => (
          <ArtCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;