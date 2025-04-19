import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {PlusCircle,  Pencil, Trash2, Search, Filter, RefreshCw,AlertCircle,Music} from "lucide-react";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      setItemsLoaded(false);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      setItemsLoaded(true);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItemsLoaded(true);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (key) => {
    setDeleteItemId(key);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${deleteItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item.key !== deleteItemId));
      setIsDeleting(false);
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.key.toString().includes(searchTerm)
  );

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen p-4 md:p-8 bg-gray-900 text-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-purple-400 mb-2">Product Inventory</h1>
          <p className="text-gray-400">Manage your equipment inventory</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, category or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={fetchItems}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all"
              >
                <RefreshCw size={16} />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all">
                <Filter size={16} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>

          {!itemsLoaded ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-400">Loading inventory...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <AlertCircle size={48} className="mb-4 text-gray-500" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="mb-6">
                {searchTerm ? "Try a different search term" : "Start by adding your first product"}
              </p>
              <Link 
                to="/admin/items/add"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <PlusCircle size={18} />
                Add New Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <motion.table 
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-w-[800px] border-collapse"
              >
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Dimensions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <AnimatePresence>
                  <motion.tbody className="divide-y divide-gray-700">
                    {filteredItems.map((item) => (
                      <motion.tr 
                        key={item.key}
                        variants={rowVariants}
                        exit="exit"
                        whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.3)" }}
                        className="group"
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-400">{item.key}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-700 rounded-md flex items-center justify-center text-purple-400">
                              <Music size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-200">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-200">Rs. {item.price}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-700 text-purple-300">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{item.dimensions}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            item.availability 
                              ? "bg-green-900 text-green-300" 
                              : "bg-red-900 text-red-300"
                          }`}>
                            {item.availability ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate(`/admin/items/edit`, {state: item})}
                              className="p-2 rounded-lg bg-blue-900 text-blue-300 hover:bg-blue-800 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(item.key)}
                              className="p-2 rounded-lg bg-red-900 text-red-300 hover:bg-red-800 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </AnimatePresence>
              </motion.table>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="fixed right-8 bottom-8"
      >
        <Link to="/admin/items/add">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg"
          >
            <PlusCircle size={24} />
          </motion.button>
        </Link>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-900">
                <AlertCircle className="text-red-300" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-gray-100">Confirm Deletion</h3>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDeleting(false)}
                  className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
