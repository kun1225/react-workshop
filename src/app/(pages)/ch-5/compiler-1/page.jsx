'use client';

import { useState } from 'react';
import { wait } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Page() {
  'use memo';
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <p>count: {count}</p>

      <SlowComponent />
    </div>
  );
}

function SlowComponent() {
  console.log('SlowComponent');
  wait(200);

  return <p>Slow Component</p>;
}
