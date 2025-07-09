'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { wait } from '@/lib/utils';

export default function Page() {
  const [value, setValue] = useState('');

  const MyInput = () => {
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  };

  return (
    <div>
      <MyInput />
    </div>
  );
}
