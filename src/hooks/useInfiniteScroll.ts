import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export default function useInfiniteScroll<T extends HTMLElement>({
  fetchNextPage,
  hasNextPage,
}: UseInfiniteScrollProps) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !hasNextPage) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return { ref };
}
