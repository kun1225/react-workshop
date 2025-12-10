import { useState, useEffect, Activity } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

export function PageTabs({ setData }) {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="mt-4 w-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="add">新增資料</TabsTrigger>
        <TabsTrigger value="settings">用戶設置</TabsTrigger>
        <TabsTrigger value="filter">報表篩選</TabsTrigger>
        <TabsTrigger value="view">視圖設定</TabsTrigger>
      </TabsList>

      <Activity mode={activeTab === 'add' ? 'visible' : 'hidden'}>
        <TabsContent value="add">
          <DataInputTab setData={setData} />
        </TabsContent>
      </Activity>

      <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Activity>

      <Activity mode={activeTab === 'filter' ? 'visible' : 'hidden'}>
        <TabsContent value="filter">
          <ReportFilterTab />
        </TabsContent>
      </Activity>

      <Activity mode={activeTab === 'view' ? 'visible' : 'hidden'}>
        <TabsContent value="view">
          <ViewOptionsTab />
        </TabsContent>
      </Activity>
    </Tabs>
  );
}

function DataInputTab({ setData }) {
  console.log('DataInputTab');

  useEffect(() => {
    console.log('Effect DataInputTab');
  }, []);

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

function ReportFilterTab() {
  const [range, setRange] = useState('7d');
  const [country, setCountry] = useState('all');
  const [device, setDevice] = useState('all');

  return (
    <Card>
      <CardHeader>
        <CardTitle>報表篩選</CardTitle>
        <CardDescription>設定報表的篩選條件。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="range">時間區間</Label>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger id="range" className="w-full">
              <SelectValue placeholder="選擇時間區間" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">最近 7 天</SelectItem>
              <SelectItem value="30d">最近 30 天</SelectItem>
              <SelectItem value="90d">最近 90 天</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">國家</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="選擇國家" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="tw">台灣</SelectItem>
              <SelectItem value="jp">日本</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="device">裝置</Label>
          <Select value={device} onValueChange={setDevice}>
            <SelectTrigger id="device" className="w-full">
              <SelectValue placeholder="選擇裝置" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="desktop">桌機</SelectItem>
              <SelectItem value="mobile">手機</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">套用篩選</Button>
      </CardFooter>
    </Card>
  );
}

function ViewOptionsTab() {
  const [showChart, setShowChart] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [chartType, setChartType] = useState('line');

  return (
    <Card>
      <CardHeader>
        <CardTitle>視圖設定</CardTitle>
        <CardDescription>調整報表的顯示選項。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>顯示選項</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showChart"
                checked={showChart}
                onCheckedChange={(checked) => setShowChart(checked)}
              />
              <Label htmlFor="showChart" className="cursor-pointer font-normal">
                顯示圖表
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showTable"
                checked={showTable}
                onCheckedChange={(checked) => setShowTable(checked)}
              />
              <Label htmlFor="showTable" className="cursor-pointer font-normal">
                顯示表格
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chartType">圖表類型</Label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger id="chartType" className="w-full">
              <SelectValue placeholder="選擇圖表類型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">折線圖</SelectItem>
              <SelectItem value="bar">長條圖</SelectItem>
              <SelectItem value="area">面積圖</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">套用設定</Button>
      </CardFooter>
    </Card>
  );
}
