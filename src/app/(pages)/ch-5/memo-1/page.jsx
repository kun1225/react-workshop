'use client';

import { useState, memo } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);

  console.log('parent re-render', count);

  return (
    <div>
      <MemoizedChild data={1} />
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function Child({ data }) {
  console.log('re-render', data);
  return <div>Child</div>;
}

const MemoizedChild = memo(Child);
