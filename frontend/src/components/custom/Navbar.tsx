import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

import { Bars3Icon, ChevronLeftIcon } from "@heroicons/react/24/solid";

import instagramLogo from "@/assets/instagram_logo.png";
import logoutLogo from "@/assets/logoutlogo.png";

import { fetchCategories, type Category } from "@/services/categories";
import UserSidePanel from "./UserSidePanel";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("error pobierania kategorii", err);
      }
    };
    loadCategories();
  }, []);

  const handleFavouritesClick = () => {
    if (!isAuthenticated) {
      toast.error("Musisz być zalogowany, aby zobaczyć ulubione.");
    } else {
      navigate("/favourites");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 
  const DesktopNav = () => (
    <div className="flex items-center gap-6">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex items-center gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Gallery
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!bg-navbg z-10">
              <ul className="grid gap-2 p-2 w-40">
                <li className="flex flex-col">
                  {categories.map((cat) => (
                    <NavigationMenuLink asChild key={cat.id}>
                      <Link
                        to={`/gallery?category=${cat.name.toLowerCase()}`}
                        className="block p-2 hover:bg-accent rounded"
                      >
                        {cat.name}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              variant="ghost"
              onClick={handleFavouritesClick}
              className="cursor-pointer"
            >
              Favourites
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Info
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!bg-navbg z-10">
              <ul className="grid gap-2 p-2 w-40">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/equipment"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      Equipment
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/about"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      About Me
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/contact"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {!isAuthenticated ? (
        <Link to="/signin">
          <Button className="cursor-pointer">Sign In</Button>
        </Link>
      ) : (
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  {user?.username?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined} className="[&>button]:cursor-pointer">
              <VisuallyHidden>
                <SheetTitle>desktop side panel</SheetTitle>
              </VisuallyHidden>
              <UserSidePanel />
            </SheetContent>
          </Sheet>
          <button
            onClick={handleLogout}
            className="p-1 rounded hover:bg-gray-200 transition cursor-pointer"
            title="Logout"
          >
            <img src={logoutLogo} alt="Logout" className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );

  
  const MobileNav = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<"nav" | "user">("nav");

    const toggleSection = (section: string) => {
      setOpenSection(openSection === section ? null : section);
    };

    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="cursor-pointer">
            <Bars3Icon className="w-10 h-10 text-footerbg" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="bg-navbg p-6 [&>button]:cursor-pointer" 
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <SheetTitle>navbar mobile</SheetTitle>
          </VisuallyHidden>
          {activePanel === "nav" ? (
            <div className="flex flex-col text-lg">
            <div className="flex flex-col gap-6 text-lg px-2 py-2">
              <div>
                <button
                  onClick={() => toggleSection("gallery")}
                  className="text-left font-medium cursor-pointer"
                >
                  Gallery
                </button>
                {openSection === "gallery" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/gallery?category=${cat.name.toLowerCase()}`}
                          className="block hover:underline"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <button
                  onClick={handleFavouritesClick}
                  className="text-left font-medium cursor-pointer"
                >
                  Favourites
                </button>
              </div>
              <div>
                <button
                  onClick={() => toggleSection("info")}
                  className="text-left font-medium cursor-pointer"
                >
                  Info
                </button>
                {openSection === "info" && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li>
                      <Link to="/equipment" className="hover:underline">
                        Equipment
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="hover:underline">
                        About Me
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="hover:underline">
                        Contact
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              {!isAuthenticated ? (
                <Link to="/signin">
                  <Button className="cursor-pointer">Sign In</Button>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar
                    onClick={() => setActivePanel("user")}
                    className="cursor-pointer"
                  >
                    <AvatarFallback>
                      {user?.username?.[0]?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded hover:bg-gray-200 transition cursor-pointer"
                    title="Logout"
                  >
                    <img src={logoutLogo} alt="Logout" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6">
                <a
                  href="https://www.instagram.com/szklanebazgroly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="w-8 h-8 object-contain"
                  />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setActivePanel("nav")}
                className="cursor-pointer"
              >
                <ChevronLeftIcon className="w-8 h-8" />  
              </button>
              <UserSidePanel />
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  };


  return (
    <nav className="w-full border-b shadow-sm bg-navbg sticky top-0 z-50">
      <div className="w-full flex items-center justify-between py-6 px-4 md:px-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-shadows tracking-wide">
            SZKLANEBAZGROLY
          </Link>
          {!isMobile && (
            <a
              href="https://www.instagram.com/szklanebazgroly"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramLogo}
                alt="Instagram"
                className="w-8 h-8 object-contain"
              />
            </a>
          )}
        </div>
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </div>
    </nav>
  );
}
