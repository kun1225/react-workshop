'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function SameValueRerenderDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  renderCount.current++;

  console.log('re-render');

  return (
    <div className="p-4">
      {console.log('jsx')}
      <h2>State 設為相同值時不會 re-render</h2>
      <p>目前 count: {count}</p>
      <p className="mb-4">
        Render 次數: {renderCount.current}
      </p>

      <Button
        onClick={() => {
          setCount(count);
          console.log('setCount(count) 被呼叫，但值沒變');
        }}
      >
        設定相同的 count
      </Button>

      <Button
        onClick={() => {
          setCount(count + 1);
          console.log('setCount(count+1) 被呼叫，值有變');
        }}
        className="ml-4"
      >
        count + 1
      </Button>
    </div>
  );
}
