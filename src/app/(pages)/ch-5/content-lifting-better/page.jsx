'use client';

import { useState, useRef, useEffect } from 'react';
import { wait } from '@/lib/utils';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import {
  Share2,
  FileDown,
  Plus,
  RefreshCw,
  Maximize,
  Minimize,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DELAY = 100;

export default function Page() {
  return (
    <FloatingBarControl>
      <header className="mb-8 flex items-center">
        <h1 className="mb-2 text-4xl font-bold">{`Hello ${user.name} `}</h1>
        <DetailsToggle />
      </header>
      <section id="analytics" className="flex gap-4">
        <AnalyticsComponent delay={DELAY} />
        <ChartComponent delay={DELAY} />
      </section>
      <section
        id="bar-chart"
        className="mt-8 flex flex-col gap-4"
      >
        <BarChartComponent delay={DELAY} />
      </section>
      <section
        id="area-chart"
        className="mt-8 flex flex-col gap-4"
      >
        <AreaChartComponent delay={DELAY} />
      </section>
      <section
        id="tables"
        className="mt-8 flex flex-col gap-4"
      >
        <TableComponent delay={DELAY} />
      </section>
    </FloatingBarControl>
  );
}

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

export function DetailsToggle() {
  const [isDetailsVisible, setIsDetailsVisible] =
    useState(false);
  return (
    <>
      <Button
        onClick={() => setIsDetailsVisible((v) => !v)}
        variant="link"
        className="text-muted-foreground"
      >
        {isDetailsVisible ? '隱藏詳細資料' : '顯示詳細資料'}
      </Button>
      {isDetailsVisible && (
        <UserDetails
          onHide={() => setIsDetailsVisible(false)}
        />
      )}
    </>
  );
}

const analyticsConfig = {
  visitors: { label: '訪客數', color: 'var(--chart-2)' },
  active: { label: '活躍用戶', color: 'var(--chart-5)' },
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
  visitors: { label: '訪客數', color: 'var(--chart-1)' },
  active: { label: '活躍用戶', color: 'var(--chart-2)' },
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

function TableComponent({ delay = 0 }) {
  wait(delay);
  const tableData = Array.from({ length: 100 }, (_, i) => ({
    id: `prj_${'a' + (i * 7).toString(16).padStart(5, '0')}`,
    name: `project-${i + 1}`,
    status: ['Production', 'Building', 'Error', 'Queued'][
      i % 4
    ],
    lastUpdated: `${i + 1}h ago`,
    domain: `app-${i + 1}.vercel.app`,
  }));
  const statusColors = {
    Production: 'green',
    Building: 'yellow',
    Error: 'red',
    Queued: 'gray',
  };
  return (
    <Card id="tables">
      <CardHeader>
        <h1 className="text-3xl font-bold">專案列表</h1>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 border-b bg-gray-50/80 backdrop-blur-sm">
            <tr>
              <th className="p-4 font-semibold">
                Project Name
              </th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">
                Last Updated
              </th>
              <th className="p-4 font-semibold">Domain</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="p-4 font-mono">
                  {row.name}
                </td>
                <td className="p-4">
                  <Badge variant={statusColors[row.status]}>
                    {row.status}
                  </Badge>
                </td>
                <td className="p-4 text-gray-500">
                  {row.lastUpdated}
                </td>
                <td className="p-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline"
                  >
                    {row.domain}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

// FloatingBar/FloatingBarControl from content-lifting
function FloatingBarControl({ children }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const showBarPosition = 200;
      setIsBarVisible(window.scrollY > showBarPosition);
      const sections =
        containerRef.current.querySelectorAll('section');
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop =
          section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });
      if (activeSection !== currentSectionId) {
        setActiveSection(currentSectionId);
      }
      // Calculate scroll progress
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const currentProgress =
        maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <div ref={containerRef}>
      <DynamicHeader currentSection={activeSection} />
      {children}
      <FloatingBar
        isVisible={isBarVisible}
        currentSection={activeSection}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}

function FloatingBar({
  isVisible,
  currentSection,
  scrollProgress,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sections = [
    { id: 'analytics', label: '流量分析' },
    { id: 'browsers', label: '瀏覽器分布' },
    { id: 'bar-chart', label: '橫條圖' },
    { id: 'area-chart', label: '面積圖' },
    { id: 'tables', label: '專案列表' },
  ];
  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    );
    return () =>
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
  }, []);
  return (
    <div
      className={cn(
        'bg-background/80 fixed bottom-8 left-1/2 z-50 w-auto -translate-x-1/2 overflow-hidden rounded-full border text-sm shadow-lg backdrop-blur-sm transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-24',
      )}
    >
      <div className="flex h-14 items-center gap-2 p-2">
        {/* 1. 導覽按鈕 */}
        <div className="flex items-center gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={
                currentSection === section.id
                  ? 'secondary'
                  : 'ghost'
              }
              size="sm"
              className="rounded-full"
              onClick={() => handleScrollTo(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </div>
        <Separator orientation="vertical" className="h-6" />
        {/* 2. 畫面與資料控制按鈕 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Separator orientation="vertical" className="h-6" />
        {/* 3. 主要操作按鈕 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <FileDown className="h-4 w-4" />
          </Button>
          <Button size="icon" className="rounded-full">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Scroll Progress Bar */}
      <div className="bg-primary/20 absolute bottom-0 left-0 h-1 w-full">
        <div
          className="bg-primary h-full w-full origin-left transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </div>
  );
}

// DynamicHeader: 根據 currentSection 動態顯示標題
function DynamicHeader({ currentSection }) {
  const getSectionTitle = (sectionId) => {
    const titles = {
      analytics: '網站流量分析',
      'bar-chart': '每日訪客橫條圖',
      'area-chart': '活躍用戶面積圖',
      tables: '專案列表',
    };
    return titles[sectionId] || 'Dashboard';
  };
  return (
    <header className="bg-background/80 sticky top-0 z-50 -mx-8 mb-4 px-8 py-4 backdrop-blur-sm">
      <h1 className="text-4xl font-bold">
        {getSectionTitle(currentSection)}
      </h1>
    </header>
  );
}
