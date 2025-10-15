import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PicsumAPI } from "../api/picsum";
import { useHeaderActions } from "./HeaderActionsContext";

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setActions } = useHeaderActions();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    // clear header actions on detail page
    setActions(null);
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
      <div className="flex items-center justify-center py-12">
        Loading photo...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Link to="/photos" className="px-4 py-2 bg-blue-600 text-white rounded">Back to list</Link>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex items-center justify-center py-12">photo not found</div>
    );
  }

  // Use the API helper to build an appropriately sized photo URL.
  // Reduce the displayed image width slightly and give the meta column more room.
  const maxWidth = Math.min(photo.width || 900, 900);
  const aspect = photo.height && photo.width ? (photo.height / photo.width) : 0.75;
  const displayHeight = Math.round(maxWidth * aspect);
  const src = PicsumAPI.photo(id, maxWidth, displayHeight);

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/photos" className="text-blue-600 hover:underline">← Back to gallery</Link>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
            <div className="lg:col-span-2">
              <img src={src} alt={`photo by ${photo.author}`} className="w-full h-auto rounded-md shadow-sm" />
            </div>

            {/* Meta column - span 2 of 4 on large screens */}
            <aside className="space-y-4 lg:col-span-2">
              <div>
                <h1 className="text-2xl font-semibold">{photo.id ? `Photo ID: ${photo.id}` : ""}</h1>
                <p className="text-sm text-gray-500">{photo.author ? `By ${photo.author}` : "Unknown author"}</p>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                {/* Centered action buttons */}
                <div className="flex items-center justify-center gap-3 flex-nowrap w-full">
                  {photo.download_url && (
                    <a
                      href={photo.download_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      {/* eye / open icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                      Open full size
                    </a>
                  )}

                  <a
                    href={photo.url ?? photo.download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {/* external link icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M12.293 2.293a1 1 0 011.414 0l4 4A1 1 0 0117.293 8.707L14 5.414V9a1 1 0 11-2 0V3a1 1 0 01.293-.707z" />
                      <path d="M3 5a2 2 0 012-2h5a1 1 0 110 2H5v10h10v-5a1 1 0 112 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                    View original
                  </a>

                  <Link to="/photos" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                    {/* back icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11l3.707-3.707a1 1 0 011.414 1.414L5.414 11l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      <path d="M13 11a1 1 0 100-2h-1a1 1 0 100 2h1z" />
                    </svg>
                    Back to gallery
                  </Link>
                </div>

                <div className="pt-4 border-t w-full">
                  <h3 className="text-lg font-medium">Photo Size</h3>
                  <p className="mb-3 text-gray-700">{photo.width && photo.height ? `${photo.width} × ${photo.height} px` : "N/A"}</p>

                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="text-gray-700 text-left w-full">{photo.description ?? `A captivating photograph by Alejandro Escamilla from the Lorem Picsum collection. This image, at ${photo.width && photo.height ? `${photo.width} × ${photo.height}` : "high"} resolution, works beautifully for high-quality digital displays and various creative applications.`}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
