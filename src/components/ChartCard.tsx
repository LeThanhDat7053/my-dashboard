// src/components/ChartCard.tsx
import React from 'react';

interface ChartCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: string;
  iconBg: string;
  onClick?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  iconBg,
  onClick
}) => {
  return (
    <div 
      className={`dashboard-card ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
      style={{ transition: 'box-shadow 0.2s ease' }}
    >
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div className="card-icon" style={{ background: iconBg }}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="card-value">{value}</div>
      {change && (
        <div className={`card-change ${changeType}`}>
          <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'}`}></i>
          {change}
        </div>
      )}
    </div>
  );
};

export default ChartCard;