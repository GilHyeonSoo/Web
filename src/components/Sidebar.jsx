// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import '../styles/Sidebar.css'
const Sidebar = ({ isOpen, onClose, categories }) => {
  return (
    <>
      {/* 오버레이: 클릭 시 사이드바 닫기 */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
          }}
        />
      )}
      
      {/* 사이드바 */}
      <aside 
        className="sidebar"
        style={{
          position: 'fixed',
          left: isOpen ? 0 : '-300px', // 열림/닫힘 상태에 따라 위치 변경
          top: 0,
          bottom: 0,
          width: '280px',
          background: 'white',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'left 0.3s ease',
          zIndex: 999,
          overflowY: 'auto',
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h2 style={{ margin: 0 }}>MENU</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* 텔레그램 배너 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '15px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}>
          <div>
            <p style={{ margin: '0 0 5px 0' }}>📢 텔레그램 ID</p>
            <strong>@openlink1004</strong>
          </div>
        </div>

        {/* 카테고리 목록 */}
        <nav style={{ padding: '10px 0' }}>
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                color: '#333',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
