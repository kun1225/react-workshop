'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const childrenContent = <Child />;

  return <Parent>{childrenContent}</Parent>;
}

function Child() {
  console.log('Child re-render');
  return <div>Child</div>;
}

function Parent({ children }) {
  console.log('Parent re-render');

  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        {`count: ${count}`}
      </Button>
      {children}
    </div>
  );
}
