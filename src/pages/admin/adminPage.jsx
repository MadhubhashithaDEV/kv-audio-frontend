import AdminItemsPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BarChart3, BookmarkIcon, SpeakerIcon, UserIcon, LogOut, Menu, X,Bell,Search} from "lucide-react";
import AdminDashboard from "./adminDashboard";


export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const user = res.data;
      if (user.role === "admin") {
        setUserValidated(true);
      } else {
        window.location.href = "/";
      }
    }).catch((err) => {
      console.error(err);
      setUserValidated(false);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full bg-white shadow-lg text-primary hover:bg-muted transition-all duration-200"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-72 h-full bg-white shadow-xl z-40 fixed lg:relative`}
          >
            <div className="h-full flex flex-col">
              {/* Sidebar header */}
              <div className="p-6 bg-gradient-to-r from-accent to-secondary">
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white"
                >
                  KV Audio Admin
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "30%" }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="h-1 bg-white/30 rounded-full mt-2"
                />
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                <NavItem 
                  to="/admin/dashboard" 
                  icon={<BarChart3 size={20} />} 
                  label="Dashboard" 
                  isActive={location.pathname === "/admin/dashboard"} 
                  delay={0.1}
                />
                <NavItem 
                  to="/admin/orders" 
                  icon={<BookmarkIcon size={20} />} 
                  label="Orders" 
                  isActive={isActive("/orders")} 
                  delay={0.2}
                />
                <NavItem 
                  to="/admin/items" 
                  icon={<SpeakerIcon size={20} />} 
                  label="Items" 
                  isActive={isActive("/items")} 
                  delay={0.3}
                />
                <NavItem 
                  to="/admin/users" 
                  icon={<UserIcon size={20} />} 
                  label="Users" 
                  isActive={isActive("/users")} 
                  delay={0.4}
                />
              </nav>

              {/* Sidebar footer */}
              <div className="p-4 border-t border-muted">
                <button 
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-muted flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Welcome Back, Admin
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-transparent focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary w-64 text-sm transition-all"
              />
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 bg-gradient-to-br from-background to-muted/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {userValidated && (
                <Routes path="/*">
                  <Route path="/orders" element={<AdminOrdersPage />} />
                  <Route path="/users" element={<AdminUsersPage />} />
                  <Route path="/items" element={<AdminItemsPage />} />    
                  <Route path="/items/add" element={<AddItemPage />} />
                  <Route path="/items/edit" element={<UpdateItemPage />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                </Routes>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Navigation item component
function NavItem({ to, icon, label, isActive, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400 font-medium" 
            : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
        }`}
      >
        <div className={`${isActive ? "text-secondary" : "text-gray-500"}`}>
          {icon}
        </div>
        <span>{label}</span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-5 rounded-full bg-gradient-to-b from-accent to-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </motion.div>
  );
}
