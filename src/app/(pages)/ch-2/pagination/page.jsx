'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const FIELD_PARSERS = {
  page: Number,
};

const DATA = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  created_at: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

const PAGE_SIZE = 10;
const SORT_OPTIONS = [
  { value: 'created_at', label: '建立時間' },
  { value: 'name', label: '名稱' },
];

export default function Page() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    sortBy: 'created_at',
    filterText: '',
  });

  const updateQueryParams = (e) => {
    const { name, value } = e.target;
    const parser = FIELD_PARSERS[name] || ((v) => v);
    setQueryParams((prev) => ({ ...prev, [name]: parser(value) }));
  };

  const filteredSortedData = useMemo(() => {
    let result = DATA;

    if (queryParams.filterText) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(queryParams.filterText.toLowerCase()),
      );
    }

    result = [...result].sort((a, b) => {
      if (queryParams.sortBy === 'created_at') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (queryParams.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [queryParams.filterText, queryParams.sortBy]);

  const total = filteredSortedData.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pagedData = filteredSortedData.slice(
    (queryParams.page - 1) * PAGE_SIZE,
    queryParams.page * PAGE_SIZE,
  );

  return (
    <div className="w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">分頁功能展示</h2>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="搜尋名稱..."
          name="filterText"
          value={queryParams.filterText}
          onChange={updateQueryParams}
          className="w-40"
        />

        <Select name="sortBy" tmlonValueChange={updateQueryParams}>
          <SelectTrigger>
            <SelectValue placeholder="選擇排序方式" />
          </SelectTrigger>

          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TableData pagedData={pagedData} />

      <Pagination
        totalPages={totalPages}
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
      />
    </div>
  );
}

function TableData({ pagedData }) {
  return (
    <table className="w-full border mt-2">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">名稱</th>
          <th className="p-2 border">建立時間</th>
        </tr>
      </thead>
      <tbody>
        {pagedData.map((item) => (
          <tr key={item.id}>
            <td className="p-2 border text-center">{item.id}</td>
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border">{new Date(item.created_at).toLocaleString()}</td>
          </tr>
        ))}
        {pagedData.length === 0 && (
          <tr>
            <td colSpan={3} className="p-4 text-center text-gray-400">
              無資料
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Pagination({ totalPages, queryParams, updateQueryParams }) {
  console.log('🚀 ~ Pagination ~ queryParams:', queryParams);
  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="sm"
        name="page"
        value={queryParams.page - 1}
        onClick={updateQueryParams}
        disabled={queryParams.page === 1}
      >
        上一頁
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={queryParams.page === i + 1 ? 'default' : 'outline'}
          size="sm"
          name="page"
          value={i + 1}
          onClick={updateQueryParams}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        name="page"
        value={Number(queryParams.page) + 1}
        onClick={updateQueryParams}
        disabled={queryParams.page === totalPages}
      >
        下一頁
      </Button>
    </div>
  );
}
