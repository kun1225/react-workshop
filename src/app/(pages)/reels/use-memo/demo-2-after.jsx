'use client';

import { useState, useMemo } from 'react';
import { generateData } from './utils';

import { Button } from '@/components/ui/button';

const allData = generateData();

export function Demo2After() {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const now = performance.now();

  const filteredData = useMemo(() => {
    return allData.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const end = performance.now();
  console.log(`${query} Time taken: ${(end - now) / 1000} seconds`);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">篩選 50 萬筆資料</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="輸入關鍵字..."
        className="p-2 border mb-4 w-full"
      />

      <Button onClick={() => setIsModalOpen(true)}>開啟 Modal</Button>

      <div>
        {filteredData.slice(0, 2000).map((item) => (
          <div key={item.id} className="p-2 border-b">
            <p>{`#${item.id} ${item.name} - ${item.detail}`}</p>
            <time>{item.time}</time>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Modal</h2>
          </div>
        </div>
      )}
    </div>
  );
}
