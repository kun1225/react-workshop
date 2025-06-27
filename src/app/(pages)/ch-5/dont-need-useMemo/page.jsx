'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const userInfo = {
    points: 1000,
  };

  return <UserProfile userInfo={userInfo} />;
}

function UserProfile({ userInfo }) {
  const [count, setCount] = useState(0);

  const memberLevel = (() => {
    if (userInfo.points >= 1000) {
      return '白金會員';
    } else if (userInfo.points >= 500) {
      return '黃金會員';
    } else {
      return '一般會員';
    }
  })();

  useEffect(() => {
    console.log('觸發 useEffect');
  }, [memberLevel]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>會員等級: {memberLevel}</p>
      </div>

      <p>count: {count}</p>

      <Button
        className="w-fit"
        onClick={() => setCount(count + 1)}
      >
        Re-render
      </Button>
    </div>
  );
}
