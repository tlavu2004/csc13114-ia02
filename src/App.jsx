import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoList from "./components/PhotoList";
import PhotoDetail from "./components/PhotoDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/photos" replace />} />
            <Route path="/photos" element={<PhotoList />} />
            <Route path="/photos/:id" element={<PhotoDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
