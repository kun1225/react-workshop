'use client';

import { createContext, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';

const CountContext = createContext();

function CountProvider({ children }) {
  'use memo';
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function useCount() {
  'use memo';

  const context = useContext(CountContext);
  if (!context) throw new Error('useCount must be used within a CountProvider');
  return context;
}

export default function Page() {
  'use memo';

  return (
    <CountProvider>
      <div className="flex flex-col gap-4">
        <ComponentA />
        <ComponentB />
        <ComponentC />
        <ComponentD />
      </div>
    </CountProvider>
  );
}

function ComponentA() {
  'use memo';

  console.log('Re-Render ComponentA');
  const { count } = useCount();
  return <div>{count}</div>;
}

function ComponentB() {
  'use memo';

  console.log('Re-Render ComponentB');
  const { setCount } = useCount();
  return <Button onClick={() => setCount((prev) => prev + 1)}>+1</Button>;
}

function ComponentC() {
  'use memo';

  console.log('Re-Render ComponentC');
  const { setCount } = useCount();
  return <Button onClick={() => setCount((prev) => prev + 2)}>+2</Button>;
}

function ComponentD() {
  'use memo';

  console.log('Re-Render ComponentD');
  return <div>ComponentD</div>;
}
