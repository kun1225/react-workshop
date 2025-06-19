import { wait } from '@/lib/utils';

export function SlowComponent({ ms = 100, children }) {
  wait(ms);

  console.log('SlowComponent');

  return <>{children}</>;
}
