'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  eventName: '',
  people: '',
  note: '',
};

export default function Page() {
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
    toast.success(
      <pre className="bg-muted rounded-md p-4">
        {JSON.stringify(formData, null, 2)}
      </pre>,
    );
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="mx-auto w-2xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">
          處理表單輸入 更好的寫法
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              <Label htmlFor="eventName">活動名稱</Label>
              <Input
                id="eventName"
                name="eventName"
                value={formData.eventName}
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
            <div className="flex justify-end space-x-2 pt-2">
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
          <pre className="bg-muted overflow-x-auto rounded-md p-4">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
