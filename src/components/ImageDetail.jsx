import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PicsumAPI } from "../api/picsum";

export default function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    PicsumAPI.detail(id)
      .then((data) => {
        if (mounted) setImage(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading image...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Link to="/images" className="px-4 py-2 bg-blue-600 text-white rounded">Back to list</Link>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center">image not found</div>
    );
  }

  // Use the API helper to build an appropriately sized image URL.
  const maxWidth = Math.min(image.width || 1200, 1200);
  const aspect = image.height && image.width ? (image.height / image.width) : 0.75;
  const displayHeight = Math.round(maxWidth * aspect);
  const src = PicsumAPI.image(id, maxWidth, displayHeight);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/images" className="text-blue-600 hover:underline mb-4 inline-block">← Back to gallery</Link>

        <div className="bg-gray-50 rounded shadow p-4">
          <div className="w-full mb-4">
            <img src={src} alt={`image by ${image.author}`} className="w-full h-auto rounded" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">{image.author ? `By ${image.author}` : "Unknown author"}</h2>
          <p className="text-gray-600 mb-4">{image.id ? `Image ID: ${image.id}` : ""}</p>

          <h3 className="text-lg font-medium">Title</h3>
          <p className="mb-4 text-gray-700">{image.title ?? "No title available."}</p>

          <h3 className="text-lg font-medium">Description</h3>
          <p className="text-gray-700">{image.description ?? "No description available."}</p>
        </div>
      </div>
    </div>
  );
}
