'use client';

import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [count, setCount] = useState(0);

  const someEvent = () => {
    // do something
  };

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Re-render
      </Button>

      <p>count: {count}</p>

      <MemoChild onEvent={someEvent} />
    </div>
  );
}

const MemoChild = memo(function Child({ onEvent }) {
  console.log('Child re-render');

  return <p>Memo Child</p>;
});
