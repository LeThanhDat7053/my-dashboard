
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatar?: string;
}

interface HeaderProps {
  title: string;
  breadcrumb: string;
  user?: User;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumb,
  user = {
    id: '1',
    name: 'John Doe',
    role: 'Owner',
    initials: 'JD'
  },
  onSearch,
  onNotificationClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const handleNotifications = () => {
    onNotificationClick?.();
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
        <div className="breadcrumb">{breadcrumb}</div>
      </div>
      
        <div className="header-right">
        
        
        
      </div>
    </header>
  );
};

export default Header;