'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: 'React 狀態管理入門',
    tags: ['React', '前端', '狀態管理'],
  },
  {
    id: 2,
    title: 'Node.js API 設計實戰',
    tags: ['Node.js', '後端', 'API'],
  },
  {
    id: 3,
    title: 'TypeScript 型別安全技巧',
    tags: ['TypeScript', '前端', '型別'],
  },
  {
    id: 4,
    title: 'React Hooks 深入解析',
    tags: ['React', 'Hooks', '前端'],
  },
  {
    id: 5,
    title: '資料庫效能優化',
    tags: ['資料庫', '後端', '效能'],
  },
  {
    id: 6,
    title: '前端自動化測試實踐',
    tags: ['前端', '測試', 'Jest'],
  },
  {
    id: 7,
    title: 'GraphQL 與 REST API 比較',
    tags: ['API', 'GraphQL', '後端'],
  },
  {
    id: 8,
    title: 'Docker 部署 Node.js 專案',
    tags: ['Docker', 'Node.js', '部署'],
  },
  {
    id: 9,
    title: 'CSS in JS 實戰技巧',
    tags: ['前端', 'CSS', 'React'],
  },
  {
    id: 10,
    title: 'MongoDB 資料建模指南',
    tags: ['資料庫', 'MongoDB', '後端'],
  },
  {
    id: 11,
    title: '前端效能優化實戰',
    tags: ['前端', '效能', '優化'],
  },
  {
    id: 12,
    title: 'Kubernetes 入門教學',
    tags: ['Kubernetes', 'DevOps', '部署'],
  },
  {
    id: 13,
    title: 'Python 資料分析基礎',
    tags: ['Python', '資料分析', '後端'],
  },
  {
    id: 14,
    title: 'Vue 3 新特性總覽',
    tags: ['Vue', '前端', 'JavaScript'],
  },
  {
    id: 15,
    title: 'Redis 快取應用',
    tags: ['Redis', '資料庫', '後端'],
  },
  {
    id: 16,
    title: 'Sass 與 CSS 預處理',
    tags: ['Sass', 'CSS', '前端'],
  },
  {
    id: 17,
    title: 'Go 語言 API 開發',
    tags: ['Go', 'API', '後端'],
  },
  {
    id: 18,
    title: 'Next.js SEO 最佳實踐',
    tags: ['Next.js', 'React', 'SEO'],
  },
  {
    id: 19,
    title: 'Flutter 跨平台開發',
    tags: ['Flutter', '跨平台', '行動開發'],
  },
  {
    id: 20,
    title: 'Linux 指令速查',
    tags: ['Linux', 'DevOps', '工具'],
  },
];

const allTags = Array.from(
  new Set(articles.flatMap((a) => a.tags)),
);

export default function Page() {
  const [selectedTags, setSelectedTags] = useState([]);
  // 用來儲存操作歷史的陣列，使用 _ 表示不會直接讀取這個值
  const [_, setHistory] = useState([]);

  const handleTagClick = (tag) => {
    // 檢查該標籤是否已經被選中
    if (!selectedTags.includes(tag)) {
      // 如果標籤未被選中，則將其加入選中列表
      setSelectedTags((prev) => [...prev, tag]);

      // 記錄「新增」操作到歷史紀錄中
      setHistory((prev) => [
        ...prev,
        {
          type: 'add', // 操作類型：新增
          tag, // 被操作的標籤
        },
      ]);
    } else {
      // 如果標籤已被選中，則將其從選中列表中移除
      setSelectedTags((prev) =>
        prev.filter((t) => t !== tag),
      );

      // 記錄「移除」操作到歷史紀錄中
      setHistory((prev) => [
        ...prev,
        {
          type: 'remove', // 操作類型：移除
          tag, // 被操作的標籤
        },
      ]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlZ =
        (e.ctrlKey || e.metaKey) && e.key === 'z';

      if (isCtrlZ) {
        setHistory((prev) => {
          if (prev.length === 0) return prev;

          // 取得最後一次操作
          const lastAction = prev[prev.length - 1];

          // 根據最後一次操作的類型，執行相反的操作
          if (lastAction.type === 'add') {
            // 如果最後一次是新增，撤銷時要移除該標籤
            setSelectedTags((tags) =>
              tags.filter((t) => t !== lastAction.tag),
            );
          } else if (lastAction.type === 'remove') {
            // 如果最後一次是移除，撤銷時要重新加入該標籤
            setSelectedTags((tags) => [
              ...tags,
              lastAction.tag,
            ]);
          }

          // 移除歷史紀錄中的最後一筆操作（等同於 pop）
          return prev.slice(0, -1);
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>
      window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredArticles =
    selectedTags.length === 0
      ? articles
      : articles.filter((article) =>
          article.tags.some((tag) =>
            selectedTags.includes(tag),
          ),
        );

  return (
    <div>
      <h2 className="mb-2 text-center text-3xl font-bold">
        技術文章列表 (State)
      </h2>
      <p className="text-muted-foreground mb-8 text-center text-sm font-semibold">
        Ctrl + Z 可以撤銷操作
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Button
            key={tag}
            onClick={() => handleTagClick(tag)}
            variant={
              selectedTags.includes(tag)
                ? 'default'
                : 'outline'
            }
            size="pill"
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <p className="text-muted-foreground">
            沒有符合條件的文章
          </p>
        ) : (
          filteredArticles.map((a) => (
            <Card
              key={a.id}
              className="cursor-pointer transition hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                {a.tags.map((tag) => (
                  <Badge variant="outline" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
