'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { analyticsData as initialData } from '@/lib/mock-data';
import { SlowComponent } from '@/components/slow-component';
import { Search } from 'lucide-react';

import { wait } from '@/lib/utils';

export default function Page() {
  const [data, setData] = useState(initialData);

  return (
    <>
      <FilterForm />

      <Tabs defaultValue="add" className="mt-4 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">新增資料</TabsTrigger>
          <TabsTrigger value="other">用戶設置</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <DataInputTab setData={setData} />
        </TabsContent>

        <TabsContent value="other">
          <SettingsTab />
        </TabsContent>
      </Tabs>

      <HeavyCharts data={data} />
    </>
  );
}

function FilterForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [showFilters, setShowFilters] = useState(false);

  wait(200);

  return (
    <div className="mb-6 space-y-4">
      <div>
        <h1 className="text-3xl font-bold">數據分析儀表板</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          查看您的網站流量和用戶活動數據
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="搜尋日期或數據..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">最近 7 天</SelectItem>
            <SelectItem value="30d">最近 30 天</SelectItem>
            <SelectItem value="90d">最近 90 天</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={showFilters ? 'default' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto"
        >
          篩選
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">篩選選項</p>
        </div>
      )}
    </div>
  );
}

function DataInputTab({ setData }) {
  const [newData, setNewData] = useState({
    date: new Date().toISOString().split('T')[0],
    visitors: 0,
    active: 0,
  });

  const handleAddData = () => {
    setData((prev) => [
      ...prev,
      {
        date: newData.date,
        visitors: Number(newData.visitors),
        active: Number(newData.active),
      },
    ]);

    setNewData({
      date: new Date().toISOString().split('T')[0],
      visitors: 0,
      active: 0,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>新增圖表數據</CardTitle>
        <CardDescription>向圖表新增一個新的數據點</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">日期</Label>
          <Input
            id="date"
            type="date"
            value={newData.date}
            onChange={(e) =>
              setNewData((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visitors">訪客</Label>
          <Input
            id="visitors"
            type="number"
            value={newData.visitors}
            onChange={(e) =>
              setNewData((prev) => ({
                ...prev,
                visitors: e.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="active">活躍</Label>
          <Input
            id="active"
            type="number"
            value={newData.active}
            onChange={(e) =>
              setNewData((prev) => ({
                ...prev,
                active: e.target.value,
              }))
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddData}>新增數據</Button>
      </CardFooter>
    </Card>
  );
}

function SettingsTab() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('zh-TW');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>用戶設置</CardTitle>
        <CardDescription>調整您的個人偏好設置。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theme">主題</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme" className="w-full">
              <SelectValue placeholder="選擇主題" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">淺色</SelectItem>
              <SelectItem value="dark">深色</SelectItem>
              <SelectItem value="auto">自動</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">語言</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="選擇語言" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zh-TW">繁體中文</SelectItem>
              <SelectItem value="zh-CN">簡體中文</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>通知設置</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
              <Label htmlFor="email" className="cursor-pointer font-normal">
                電子郵件通知
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
              <Label htmlFor="push" className="cursor-pointer font-normal">
                推送通知
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">儲存設置</Button>
      </CardFooter>
    </Card>
  );
}

const analyticsConfig = {
  visitors: {
    label: '訪客',
    color: 'var(--chart-2)',
  },
  active: {
    label: '活躍',
    color: 'var(--chart-5)',
  },
};

function HeavyCharts({ data }) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">折線圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <LineChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
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
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">柱狀圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <BarChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="visitors" fill="var(--chart-2)" />
                <Bar dataKey="active" fill="var(--chart-5)" />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">區域圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <AreaChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Area
                  type="monotone"
                  dataKey="active"
                  strokeWidth={2}
                  stroke="var(--chart-5)"
                  fill="var(--chart-5)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  strokeWidth={2}
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">組合圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <ComposedChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Bar
                  dataKey="visitors"
                  fill="var(--chart-2)"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>
    </div>
  );
}
