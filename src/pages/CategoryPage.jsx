// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BannerSection from '../components/BannerSection';
import LinkActionSection from '../components/LinkActionSection';
import { categories } from '../data/categories';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const currentId = parseInt(id);
  
  const category = categories.find(c => c.id === currentId);

  if (!category) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="home-container">
      <BannerSection />
      <LinkActionSection />

      {/* 카테고리 타이틀 */}
      <div className="category-page-header">
        <span className="header-icon">{category.icon}</span>
        <h2>{category.name} 전체 목록</h2>
      </div>
      {/* 카테고리 네비게이션 */}
      <nav className="category-nav-bar">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className={`category-nav-item ${c.id === currentId ? 'active' : ''}`}
          >
            <span className="nav-icon">{c.icon}</span>
            <span className="nav-name">{c.name}</span>
          </Link>
        ))}
      </nav>

      {/* 정사각형 그리드 섹션 */}
      <section className="category-grid-section">
        {category.links.map((link, index) => (
          <a 
            key={link.id} 
            href={link.url} 
            className="square-link-box"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {/* 1. 좌측 상단 순위 뱃지 */}
            <div className={`rank-badge rank-${index + 1}`}>
               {index === 0 && '🥇'}
               {index === 1 && '🥈'}
               {index === 2 && '🥉'}
               {index > 2 && <span className="rank-number">{index + 1}</span>}
            </div>

            {/* 2. 중앙 이미지 (300x100) */}
            <div className="link-image-wrapper">
              {/* 실제 이미지가 있다면 link.image 등을 사용하세요. 현재는 더미 이미지입니다. */}
              <img 
                src="https://placehold.co/300x100/333/E0E0E0?text=300x100+Image" 
                alt={link.name} 
              />
            </div>

            {/* 3. 하단 이름 */}
            <div className="link-content">
              <span className="link-name">{link.name}</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;