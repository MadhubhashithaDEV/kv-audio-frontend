import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Calendar, Mail, Clock, DollarSign, AlertCircle, Package, Loader2
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchOrders();
    }
  }, [loading]);

  function handleOrderStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    
    setLoading(true);
    axios.put(
      "http://localhost:3000/api/orders/status/" + orderId,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      console.log("Order status updated");
      setModalOpened(false);
      setLoading(true);
    }).catch((err) => {
      console.error(err);
      setLoading(true);
    });
  }

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary">Booking Management</h1>
          <p className="text-muted-foreground mt-2">Manage and process customer bookings</p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-surface rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Package className="text-secondary" size={20} />
              <h2 className="text-xl font-semibold">All Bookings</h2>
              <span className="bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-1 rounded-full">
                {orders.length} Total
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  statusFilter === "all" 
                    ? "bg-secondary text-white" 
                    : "bg-muted text-primary hover:bg-secondary/20"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter("pending")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  statusFilter === "pending" 
                    ? "bg-yellow-500 text-white" 
                    : "bg-muted text-primary hover:bg-yellow-100"
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter("approved")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  statusFilter === "approved" 
                    ? "bg-green-500 text-white" 
                    : "bg-muted text-primary hover:bg-green-100"
                }`}
              >
                Approved
              </button>
              <button 
                onClick={() => setStatusFilter("rejected")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  statusFilter === "rejected" 
                    ? "bg-red-500 text-white" 
                    : "bg-muted text-primary hover:bg-red-100"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-secondary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted mb-4" />
              <h3 className="text-lg font-medium mb-1">No bookings found</h3>
              <p className="text-muted-foreground max-w-md">
                {statusFilter !== "all" 
                  ? `There are no bookings with "${statusFilter}" status.` 
                  : "There are no bookings in the system yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-muted">
              <table className="min-w-full divide-y divide-muted">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Days</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Starting Date</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Ending Date</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Total Amount</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-primary uppercase tracking-wider">Order Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-muted">
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={order._id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveOrder(order);
                        setModalOpened(true);
                      }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">{order.orderId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-primary/80 flex items-center">
                        <Mail size={14} className="mr-1.5 text-secondary" />
                        {order.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-primary/80">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1.5 text-secondary" />
                          {order.days}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-primary/80">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-secondary" />
                          {new Date(order.startingDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-primary/80">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-secondary" />
                          {new Date(order.endingDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <span className="flex items-center">
                          <DollarSign size={14} className="mr-1 text-secondary" />
                          {order.totalAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(order.status)}`}>
                          {order.status === "approved" && <CheckCircle size={12} className="mr-1" />}
                          {order.status === "Rejected" && <XCircle size={12} className="mr-1" />}
                          {order.status === "pending" && <Clock size={12} className="mr-1" />}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-primary/80">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpened && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
            onClick={() => setModalOpened(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface w-full max-w-2xl rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="flex justify-between items-center p-6 border-b border-muted">
                  <h2 className="text-xl font-bold text-primary">Booking Details</h2>
                  <button 
                    onClick={() => setModalOpened(false)}
                    className="text-primary/60 hover:text-primary transition-colors rounded-full p-1 hover:bg-muted"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Order ID</span>
                        <span className="font-medium text-primary">{activeOrder.orderId}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Email</span>
                        <span className="text-primary">{activeOrder.email}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Days</span>
                        <span className="text-primary">{activeOrder.days}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Order Date</span>
                        <span className="text-primary">{new Date(activeOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Starting Date</span>
                        <span className="text-primary">{new Date(activeOrder.startingDate).toLocaleDateString()}</span>
                      </div>
			    <div className="flex items-start">
  <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Ending Date</span>
  <span className="text-primary">{new Date(activeOrder.endingDate).toLocaleDateString()}</span>
</div>

                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Total Amount</span>
                        <span className="font-medium text-primary">Rs {activeOrder.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider w-28">Status</span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(activeOrder.status)}`}>
                          {activeOrder.status === "approved" && <CheckCircle size={12} className="mr-1" />}
                          {activeOrder.status === "Rejected" && <XCircle size={12} className="mr-1" />}
                          {activeOrder.status === "pending" && <Clock size={12} className="mr-1" />}
                          {activeOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {activeOrder.status === "pending" && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
                      >
                        <CheckCircle size={18} />
                        Approve Booking
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOrderStatusChange(activeOrder.orderId, "Rejected")}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
                      >
                        <XCircle size={18} />
                        Reject Booking
                      </motion.button>
                    </div>
                  )}

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-primary mb-3">Ordered Items</h3>
                    <div className="overflow-x-auto -mx-4">
                      <table className="min-w-full divide-y divide-muted">
                        <thead>
                          <tr className="text-xs uppercase tracking-wider text-primary/70">
                            <th className="px-4 py-2 text-left w-16">Image</th>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-center">Qty</th>
                            <th className="px-4 py-2 text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/50">
                          {activeOrder.orderedItems.map((item, index) => (
                            <motion.tr 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              key={item.product.key}
                              className="text-sm text-primary"
                            >
                              <td className="px-4 py-3">
                                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted/50 flex items-center justify-center">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 font-medium">{item.product.name}</td>
                              <td className="px-4 py-3 text-center">
                                <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right font-medium">Rs {item.product.price}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-muted/20">
                          <tr>
                            <td colSpan="3" className="px-4 py-3 text-right font-medium">Total:</td>
                            <td className="px-4 py-3 text-right font-bold">Rs {activeOrder.totalAmount.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
