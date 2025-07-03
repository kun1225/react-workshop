'use client';

import { useState, memo } from 'react';
import { TAG_COLORS } from './ThemeContext';
import { cn } from '@/lib/utils';

const getTagColor = (tag) => {
  const colors = Object.keys(TAG_COLORS);
  const index = tag
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

export function TodoItem({
  todo,
  onToggleComplete,
  onArchive,
  onDelete,
  onUpdate,
  allTags = [],
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(
    todo.title || '',
  );
  const [editDescription, setEditDescription] = useState(
    todo.description || '',
  );
  const [editTags, setEditTags] = useState(todo.tags || []);

  const startEditing = () => {
    setEditTitle(todo.title || '');
    setEditDescription(todo.description || '');
    setEditTags(todo.tags || []);
    setEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(
      todo.id,
      editTitle.trim(),
      editDescription.trim(),
      editTags,
    );
    setEditing(false);
  };

  const toggleTag = (tag) => {
    setEditTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  if (editing) {
    return (
      <div className="space-y-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Todo title"
        />
        <textarea
          value={editDescription}
          onChange={(e) =>
            setEditDescription(e.target.value)
          }
          className="w-full rounded border p-2"
          placeholder="Todo description"
          rows={2}
        />
        <div className="rounded border p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = editTags.includes(tag);
              const colorKey = getTagColor(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-2 py-1 text-sm font-medium ${TAG_COLORS[colorKey]} ${isSelected ? 'ring-2 ring-gray-500 ring-offset-1' : ''} transition-all duration-200 ease-in-out hover:opacity-80`}
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
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(todo.id)}
          className="h-5 w-5 rounded border-gray-300"
        />
        <h3
          className={`flex-1 text-lg font-medium transition-colors ${
            todo.isCompleted
              ? 'text-gray-500 line-through dark:text-gray-400'
              : 'dark:text-gray-100'
          }`}
        >
          {todo.title}
        </h3>
      </div>
      <p className="mt-2 text-gray-600 transition-colors dark:text-gray-300">
        {todo.description}
      </p>
      {todo.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {todo.tags.map((tag) => {
            const colorKey = getTagColor(tag);
            return (
              <span
                key={tag}
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[colorKey]} `}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={startEditing}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onArchive(todo.id)}
          className="px-3 py-1 text-sm text-yellow-600 hover:text-yellow-800"
        >
          Archive
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export const MemoizedTodoItem = memo(TodoItem);
