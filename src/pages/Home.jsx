import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Juso Art</h1>
        <p>Discover the beauty of digital imagination.</p>
        <Link to="/gallery" className="cta-button">View Gallery</Link>
      </section>
      
      <section className="featured">
        <h2>Latest Exhibitions</h2>
        {/* 여기에 추천 작품 컴포넌트를 넣을 수 있음 */}
      </section>
    </div>
  );
};

export default Home;