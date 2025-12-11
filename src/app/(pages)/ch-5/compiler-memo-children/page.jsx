'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  'use memo';

  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <p>count: {count}</p>

      <ChildComp>
        <p>Child</p>
      </ChildComp>
    </div>
  );
}

function ChildComp({ children }) {
  console.log('child render', children);

  return <div>{children}</div>;
}
