'use client';

import { useState } from 'react';

import { TodoItem } from './TodoItem';
import { TAG_COLORS } from './ThemeContext';

export default function TodoList({
  todos,
  onToggleComplete,
  onArchive,
  onDelete,
  onUpdate,
  allTags,
}) {
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No todos found
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 ${
            todo.isCompleted
              ? 'bg-gray-50 dark:bg-gray-700'
              : ''
          }`}
        >
          <TodoItem
            todo={todo}
            onToggleComplete={onToggleComplete}
            onArchive={onArchive}
            onDelete={onDelete}
            onUpdate={onUpdate}
            allTags={allTags}
          />
        </li>
      ))}
    </ul>
  );
}
