'use client';

import { useState } from 'react';

import { analyticsData as initialData } from '@/lib/mock-data';

import { PageTabs } from './_components/PageTabs';
import { FilterForm } from './_components/FilterForm';
import { HeavyCharts } from './_components/HeavyCharts';

export default function Page() {
  const [data, setData] = useState(initialData);

  return (
    <>
      <FilterForm />

      <PageTabs setData={setData} />

      <HeavyCharts data={data} />
    </>
  );
}
