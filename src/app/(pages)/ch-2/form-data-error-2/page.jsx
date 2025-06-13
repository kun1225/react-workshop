'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  // 開始新增一堆 state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState('');
  const [people, setPeople] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('申請已送出！');
  };

  // 重置表單的內容也越來越長
  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setEvent('');
    setPeople('');
    setNote('');
  };

  const isFormValid = [name, phone, email, event, people, note].every(
    (value) => value.trim() !== '',
  );

  return (
    <div className="w-2xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">處理表單輸入 錯誤示範 2</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>活動報名表單</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="請輸入姓名"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">電話</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="請輸入電話"
                />
              </div>
            </div>

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
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="請輸入活動名稱"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">參加人數</Label>
              <Input
                id="days"
                name="days"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="請輸入參加人數"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">備註</Label>
              <Input
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="如有特殊需求請填寫"
              />
            </div>

            <div className="flex justify-end pt-2 space-x-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                重設表單
              </Button>
              <Button type="submit" disabled={!isFormValid}>
                送出
              </Button>
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
            {JSON.stringify({ name, phone, email, event, people, note }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
