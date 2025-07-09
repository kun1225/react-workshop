'use client';

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

  const diff = targetTime - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

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

export function Countdown({ targetTime }) {
  const [timeLeft, setTimeLeft] = useState(
    // calculateTimeLeft(targetTime),
    { days: 0, hours: 0, minutes: 0, seconds: 0 },
  );

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetTime));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="flex items-center justify-center">
      <Card className="border-0 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
        <CardHeader className="text-center">
          活動倒數
        </CardHeader>
        <CardContent className="">
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
        </CardContent>
      </Card>
    </div>
  );
}
