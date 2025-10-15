import { usePicsumImages } from "../hooks/usePicsumImages";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import ImageCard from "./ImageCard";

export default function ImageList() {
	const { images, loading, error, hasMore, loadMore, refetch } = usePicsumImages(1, 12);

	const targetRef = useInfiniteScroll({
		loading,
		hasMore,
		loadMore,
	});

	if (loading && !images.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-white text-gray-600">
				Loading images...
			</div>
		);
	}

	if (error && !images.length) {
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
				Picsum Image Gallery
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
				{loading ? "Refreshing..." : "Refresh Images"}
			</button>

			{/* Image grid */}
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>

			{/* Infinite scroll trigger */}
			<div ref={targetRef} className="py-10 text-center text-gray-500">
				{loading ? "Loading more images..." : hasMore ? "" : "No more images to load"}
			</div>
		</div>
	);
}
