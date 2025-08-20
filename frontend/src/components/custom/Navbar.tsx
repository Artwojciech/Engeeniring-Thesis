import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import instagramLogo from "@/assets/instagram_logo.png";
import logoutLogo from "@/assets/logoutlogo.png";

import { fetchCategories, type Category } from "@/services/categories";
import UserSidePanel from "./UserSidePanel";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const [openAccount, setOpenAccount] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

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

  if (!auth) return null;
  const { user, isAuthenticated, logout } = auth;

  const handleFavouritesClick = () => {
    if (!isAuthenticated) {
      alert("Musisz być zalogowany, aby zobaczyć ulubione.");
    } else {
      navigate("/favourites");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="w-full border-b shadow-sm bg-navbg">
      <div className="w-full flex items-center justify-between py-6 px-4 md:px-14">
        
        {/* Left side: logo + Instagram */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-shadows tracking-wide">
            SZKLANEBAZGROLY
          </Link>
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

        {/* Right side menu */}
        <div className="flex items-center gap-6">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex items-center gap-6">

              {/* Gallery */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Gallery</NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-navbg">
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

              {/* Favourites */}
              <NavigationMenuItem>
                <Button variant="ghost" onClick={handleFavouritesClick}>
                  Favourites
                </Button>
              </NavigationMenuItem>

              {/* Info */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Info</NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-navbg">
                  <ul className="grid gap-2 p-2 w-40">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/equipment" className="block p-2 hover:bg-accent rounded">
                          Equipment
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block p-2 hover:bg-accent rounded">
                          About Me
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/contact" className="block p-2 hover:bg-accent rounded">
                          Contact
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth (rightmost part) */}
          {!isAuthenticated ? (
            <Link to="/signin">
              <Button>Sign In</Button>
            </Link>
          ) : (
            <Sheet open={openAccount} onOpenChange={setOpenAccount}>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>User Panel</SheetTitle>
                </SheetHeader>
                <UserSidePanel />
              </SheetContent>

              <Avatar onClick={() => setOpenAccount(true)} className="cursor-pointer">
                <AvatarFallback>
                  {user?.username?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>

              <button
                onClick={handleLogout}
                className="p-1 rounded hover:bg-gray-200 transition"
                title="Logout"
              >
                <img src={logoutLogo} alt="Logout" className="w-6 h-6" />
              </button>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
