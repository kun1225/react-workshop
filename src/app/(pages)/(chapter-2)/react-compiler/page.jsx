import { Demo1 } from './_components/demo-1';
import { Demo2 } from './_components/demo-2';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Page() {
  return (
    <Tabs defaultValue="demo-1">
      <TabsList>
        <TabsTrigger value="demo-1">Demo 1</TabsTrigger>
        <TabsTrigger value="demo-2">Demo 2</TabsTrigger>
      </TabsList>

      <TabsContent value="demo-1">
        <Demo1 />
      </TabsContent>

      <TabsContent value="demo-2">
        <Demo2 />
      </TabsContent>
    </Tabs>
  );
}
