import { Link } from "react-router-dom";
import instagramLogo from "@/assets/instagram_logo.png";
import { useIsMobile } from "@/hooks/use-mobile"; 

export default function Footer() {
  const isMobile = useIsMobile(); 

  return (
    <footer className="bg-footerbg text-navbg w-full">
      <div className="max-w-screen-xl mx-auto px-12 py-18">
        {isMobile ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-5xl">Want to collab?</h2>
            <span className="text-3xl">Contact me here</span>
            <a
              href="https://www.instagram.com/szklanebazgroly"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src={instagramLogo}
                alt="Instagram"
                className="w-18 h-18 object-contain"
              />
            </a>
            <div className="flex flex-col items-center space-y-2">
              <Link
                to="/about"
                className="underline hover:opacity-80 text-lg"
              >
                About Me
              </Link>
              <Link
                to="/contact"
                className="underline hover:opacity-80 text-lg"
              >
                Contact
              </Link>
              <span className="text-sm mt-8">
                Created by: Artur Wojciechowski
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-end">
            {/* Lewa część */}
            <div className="flex flex-col space-y-5">
              <h2 className="text-7xl">Want to collab?</h2>
              <div className="flex items-center space-x-3 ml-35">
                <span className="text-4xl">Contact me here</span>
                <a
                  href="https://www.instagram.com/szklanebazgroly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <img
                    src={instagramLogo}
                    alt="Instagram"
                    className="w-12 h-12 object-contain relative top-1"
                  />
                </a>
              </div>
            </div>

            {/* Prawa dolna część */}
            <div className="flex flex-col items-end space-y-2 -mb-5">
              <div className="flex flex-row space-x-6">
                <Link
                  to="/about"
                  className="underline hover:opacity-80 text-lg"
                >
                  About Me
                </Link>
                <Link
                  to="/contact"
                  className="underline hover:opacity-80 text-lg"
                >
                  Contact
                </Link>
              </div>
              <span className="text-sm">
                Created by: Artur Wojciechowski
              </span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
