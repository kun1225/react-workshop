'use client';

import { Button } from '@/components/ui/button';

export default function Page() {
  let count = 0;
  console.log('Re-render Parent');

  return (
    <div>
      <Button onClick={() => console.log(count++)}>
        {`Increment: ${count}`}
      </Button>
      <Child count={count} />
    </div>
  );
}

function Child({ count }) {
  console.log('Re-render Child');
  return <p className="mt-4">{`count: ${count}`}</p>;
}
