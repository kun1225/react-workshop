'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  SearchIcon,
  BookOpenIcon,
  CalendarIcon,
} from 'lucide-react';
import { ScrollShadow } from '@/components/scroll-shadow';
import { SlowComponent } from '@/components/slow-component';
import {
  blogPosts,
  recommendedPosts,
} from '@/lib/mock-data';

export default function Page() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    const searchTimeout = setTimeout(() => {
      const searchLower = search.toLowerCase();
      const filteredResults = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description
            .toLowerCase()
            .includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower),
      );

      setResults(filteredResults);
      setIsSearching(false);
      setHasSearched(true);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  // ✅ 正確寫法，使用事件控制 state
  // 如果和外部系統無關，不需要用 useEffect 控制
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (isOpen) {
      setSearch('');
      setResults([]);
      setHasSearched(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">
          部落格搜尋
        </h1>
        <p className="text-muted-foreground mb-8">
          點擊下方按鈕開啟搜尋功能，尋找你感興趣的文章。
        </p>

        <Sheet
          open={isOpen}
          onOpenChange={handleOpenChange}
        >
          <SheetTrigger asChild>
            <Button size="lg" className="w-full sm:w-auto">
              <SearchIcon className="mr-2 h-4 w-4" />
              搜尋文章
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="h-[80vh] overflow-hidden rounded-b-lg px-8 shadow-xl"
          >
            <SlowComponent />

            <SheetHeader className="sr-only">
              <SheetTitle>搜尋文章</SheetTitle>
              <SheetDescription>
                輸入關鍵字搜尋相關的部落格文章
              </SheetDescription>
            </SheetHeader>

            <div className="flex h-full flex-col pt-6">
              <div className="relative">
                <SearchIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  placeholder="搜尋文章標題、內容或分類..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="pl-10"
                />
              </div>

              {/* 搜尋結果區域 */}
              <ScrollShadow className="grow">
                <div
                  className={cn(!hasSearched && 'h-full')}
                >
                  {!search.trim() && (
                    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                      <SearchIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                      <p className="text-muted-foreground">
                        開始輸入關鍵字搜尋文章
                      </p>
                    </div>
                  )}

                  {isSearching && (
                    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                      <div className="border-muted-foreground mx-auto mb-4 size-8 animate-spin rounded-full border-b-2"></div>
                      <p className="text-muted-foreground">
                        搜尋中...
                      </p>
                    </div>
                  )}

                  {hasSearched && !isSearching && (
                    <>
                      {results.length > 0 ? (
                        <div className="space-y-4 py-8">
                          <p className="text-muted-foreground text-sm">
                            找到 {results.length} 篇相關文章
                          </p>
                          {results.map((post) => (
                            <Card
                              key={post.id}
                              className="hover:bg-muted cursor-pointer transition-all hover:shadow-lg"
                            >
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="mb-2 text-lg">
                                      {post.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                      {post.description}
                                    </CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                  <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                                    {post.category}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="size-3" />
                                    {post.date}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <BookOpenIcon className="size-3" />
                                    {post.readTime}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <div className="mb-8">
                            <h3 className="mb-2 text-lg font-semibold">
                              沒有找到相關文章
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              很抱歉，沒有找到與「{search}
                              」相關的文章。
                            </p>
                          </div>

                          <div>
                            <h4 className="text-md mb-4 flex items-center justify-center gap-2 font-semibold">
                              <BookOpenIcon className="h-4 w-4" />
                              推薦閱讀
                            </h4>
                            <div className="space-y-3">
                              {recommendedPosts.map(
                                (post) => (
                                  <Card
                                    key={post.id}
                                    className="cursor-pointer transition-shadow hover:shadow-md"
                                  >
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-base">
                                        {post.title}
                                      </CardTitle>
                                      <CardDescription className="line-clamp-2 text-sm">
                                        {post.description}
                                      </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                      <div className="text-muted-foreground flex items-center gap-3 text-xs">
                                        <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1">
                                          {post.category}
                                        </span>
                                        <span>
                                          {post.readTime}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollShadow>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
