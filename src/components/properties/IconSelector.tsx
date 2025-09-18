// src/components/properties/IconSelector.tsx
import React, { useState, useRef, useEffect } from 'react';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const icons = [
    'fa-building',
    'fa-hotel',
    'fa-home',
    'fa-crown',
    'fa-gem',
    'fa-star',
    'fa-mountain',
    'fa-umbrella-beach',
    'fa-tree',
    'fa-landmark',
    'fa-chess-rook',
    'fa-city',
    'fa-university',
    'fa-mosque',
    'fa-church',
    'fa-synagogue'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIconSelect = (icon: string) => {
    onIconSelect(icon);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="icon-selector" ref={selectorRef}>
      <div 
        className="selected-icon" 
        onClick={handleToggle}
      >
        <i className={`fas ${selectedIcon}`}></i>
        <span>Click to change</span>
      </div>
      {isOpen && (
        <div className="icon-picker show">
          <div className="icon-grid">
            {icons.map((icon) => (
              <div
                key={icon}
                className="icon-option"
                onClick={() => handleIconSelect(icon)}
                title={icon.replace('fa-', '').replace('-', ' ')}
              >
                <i className={`fas ${icon}`}></i>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};