'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Page() {
  'use memo';

  const [count, setCount] = useState(0);
  console.log('parent re-render', count);

  return (
    <div>
      <Child data={1} onClick={() => console.log('click')} />
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}

function Child({ data, onClick }) {
  console.log('child re-render', data);
  return <button onClick={onClick}>Click me</button>;
}
