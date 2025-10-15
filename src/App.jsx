import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ImageList from "./components/ImageList";
import ImageDetail from "./components/ImageDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/images" replace />} />
            <Route path="/images" element={<ImageList />} />
            <Route path="/images/:id" element={<ImageDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
