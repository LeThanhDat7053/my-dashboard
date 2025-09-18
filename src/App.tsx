// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login'; // 👈 Import Login component
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Categories from './pages/Categories';
import Features from './pages/Features';
import Properties from './pages/Properties';
import Media from './pages/Media';
import Analytics from './pages/Analytics';
import './styles/global.css';

function App() {
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login'; // Hoặc dùng navigate
  };

  const handleSearch = (query: string) => {
    console.log('Global search:', query);
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login route - standalone */}
          <Route path="/login" element={<Login />} />
          
          {/* All existing routes - keep exactly as they were */}
          <Route
            path="/*"
            element={
              <MainLayout
                onLogout={handleLogout}
                onSearch={handleSearch}
                onNotificationClick={handleNotifications}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="features" element={<Features />} />
            <Route path="properties" element={<Properties />} />
            <Route path="media" element={<Media />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;