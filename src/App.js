// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import { categories } from './data/categories';
import './App.css';

function App() {
  // 사이드바 상태를 App.js에서 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Navbar에 메뉴 클릭 핸들러 전달 */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Sidebar에 상태와 닫기 핸들러 전달 */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 Juso Art. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
