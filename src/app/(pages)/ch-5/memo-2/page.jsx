'use client';

import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [count, setCount] = useState(0);
  console.log('parent re-render', count);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <MemoChild data={1} count={count} />
    </div>
  );
}

function Child({ data, count }) {
  console.log('child re-render', data, count);
  return (
    <div className="bg-muted mt-4 rounded p-4">
      Memo Child
    </div>
  );
}
const MemoChild = memo(Child);
