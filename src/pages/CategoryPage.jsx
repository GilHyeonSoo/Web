// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Link 추가
import BannerSection from '../components/BannerSection';
import LinkActionSection from '../components/LinkActionSection';
import { categories } from '../data/categories';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const currentId = parseInt(id); // 현재 카테고리 ID (숫자로 변환)
  
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
      {/* 🆕 카테고리 빠른 이동 네비게이션 (추가됨) */}
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
      {/* 링크 그리드 */}
      <section className="category-grid-section">
        {category.links.map((link) => (
          <a 
            key={link.id} 
            href={link.url} 
            className="square-link-box"
            target="_blank" 
            rel="noopener noreferrer"
          >
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