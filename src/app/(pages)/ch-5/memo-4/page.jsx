'use client';

import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <p>count: {count}</p>
      <MemoChild>
        <p>Child</p>
      </MemoChild>
    </div>
  );
}

function Child({ children }) {
  console.log('child render');
  return (
    <div className="bg-muted mt-4 rounded p-4">
      {children}
    </div>
  );
}
const MemoChild = memo(Child);
