import ImageList from "./components/ImageList";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-6 text-center border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Picsum Image Gallery
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <ImageList />
      </main>
    </div>
  );
}
