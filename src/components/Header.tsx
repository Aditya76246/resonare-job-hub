import { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for client-side routing
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, ArrowLeft, Menu } from "lucide-react"; // Import ArrowLeft
import { useTheme } from "@/hooks/useTheme";

// Define the types for the props the Header can receive
interface HeaderProps {
  onBackToHome?: () => void;      // For the old Index page logic (optional)
  onBackToSelection?: () => void; // For the Career page "Go Back" (optional)
}

const Header = ({ onBackToHome, onBackToSelection }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine which function to call for the back button.
  // It will prioritize the Career page's back button.
  const backAction = onBackToSelection || onBackToHome;

  // Helper function to render navigation links to avoid repetition.
  // Using <Link> component instead of <a> tags for better performance.
  const navLinks = (
    <>
      <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
      <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</Link>
      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
      <Link to="/career" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Career</Link>
      <Link to="/userData" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Admin Only</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Side: Show "Go Back" button OR the main Logo */}
        <div className="flex items-center space-x-4">
          {backAction ? (
            // If a back action is provided, show the "Go Back" button
            <Button
              variant="ghost"
              size="sm"
              onClick={backAction}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          ) : (
            // Otherwise, show the default Logo and Brand Name
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"><img src="../../public/Favicon-background.png" alt="Company Logo"/></span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maven Brisk
              </span>
            </Link>
          )}
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks}
        </nav>

        {/* Right Side: Theme Toggle and Mobile Menu Trigger */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="hover:bg-accent">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* MOBILE MENU (Sheet) */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4 border-b">
                   <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg">Maven Brisk</Link>
                </div>
                <nav className="grid gap-6 text-lg font-medium p-4">
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