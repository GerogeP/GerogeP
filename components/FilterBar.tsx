'use client';

import React from 'react';

interface FilterBarProps {
  selectedFilter: string;
  selectedMonth: string;
  onFilterChange: (filter: string) => void;
  onMonthChange: (month: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  selectedMonth,
  onFilterChange,
  onMonthChange
}) => {
  const monthOptions = [
    { value: '', label: 'All Months' },
    { value: '2025-10', label: 'October 2025' },
    { value: '2025-11', label: 'November 2025' },
    { value: '2025-12', label: 'December 2025' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Lessons' },
    { value: 'today', label: 'Today' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'historic', label: 'Historic' },
    { value: 'available', label: 'Available' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Type
          </label>
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 py-2 text-slate-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Month
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full px-3 py-2 text-slate-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {monthOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              onFilterChange('all');
              onMonthChange('');
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;