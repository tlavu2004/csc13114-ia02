import { useEffect, useState } from 'react';
import { PicsumAPI } from '../api/picsum';

export function usePicsumPhotos(initialPage = 1, limit = 12) {
	const [page, setPage] = useState(initialPage);
	const [photos, setPhotos] = useState([]);
	// start loading=true so the initial fetch is considered in-flight and
	// the intersection observer (which also checks `loading`) won't trigger
	// a loadMore before the first page has finished loading.
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// error for subsequent page loads (so we can show inline retry without
	// overwriting the first-page error state that controls full-screen UI)
	const [pageError, setPageError] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchPhoto = async (pageNum, append = false) => {
		try {
			setLoading(true);
			// clear only pageError when loading next pages; keep top-level error
			// for initial load separate
			if (append) setPageError(null); else setError(null);
			const data = await PicsumAPI.list(pageNum, limit);
			if (!data || data.length === 0) {
				setHasMore(false);
			} else {
				setPhotos(prevPhotos =>
					append && pageNum > 1 ? [...prevPhotos, ...data] : data
				);
			}
		} catch (err) {
			if (append) setPageError(err.message); else setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPhoto(page, page > 1);
	}, [page]);

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};

	const retryPage = () => {
		// retry current page (will call fetchPhoto via useEffect)
		setPage(prev => prev);
	};

	const refetch = () => {
		setHasMore(true);
		setPhotos([]);
		if (page === 1) {
			fetchPhoto(1, false);
		} else {
			setPage(1);
		}
	};

	return { photos, loading, error, hasMore, loadMore, refetch, pageError, retryPage };
}
