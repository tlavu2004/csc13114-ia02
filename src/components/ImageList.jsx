import { usePicsumImages } from "../hooks/usePicsumImages";
import { PicsumAPI } from "../api/picsum";
import ImageCard from "./ImageCard";

export default function ImageList() {
	const { images, loading, error, refetch } = usePicsumImages(1, 20);

	if (loading && !images.length) {
		return <div className="text-center py-8 text-gray-600">Loading images...</div>;
	}

	if (error) {
		return (
			<div className="text-center py-8">
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
		<div className="max-w-7xl mx-auto">
			<button
				onClick={refetch}
				disabled={loading}
				className={`mb-4 px-4 py-2 rounded-lg font-medium text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
					}`}
			>
				{loading ? "Refreshing..." : "Refresh Images"}
			</button>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>
		</div>
	);
}
