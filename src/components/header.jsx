import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, 
  Menu, 
  LogOut, 
  Home, 
  Phone, 
  Image as ImageIcon, 
  Package,
  Music,
  ChevronDown,
  User
} from "lucide-react";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const scale = useTransform(scrollY, [0, 50], [1, 0.98]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-[80px]"></div>
      
      <motion.header 
        style={{ opacity, scale }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 20
        }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "h-16 backdrop-blur-xl bg-blue-600/80 shadow-lg shadow-blue-900/20" 
            : "h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[350px] -left-[100px] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute -top-[400px] -right-[100px] w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-3xl"></div>
        </div>
        
        {/* Main header content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-300 rounded-full blur-md opacity-70 scale-110"></div>
              <img
                src="/logo.png"
                alt="KV Audio"
                className={`${
                  scrolled ? "w-10 h-10" : "w-[50px] h-[50px]"
                } relative object-cover border-2 border-white/80 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/30 z-10`}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-bold ${scrolled ? "text-xl" : "text-2xl"} text-white hidden sm:block transition-all duration-300 tracking-tight`}>
                KV Audio
              </span>
              <span className="text-xs text-blue-100/80 hidden sm:block">Premium Sound Experience</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-1"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {[
              { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
              { path: "/contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
              { path: "/gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
              { path: "/items", label: "Products", icon: <Package className="w-4 h-4" /> },
            ].map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Link 
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 font-medium shadow-md"
                      : "text-white hover:bg-white/10 backdrop-blur-sm"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.label === "Products" && (
                    <ChevronDown className="w-3 h-3 opacity-70" />
                  )}
                </Link>
                
                {/* Active indicator dot */}
                {isActive(item.path) && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Cart button with notification */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link 
                to="/booking" 
                className="relative p-2.5 text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Shopping Cart"
              >
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
                <ShoppingCart className="w-5 h-5 relative" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 -right-7 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-red-600/20"
                >
                  2
                </motion.span>
              </Link>
            </motion.div>

                       {/* User profile or login button */}
 <div className="flex items-center gap-5 ml-[50px]">
          {/* User profile or login button */}
	    {token ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block"
              >
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-900/20 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Sign In</span>
                </Link>
              </motion.div>
            )}

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNavPanelOpen(true)}
                className="relative p-2.5 text-white md:hidden hover:bg-white/10 rounded-full transition-all"
                aria-label="Menu"
              >
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
                <Menu className="w-5 h-5 relative" />
              </motion.button>
            </div>


            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNavPanelOpen(true)}
              className="relative p-2.5 text-white md:hidden hover:bg-white/10 rounded-full transition-all"
              aria-label="Menu"
            >
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
              <Menu className="w-5 h-5 relative" />
            </motion.button>
          </div>
        </div>
        
        {/* Bottom border glow effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>
      </motion.header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {navPanelOpen && (
          <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
        )}
      </AnimatePresence>
    </>
  );
}
