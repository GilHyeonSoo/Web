import React from 'react';
import '../styles/Home.css'; // 기존 스타일 재사용

const LinkActionSection = () => {
  return (
    <section className="link-actions-section">
      <a href="https://t.me/openlink1004" className="action-btn primary" target="_blank" rel="noopener noreferrer">
        <span className="btn-icon">📝</span>
        <div className="btn-content">
          <strong>배너등록신청</strong>
          <small>상단 배너를 등록해보세요!</small>
        </div>
      </a>
      <a href="https://t.me/openlink1004" className="action-btn secondary" target="_blank" rel="noopener noreferrer">
        <span className="btn-icon">💬</span>
        <div className="btn-content">
          <strong>링크등록신청</strong>
          <small>하단 링크를 등록해보세요!</small>
        </div>
      </a>
    </section>
  );
};

export default LinkActionSection;