'use client';

import { useState, useMemo, useDeferredValue, memo } from 'react';
import { generateData } from './utils';

const NOTIFICATION_COUNT = 500000;

const allData = generateData(NOTIFICATION_COUNT);

const dateFormatter = new Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export function Demo1After() {
  const [query, setQuery] = useState('');

  const now = performance.now();

  const filteredData = allData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const end = performance.now();
  console.log(`${query} Time taken: ${(end - now) / 1000} seconds`);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{`篩選 ${NOTIFICATION_COUNT.toLocaleString()} 筆資料`}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="輸入關鍵字..."
        className="p-2 border mb-4 w-full"
      />

      <ModalWithButton />

      <div>
        {filteredData.slice(0, 5000).map((item) => (
          <div key={item.id} className="p-2 border-b">
            <p>{`#${item.id} ${item.name} - ${item.detail}`}</p>
            <time>{item.time}</time>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalWithButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>開啟 Modal</button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Modal</h2>
          </div>
        </div>
      )}
    </>
  );
}
