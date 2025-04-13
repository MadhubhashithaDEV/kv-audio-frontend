import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "h-[70px] bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-900/95" 
            : "h-[90px] bg-gradient-to-r from-blue-100/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-sm dark:from-gray-900/90 dark:via-indigo-900/90 dark:to-purple-900/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className={`relative ${isScrolled ? "w-[50px] h-[50px]" : "w-[65px] h-[65px]"} transition-all duration-300 overflow-hidden rounded-full`}>
                <img 
                  src="/logo.png" 
                  alt="KV Audio" 
                  className="w-full h-full object-cover rounded-full border-2 border-indigo-500 group-hover:border-purple-500 shadow-md group-hover:shadow-lg group-hover:shadow-indigo-300/50 transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 transform group-hover:translate-x-1 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  KV Audio
                </span>
                <span className="text-xs text-indigo-500 hidden sm:block font-medium opacity-80 dark:text-indigo-300">Premium Sound Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: "/", label: "Home" },
              { path: "/gallery", label: "Gallery" },
              { path: "/items", label: "Items" },
              { path: "/contact", label: "Contact" }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-base px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 group ${
                  isActive(link.path) 
                    ? "text-indigo-700 dark:text-indigo-300 font-semibold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-200"
                }`}
              >
                <div className="flex items-center">
                  {link.label}
                </div>
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto w-2/3 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></span>
                )}
              </Link>
            ))}
          
            
         
          </nav>

        </div>

     

      
      </header>
    </>
  );
}
