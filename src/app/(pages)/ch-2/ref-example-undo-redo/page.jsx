'use client';

import { useState, useEffect, useRef } from 'react';
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
  const historyRef = useRef({
    undoStack: [],
    redoStack: [],
  });

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);

      historyRef.current.undoStack.push({
        type: 'add',
        tag,
      });

      // 執行新操作時清空 redo stack
      historyRef.current.redoStack = [];
    } else {
      setSelectedTags((prev) =>
        prev.filter((t) => t !== tag),
      );

      historyRef.current.undoStack.push({
        type: 'remove',
        tag,
      });

      // 執行新操作時清空 redo stack
      historyRef.current.redoStack = [];
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlZ =
        (e.ctrlKey || e.metaKey) && e.key === 'z';

      const isCtrlShiftZ =
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key === 'z';

      if (isCtrlShiftZ) {
        // Redo 操作
        console.log('Redo');
        e.preventDefault();

        const actionToRedo =
          historyRef.current.redoStack.pop();
        if (!actionToRedo) return;

        // 將動作移回 undo stack
        historyRef.current.undoStack.push(actionToRedo);

        // 執行 redo 動作
        if (actionToRedo.type === 'add') {
          setSelectedTags((tags) => [
            ...tags,
            actionToRedo.tag,
          ]);
        } else if (actionToRedo.type === 'remove') {
          setSelectedTags((tags) =>
            tags.filter((t) => t !== actionToRedo.tag),
          );
        }
      } else if (isCtrlZ) {
        // Undo 操作
        e.preventDefault();

        const lastAction =
          historyRef.current.undoStack.pop();
        if (!lastAction) return;

        // 將動作移到 redo stack
        historyRef.current.redoStack.push(lastAction);

        // 執行 undo 動作（相反操作）
        if (lastAction.type === 'add') {
          setSelectedTags((tags) =>
            tags.filter((t) => t !== lastAction.tag),
          );
        } else if (lastAction.type === 'remove') {
          setSelectedTags((tags) => [
            ...tags,
            lastAction.tag,
          ]);
        }
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
        技術文章列表 (Undo/Redo)
      </h2>
      <p className="text-muted-foreground mb-8 text-center text-sm font-semibold">
        Ctrl + Z 可以撤銷操作，Ctrl + Shift + Z 可以重做操作
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
