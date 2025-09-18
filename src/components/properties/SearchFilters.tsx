// src/components/properties/SearchFilters.tsx
import React from 'react';

interface SearchFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange
}) => {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search hotels..." 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select 
        className="filter-select" 
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};