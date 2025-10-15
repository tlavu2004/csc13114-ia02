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
  // optional: minimum milliseconds between successive handler calls to avoid rapid repeats
  minInterval = 500,
}) {
  const observerRef = useRef(null);
  const targetRef = useRef(null);
  const lastCalledRef = useRef(0);
  const attachedAtRef = useRef(0);

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

    // Guard to avoid calling handler when a fetch is already in-flight or too soon.
    const handleIntersect = (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (!entry.isIntersecting) return;

      // double-check hasMore and loading before calling
      if (!hasMore || loading) return;

      const now = Date.now();
      // ignore intersections that occur very shortly after attaching the observer
      // This prevents the common case where the sentinel is already in view on mount
      // and would immediately trigger a second page load.
      const grace = Math.max(200, Math.min(500, Math.floor(minInterval / 2)));
      if (attachedAtRef.current && now - attachedAtRef.current < grace) return;

      if (now - lastCalledRef.current < minInterval) return;

      // disconnect before invoking handler to avoid the observer triggering again
      // while the fetch is in-flight which can cause multiple calls and layout jank.
      try {
        observerRef.current?.disconnect();
      } catch (e) {
        /* ignore */
      }

      lastCalledRef.current = now;
      // invoke handler (may update loading state in parent)
      handler();
    };

    const options = {
      root: root?.current ?? null,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    // record the time we attached the observer so we can ignore an immediate
    // intersection that happens right after attach (common if sentinel is in view).
    attachedAtRef.current = Date.now();

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, loadMore, onLoadMore, root, rootMargin, threshold]);

  return targetRef;
}
