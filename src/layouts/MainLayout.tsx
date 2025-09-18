// src/layouts/MainLayout.tsx - UPDATED
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.tsx';
import Header from '../components/Header';

interface MainLayoutProps {
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  onLogout,
  onSearch,
  onNotificationClick
}) => {
  const location = useLocation();

  // Map routes to page titles and breadcrumbs
  const getPageInfo = (pathname: string) => {
    switch (pathname) {
      case '/':
        return { title: 'Dashboard', breadcrumb: 'Home / Dashboard' };
      case '/users':
        return { title: 'Users & Roles', breadcrumb: 'Management / Users & Roles' };
      case '/settings':
        return { title: 'Settings', breadcrumb: 'Management / Settings' };
      case '/reports':
        return { title: 'Reports', breadcrumb: 'Analytics / Reports' };
      case '/categories':
        return { title: 'Categories', breadcrumb: 'Main / Categories' };
      case '/features':
        return { title: 'Features', breadcrumb: 'Main / Features' };
      case '/properties':
        return { title: 'Properties', breadcrumb: 'Main / Properties' };
      case '/media':
        return { title: 'Media Library', breadcrumb: 'Content / Media Library' };
      case '/analytics':
        return { title: 'Analytics', breadcrumb: 'Content / Analytics' };
      default:
        return { title: 'Dashboard', breadcrumb: 'Home / Dashboard' };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  const handleLogout = () => {
    console.log('User logged out');
    onLogout?.();
    // Add your logout logic here
    // Example: clear tokens, redirect to login, etc.
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    onSearch?.(query);
    // Add your search logic here
    alert(`Searching for: ${query}`);
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
    onNotificationClick?.();
    // Add your notification logic here
    alert('Notifications - Add dropdown here');
  };

  const user = {
    id: '1',
    name: 'John Doe',
    role: 'Owner',
    initials: 'JD'
  };

  return (
    // Remove Tailwind classes that conflict with custom CSS
    <div className="app-layout">
      <Sidebar onLogout={handleLogout} />
      <Header
        title={pageInfo.title}
        breadcrumb={pageInfo.breadcrumb}
        user={user}
        onSearch={handleSearch}
        onNotificationClick={handleNotifications}
      />
      
      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;