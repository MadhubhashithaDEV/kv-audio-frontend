import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  X, 
  Home, 
  Phone, 
  Image, 
  Package, 
  ShoppingCart,
  LogOut,
  Music,
  Headphones,
  Speaker,
  Mic,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight
} from "lucide-react";

export default function MobileNavPanel({ isOpen, setOpen }) {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg"
      onClick={() => setOpen(false)}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-blue-600 to-blue-800 h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -right-[300px] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute bottom-0 -left-[300px] w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-3xl"></div>
        </div>
        
        <div className="relative flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-300 rounded-full blur-md opacity-70 scale-110"></div>
                <img
                  src="/logo.png"
                  alt="KV Audio"
                  className="relative w-12 h-12 object-cover border-2 border-white/80 rounded-full shadow-lg shadow-blue-900/30 z-10"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">KV Audio</span>
                <span className="text-xs text-blue-100/80">Premium Sound Experience</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(false)}
              className="relative p-2 text-white hover:bg-white/10 rounded-full"
            >
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity"></div>
              <X className="w-6 h-6 relative" />
            </motion.button>
          </div>

          {/* Main Navigation */}
          <motion.nav 
            className="flex flex-col space-y-2 mt-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[
              { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
              { path: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
              { path: "/gallery", label: "Gallery", icon: <Image className="w-5 h-5" /> },
              { path: "/items", label: "Products", icon: <Package className="w-5 h-5" /> },
              { path: "/booking", label: "Cart", icon: <ShoppingCart className="w-5 h-5" /> },
            ].map((item) => (
              <motion.div
                key={item.path}
                variants={item}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 rounded-xl shadow-lg shadow-blue-900/20"
                      : "text-white hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/10"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-lg font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive(item.path) ? "text-blue-500" : "text-blue-200/70"}`} />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

  

          {/* Account Section */}
          {token ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-8"
            >
              <motion.h3 
                variants={item}
                className="text-blue-100 font-medium mb-3 px-2"
              >
                Account
              </motion.h3>
              <motion.button
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center justify-between w-full px-5 py-4 bg-white/10 hover:bg-white/15 text-white rounded-xl backdrop-blur-sm border border-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <LogOut className="w-5 h-5" />
                  <span className="text-lg font-medium">Logout</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-200/70" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-8"
            >
              <motion.button
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/login";
                }}
                className="flex items-center justify-center w-full gap-2 px-5 py-4 bg-white text-blue-600 rounded-xl shadow-lg shadow-blue-900/20 font-medium"
              >
                Sign In / Register
              </motion.button>
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-auto pt-8"
          >
            <motion.div 
              variants={item}
              className="flex justify-center space-x-6"
            >
              {[
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              variants={item}
              className="text-center text-blue-100/70 text-sm mt-6"
            >
              <p>© 2023 KV Audio. All rights reserved.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
