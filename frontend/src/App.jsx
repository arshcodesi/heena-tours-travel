import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// IMPORTANT: Keep your existing Home import exactly as it is in your project.
// If your project already imports Home from a different path, keep that unchanged.
import Home from "./pages/Home.jsx";

// Added imports for Hotels module
import AdminGuard from "./components/AdminGuard"; // Assuming this exists
import AdminHotelsPage from "./modules/hotels/components/AdminHotelsPage";

// Added imports for Properties module
import PropertiesPage from "./modules/properties/components/PropertiesPage";
import PropertyDetails from "./modules/properties/components/PropertyDetails";

// Added SiteHeader import
import SiteHeader from "./components/layout/SiteHeader.jsx";

const ToursModuleRoutes = lazy(() => import("./modules/tours/ToursModuleRoutes.jsx"));
const HotelsModuleRoutes = lazy(() => import("./modules/hotels/HotelsModuleRoutes.jsx"));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm font-semibold text-gray-900">Loading…</p>
          <p className="mt-1 text-sm text-gray-600">Please wait.</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <SiteHeader />  {/* Added SiteHeader here for all pages */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* NON-NEGOTIABLE: Home route remains exactly / and uses existing Home */}
          <Route path="/" element={<Home />} />

          {/* Tours Module (isolated & lazy-loaded) */}
          <Route path="/tours/*" element={<ToursModuleRoutes />} />
          <Route path="/admin/tours/*" element={<ToursModuleRoutes />} />

          {/* Hotels Module (isolated & lazy-loaded) */}
          <Route path="/hotels/*" element={<HotelsModuleRoutes />} />
          <Route path="/admin/hotels" element={<AdminGuard><AdminHotelsPage /></AdminGuard>} />

          {/* Properties Module (added) */}
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}