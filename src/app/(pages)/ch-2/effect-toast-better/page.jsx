'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Page() {
  const [userName, setUserName] = useState('');

  return (
    <Tabs defaultValue="profile">
      <TabsList className="mx-auto">
        <TabsTrigger value="profile">
          使用者資訊
        </TabsTrigger>
        <TabsTrigger value="permissions">
          權限設定
        </TabsTrigger>
      </TabsList>

      <div className="mx-auto mt-8 w-xl rounded-2xl border">
        <TabsContent value="profile">
          <UserProfile
            userName={userName}
            setUserName={setUserName}
          />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionSettings />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function UserProfile({ userName, setUserName }) {
  function setNameAndToast(name) {
    setUserName(name);
    toast(<p>使用者名稱已更新: {name}</p>);
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">
        使用者資訊管理
      </h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="userName"
            className="mb-2 block text-sm font-medium"
          >
            使用者名稱 (修改時會顯示通知)
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) =>
              setNameAndToast(e.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="請輸入使用者名稱"
          />
        </div>

        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-medium">
            目前使用者資訊：
          </h3>
          <p className="text-sm">
            使用者名稱: {userName || '(未設定)'}
          </p>
        </div>
      </div>
    </div>
  );
}

function PermissionSettings() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">權限設定</h1>
      <div className="space-y-4">
        <div className="rounded-md border border-gray-200 p-4">
          <h3 className="text-sm font-medium">
            使用者權限
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            設定使用者的系統存取權限
          </p>
        </div>
        <div className="rounded-md border border-gray-200 p-4">
          <h3 className="text-sm font-medium">資料權限</h3>
          <p className="mt-1 text-sm text-gray-500">
            設定使用者可存取的資料範圍
          </p>
        </div>
      </div>
    </div>
  );
}
