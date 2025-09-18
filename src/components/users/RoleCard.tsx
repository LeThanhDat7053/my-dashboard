// src/components/users/RoleCard.tsx
import React from 'react';

interface RoleCardProps {
  title: string;
  count: number | string;
  description: string;
  iconClass: string;
  iconBg: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, count, description, iconClass, iconBg }) => {
  return (
    <div className="role-card">
      <div className="role-icon" style={{ background: iconBg }}>
        <i className={iconClass}></i>
      </div>
      <div className="role-title">{title}</div>
      <div className="role-count">{count}</div>
      <div className="role-description">{description}</div>
    </div>
  );
};

export default RoleCard;