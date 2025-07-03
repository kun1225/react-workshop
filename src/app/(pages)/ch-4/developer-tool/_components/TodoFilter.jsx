'use client';

export default function TodoFilter({
  currentFilter,
  onFilterChange,
}) {
  const filters = [
    'all',
    'active',
    'completed',
    'archived',
  ];

  return (
    <div className="flex justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`rounded-md px-4 py-2 capitalize transition-colors ${
            currentFilter === filter
              ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
