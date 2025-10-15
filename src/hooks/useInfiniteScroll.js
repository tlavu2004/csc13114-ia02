import { useEffect, useRef } from "react";

// Accept an options object to match how the hook is used by callers.
// Also support additional observer options: root (ref), rootMargin, threshold.
export function useInfiniteScroll({
  loading,
  hasMore,
  loadMore,
  onLoadMore,
  // optional observer config
  root = null,
  rootMargin = "200px 0px",
  threshold = 0,
}) {
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

    // Guard to avoid calling handler when a fetch is already in-flight.
    const handleIntersect = (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        // double-check hasMore and loading before calling
        if (!hasMore || loading) return;
        handler();
      }
    };

    const options = {
      root: root?.current ?? null,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, loadMore, onLoadMore, root, rootMargin, threshold]);

  return targetRef;
}
