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

//na jutro do zrobienia jakos owinac to w layout wszystko nie zapomniec o tym!!!
function App() {
  return (
    <AuthProvider>       
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
