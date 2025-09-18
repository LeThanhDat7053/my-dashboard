// src/components/properties/ColorSelector.tsx
import React from 'react';

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  onColorSelect
}) => {
  const colors = [
    'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    'linear-gradient(135deg, #ef4444, #dc2626)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #667eea, #764ba2)'
  ];

  return (
    <div className="color-selector">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ background: color }}
          onClick={() => onColorSelect(color)}
          data-color={color}
        />
      ))}
    </div>
  );
};