import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="mx-auto  w-2xl h-svh p-8">
      <Card>
        <CardHeader>Chapter 2</CardHeader>
        <CardContent>
          <nav className="flex flex-col gap-2">
            <Button asChild variant="link">
              <Link href="/ch-2/form-data-error-1">form-data-error</Link>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
