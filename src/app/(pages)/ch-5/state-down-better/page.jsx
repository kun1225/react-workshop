'use client';
import { useState } from 'react';
import { SlowComponent } from '@/components/slow-component';

// 模擬後台數據
const user = {
  name: 'John Doe',
  email: 'john@vercel.com',
  role: 'Admin',
  joined: '2022-01-01',
};

// 用於 Analytics 的假資料
const analyticsData = [
  { date: '2024-06-01', visitors: 1200, active: 320 },
  { date: '2024-06-02', visitors: 1500, active: 400 },
  { date: '2024-06-03', visitors: 1100, active: 310 },
  { date: '2024-06-04', visitors: 1800, active: 500 },
  { date: '2024-06-05', visitors: 1700, active: 480 },
];

const analyticsConfig = {
  visitors: {
    label: '訪客數',
    color: 'hsl(var(--chart-1))',
  },
  active: {
    label: '活躍用戶',
    color: 'hsl(var(--chart-2))',
  },
};

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// 用於 Chart 的假資料
const chartData = [
  {
    name: 'Chrome',
    users: 800,
    fill: 'hsl(var(--chart-1))',
  },
  {
    name: 'Safari',
    users: 600,
    fill: 'hsl(var(--chart-2))',
  },
  { name: 'Edge', users: 300, fill: 'hsl(var(--chart-3))' },
  {
    name: 'Firefox',
    users: 200,
    fill: 'hsl(var(--chart-4))',
  },
];

const chartConfig = {
  Chrome: { label: 'Chrome', color: 'hsl(var(--chart-1))' },
  Safari: { label: 'Safari', color: 'hsl(var(--chart-2))' },
  Edge: { label: 'Edge', color: 'hsl(var(--chart-3))' },
  Firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-4))',
  },
};

function UserDetails({ onHide }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <div className="relative min-w-[320px] rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-2 text-lg font-bold">
          使用者詳細資料
        </h3>
        <ul className="mb-4 text-sm text-gray-700">
          <li>
            <b>Email:</b> {user.email}
          </li>
          <li>
            <b>Role:</b> {user.role}
          </li>
          <li>
            <b>Joined:</b> {user.joined}
          </li>
        </ul>
        <button
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          onClick={onHide}
        >
          關閉
        </button>
      </div>
    </div>
  );
}

function HeavyAnalyticsComponent() {
  return (
    <div className="mb-2 rounded border p-4">
      <b>Analytics</b>：流量與活躍用戶
      <ChartContainer
        config={analyticsConfig}
        className="mt-2"
      >
        <BarChart data={analyticsData} height={220}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Bar
            dataKey="visitors"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="active"
            fill="hsl(var(--chart-2))"
            radius={[4, 4, 0, 0]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function ComplexChartComponent() {
  return (
    <div className="mb-2 rounded border p-4">
      <b>瀏覽器分布</b>：用戶來源
      <ChartContainer config={chartConfig} className="mt-2">
        <BarChart data={chartData} height={220}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Bar
            dataKey="users"
            radius={[4, 4, 0, 0]}
            fill={({ payload }) => payload.fill}
            isAnimationActive={false}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelKey="users"
                nameKey="name"
              />
            }
          />
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

// ❌ 狀態在上層（效能較差）
function UserProfileBad() {
  const [isDetailsVisible, setIsDetailsVisible] =
    useState(false);

  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-2 text-xl font-bold">
        {user.name}{' '}
        <span className="text-xs text-gray-400">
          (Bad Example)
        </span>
      </h2>
      <button
        className="mb-2 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200"
        onClick={() => setIsDetailsVisible((v) => !v)}
      >
        {isDetailsVisible ? '隱藏詳細資料' : '顯示詳細資料'}
      </button>
      {isDetailsVisible && (
        <UserDetails
          onHide={() => setIsDetailsVisible(false)}
        />
      )}
      <HeavyAnalyticsComponent />
      <ComplexChartComponent />
    </div>
  );
}

// ✅ 狀態下移（效能較佳）
function DetailsToggle() {
  const [isDetailsVisible, setIsDetailsVisible] =
    useState(false);
  return (
    <>
      <button
        className="mb-2 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200"
        onClick={() => setIsDetailsVisible(true)}
      >
        顯示詳細資料
      </button>
      {isDetailsVisible && (
        <UserDetails
          onHide={() => setIsDetailsVisible(false)}
        />
      )}
    </>
  );
}

function UserProfileGood() {
  return (
    <div className="rounded-lg border p-6 shadow">
      <h2 className="mb-2 text-xl font-bold">
        {user.name}{' '}
        <span className="text-xs text-gray-400">
          (Good Example)
        </span>
      </h2>
      <DetailsToggle />
      <HeavyAnalyticsComponent />
      <ComplexChartComponent />
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-8 py-8">
      <UserProfileBad />
      <UserProfileGood />
    </div>
  );
}
