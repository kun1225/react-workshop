'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { wait } from '@/lib/utils';

export function FilterForm() {
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
