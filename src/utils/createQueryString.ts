import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateQueryString = useCallback(
    (name: string, value: string): void => {
      const queryString = createQueryString(name, value);
      router.push(`${pathname}?${queryString}`);
    },
    [router, pathname, createQueryString]
  );

  return { createQueryString, updateQueryString };
}

export default useQueryString;
