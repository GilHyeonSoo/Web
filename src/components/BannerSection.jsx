// src/components/BannerSection.jsx
import React, { useMemo } from 'react';
import '../styles/Home.css';

const BannerSection = () => {
  const bannerData = useMemo(() => {
    // --- [1] 큰 배너 설정 ---
    const largeBannerConfig = [
      { 
        url: "", 
        image: "" 
      },

    ];

    const largeBanners = Array.from({ length: 6 }, (_, i) => {
      const config = largeBannerConfig[i] || {};
      return {
        id: i + 1,
        title: `광고 배너 ${i + 1}`,
        desc: config.desc || "배너 입점 문의",
        type: 'large',
        image: config.image || null,
        url: config.url || "#"
      };
    });

    // --- [2] 작은 배너 설정 (여기서 이미지를 추가하세요!) ---
    const smallBannerConfig = [
      // 0번 (첫 번째 작은 배너)
      { 
        url: "", 
        image: "" 
      },
    ];

    const smallBanners = Array.from({ length: 20 }, (_, i) => {
      const config = smallBannerConfig[i] || {}; // 설정이 없으면 빈 객체
      return {
        id: i + 5,
        title: `배너 ${i + 5}`,
        desc: "배너 입점 문의",
        type: 'small',
        // 👇 설정에 이미지가 있으면 넣고, 없으면 null
        image: config.image || null, 
        url: config.url || "#"
      };
    });

    return { largeBanners, smallBanners };
  }, []);

  const renderBanners = (banners, type) => {
    return banners.map((banner) => (
      <a 
        key={banner.id} 
        href={banner.url} 
        className={`banner-box ${type}`}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {banner.image ? (
          // 이미지가 있을 때
          <img src={banner.image} alt={banner.title} className="banner-img" />
        ) : (
          // 이미지가 없을 때 (텍스트)
          <>
            {type === 'large' ? <h3>{banner.title}</h3> : <h4>{banner.title}</h4>}
            {banner.desc && <p>{banner.desc}</p>}
          </>
        )}
      </a>
    ));
  };

  return (
    <section className="banner-section">
      {/* ... 렌더링 부분은 기존과 동일 ... */}
      <div className="banner-row large-banners">
        {renderBanners(bannerData.largeBanners.slice(0, 2), 'large')}
      </div>
      {/* <div className="banner-row large-banners">
        {renderBanners(bannerData.largeBanners.slice(2, 4), 'large')}
      </div>
      <div className="banner-row large-banners">
        {renderBanners(bannerData.largeBanners.slice(4, 6), 'large')}
      </div>
      
      <div className="banner-row small-banners">
        {renderBanners(bannerData.smallBanners.slice(0, 4), 'small')}
      </div>
      <div className="banner-row small-banners">
        {renderBanners(bannerData.smallBanners.slice(4, 8), 'small')}
      </div>
      <div className="banner-row small-banners">
        {renderBanners(bannerData.smallBanners.slice(8, 12), 'small')}
      </div>
      <div className="banner-row small-banners">
        {renderBanners(bannerData.smallBanners.slice(12, 16), 'small')}
      </div>
      <div className="banner-row small-banners">
        {renderBanners(bannerData.smallBanners.slice(16, 20), 'small')}
      </div> */}
    </section>
  );
};

export default BannerSection;