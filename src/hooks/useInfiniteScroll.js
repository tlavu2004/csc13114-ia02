import { useEffect, useRef } from "react";

// Accept an options object to match how the hook is used by callers.
export function useInfiniteScroll({ loading, hasMore, loadMore, onLoadMore }) {
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  // Support both `loadMore` and `onLoadMore` names to be forgiving.
  const handler = onLoadMore ?? loadMore;

  useEffect(() => {
    // If loading, no more items, or no handler provided, don't create the observer.
    if (loading || !hasMore || !handler) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersect = (entries) => {
      if (entries[0]?.isIntersecting && hasMore) {
        handler();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect);

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, loadMore, onLoadMore]);

  return targetRef;
}
