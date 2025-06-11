import { wait } from '@/lib/utils';

export function SlowComponent({ ms = 600, children }) {
  wait(ms);

  console.log('SlowComponent');

  return <>{children}</>;
}
