// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react'; // 아이콘

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <Palette size={24} /> JusoArt
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; // <-- 반드시 "export default"를 사용해야 합니다.