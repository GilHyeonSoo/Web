import React from 'react';
import '../styles/ArtCard.css'; // 스타일 별도 관리

const ArtCard = ({ art }) => {
  return (
    <div className="art-card">
      <div className="image-container">
        {/* 실제 이미지가 없다면 placeholder 사용 */}
        <img src={art.image} alt={art.title} onError={(e) => e.target.src = 'https://via.placeholder.com/300'} />
      </div>
      <div className="info">
        <h3>{art.title}</h3>
        <p>{art.artist}, {art.year}</p>
      </div>
    </div>
  );
};

export default ArtCard;