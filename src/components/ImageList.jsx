import { usePicsumImages } from "../hooks/usePicsumImages";
import { PicsumAPI } from "../api/picsum";

export default function ImageList() {
    const { images, loading, error, refetch } = usePicsumImages(1, 10);

    if (loading && !images.length) {
        return (
            <div className="text-center py-8 text-gray-600">
                Loading images...
            </div>
        );
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
        <div className="p-4">
            <button
                onClick={refetch}
                disabled={loading}
                className={`mb-4 px-4 py-2 rounded-lg font-medium text-white transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "Refreshing..." : "Refresh Images"}
            </button>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                        <img
                            src={PicsumAPI.image(image.id, 200, 200)}
                            alt={image.author}
                            className="w-full h-auto object-cover"
                        />
                        <p className="mt-2 text-center text-sm text-gray-700">
                            {image.author}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
