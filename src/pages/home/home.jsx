import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaChevronDown, FaHeadphones, FaMicrophone, FaGuitar } from "react-icons/fa";
import { motion } from "framer-motion";
import backgroundVideo from "../../assets/videos/background-video.mp4";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const nextSectionRef = useRef(null);
  const featuredRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  // Smooth scroll to sections
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      description: "Studio-quality sound with noise cancellation",
      price: "$299",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      description: "Crystal clear audio with 24-hour battery life",
      price: "$149",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tag: "New"
    },
    {
      id: 3,
      name: "Professional Microphone",
      description: "Studio-grade recording for professionals",
      price: "$199",
      image: "https://images.unsplash.com/photo-1520170350707-b2da59970118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tag: "Popular"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Music Producer",
      quote: "KV Audio equipment has transformed my studio setup. The sound quality is unmatched!",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Audio Engineer",
      quote: "I've tried many brands, but KV Audio stands out for both quality and durability.",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Podcast Host",
      quote: "My listeners noticed the improvement in audio quality immediately after switching to KV Audio.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute min-w-full min-h-full object-cover w-auto h-auto transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 dark:from-black/80 dark:via-black/60 dark:to-black/90 transition-colors duration-500"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex justify-between items-center w-full px-6 py-6 md:px-12">
         
          
          <div className="flex items-center space-x-4">
            
            
          
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight">
              <span className="block">KV Audio</span>
              <span className="block mt-2 text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Premium Sound Experience
              </span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200 dark:text-gray-300">
              Discover our collection of high-quality audio equipment designed for professionals and enthusiasts who demand nothing but the best.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <button 
              className="px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                        hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-purple-600/30 
                        transform hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/items'}
            >
              Explore Products
            </button>
            
            <button 
              className="px-8 py-3 text-lg font-medium rounded-full border-2 border-white/30 text-white
                        backdrop-blur-sm hover:bg-white/10 
                        transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection(nextSectionRef)}
            >
              Learn More
            </button>
          </motion.div>
        </div>
        
        {/* Scroll Down Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <button 
            onClick={() => scrollToSection(nextSectionRef)}
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Scroll down"
          >
            <span className="mb-2 text-sm">Discover More</span>
            <FaChevronDown />
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section 
        ref={nextSectionRef} 
        className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose KV Audio?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge technology with elegant design to deliver audio equipment that exceeds expectations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                <FaHeadphones className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Superior Sound Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience audio with unparalleled clarity and depth, engineered for the most discerning listeners.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                <FaMicrophone className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Professional Grade</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our equipment meets the rigorous standards of industry professionals while remaining accessible to enthusiasts.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                <FaGuitar className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Versatile Connectivity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect your devices with ease using a variety of ports and wireless options.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}