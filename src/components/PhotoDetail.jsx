import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PicsumAPI } from "../api/picsum";

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    PicsumAPI.detail(id)
      .then((data) => {
        if (mounted) setPhoto(data);
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
        Loading photo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Link to="/photos" className="px-4 py-2 bg-blue-600 text-white rounded">Back to list</Link>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">photo not found</div>
    );
  }

  // Use the API helper to build an appropriately sized photo URL.
  const maxWidth = Math.min(photo.width || 1200, 1200);
  const aspect = photo.height && photo.width ? (photo.height / photo.width) : 0.75;
  const displayHeight = Math.round(maxWidth * aspect);
  const src = PicsumAPI.photo(id, maxWidth, displayHeight);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/photos" className="text-blue-600 hover:underline mb-4 inline-block">← Back to gallery</Link>

        <div className="bg-gray-50 rounded shadow p-4">
          <div className="w-full mb-4">
            <img src={src} alt={`photo by ${photo.author}`} className="w-full h-auto rounded" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">{photo.author ? `By ${photo.author}` : "Unknown author"}</h2>
          <p className="text-gray-600 mb-4">{photo.id ? `Photo ID: ${photo.id}` : ""}</p>

          <h3 className="text-lg font-medium">Title</h3>
          <p className="mb-4 text-gray-700">{photo.title ?? "No title available."}</p>

          <h3 className="text-lg font-medium">Description</h3>
          <p className="text-gray-700">{photo.description ?? "No description available."}</p>
        </div>
      </div>
    </div>
  );
}
