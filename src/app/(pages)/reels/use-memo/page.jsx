'use client';

import { Demo2 } from './demo-2-before';
import { Demo2After } from './demo-2-after';
import { Demo1 } from './demo-1';
import { Demo1After } from './demo-1-after';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Page() {
  return (
    <div className="p-4">
      <Tabs defaultValue="demo-1">
        <TabsList>
          <TabsTrigger value="demo-1">Demo 1</TabsTrigger>
          <TabsTrigger value="demo-1-after">Demo 1 After</TabsTrigger>
          {/* <TabsTrigger value="demo-2-before">Demo 2 Before</TabsTrigger> */}
          {/* <TabsTrigger value="demo-2-after">Demo 2 After</TabsTrigger> */}
          {/* <TabsTrigger value="demo-2-after-with-transition">Demo 2 After with Transition</TabsTrigger> */}
        </TabsList>

        <TabsContent value="demo-1">
          <Demo1 />
        </TabsContent>

        <TabsContent value="demo-1-after">
          <Demo1After />
        </TabsContent>

        <TabsContent value="demo-2-before">
          <Demo2 />
        </TabsContent>

        <TabsContent value="demo-2-after">
          <Demo2After />
        </TabsContent>
      </Tabs>
    </div>
  );
}
