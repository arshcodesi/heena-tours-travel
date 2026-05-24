import { Routes, Route } from "react-router-dom";
import HotelsPage from "./components/HotelsPage";
import HotelDetails from "./components/HotelDetails";

export default function HotelsModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HotelsPage />} />
      <Route path="/:id" element={<HotelDetails />} />
    </Routes>
  );
}