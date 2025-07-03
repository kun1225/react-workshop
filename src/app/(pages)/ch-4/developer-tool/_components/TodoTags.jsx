'use client';

import { useState, useMemo } from 'react';
import { TAG_COLORS } from './ThemeContext';

// Get a consistent color for a tag based on its name
const getTagColor = (tag) => {
  const colors = Object.keys(TAG_COLORS);
  const index = tag
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

export default function TodoTags({
  allTags,
  selectedTags,
  onTagSelect,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTags = useMemo(() => {
    if (!searchTerm) return allTags;
    const term = searchTerm.toLowerCase();
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(term),
    );
  }, [allTags, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tags..."
          className="w-full rounded-md border p-2 pr-8"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const colorKey = getTagColor(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${TAG_COLORS[colorKey]} ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2' : ''} transition-all duration-200 ease-in-out hover:opacity-80`}
            >
              {tag}
              <span className="ml-1 text-xs">
                {isSelected ? '×' : '+'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
