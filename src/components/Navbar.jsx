// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ onMenuClick }) => { // props로 onMenuClick 받기
  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-left">
        <button 
          className="menu-toggle"
          onClick={onMenuClick} // App.js에서 전달받은 함수 사용
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="logo">
          <span>주소아트</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
