import { useEffect, useState } from 'react';
import { PicsumAPI } from '../api/picsum';

export function usePicsumImages(page = 1, limit = 10, append = false) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setLoading(true);
        setError(null);

        PicsumAPI.list(page, limit, { signal })
            .then(data => {
                if (!signal.aborted) {
                    setImages(prevImages =>
                        append && page > 1 ? [...prevImages, ...data] : data
                    );
                }
            })
            .catch(err => {
                if (!signal.aborted) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (!signal.aborted) {
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [page, limit, append]);

    return { images, loading, error };
}