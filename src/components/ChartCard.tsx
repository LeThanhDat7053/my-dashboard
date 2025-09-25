// src/components/ChartCard.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ChartCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: IconProp;
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
      className={`p-5 bg-white border border-slate-200 rounded-xl transition-shadow duration-200 ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: iconBg }}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
      {change && (
        <div className={`mt-1 text-xs flex items-center gap-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          <FontAwesomeIcon icon={changeType === 'positive' ? faArrowUp : faArrowDown} className="w-3 h-3" />
          {change}
        </div>
      )}
    </div>
  );
};

export default ChartCard;