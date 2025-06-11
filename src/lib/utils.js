import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function wait(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // do nothing
  }
}
