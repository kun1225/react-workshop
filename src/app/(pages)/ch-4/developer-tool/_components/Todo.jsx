'use client';

import { useState, useMemo, use } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoTags from './TodoTags';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './ThemeContext';

const MOCK_TAGS = Array.from(
  { length: 25 },
  (_, i) => `tag-${i + 1}`,
);
// Store tags in state to allow adding new ones
const generateInitialTags = () => new Set(MOCK_TAGS);

// Expensive calculation function
const calculateComplexScore = (todo) => {
  let score = 0;
  for (let i = 0; i < 1; i++) {
    score += todo.title.length * todo.description.length;
    score = Math.sin(score) * Math.cos(score);
  }
  return score;
};

export function Todo({ data }) {
  const initTodos = use(data);

  const [todos, setTodos] = useState(initTodos);
  console.log('🚀 ~ todos:', todos);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState(() =>
    generateInitialTags(),
  );

  // Get all unique tags from todos and available tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    // Add all available tags
    availableTags.forEach((tag) => tagSet.add(tag));
    // Add tags from todos
    todos.forEach((todo) =>
      todo.tags.forEach((tag) => tagSet.add(tag)),
    );
    return Array.from(tagSet).sort();
  }, [todos, availableTags]);

  // Handle adding new tag
  const handleAddNewTag = (newTag) => {
    setAvailableTags((prev) => new Set([...prev, newTag]));
  };

  // Handle tag selection/deselection
  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  // Expensive filtering and sorting with tags
  const filteredTodos = useMemo(() => {
    console.log('Recalculating filtered todos...');

    // First filter by status and tags
    const statusFiltered = todos.filter((todo) => {
      // Unnecessary complex calculations for each todo
      calculateComplexScore(todo);

      // Check if todo has all selected tags
      const hasSelectedTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          todo.tags.includes(tag),
        );

      switch (filter) {
        case 'active':
          return (
            !todo.isCompleted &&
            !todo.isArchived &&
            hasSelectedTags
          );
        case 'completed':
          return (
            todo.isCompleted &&
            !todo.isArchived &&
            hasSelectedTags
          );
        case 'archived':
          return todo.isArchived && hasSelectedTags;
        default:
          return !todo.isArchived && hasSelectedTags;
      }
    });

    // Then filter by search term
    return statusFiltered
      .filter(
        (todo) =>
          todo.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          todo.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
      .sort(
        (a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      );
  }, [todos, filter, searchTerm, selectedTags]); // Added selectedTags dependency

  const addTodo = (title, description, tags) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      isCompleted: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  };

  const archiveTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isArchived: true,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, title, description, tags) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title,
              description,
              tags,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  };

  return (
    <ThemeProvider>
      <ThemeToggle />

      <div className="transition-colors dark:bg-gray-900">
        <div className="mx-auto max-w-4xl space-y-8 p-4">
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
            Todo List ({filteredTodos.length} items)
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded border bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <TodoTags
              allTags={allTags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
            />
          </div>
          <TodoForm
            onSubmit={addTodo}
            allTags={allTags}
            onAddNewTag={handleAddNewTag}
          />
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />

          <TodoList
            todos={filteredTodos}
            onToggleComplete={toggleTodoComplete}
            onArchive={archiveTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            allTags={allTags}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
