import React, { useState, useEffect, useRef, useCallback } from 'react';
import { categories } from '../data/categories';
import '../styles/Home.css';
import BannerSection from '../components/BannerSection';
import LinkActionSection from '../components/LinkActionSection';
import { useNavigate } from 'react-router-dom';
import { checkAllCategorySites } from '../utils/siteChecker';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const categoryRefs = useRef({});
  const navButtonRefs = useRef({});
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  
  // 사이트 상태 관리
  const [siteStatuses, setSiteStatuses] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(null);

  // 모든 사이트 상태 체크 함수
  const checkAllSites = useCallback(async () => {
    console.log('🔍 사이트 상태 체크 시작...');
    setIsChecking(true);
    
    try {
      const statuses = await checkAllCategorySites(categories);
      setSiteStatuses(statuses);
      setLastCheckTime(new Date());
      console.log('✅ 사이트 상태 체크 완료:', statuses);
    } catch (error) {
      console.error('❌ 사이트 체크 중 에러:', error);
    } finally {
      setIsChecking(false);
    }
  }, []);

  // 초기 로드 및 1시간마다 자동 체크
  useEffect(() => {
    checkAllSites();
    const interval = setInterval(() => {
      checkAllSites();
    }, 12 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkAllSites]);

  const scrollNavButton = useCallback((categoryId) => {
    const button = navButtonRefs.current[categoryId];
    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      if (isManualScrolling.current) {
        return;
      }

      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      
      if (visibleEntries.length > 0) {
        const topVisibleCategory = visibleEntries[0];
        const categoryId = parseInt(topVisibleCategory.target.dataset.categoryId);
        setActiveCategoryId(categoryId);
        scrollNavButton(categoryId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [scrollNavButton]);

  // 카테고리로 스크롤 이동
  const scrollToCategory = useCallback((categoryId) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      isManualScrolling.current = true;
      setActiveCategoryId(categoryId);
      scrollNavButton(categoryId);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      scrollTimeout.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 1500);
    }
  }, [scrollNavButton]);

  const handleGoToCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="home-container">
      <BannerSection/>
      <LinkActionSection/>
       <div className="status-check-banner">
      {isChecking ? (
        <span className="checking-status">
          <span className="spinner">⏳</span>
          사이트 상태 체크 중...
        </span>
      ) : lastCheckTime ? (
        <span className="checked-status">
          ✅ 마지막 체크: {lastCheckTime.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      ) : null}
    </div>
      {/* 모바일 전용 Sticky 네비게이션 */}
      <section className="mobile-quick-nav sticky-nav">
        <div className="quick-nav-scroll-container">
          {categories.map((category) => (
            <button 
              key={category.id} 
              className={`quick-nav-btn ${activeCategoryId === category.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(category.id)}
              data-category-id={category.id}
              ref={el => navButtonRefs.current[category.id] = el}
            >
              <span className="quick-icon">{category.icon}</span>
              <span className="quick-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 카테고리 그리드 */}
      <section className="top10-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            id={`category-${category.id}`}
            data-category-id={category.id}
            className="top10-box"
            ref={el => categoryRefs.current[category.id] = el}
          >
            <div className="top10-header">
              <span className="header-icon">{category.icon}</span>
              <h3>
                <span className="category-name">{category.name}</span>
                <span className="top10-label">Top10</span>
              </h3>
              
              {/* 헤더에서 상태 표시등 제거 */}
              
              <button 
                className="more-btn" 
                onClick={() => handleGoToCategory(category.id)}
                aria-label={`${category.name} 더보기`}
              >
                ›
              </button>
            </div>

            <div className="top10-list">
              {category.links.slice(0, 10).map((link, index) => {
                // 🆕 URL 체크
                const hasUrl = link.url && link.url.trim() !== '';
                
                // 🆕 상태 키
                const statusKey = `${category.id}-${link.id}`;
                const rawStatus = siteStatuses[statusKey];
                
                // 🆕 상태 결정 (단순화)
                let linkStatus = 'none';
                if (hasUrl) {
                  if (rawStatus === undefined) {
                    linkStatus = 'checking';
                  } else {
                    linkStatus = rawStatus; // 'online', 'offline', 'unknown'
                  }
                }

                return (
                  <a 
                    key={link.id} 
                    href={hasUrl ? link.url : undefined}
                    className={`top10-item${!hasUrl ? ' empty' : ''}`} 
                    target={hasUrl ? "_blank" : undefined}
                    rel={hasUrl ? "noopener noreferrer" : undefined}
                    onClick={!hasUrl ? (e) => e.preventDefault() : undefined}
                  >
                    <span className={`rank-badge rank-${index + 1}`}>
                      {index < 3 ? ['🥇', '🥈', '🥉'][index] : (
                        <span className="rank-number">{index + 1}</span>
                      )}
                    </span>

                    <span className="link-name">
                      {link.name || '사이트 준비중'}
                    </span>

                    {/* 🆕 상태 아이콘: URL 있고 상태가 'none'이 아닌 경우만 */}
                    {hasUrl && linkStatus !== 'none' && (
                      <span className="link-status">
                        {linkStatus === 'checking' && (
                          <span className="status-dot checking" title="체크 중">⏳</span>
                        )}
                        {linkStatus === 'online' && (
                          <span className="status-dot online" title="정상 작동">🟢</span>
                        )}
                        {linkStatus === 'offline' && (
                          <span className="status-dot offline" title="접속 불가">🔴</span>
                        )}
                        {linkStatus === 'unknown' && (
                          <span className="status-dot unknown" title="알 수 없음">⚪</span>
                        )}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>


            
            <div className="top10-footer">
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
