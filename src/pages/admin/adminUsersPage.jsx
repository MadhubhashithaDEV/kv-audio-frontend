import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, AlertCircle, CheckCircle, Search, RefreshCw,UserX, UserCheck,Moon} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsRefreshing(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
       `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  function handleBlockUser(email) {
    const token = localStorage.getItem("token");

    axios.put(
     `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        setLoading(true);
      }).catch((err) => {
        console.error(err);
      });
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
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
            <Users className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-purple-400">User Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full sm:w-64 bg-gray-800 text-gray-100 shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => setLoading(true)}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <RefreshCw className="h-12 w-12 text-purple-400 animate-spin mb-4" />
            <p className="text-lg text-gray-300">Loading user data...</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <motion.tr 
                        key={user._id} 
                        variants={item}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 border-2 border-purple-500 flex items-center justify-center">
                              {user.profilePicture ? (
                                <img
                                  src={user.profilePicture}
                                  alt="Profile"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-xl font-medium text-gray-300">
                                  {user.firstName?.charAt(0) || "U"}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-100">
                            {user.firstName} {user.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin" 
                              ? "bg-purple-900 text-purple-200" 
                              : "bg-blue-900 text-blue-200"
                          }`}>
                            <Shield className="mr-1 h-3 w-3" />
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.phone || user.phoneNumber || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="max-w-xs truncate">
                            {user.address || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleBlockUser(user.email)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              user.isBlocked
                                ? "bg-red-900 text-red-200 hover:bg-red-800"
                                : "bg-green-900 text-green-200 hover:bg-green-800"
                            }`}
                          >
                            {user.isBlocked ? (
                              <>
                                <UserX className="mr-1.5 h-4 w-4" />
                                BLOCKED
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-1.5 h-4 w-4" />
                                ACTIVE
                              </>
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          <div className="flex items-center justify-center gap-2">
            <Moon size={16} className="text-purple-400" />
            <span>Showing {filteredUsers.length} of {users.length} total users</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
