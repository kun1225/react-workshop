'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function App() {
  console.log('call function');

  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log('call useEffect');
  // });

  return (
    <div>
      {console.log('return jsx')}
      <h1>現在的數字：{count}</h1>
      <Button onClick={() => setCount(count + 1)}>
        +1
      </Button>
    </div>
  );
}
