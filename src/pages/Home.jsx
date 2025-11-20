// src/pages/Home.jsx
import React from 'react';
import { categories } from '../data/categories';
import { socialLinks } from '../data/socialLinks';
import LinkCard from '../components/LinkCard';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 소셜 링크 섹션 */}
      <section className="social-links">
        {socialLinks.map((social, idx) => (
          <a 
            key={idx} 
            href={social.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name}
          </a>
        ))}
      </section>

      {/* 카테고리별 링크 그리드 */}
      {categories.map(category => (
        <section key={category.id} className="category-section">
          <div className="category-header">
            <h2>
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </h2>
            <span className="category-badge">{category.links.length}개</span>
          </div>
          
          <div className="links-grid">
            {category.links.map(link => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
