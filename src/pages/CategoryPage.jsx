// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import BannerSection from '../components/BannerSection';
import LinkActionSection from '../components/LinkActionSection';
import { categories } from '../data/categories';
import '../styles/CategoryPage.css'; // 전용 스타일 파일

const CategoryPage = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  
  // 해당 id를 가진 카테고리 찾기
  const category = categories.find(c => c.id === parseInt(id));

  if (!category) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="home-container">
      {/* 1. 공통 섹션 재사용 */}
      <BannerSection />
      <LinkActionSection />

      {/* 2. 카테고리 타이틀 */}
      <div className="category-page-header">
        <span className="header-icon">{category.icon}</span>
        <h2>{category.name} 전체 목록</h2>
      </div>

      {/* 3. 새로운 정사각형 그리드 섹션 (PC 기준 5개씩) */}
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
              {/* 필요한 경우 여기에 설명이나 아이콘 추가 가능 */}
            </div>
          </a>
        ))}
        
        {/* 빈 박스가 필요하다면 추가 로직 작성 가능 */}
      </section>
    </div>
  );
};

export default CategoryPage;