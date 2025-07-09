'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const ref = useRef();

  const [count, setCount] = useState(0);

  const [user, setUser] = useState({
    name: 'Alice',
    address: {
      city: 'Taipei',
      zip: '100',
    },
  });
  console.log('🚀 ~ Page ~ user:', user);

  return (
    <div ref={ref}>
      <Button
        onClick={() =>
          setUser({
            ...user,
            address: { ...user.address, city: 'New York' },
          })
        }
      >
        Change City
      </Button>
    </div>
  );
}
