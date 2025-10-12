import ImageList from "./components/ImageList";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Picsum Image Gallery
      </h1>
      <ImageList />
    </div>
  );
}
