'use client';

import { useState, useCallback, useEffect } from 'react';

export default function Parent() {
  const [count, setCount] = useState(0);

  // const onMount = useCallback(() => {
  //   console.log('onMount');
  // }, []);

  const onMount = () => {
    console.log('onMount');
  };

  return (
    <div>
      <Child onMount={onMount} />
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function Child({ onMount }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return <div>Child</div>;
}
