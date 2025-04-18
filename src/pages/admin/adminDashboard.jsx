import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Calendar, 
  Bell, 
  Settings, 
  Search,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="flex h-screen bg-background dark:bg-primary text-primary dark:text-white">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={toggleSidebar}
        className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-secondary text-white shadow-lg md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-primary shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-muted dark:border-gray-700">
            <h2 className="text-2xl font-bold text-secondary">KV Audio</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <SidebarItem icon={<BarChart3 size={20} />} text="Dashboard" active />
            <SidebarItem icon={<Users size={20} />} text="Users" />
            <SidebarItem icon={<Package size={20} />} text="Products" />
            <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" />
            <SidebarItem icon={<DollarSign size={20} />} text="Transactions" />
            <SidebarItem icon={<Calendar size={20} />} text="Schedule" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
          </nav>

          <div className="p-4 border-t border-muted dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                <span className="font-medium">AD</span>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">admin@kvaudio.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white dark:bg-primary shadow-sm border-b border-muted dark:border-gray-700 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-muted dark:border-gray-700 bg-muted dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              
              <button className="relative p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 md:p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Stats overview */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Total Sales" 
                value="$24,780" 
                change="+12.5%" 
                icon={<DollarSign className="text-green-500" />} 
              />
              <StatCard 
                title="New Orders" 
                value="184" 
                change="+8.2%" 
                icon={<ShoppingCart className="text-secondary" />} 
              />
              <StatCard 
                title="New Users" 
                value="48" 
                change="+24.3%" 
                icon={<Users className="text-accent" />} 
              />
              <StatCard 
                title="Products" 
                value="312" 
                change="+3.7%" 
                icon={<Package className="text-yellow-500" />} 
              />
            </motion.div>

            {/* Recent activity and charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-muted dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Sales Overview</h2>
                  <select className="p-2 rounded-md border border-muted dark:border-gray-700 bg-transparent text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="h-64 w-full bg-muted dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Chart visualization goes here</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-muted dark:border-gray-700"
              >
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <ActivityItem 
                    title="New order #KV-1234" 
                    time="2 minutes ago" 
                    description="John Doe purchased Audio Interface X3" 
                  />
                  <ActivityItem 
                    title="Product update" 
                    time="1 hour ago" 
                    description="Inventory updated for Headphones Pro" 
                  />
                  <ActivityItem 
                    title="New user registered" 
                    time="3 hours ago" 
                    description="Sarah Smith created an account" 
                  />
                  <ActivityItem 
                    title="Payment received" 
                    time="5 hours ago" 
                    description="$1,200 payment for order #KV-1230" 
                  />
                </div>
                <button className="mt-4 text-secondary hover:underline text-sm font-medium">
                  View all activity
                </button>
              </motion.div>
            </div>

            {/* Recent orders */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-muted dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 font-medium">Product</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <OrderRow 
                      id="KV-1234" 
                      customer="John Doe" 
                      product="Audio Interface X3" 
                      date="Oct 24, 2023" 
                      amount="$599.99" 
                      status="Completed" 
                    />
                    <OrderRow 
                      id="KV-1233" 
                      customer="Jane Smith" 
                      product="Studio Monitors (Pair)" 
                      date="Oct 23, 2023" 
                      amount="$799.99" 
                      status="Processing" 
                    />
                    <OrderRow 
                      id="KV-1232" 
                      customer="Robert Johnson" 
                      product="Condenser Microphone" 
                      date="Oct 22, 2023" 
                      amount="$349.99" 
                      status="Shipped" 
                    />
                    <OrderRow 
                      id="KV-1231" 
                      customer="Emily Davis" 
                      product="Headphones Pro" 
                      date="Oct 21, 2023" 
                      amount="$249.99" 
                      status="Completed" 
                    />
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Component for sidebar items
const SidebarItem = ({ icon, text, active }) => (
  <div 
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active 
        ? 'bg-secondary bg-opacity-10 text-secondary' 
        : 'hover:bg-muted dark:hover:bg-gray-800'
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

// Component for stat cards
const StatCard = ({ title, value, change, icon }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-muted dark:border-gray-700"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-sm text-green-500 mt-1">{change}</p>
      </div>
      <div className="p-3 rounded-full bg-muted dark:bg-gray-700">
        {icon}
      </div>
    </div>
  </motion.div>
);

// Component for activity items
const ActivityItem = ({ title, time, description }) => (
  <div className="border-l-2 border-muted dark:border-gray-700 pl-4 py-1">
    <p className="font-medium">{title}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
    <p className="text-sm mt-1">{description}</p>
  </div>
);

// Component for order rows
const OrderRow = ({ id, customer, product, date, amount, status }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Shipped': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <tr className="border-b border-muted dark:border-gray-700 hover:bg-muted dark:hover:bg-gray-700 transition-colors">
      <td className="py-3 px-4">{id}</td>
      <td className="py-3 px-4">{customer}</td>
      <td className="py-3 px-4">{product}</td>
      <td className="py-3 px-4">{date}</td>
      <td className="py-3 px-4 font-medium">{amount}</td>
     
      <td className="py-3 px-4">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default AdminDashboard;
