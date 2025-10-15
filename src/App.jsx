import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoList from "./components/PhotoList";
import PhotoDetail from "./components/PhotoDetail";
import Layout from "./components/Layout";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/photos" replace />} />
          <Route path="photos" element={<PhotoList />} />
          <Route path="photos/:id" element={<PhotoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
