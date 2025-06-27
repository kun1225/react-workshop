'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

function Parent({ children }) {
  console.log('Parent render');

  return (
    <div className="bg-muted rounded-md border p-4">
      <p className="mb-4">Parent</p>
      {children}
    </div>
  );
}
const MemoParent = memo(Parent);

function Child() {
  console.log('Child render');
  return (
    <div className="bg-muted rounded-md border p-4">
      Child
    </div>
  );
}
const MemoChild = memo(Child);

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>

      <p>count: {count}</p>

      <MemoParent>
        <MemoChild />
      </MemoParent>
    </div>
  );
}
