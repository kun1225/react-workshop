'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

export default function SearchAutoFocusError() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col items-start pt-20">
      <h2 className="mb-4 text-2xl font-bold">
        Autofocus 更好的寫法
      </h2>
      <div className="relative">
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Search size={16} />
          <span>Search</span>
        </Button>

        {open && (
          <div
            className="absolute top-full left-0 z-10 mt-2 w-96 rounded-lg bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              autoFocus
              // 我們也可以用 ref 來控制 autofocus
              // ref={(el) => {
              //   if (el) el.focus();
              // }}
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="mb-4"
            />
            <ul>
              {filteredCities.map((city) => (
                <li
                  key={city}
                  className="rounded p-2 hover:bg-gray-100"
                >
                  {city}
                </li>
              ))}
            </ul>
            {filteredCities.length === 0 && (
              <p className="text-center text-gray-500">
                No results found.
              </p>
            )}
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
