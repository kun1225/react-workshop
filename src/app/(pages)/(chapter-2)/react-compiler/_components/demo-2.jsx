'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '../_hooks/use-mutation';
import { Button } from '@/components/ui/button';

export function Demo2() {
  const [count, setCount] = useState(0);
  const { mutate: deleteMutate } = useMutation();

  useEffect(() => {
    console.log('deleteMutate');
  }, [deleteMutate]);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}
