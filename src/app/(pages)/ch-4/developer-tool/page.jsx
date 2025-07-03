import { Suspense } from 'react';
import { Todo } from './_components/Todo';
import { TodoLoading } from './_components/TodoLoading';

const MOCK_TAGS = Array.from(
  { length: 25 },
  (_, i) => `tag-${i + 1}`,
);

const getTodos = async (count) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return Array.from({ length: count }, (_, index) => {
    // Randomly select 1-3 tags for each todo
    const numTags = Math.floor(Math.random() * 3) + 1;
    const tags = Array.from(
      { length: numTags },
      () =>
        MOCK_TAGS[
          Math.floor(Math.random() * MOCK_TAGS.length)
        ],
    );

    return {
      id: crypto.randomUUID(),
      title: `Todo ${index + 1}`,
      description: `This is a detailed description for todo item ${
        index + 1
      }. It contains some lengthy text to simulate real content.`,
      isCompleted: Math.random() > 0.5,
      isArchived: Math.random() > 0.8,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000,
      ),
      updatedAt: new Date(),
      tags: Array.from(new Set(tags)), // Remove duplicates
    };
  });
};

export default async function Page() {
  const data = getTodos(100);

  return (
    <Suspense fallback={<TodoLoading />}>
      <Todo data={data} />
    </Suspense>
  );
}
