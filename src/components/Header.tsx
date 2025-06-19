
// import { Button } from "@/components/ui/button";
// import { Moon, Sun, Home } from "lucide-react";
// import { useTheme } from "@/hooks/useTheme";
// import {Link} from "react-router-dom"

// interface HeaderProps {
//   onBackToHome?: () => void;
// }

// const Header = ({ onBackToHome }: HeaderProps) => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <div className="flex items-center space-x-4">
//           {onBackToHome && (
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onBackToHome}
//               className="hover:bg-accent"
//             >
//               <Home className="w-4 h-4 mr-2" />
//               Home
//             </Button>
//           )}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">MB</span>
//             </div>
//             <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Maven Brisk
//             </span>
//           </div>
//         </div>

//         <nav className="hidden md:flex items-center space-x-6">
//           <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
//             About
//           </a>
//           <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
//             Services
//           </a>
//           <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
//             Contact
//           </a>
//           <Link to="/userData">
//             Office Use Only
//           </Link>
//         </nav>

//         <div className="flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={toggleTheme}
//             className="hover:bg-accent"
//           >
//             {theme === 'dark' ? (
//               <Sun className="w-4 h-4" />
//             ) : (
//               <Moon className="w-4 h-4" />
//             )}
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Home, Menu } from "lucide-react"; // <-- Import Menu icon
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  onBackToHome?: () => void;
}

const Header = ({ onBackToHome }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  // State to control the mobile menu (Sheet)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to render navigation links to avoid repetition
  const navLinks = (
    <>
      <a
        href="#about"
        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        About
      </a>
      <a
        href="#services"
        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Services
      </a>
      <a
        href="#contact"
        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Contact
      </a>
      <Link
        to="/userData"
        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Office Use Only
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Side: Logo and Home Button */}
        <div className="flex items-center space-x-4">
          {onBackToHome && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="hover:bg-accent"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Maven Brisk
            </span>
          </div>
        </div>

        {/* --- 1. DESKTOP NAVIGATION --- */}
        {/* This remains the same: hidden on mobile, flex on medium screens and up */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks}
        </nav>

        {/* Right Side: Theme Toggle and Mobile Menu Trigger */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hover:bg-accent"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* --- 2. MOBILE MENU (using Sheet) --- */}
          {/* This button is only visible on screens smaller than medium (md:hidden) */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {/* You can add a header/logo inside the mobile menu too */}
                <div className="p-4 border-b">
                   <span className="font-bold text-lg">Maven Brisk</span>
                </div>
                <nav className="grid gap-6 text-lg font-medium p-4">
                  {/* Re-using the same links for consistency */}
                  {navLinks}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;