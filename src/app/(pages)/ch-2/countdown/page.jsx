// 這是 server component
import { Countdown } from './_components/countdown';

const TargetTime = new Date('2025-07-12T12:00:00');

export default function CountdownPage() {
  return <Countdown targetTime={TargetTime} />;
}
