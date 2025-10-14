import { PicsumAPI } from "../api/picsum";

export default function ImageCard({ image }) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100">
      <div className="aspect-square overflow-hidden">
        <img
          src={PicsumAPI.image(image.id, 400, 400)}
          alt={`Photo by ${image.author}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="text-white font-medium truncate">{image.author}</p>
      </div>
    </div>
  );
}
