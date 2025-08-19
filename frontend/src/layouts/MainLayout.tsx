import { Outlet } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {}
      </main>
      <Footer />
    </div>
  );
}
