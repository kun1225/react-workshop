'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export const TAG_COLORS = {
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800',
  amber: 'bg-amber-100 text-amber-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  lime: 'bg-lime-100 text-lime-800',
  green: 'bg-green-100 text-green-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  teal: 'bg-teal-100 text-teal-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  sky: 'bg-sky-100 text-sky-800',
  blue: 'bg-blue-100 text-blue-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  violet: 'bg-violet-100 text-violet-800',
  purple: 'bg-purple-100 text-purple-800',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-800',
  pink: 'bg-pink-100 text-pink-800',
  rose: 'bg-rose-100 text-rose-800',
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        'dark',
        savedTheme === 'dark',
      );
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle(
        'dark',
        prefersDark,
      );
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme =
        prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle(
        'dark',
        newTheme === 'dark',
      );
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider',
    );
  }
  return context;
}
