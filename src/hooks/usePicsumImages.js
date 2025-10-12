import { useEffect, useState } from 'react';
import { PicsumAPI } from '../api/picsum';

export function usePicsumImages(page = 1, limit = 10) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        PicsumAPI.list(page, limit)
            .then(data => {
                if (isMounted) {
                    setImages(data);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [page, limit]);

    return { images, loading, error };
}