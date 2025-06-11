import { useCallback } from 'react';

export function useMutation() {
  const result = {
    id: 1,
  };

  const mutate = useCallback(() => {
    console.log('mutate');
  }, []);

  return { result, mutate };
}
