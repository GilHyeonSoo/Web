// src/pages/Home.jsx
import React from 'react';
import { categories } from '../data/categories';
import { socialLinks } from '../data/socialLinks';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 배너 섹션 */}
      <section className="banner-section">
        {/* 큰 박스 2개 */}
        <div className="banner-row large-banners">
          <div className="banner-box large">
            <h3>광고 배너 1</h3>
            <p>배너 입점 문의</p>
          </div>
          <div className="banner-box large">
            <h3>광고 배너 2</h3>
            <p>배너 입점 문의</p>
          </div>
        </div>
        <div className="banner-row large-banners">
          <div className="banner-box large">
            <h3>광고 배너 1</h3>
            <p>배너 입점 문의</p>
          </div>
          <div className="banner-box large">
            <h3>광고 배너 2</h3>
            <p>큰 배너 영역입니다</p>
          </div>
        </div>
        
        {/* 작은 박스 4개 */}
        <div className="banner-row small-banners">
          <div className="banner-box small">
            <h4>배너 3</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 4</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 5</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 6</h4>
          </div>
        </div>
        <div className="banner-row small-banners">
          <div className="banner-box small">
            <h4>배너 3</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 4</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 5</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 6</h4>
          </div>
        </div>
        <div className="banner-row small-banners">
          <div className="banner-box small">
            <h4>배너 3</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 4</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 5</h4>
          </div>
          <div className="banner-box small">
            <h4>배너 6</h4>
          </div>
        </div>
      </section>
        <section className="link-actions-section">
            <button className="action-btn primary">
                <span className="btn-icon">📝</span>
                <div className="btn-content">
                <strong>링크등록신청</strong>
                <small>무료로 등록하기</small>
                </div>
            </button>
            
            <button className="action-btn secondary">
                <span className="btn-icon">💬</span>
                <div className="btn-content">
                <strong>문의하기</strong>
                <small>궁금한 점이 있으신가요?</small>
                </div>
            </button>
        </section>
      {/* Top10 카테고리 그리드 (가로 5개씩) */}
      <section className="top10-grid">
        {categories.map((category) => (
          <div key={category.id} className="top10-box">
            {/* 카테고리 헤더 */}
            <div className="top10-header">
              <span className="header-icon">{category.icon}</span>
              <h3>{category.name} Top10</h3>
              <button className="more-btn">›</button>
            </div>

            {/* Top10 링크 리스트 */}
            <div className="top10-list">
              {category.links.slice(0, 10).map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="top10-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* 순위 뱃지 */}
                  <span className={`rank-badge rank-${index + 1}`}>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && <span className="rank-number">{index + 1}</span>}
                  </span>
                  
                  {/* 링크 이름 */}
                  <span className="link-name">{link.name}</span>
                </a>
              ))}
              
              {/* 10개 미만일 경우 빈 칸 채우기 */}
              {category.links.length < 10 && 
                Array.from({ length: 10 - category.links.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="top10-item empty">
                    <span className="rank-badge">
                      <span className="rank-number">{category.links.length + index + 1}</span>
                    </span>
                    <span className="link-name">-</span>
                  </div>
                ))
              }
            </div>

            {/* 더보기 버튼 */}
            <div className="top10-footer">
              <button className="view-more">··· 더보기</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
