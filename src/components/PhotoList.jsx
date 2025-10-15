import { usePicsumPhotos } from "../hooks/usePicsumPhotos";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import PhotoCard from "./PhotoCard";

export default function PhotoList() {
	const { photos, loading, error, hasMore, loadMore, refetch } = usePicsumPhotos(1, 12);

	const targetRef = useInfiniteScroll({
		loading,
		hasMore,
		loadMore,
	});

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
			{/* Header */}
			<h1 className="text-4xl font-bold mb-6 text-gray-900">
				Picsum Photo Gallery
			</h1>

			{/* Refresh button */}
			<button
				onClick={refetch}
				disabled={loading}
				className={`mb-8 px-6 py-2 rounded-lg font-medium text-white transition ${loading
					? "bg-gray-400 cursor-not-allowed"
					: "bg-blue-600 hover:bg-blue-700"
					}`}
			>
				{loading ? "Refreshing..." : "Refresh Photos"}
			</button>

			{/* Photo grid */}
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{photos.map((photo) => (
					<PhotoCard key={photo.id} photo={photo} />
				))}
			</div>

			{/* Infinite scroll trigger */}
			<div ref={targetRef} className="py-10 text-center text-gray-500">
				{loading ? "Loading more photos..." : hasMore ? "" : "No more photos to load"}
			</div>
		</div>
	);
}
