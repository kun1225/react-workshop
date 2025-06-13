import { useState } from 'react';

export function usePaginationQuery(initial = {}) {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    sortBy: 'created_at',
    filterText: '',
    ...initial,
  });

  const setPage = (page) => setQueryParams((q) => ({ ...q, page }));
  const setSortBy = (sortBy) => setQueryParams((q) => ({ ...q, sortBy }));
  const setFilterText = (filterText) => setQueryParams((q) => ({ ...q, filterText, page: 1 }));

  return {
    queryParams,
    setQueryParams,
    setPage,
    setSortBy,
    setFilterText,
  };
}
