import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProductCart from "../../components/productCard";
import { Package, AlertCircle, Search, Filter, RefreshCw } from "lucide-react";

export default function Items() {
  const [state, setState] = useState("Loading");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setState("Loading");
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        setItems(res.data);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
        
        setState("success");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.err || "Something went wrong, An error occurred"
        );
        setState("error");
      });
  };

  // Filter items based on search term and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full min-h-full py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto h-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-white mb-4 md:mb-0 flex items-center"
          >
            <Package className="mr-3 h-8 w-8 text-accent" />
            Our Products
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all w-full"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none bg-white w-full"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
        
        {state === "Loading" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center h-64"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-accent animate-spin rounded-full absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-white font-medium">Loading products...</p>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div 
            variants={itemVariants}
            className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error Loading Products</h3>
                <p className="mt-2 text-red-700">
                  Failed to load products. Please try again later.
                </p>
                <button 
                  onClick={fetchProducts}
                  className="mt-3 flex items-center text-red-700 hover:text-red-900 font-medium"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {state === "success" && filteredItems.length === 0 && (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 bg-white/10 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <svg className="mx-auto h-16 w-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">No products found</h3>
            <p className="mt-2 text-white/70">
              {searchTerm ? 
                `No results for "${searchTerm}"${selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}` : 
                "No products available in this category"}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </button>
            )}
          </motion.div>
        )}

        {state === "success" && filteredItems.length > 0 && (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div 
                key={item.key} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(18, 130, 162, 0.3), 0 10px 10px -5px rgba(18, 130, 162, 0.2)"
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <ProductCart item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {state === "success" && filteredItems.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center text-white/70"
          >
            Showing {filteredItems.length} of {items.length} products
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
