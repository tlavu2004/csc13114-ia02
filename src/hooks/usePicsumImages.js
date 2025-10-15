import { useEffect, useState } from 'react';
import { PicsumAPI } from '../api/picsum';

export function usePicsumImages(initialPage = 1, limit = 10) {
	const [page, setPage] = useState(initialPage);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchImage = async (pageNum, append = false) => {
		try {
			setLoading(true);
			setError(null);
			const data = await PicsumAPI.list(pageNum, limit);
			if (!data || data.length === 0) {
				setHasMore(false);
			} else {
				setImages(prevImages =>
					append && pageNum > 1 ? [...prevImages, ...data] : data
				);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImage(page, page > 1);
	}, [page]);

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};

	const refetch = () => {
		setPage(1);
		setHasMore(true);
		fetchImage(1, false);
	};

	return { images, loading, error, hasMore, loadMore, refetch };
}
