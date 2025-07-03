'use client';

import { useState, useRef, useEffect } from 'react';
import { TAG_COLORS } from './ThemeContext';

export default function TodoForm({
  onSubmit,
  allTags,
  onAddNewTag,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] =
    useState(false);
  const [
    focusedSuggestionIndex,
    setFocusedSuggestionIndex,
  ] = useState(-1);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on input
  const suggestions = allTags
    .filter(
      (tag) =>
        tag
          .toLowerCase()
          .includes(tagInput.toLowerCase()) &&
        !selectedTags.includes(tag),
    )
    .slice(0, 5); // Limit to 5 suggestions

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(
      title.trim(),
      description.trim(),
      selectedTags,
    );
    setTitle('');
    setDescription('');
    setSelectedTags([]);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestionIndex((prev) =>
        prev > -1 ? prev - 1 : -1,
      );
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      if (
        focusedSuggestionIndex >= 0 &&
        suggestions[focusedSuggestionIndex]
      ) {
        // Select the focused suggestion
        addTag(suggestions[focusedSuggestionIndex]);
      } else if (tagInput.trim()) {
        // Add new tag
        const formattedTag = tagInput
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-');
        addTag(formattedTag);
      }
      return;
    }
  };

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      if (!allTags.includes(tag)) {
        onAddNewTag?.(tag);
      }
      setSelectedTags((prev) => [...prev, tag]);
    }
    setTagInput('');
    setShowSuggestions(false);
    setFocusedSuggestionIndex(-1);
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags((prev) =>
      prev.filter((tag) => tag !== tagToRemove),
    );
  };

  // Get a consistent color for a tag based on its name
  const getTagColor = (tag) => {
    const colors = Object.keys(TAG_COLORS);
    const index = tag
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Enter todo title"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-200"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Enter todo description"
          rows={3}
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-200">
          Tags
        </label>
        <div className="relative">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              setShowSuggestions(true);
              setFocusedSuggestionIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Search or add new tag..."
            className="w-full rounded-md border-gray-300 px-4 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          />
          {showSuggestions &&
            (tagInput || suggestions.length > 0) && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
              >
                {suggestions.length > 0 ? (
                  <ul className="py-1">
                    {suggestions.map((tag, index) => (
                      <li
                        key={tag}
                        onClick={() => addTag(tag)}
                        className={`cursor-pointer px-4 py-2 text-sm ${focusedSuggestionIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'} `}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  tagInput.trim() && (
                    <div className="p-2 text-sm text-gray-500">
                      Press Enter to add "{tagInput}" as a
                      new tag
                    </div>
                  )
                )}
              </div>
            )}
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => {
              const colorKey = getTagColor(tag);
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${TAG_COLORS[colorKey]} `}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 bg-transparent p-0 text-xs hover:text-gray-700"
                  >
                    x
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Add Todo
      </button>
    </form>
  );
}
