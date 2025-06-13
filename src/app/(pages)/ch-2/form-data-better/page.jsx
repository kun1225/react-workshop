'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  event: '',
  people: '',
  note: '',
};

export default function Page() {
  // ✅ Good: Using a single useState hook with an object.
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('報名成功！');
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  return (
    <div className="w-2xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">處理表單輸入 更好的寫法</h1>
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="請輸入姓名"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="請輸入電子郵件"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event">活動名稱</Label>
              <Input
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                placeholder="請輸入活動名稱"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">參加人數</Label>
              <Input
                id="people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                placeholder="請輸入參加人數"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">備註</Label>
              <Input
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
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
            {JSON.stringify(formData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
