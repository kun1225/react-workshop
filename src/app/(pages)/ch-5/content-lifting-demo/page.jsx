'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const ParentContent = <ParentContentInner />;

  return <Child>{ParentContent}</Child>;
}

function ParentContentInner() {
  console.log('Parent Re-render');

  return <p>我是 Parent Content</p>;
}

function Child({ children }) {
  console.log('Child re-render');
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button
        onClick={() => setCount(count + 1)}
      >{`我是 Child 組件: ${count}`}</Button>
      {children}
    </div>
  );
}
