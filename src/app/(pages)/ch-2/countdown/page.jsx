import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// 計算剩餘時間的工具函數
function calculateTimeLeft(targetTime) {
  const now = new Date();
  const target = new Date(targetTime);
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function CountdownPage() {
  // 預設倒數目標時間：今天 23:59:59
  const today = new Date();
  const defaultTarget = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );
  const [targetTime, setTargetTime] = useState(
    defaultTarget.toISOString().slice(0, 19),
  );
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(targetTime),
  );

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetTime));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  function TimeBlock({ value, label }) {
    return (
      <div className="mx-2 flex flex-col items-center">
        <div className="min-w-[60px] rounded-xl bg-black px-4 py-2 text-center font-mono text-4xl text-white shadow-inner select-none">
          {String(value).padStart(2, '0')}
        </div>
        <span className="text-muted-foreground mt-2 text-xs tracking-widest uppercase">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-md border-0 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-2xl font-bold tracking-tight">
            Apple 風格倒數計時
          </CardTitle>
          <Badge variant="secondary" className="mb-2">
            目標時間
          </Badge>
          <input
            type="datetime-local"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="focus:ring-primary w-full rounded-md border bg-white/80 px-3 py-2 text-center font-mono text-base shadow focus:ring-2 focus:outline-none"
            min={new Date().toISOString().slice(0, 16)}
          />
        </CardHeader>
        <CardContent>
          <div className="mt-6 mb-2 flex justify-center gap-2">
            <TimeBlock value={timeLeft.days} label="天" />
            <span className="text-3xl font-bold text-gray-400 select-none">
              :
            </span>
            <TimeBlock value={timeLeft.hours} label="時" />
            <span className="text-3xl font-bold text-gray-400 select-none">
              :
            </span>
            <TimeBlock
              value={timeLeft.minutes}
              label="分"
            />
            <span className="text-3xl font-bold text-gray-400 select-none">
              :
            </span>
            <TimeBlock
              value={timeLeft.seconds}
              label="秒"
            />
          </div>
          {timeLeft.days +
            timeLeft.hours +
            timeLeft.minutes +
            timeLeft.seconds ===
            0 && (
            <div className="mt-6 animate-bounce text-center text-lg font-semibold text-red-500">
              時間到！
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
