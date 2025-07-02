'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  console.log('1. render phase - call function');

  const [pCount, setPCount] = useState(0);
  const pRef = useRef(null);

  useEffect(() => {
    console.log('4. after commit - call effect');
    return () => {
      console.log(
        '3. after commit - cleanup',
        pRef.current,
      );
      // ☝️ 如果 pRef.current.textContent 是最新的
      // 代表在 commit 之後才執行 cleanup function
    };
  }, [pCount]);

  return (
    <div>
      {console.log('2. render phase - return jsx')}
      <p ref={pRef}>{`count: ${pCount}`}</p>
      <Button onClick={() => setPCount(pCount + 1)}>
        Count + 1
      </Button>
    </div>
  );
}
