// src/components/layout/Header.tsx
import React from "react";

type HeaderProps = {
  title?: string;
  breadcrumb?: string;
  onAdd?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title = "Features Management", breadcrumb = "Home / Features", onAdd }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
        <div className="breadcrumb">{breadcrumb}</div>
      </div>

      <div className="header-right">
        <button className="btn-primary" onClick={onAdd}>
          <i className="fas fa-plus"></i>
          Add Feature
        </button>
      </div>
    </header>
  );
};

export default Header;
