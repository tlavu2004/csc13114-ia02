import ImageList from "./components/ImageList";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 overflow-y-auto p-6">
        <ImageList />
      </main>
    </div>
  );
}
