import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Search, 
  RefreshCw,
  UserX,
  UserCheck
} from "lucide-react";

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
        "http://localhost:3000/api/users/all",
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
      "http://localhost:3000/api/users/block/" + email, {}, {
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
    <div className="p-6 bg-background min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">User Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-muted rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none w-full sm:w-64 bg-white shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => setLoading(true)}
              className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <RefreshCw className="h-12 w-12 text-secondary animate-spin mb-4" />
            <p className="text-lg text-gray-600">Loading user data...</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-muted"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <motion.tr 
                        key={user._id} 
                        variants={item}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 border-2 border-secondary flex items-center justify-center">
                              {user.profilePicture ? (
                                <img
                                  src={user.profilePicture}
                                  alt="Profile"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-xl font-medium text-gray-600">
                                  {user.firstName?.charAt(0) || "U"}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "admin" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            <Shield className="mr-1 h-3 w-3" />
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phone || user.phoneNumber || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="max-w-xs truncate">
                            {user.address || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleBlockUser(user.email)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              user.isBlocked
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
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
          className="mt-6 text-center text-sm text-gray-500"
        >
          Showing {filteredUsers.length} of {users.length} total users
        </motion.div>
      </motion.div>
    </div>
  );
}
