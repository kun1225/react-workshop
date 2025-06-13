'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      <pre className="p-4 bg-muted rounded-md">
        {JSON.stringify({ email, eventName }, null, 2)}
      </pre>,
    );
  };

  const resetForm = () => {
    setEmail('');
    setEventName('');
  };

  return (
    <div className="w-2xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">
          處理表單輸入 錯誤示範 1
        </h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>活動報名表單</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="請輸入電子郵件"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="book">活動名稱</Label>
                <Input
                  id="book"
                  name="book"
                  value={eventName}
                  onChange={(e) =>
                    setEventName(e.target.value)
                  }
                  placeholder="請輸入活動名稱"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                重設表單
              </Button>
              <Button type="submit">送出</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>目前表單資料</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-md overflow-x-auto">
            {JSON.stringify({ email, eventName }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
