import { useEffect, useRef } from "react";
import { usePicsumPhotos } from "../hooks/usePicsumPhotos";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import PhotoCard from "./PhotoCard";
import { useHeaderActions } from "./HeaderActionsContext";

export default function PhotoList() {
	const { photos, loading, error, hasMore, loadMore, refetch } = usePicsumPhotos(1, 12);

	const targetRef = useInfiniteScroll({
		loading,
		hasMore,
		loadMore,
	});

	const { setActions } = useHeaderActions();

	// store refetch in a ref so we don't add it to the effect deps (it changes identity each render)
	const refetchRef = useRef(refetch);
	useEffect(() => {
		refetchRef.current = refetch;
	}, [refetch]);

	// register header actions (refresh button). depend only on setActions and loading.
	useEffect(() => {
		const action = (
			<button
				onClick={() => refetchRef.current?.()}
				disabled={loading}
				aria-label="Refresh photos"
				className={`px-4 py-2 rounded-lg font-medium text-white transition inline-flex items-center gap-2 ${loading
					? "bg-gray-400 cursor-not-allowed"
					: "bg-blue-600 hover:bg-blue-700"
					}`}
			>
				{loading ? "Refreshing..." : "Refresh Photos"}
			</button>
		);
		setActions(action);
		return () => setActions(null);
	}, [setActions, loading]);

	if (loading && !photos.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-white text-gray-600">
				Loading photos...
			</div>
		);
	}

	if (error && !photos.length) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-white">
				<p className="text-red-600 mb-4">Error: {error}</p>
				<button
					onClick={refetch}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
				>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white flex flex-col items-center py-8">
			{/* Photo grid */}
			<div className="max-w-7xl mx-auto px-6">
				{!loading && photos.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{photos.map((photo) => (
							<PhotoCard key={photo.id} photo={photo} />
						))}
					</div>
				)}

				{/* Skeletons while loading first page */}
				{loading && photos.length === 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="animate-pulse p-2">
								<div className="bg-gray-200 rounded-lg aspect-square" />
								<div className="mt-2 h-3 bg-gray-200 rounded w-3/4" />
							</div>
						))}
					</div>
				)}
			</div>

			{/* Infinite scroll trigger */}
			<div ref={targetRef} className="py-10 text-center text-gray-500">
				{loading ? "Loading more photos..." : hasMore ? "" : "No more photos to load"}
			</div>
		</div>
	);
}
