import { useEffect, useState } from 'react';
import { PicsumAPI } from '../api/picsum';

export function usePicsumPhotos(initialPage = 1, limit = 12) {
	const [page, setPage] = useState(initialPage);
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchPhoto = async (pageNum, append = false) => {
		try {
			setLoading(true);
			setError(null);
			const data = await PicsumAPI.list(pageNum, limit);
			if (!data || data.length === 0) {
				setHasMore(false);
			} else {
				setPhotos(prevPhotos =>
					append && pageNum > 1 ? [...prevPhotos, ...data] : data
				);
			}
		} catch (err) {
			setError(err.message);
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

	const refetch = () => {
		setHasMore(true);
		setPhotos([]);
		if (page === 1) {
			fetchPhoto(1, false);
		} else {
			setPage(1);
		}
	};

	return { photos, loading, error, hasMore, loadMore, refetch };
}
