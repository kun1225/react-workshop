'use client';

import { useState } from 'react';
import { wait } from '@/lib/utils';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { analyticsData, chartData } from '@/lib/mock-data';

// 模擬後台數據
const user = {
  name: 'This.Web',
  email: 'example@example.com',
  role: ' 管理員',
  joined: '2025-01-01',
};

function UserDetails({ onHide }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
      <Card className="w-xl">
        <CardHeader>
          <h3 className="text-lg font-bold">
            使用者詳細資料
          </h3>
        </CardHeader>

        <CardContent>
          <ul>
            <li>
              <b>Email:</b> {user.email}
            </li>
            <li>
              <b>權限:</b> {user.role}
            </li>
            <li>
              <b>加入時間:</b> {user.joined}
            </li>
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className="ml-auto"
            variant="secondary"
            onClick={onHide}
          >
            關閉
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const analyticsConfig = {
  visitors: {
    label: '訪客數',
    color: 'var(--chart-2)',
  },
  active: {
    label: '活躍用戶',
    color: 'var(--chart-5)',
  },
};

function AnalyticsComponent({ delay = 0 }) {
  wait(delay);
  return (
    <Card className="grow">
      <CardHeader>
        <h3 className="text-xl font-bold">網站流量分析</h3>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={analyticsConfig}
          className="bg-card"
        >
          <LineChart
            data={analyticsData}
            width={500}
            height={300}
          >
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
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

            <Line
              type="monotone"
              dataKey="visitors"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={false}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  Chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  Safari: { label: 'Safari', color: 'var(--chart-2)' },
  Edge: { label: 'Edge', color: 'var(--chart-3)' },
  Firefox: { label: 'Firefox', color: 'var(--chart-4)' },
};

function ChartComponent({ delay = 0 }) {
  wait(delay);
  return (
    <Card className="grow">
      <CardHeader>
        <h3 className="text-xl font-bold">瀏覽器分布</h3>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            <Pie
              data={chartData}
              dataKey="users"
              nameKey="name"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>

            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const barChartConfig = {
  visitors: {
    label: '訪客數',
    color: 'var(--chart-1)',
  },
  active: {
    label: '活躍用戶',
    color: 'var(--chart-2)',
  },
};

function BarChartComponent({ delay = 0 }) {
  wait(delay);
  return (
    <Card className="grow">
      <CardHeader>
        <h3 className="text-xl font-bold">
          每日訪客橫條圖
        </h3>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig}>
          <BarChart
            data={analyticsData}
            width={500}
            height={300}
          >
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
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
            <Bar dataKey="visitors" fill="var(--chart-2)" />
            <Bar dataKey="active" fill="var(--chart-5)" />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const areaChartConfig = {
  visitors: { label: '訪客數', color: 'var(--chart-4)' },
  active: { label: '活躍用戶', color: 'var(--chart-5)' },
};

function AreaChartComponent({ delay = 0 }) {
  wait(delay);
  return (
    <Card className="grow">
      <CardHeader>
        <h3 className="text-xl font-bold">
          活躍用戶面積圖
        </h3>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaChartConfig}>
          <AreaChart
            data={analyticsData}
            width={500}
            height={300}
          >
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
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
            <Area
              type="monotone"
              dataKey="active"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DELAY = 100;

export default function Page() {
  const [isDetailsVisible, setIsDetailsVisible] =
    useState(false);

  return (
    <>
      <header className="mb-8 flex items-center">
        <h1 className="mb-2 text-4xl font-bold">
          {`Hello ${user.name} `}
        </h1>
        <Button
          onClick={() => setIsDetailsVisible((v) => !v)}
          variant="link"
          className="text-muted-foreground"
        >
          {isDetailsVisible
            ? '隱藏詳細資料'
            : '顯示詳細資料'}
        </Button>
        {isDetailsVisible && (
          <UserDetails
            onHide={() => setIsDetailsVisible(false)}
          />
        )}
      </header>

      <section className="flex gap-4">
        <AnalyticsComponent delay={DELAY} />
        <ChartComponent delay={DELAY} />
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <BarChartComponent delay={DELAY} />
        <AreaChartComponent delay={DELAY} />
      </section>
    </>
  );
}
