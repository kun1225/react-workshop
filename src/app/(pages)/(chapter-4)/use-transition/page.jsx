'use client';

import { useState, useTransition, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  BarChart,
  Bar,
  ComposedChart,
} from 'recharts';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  console.log('Re-render: UseTransition');

  return (
    <div className="flex min-h-screen ">
      {/* 側邊欄 */}
      <div className="w-64 p-4 bg-white shadow-xl relative z-10 ">
        <h2 className="text-xl font-bold text-gray-800 mb-4">儀表板</h2>
        <nav className="space-y-2">
          <Tab tab="home" activeTab={activeTab} onClick={() => handleTabClick('home')} />
          <Tab tab="report" activeTab={activeTab} onClick={() => handleTabClick('report')} />
          <Tab tab="data" activeTab={activeTab} onClick={() => handleTabClick('data')} />
        </nav>
      </div>

      {/* 主要內容區 */}
      <div className="flex-1">
        {activeTab === 'home' && <Home />}
        {activeTab === 'report' && <Chart />}
        {activeTab === 'data' && <DataTable />}
      </div>
    </div>
  );
}

function Tab({ tab, activeTab, onClick, className }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClick();
    });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full px-4 py-2 text-left rounded-lg transition',
        activeTab === tab ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-700',
        isPending && 'bg-gray-200 animate-pulse',
        className,
      )}
      disabled={isPending}
    >
      {isPending ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        tab.charAt(0).toUpperCase() + tab.slice(1)
      )}
    </button>
  );
}

// 生成圖表資料
const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    trend: Math.floor(Math.random() * 800),
    users: Math.floor(Math.random() * 500),
    revenue: Math.floor(Math.random() * 2000),
    conversion: Math.floor(Math.random() * 100),
  }));
};

// 生成表格資料
const generateTableData = (num = 1000) => {
  return Array.from({ length: num }, (_, index) => {
    return {
      id: index + 1,
      name: `Item ${index + 1}`,
      value: Math.floor(Math.random() * 1000),
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    };
  });
};

function Home() {
  console.log('Re-render: Home');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Home</h1>
    </div>
  );
}

// 表格組件
const tableData = generateTableData();
function DataTable() {
  console.log('Re-render: DataTable');
  return (
    <div className="overflow-hidden rounded-2xl m-8 shadow-xl">
      <div className="overflow-auto h-[calc(100vh-4rem)]">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-100">ID</th>
              <th className="px-4 py-2 border border-gray-100">Name</th>
              <th className="px-4 py-2 border border-gray-100">Value</th>
              <th className="px-4 py-2 border border-gray-100">Category</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ item }) {
  const now = performance.now();
  while (performance.now() - now < 2) {}

  return (
    <tr key={item.id} className="hover:bg-gray-50">
      <td className="px-4 py-2 border border-gray-100">{item.id}</td>
      <td className="px-4 py-2 border border-gray-100">{item.name}</td>
      <td className="px-4 py-2 border border-gray-100">{item.value}</td>
      <td className="px-4 py-2 border border-gray-100">{item.category}</td>
    </tr>
  );
}

const MemorizedTable = memo(DataTable);

const chartData = generateChartData();
// 圖表卡片容器組件
const ChartCard = ({ children, title, className }) => {
  return (
    <div className={cn('bg-white p-4 w-fit rounded-lg shadow-xl', className)}>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
};

function Chart() {
  console.log('Re-render: Chart');

  return (
    <div className="p-8">
      <div className="flex flex-col gap-6">
        {/* 折線圖 */}
        <ChartCard title="趨勢分析">
          <LineChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="銷售額" strokeWidth={2} />
            <Line type="monotone" dataKey="trend" stroke="#82ca9d" name="趨勢" strokeWidth={2} />
          </LineChart>
        </ChartCard>

        {/* 區域圖 */}
        <ChartCard title="用戶成長">
          <AreaChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" name="活躍用戶" />
          </AreaChart>
        </ChartCard>

        {/* 柱狀圖 */}
        <ChartCard title="收入統計">
          <BarChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" name="收入" />
          </BarChart>
        </ChartCard>

        {/* 組合圖表 */}
        <ChartCard title="轉換率分析" className="col-span-2">
          <ComposedChart width={600} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="用戶數" />
            <Line
              type="monotone"
              dataKey="conversion"
              stroke="#ff7300"
              name="轉換率"
              strokeWidth={2}
            />
          </ComposedChart>
        </ChartCard>
      </div>
    </div>
  );
}
