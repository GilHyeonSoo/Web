import React from 'react';
import { categories } from '../data/categories';
import '../styles/Home.css';
import BannerSection from '../components/BannerSection';
import LinkActionSection from '../components/LinkActionSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // 2. 페이지 이동 훅 초기화

  // 3. 🚨 누락되었던 함수 정의 (이 부분이 없어서 에러가 났습니다)
  const handleGoToCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  // 스크롤 이동 함수
  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70; // 헤더 높이만큼 보정
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="home-container">
      <BannerSection/>
      <LinkActionSection/>
      {/* 🆕 3. 모바일 전용 카테고리 바로가기 (NEW) */}
      <section className="mobile-quick-nav">
        {categories.map((category) => (
          <button 
            key={category.id} 
            className="quick-nav-btn" 
            onClick={() => scrollToCategory(`category-${category.id}`)}
          >
            <span className="quick-icon">{category.icon}</span>
            <span className="quick-name">{category.name}</span>
          </button>
        ))}
      </section>

      {/* 4. Top10 카테고리 그리드 */}
      <section className="top10-grid">
        {categories.map((category) => (
          <div key={category.id} id={`category-${category.id}`} className="top10-box">
            <div className="top10-header">
              <span className="header-icon">{category.icon}</span>
              <h3>
                <span className="category-name">{category.name}</span>
                <span className="top10-label">Top10</span>
              </h3>
              
              {/* 🚨 수정됨: 화살표 버튼에 클릭 이벤트 추가 */}
              <button 
                className="more-btn" 
                onClick={() => handleGoToCategory(category.id)}
                aria-label={`${category.name} 더보기`}
              >
                ›
              </button>
            </div>

            <div className="top10-list">
              {category.links.slice(0, 10).map((link, index) => (
                <a key={link.id} href={link.url} className="top10-item" target="_blank" rel="noopener noreferrer">
                  <span className={`rank-badge rank-${index + 1}`}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : <span className="rank-number">{index + 1}</span>}
                  </span>
                  <span className="link-name">{link.name}</span>
                </a>
              ))}
              {/* 빈 칸 채우기 코드 유지... */}
            </div>
            
            <div className="top10-footer">
              {/* 🚨 수정됨: 더보기 버튼에 클릭 이벤트 추가 */}
              <button 
                className="view-more"
                onClick={() => handleGoToCategory(category.id)}
              >
                ··· 더보기
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;