import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  RefreshCw,
  AlertCircle
} from "lucide-react";

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
      const response = await axios.get("http://localhost:3000/api/products", {
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
      await axios.delete(`http://localhost:3000/api/products/${deleteItemId}`, {
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
      className="w-full min-h-screen p-4 md:p-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Product Inventory</h1>
          <p className="text-gray-600">Manage your audio equipment inventory</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, category or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-muted focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={fetchItems}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-gray-200 text-gray-700 transition-all"
              >
                <RefreshCw size={16} />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-gray-200 text-gray-700 transition-all">
                <Filter size={16} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>

          {!itemsLoaded ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-muted rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-secondary rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600">Loading inventory...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <AlertCircle size={48} className="mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="mb-6">
                {searchTerm ? "Try a different search term" : "Start by adding your first product"}
              </p>
              <Link 
                to="/admin/items/add"
                className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
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
                  <tr className="border-b border-muted">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dimensions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <AnimatePresence>
                  <motion.tbody className="divide-y divide-muted">
                    {filteredItems.map((item) => (
                      <motion.tr 
                        key={item.key}
                        variants={rowVariants}
                        exit="exit"
                        whileHover={{ backgroundColor: "rgba(242, 242, 242, 0.5)" }}
                        className="group"
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.key}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${item.price}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.dimensions}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            item.availability 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
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
                              className="p-2 rounded-lg bg-blue-50 text-secondary hover:bg-blue-100 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(item.key)}
                              className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
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
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary text-white shadow-lg"
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                <AlertCircle className="text-red-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDeleting(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
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
