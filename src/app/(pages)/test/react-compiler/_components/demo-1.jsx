'use client';

import { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';

import { SlowComponent } from '@/components/slow-component';

export function Demo1() {
  'use memo';

  const [count, setCount] = useState(0);

  const obj = {
    a: 1,
    b: 2,
  };

  const fn = () => {
    console.log('fn');
  };

  useEffect(() => {
    fn();
    console.log(obj);
  }, [fn, obj]);

  const InnerSlowComponent = () => <Comp />;

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <p>Count: {count}</p>
      <SlowComponent ms={100}>
        <InnerSlowComponent />
      </SlowComponent>
      <MemoComp />
      <CompWithFn fn={fn} />
      <CompWithInlineObjProp obj={{ a: 1, b: 2 }} />
    </div>
  );
}

function Comp() {
  console.log('Comp');

  return <div>Comp</div>;
}

function CompWithFn({ fn }) {
  console.log('CompWithFn');

  useEffect(() => {
    fn();
  }, [fn]);

  return <div>CompWithFn</div>;
}

function CompWithInlineObjProp({ obj }) {
  console.log('CompWithInlineObjProp', obj);

  return <div>CompWithInlineObjProp</div>;
}

const MemoComp = memo(Comp);
const MemoCompWithFn = memo(CompWithFn);
const MemoCompWithInlineObjProp = memo(CompWithInlineObjProp);
