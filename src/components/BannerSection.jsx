import React, { useMemo } from 'react';
import '../styles/Home.css'; // 기존 스타일 재사용

const BannerSection = () => {
  // 배너 데이터 생성
  const bannerData = useMemo(() => {
    const largeBanners = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `광고 배너 ${i + 1}`,
      desc: i === 3 ? "큰 배너 영역입니다" : "배너 입점 문의",
      type: 'large',
      // 👇 첫 번째 배너(ID 1)에만 이미지 경로 추가 (public 폴더 기준)
      image: i === 0 ? "/image/f98a2d63322b6804fcd212f8762a434a_tQvb8g9N_c385e7c6067ca83104d1a083138c363c103957e4.gif" : null 
    }));

    // ... (smallBanners 코드는 그대로) ...
    const smallBanners = Array.from({ length: 20 }, (_, i) => ({
        id: i + 5,
        title: `배너 ${i + 5}`,
        desc: "배너 입점 문의",
        type: 'small',
        image: i === 0 ? "/image/f98a2d63322b6804fcd212f8762a434a_0WmSR1Ch_11fbeb30a3254a1a429e4b31df259811ed25e8de.gif" : null 
      }));
  
      return { largeBanners, smallBanners };
    }, []);

  const renderBanners = (banners, type) => {
    return banners.map((banner) => (
      <div key={banner.id} className={`banner-box ${type}`}>
        {banner.image ? (
          // 👇 이미지가 있을 때 보여줄 태그
          <img src={banner.image} alt={banner.title} className="banner-img" />
        ) : (
          // 👇 이미지가 없을 때 (기존 텍스트)
          <>
            {type === 'large' ? <h3>{banner.title}</h3> : <h4>{banner.title}</h4>}
            {banner.desc && <p>{banner.desc}</p>}
          </>
        )}
      </div>
    ));
  };

  return (
    <section className="banner-section">
        {/* === 큰 배너 영역 === */}
        {/* 기존 1~2번 */}
        <div className="banner-row large-banners">
          {renderBanners(bannerData.largeBanners.slice(0, 2), 'large')}
        </div>
        {/* 기존 3~4번 */}
        <div className="banner-row large-banners">
          {renderBanners(bannerData.largeBanners.slice(2, 4), 'large')}
        </div>
        <div className="banner-row large-banners">
          {renderBanners(bannerData.largeBanners.slice(4, 6), 'large')}
        </div>
        
        {/* 🆕 추가된 5~6번 큰 배너 (새로 추가한 코드) */}
        {/* === 작은 배너 영역 === */}
        {/* 기존 4줄 (16개) 생략... */}
        <div className="banner-row small-banners">
          {renderBanners(bannerData.smallBanners.slice(0, 4), 'small')}
        </div>
        {/* ... 중간 생략 ... */}
        <div className="banner-row small-banners">
          {renderBanners(bannerData.smallBanners.slice(4, 8), 'small')}
        </div>

        {/* 🆕 추가된 17~20번 작은 배너 (새로 추가한 코드) */}
        <div className="banner-row small-banners">
          {renderBanners(bannerData.smallBanners.slice(8, 12), 'small')}
        </div>
        <div className="banner-row small-banners">
          {renderBanners(bannerData.smallBanners.slice(12, 16), 'small')}
        </div>
        <div className="banner-row small-banners">
          {renderBanners(bannerData.smallBanners.slice(16, 20), 'small')}
        </div>
      </section>
  );
};

export default BannerSection;