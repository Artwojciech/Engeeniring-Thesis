import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import HomePage from "@/pages/HomePage";
import AboutMe from "@/pages/AboutMe";
import Contact from "@/pages/Contact";
import Equipment from "@/pages/EquipmentPage";
import GalleryPage from "@/pages/GalleryPage";
import FavouritesPage from "@/pages/FavouritesPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";

import MainLayout from "@/layouts/MainLayout";

import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <AuthProvider>      
      <Toaster position="top-center" />  
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Route>

          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
