import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3,Users, Package, Calendar, DollarSign, TrendingUp, Clock, AlertCircle, RefreshCw,ChevronRight,CheckCircle,XCircle,Clock3
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    recentUsers: [],
    productsByCategory: { audio: 0, lights: 0 }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch all required data in parallel
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/orders/", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // Calculate total revenue
        const totalRevenue = ordersRes.data.reduce((sum, order) => {
          return order.status.toLowerCase() === 'approved' ? sum + order.totalAmount : sum;
        }, 0);

        // Count products by category
        const productsByCategory = productsRes.data.reduce((acc, product) => {
          const category = product.category.toLowerCase();
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, { audio: 0, lights: 0 });

        setStats({
          totalUsers: usersRes.data.length,
          totalProducts: productsRes.data.length,
          totalOrders: ordersRes.data.length,
          totalRevenue,
          recentOrders: ordersRes.data.slice(0, 5), // Get 5 most recent orders
          recentUsers: usersRes.data.slice(0, 5), // Get 5 most recent users
          productsByCategory
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-green-400">
            <CheckCircle size={14} />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-red-400">
            <XCircle size={14} />
            <span>Rejected</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="flex items-center gap-1 text-yellow-400">
            <Clock3 size={14} />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <BarChart3 className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-purple-400">Dashboard Overview</h1>
          </div>
          
          <button 
            onClick={() => setLoading(true)}
            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <RefreshCw className="h-12 w-12 text-purple-400 animate-spin mb-4" />
            <p className="text-lg text-gray-300">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-400 text-sm font-medium">Total Users</h2>
                  <div className="p-2 bg-indigo-900/50 rounded-lg text-indigo-400">
                    <Users size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                    <p className="text-xs text-gray-400 mt-1">Registered accounts</p>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+12%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-400 text-sm font-medium">Total Products</h2>
                  <div className="p-2 bg-purple-900/50 rounded-lg text-purple-400">
                    <Package size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
                    <p className="text-xs text-gray-400 mt-1">Available items</p>
                  </div>
                  <div className="flex flex-col text-xs text-gray-400 mt-1">
                    <span className="text-purple-400">Audio: {stats.productsByCategory.audio}</span>
                    <span className="text-blue-400">Lights: {stats.productsByCategory.lights}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-400 text-sm font-medium">Total Bookings</h2>
                  <div className="p-2 bg-blue-900/50 rounded-lg text-blue-400">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                    <p className="text-xs text-gray-400 mt-1">All time bookings</p>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+8%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-400 text-sm font-medium">Total Revenue</h2>
                  <div className="p-2 bg-green-900/50 rounded-lg text-green-400">
                    <DollarSign size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Rs. {stats.totalRevenue.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-1">From approved bookings</p>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+15%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Orders & Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Orders */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
                  <Link to="/admin/orders" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  {stats.recentOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <AlertCircle size={32} className="mb-2" />
                      <p>No bookings found</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {stats.recentOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                              {order.orderId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {order.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
                              Rs. {order.totalAmount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {getStatusBadge(order.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>

              {/* Recent Users */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Recent Users</h2>
                  <Link to="/admin/users" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
      
                <div className="overflow-x-auto">
                {stats.recentUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <AlertCircle size={32} className="mb-2" />
                      <p>No users found</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {stats.recentUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-700 border-2 border-purple-500 flex items-center justify-center mr-3">
                                  {user.profilePicture ? (
                                    <img
                                      src={user.profilePicture}
                                      alt="Profile"
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-gray-300">
                                      {user.firstName?.charAt(0) || "U"}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm font-medium text-gray-300">
                                  {user.firstName} {user.lastName}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "admin" 
                                  ? "bg-purple-900 text-purple-200" 
                                  : "bg-blue-900 text-blue-200"
                              }`}>
                                {user.role.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.isBlocked
                                  ? "bg-red-900 text-red-200"
                                  : "bg-green-900 text-green-200"
                              }`}>
                                {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Booking Status & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Booking Status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden lg:col-span-1"
              >
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Booking Status</h2>
                </div>
                
                <div className="p-6">
                  {stats.recentOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <AlertCircle size={32} className="mb-2" />
                      <p>No data available</p>
                    </div>
                  ) : (
                    <>
                      {/* Calculate status counts */}
                      {(() => {
                        const statusCounts = stats.recentOrders.reduce((acc, order) => {
                          const status = order.status.toLowerCase();
                          acc[status] = (acc[status] || 0) + 1;
                          return acc;
                        }, { approved: 0, rejected: 0, pending: 0 });
                        
                        const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
                        
                        return (
                          <div className="space-y-4">
                            {/* Approved */}
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                  <span className="text-sm text-gray-300">Approved</span>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {statusCounts.approved || 0} ({total ? Math.round((statusCounts.approved || 0) / total * 100) : 0}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${total ? (statusCounts.approved || 0) / total * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Pending */}
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                  <span className="text-sm text-gray-300">Pending</span>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {statusCounts.pending || 0} ({total ? Math.round((statusCounts.pending || 0) / total * 100) : 0}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full" 
                                  style={{ width: `${total ? (statusCounts.pending || 0) / total * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Rejected */}
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                  <span className="text-sm text-gray-300">Rejected</span>
                                </div>
                                <span className="text-sm text-gray-400">
                                  {statusCounts.rejected || 0} ({total ? Math.round((statusCounts.rejected || 0) / total * 100) : 0}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${total ? (statusCounts.rejected || 0) / total * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden lg:col-span-2"
              >
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                </div>
                
                <div className="p-6">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                    
                    <div className="space-y-6">
                      {/* Combine recent orders and users to create an activity timeline */}
                      {[...stats.recentOrders.map(order => ({
                        type: 'order',
                        date: new Date(order.orderDate),
                        data: order
                      })), ...stats.recentUsers.slice(0, 3).map(user => ({
                        type: 'user',
                        date: new Date(), // Assuming we don't have a registration date
                        data: user
                      }))].sort((a, b) => b.date - a.date).slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 relative z-10">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              activity.type === 'order' 
                                ? 'bg-blue-900 text-blue-300' 
                                : 'bg-purple-900 text-purple-300'
                            }`}>
                              {activity.type === 'order' ? <Calendar size={16} /> : <Users size={16} />}
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="text-sm font-medium text-gray-200">
                              {activity.type === 'order' 
                                ? `New booking #${activity.data.orderId}` 
                                : `User ${activity.data.firstName} ${activity.data.lastName} activity`}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                              {activity.type === 'order' 
                                ? `${activity.data.email} booked items for Rs. ${activity.data.totalAmount.toFixed(2)}` 
                                : `${activity.data.email} - ${activity.data.isBlocked ? 'Account blocked' : 'Account active'}`}
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              <span>{activity.date.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
