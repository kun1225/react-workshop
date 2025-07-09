'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { wait } from '@/lib/utils';

export default function Page() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <CompA />
    </div>
  );
}

const CompA = () => {
  return Array.from({ length: 10000 }).map((_, index) => (
    <div key={index}>{index}</div>
  ));
};
