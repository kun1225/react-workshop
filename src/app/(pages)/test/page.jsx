'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  console.log('re-render');

  const [arr, setArr] = useState([1, 2, 3]);

  const onClick = () => {
    const arr2 = arr;
    arr2.push(4);
    setArr(arr2);
  };

  return <Button onClick={onClick}>Click me</Button>;
}

function Child({ onMount }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return <div>Child</div>;
}
