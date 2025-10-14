import { PicsumAPI } from "../api/picsum";

export default function ImageCard({ image }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <img
        src={PicsumAPI.image(image.id, 400, 400)}
        alt={image.author}
        className="w-full h-64 object-cover"
      />
      <p className="mt-2 text-center text-sm text-gray-700">{image.author}</p>
    </div>
  );
}
