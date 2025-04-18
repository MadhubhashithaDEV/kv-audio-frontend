import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Camera, PartyPopper, Mic, Calendar, Users, Search,ChevronLeft,ChevronRight,Star,Heart} from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: "Annual Music Festival 2023",
    category: "Music Events",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Our flagship music festival featuring top artists from around the world.",
    date: "June 15-18, 2023"
  },
  {
    id: 2,
    title: "DJ Night Extravaganza",
    category: "Special Events",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "An unforgettable night with world-class DJs and immersive light shows.",
    date: "August 5, 2023"
  },
  {
    id: 3,
    title: "Classical Symphony Orchestra",
    category: "Music Events",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Experience the magic of classical masterpieces performed live.",
    date: "September 12, 2023"
  },
  {
    id: 4,
    title: "Corporate Event Production",
    category: "Special Events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Professional audio solutions for your next corporate gathering.",
    date: "Ongoing"
  },
  {
    id: 5,
    title: "Summer Beach Concert Series",
    category: "Music Events",
    image: "https://images.unsplash.com/photo-1528489496900-d841974f5290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Sunset concerts by the beach featuring local and international talent.",
    date: "July-August 2023"
  },
  {
    id: 6,
    title: "Wedding Sound & Lighting",
    category: "Special Events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Creating magical moments with premium audio and lighting solutions.",
    date: "Booking Available"
  },
];

const categories = ["All", "Music Events", "Special Events"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = galleryItems.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Music Events":
        return <Music className="w-5 h-5" />;
      case "Special Events":
        return <PartyPopper className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const featuredEvents = galleryItems.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-20 h-20 border-4 border-purple-600 rounded-full border-t-transparent border-b-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-purple-400 font-medium"
          >
            Loading amazing events...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-20 text-gray-200"
    >
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 z-10" />
        
        <div className="relative flex overflow-hidden h-full">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
        <motion.h1 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
>
  Our Event Gallery
</motion.h1>

        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } transition-all duration-300`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-800/80 text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/10 transition-all duration-500 border border-gray-800"
                >
                  <div className="relative h-64 overflow-hidden group">
                    <img
                                           src={item.image}
                                           alt={item.title}
                                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                         />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                                           <motion.button
                                             whileHover={{ scale: 1.1 }}
                                             whileTap={{ scale: 0.9 }}
                                             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                                           >
                                             View Details
                                           </motion.button>
                                         </div>
                                         <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                           {getCategoryIcon(item.category)}
                                           <span className="font-medium">{item.category}</span>
                                         </div>
                                         <motion.div 
                                           initial={{ opacity: 0 }}
                                           animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                                           className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
                                         >
                                           <Heart className="w-5 h-5 text-pink-500" />
                                         </motion.div>
                                       </div>
                                       <div className="p-6">
                                         <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">{item.title}</h3>
                                         <p className="text-gray-300 mb-4 line-clamp-2">{item.description}</p>
                                         <div className="flex items-center justify-between">
                                           <div className="flex items-center text-purple-400 bg-purple-900/30 px-3 py-1.5 rounded-full">
                                             <Calendar className="w-4 h-4 mr-2" />
                                             <span className="text-sm font-medium">{item.date}</span>
                                           </div>
                                           <div className="flex items-center">
                                             {[1, 2, 3, 4, 5].map((star) => (
                                               <Star 
                                                 key={star} 
                                                 className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                                               />
                                             ))}
                                           </div>
                                         </div>
                                       </div>
                                     </motion.div>
                                   ))
                                 ) : (
                                   <motion.div 
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: 1 }}
                                     className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700"
                                   >
                                     <Camera className="w-20 h-20 text-gray-600 mb-4" />
                                     <h3 className="text-2xl font-medium text-gray-300 mb-2">No events found</h3>
                                     <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                                     <button 
                                       onClick={() => {
                                         setSelectedCategory("All");
                                         setSearchTerm("");
                                       }}
                                       className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                     >
                                       Reset Filters
                                     </button>
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                             </div>
                           </div>
                     
                           {/* Stats Section */}
                           <div className="bg-gradient-to-r from-gray-900 to-black text-white py-20 mt-16 relative overflow-hidden">
                             <div className="absolute inset-0 bg-purple-900/10 z-0"></div>
                             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600"></div>
                             
                             <div className="container mx-auto px-4 relative z-10">
                               <motion.h2 
                                 initial={{ opacity: 0, y: 20 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true }}
                                 transition={{ duration: 0.5 }}
                                 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
                               >
                                 Our Events in Numbers
                               </motion.h2>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                 <motion.div 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5, delay: 0.1 }}
                                   whileHover={{ y: -5 }}
                                   className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                                 >
                                   <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-6">
                                     <Music className="w-8 h-8 text-purple-400" />
                                   </div>
                                   <span className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">120+</span>
                                   <span className="text-gray-400 font-medium">Music Events</span>
                                 </motion.div>
                                 
                                 <motion.div 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5, delay: 0.2 }}
                                   whileHover={{ y: -5 }}
                                   className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                                 >
                                   <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-6">
                                     <PartyPopper className="w-8 h-8 text-purple-400" />
                                   </div>
                                   <span className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">85+</span>
                                   <span className="text-gray-400 font-medium">Special Events</span>
                                 </motion.div>
                                 
                                 <motion.div 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5, delay: 0.3 }}
                                   whileHover={{ y: -5 }}
                                   className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                                 >
                                   <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-6">
                                     <Mic className="w-8 h-8 text-purple-400" />
                                   </div>
                                   <span className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">250+</span>
                                   <span className="text-gray-400 font-medium">Artists Featured</span>
                                 </motion.div>
                                 
                                 <motion.div 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5, delay: 0.4 }}
                                   whileHover={{ y: -5 }}
                                   className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                                 >
                                   <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-6">
                                     <Users className="w-8 h-8 text-purple-400" />
                                   </div>
                                   <span className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">50k+</span>
                                   <span className="text-gray-400 font-medium">Happy Attendees</span>
                                 </motion.div>
                               </div>
                             </div>
                           </div>
                     
                           {/* Testimonials */}
                           <div className="container mx-auto px-4 py-20">
                             <motion.h2 
                               initial={{ opacity: 0, y: 20 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.5 }}
                               className="text-4xl font-bold text-center text-white mb-4"
                             >
                               What People Say About Our Events
                             </motion.h2>
                             
                             <motion.p
                               initial={{ opacity: 0, y: 20 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.5, delay: 0.1 }}
                               className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
                             >
                               We take pride in creating unforgettable experiences for our clients and attendees
                             </motion.p>
                             
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                               {[
                                 {
                                   name: "Rochana Pabasra",
                                   role: "Music Enthusiast",
                                   quote: "The annual music festival was absolutely incredible! The sound quality was perfect and the atmosphere was electric.",
                                   avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                                   rating: 5
                                 },
                                 {
                                   name: "Akila Madhubhashitha",
                                   role: "Event Organizer",
                                   quote: "KV Audio provided exceptional service for our corporate event. The team was professional and the equipment was top-notch.",
                                   avatar: "https://randomuser.me/api/portraits/men/46.jpg",
                                   rating: 5
                                 },
                                 {
                                   name: "Vinu Ekanayake",
                                   role: "Wedding Planner",
                                   quote: "Their attention to detail made our wedding reception perfect. The lighting and sound created exactly the mood we wanted.",
                                   avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                                   rating: 5
                                 }
                               ].map((testimonial, index) => (
                                 <motion.div
                                   key={index}
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 0.5, delay: index * 0.1 }}
                                   whileHover={{ y: -10 }}
                                   className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border border-gray-700"
                                 >
                                   <div className="flex items-center mb-6">
                                     <div className="relative">
                                       <img 
                                         src={testimonial.avatar} 
                                         alt={testimonial.name}
                                         className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 p-1"
                                       />
                                       <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-1 rounded-full">
                                         <Star className="w-4 h-4 fill-white" />
                                       </div>
                                     </div>
                                     <div className="ml-4">
                                       <h4 className="font-bold text-xl text-white">{testimonial.name}</h4>
                                       <p className="text-sm text-purple-400">{testimonial.role}</p>
                                     </div>
                                   </div>
                                   
                                   <div className="flex mb-4">
                                     {[...Array(testimonial.rating)].map((_, i) => (
                                       <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                     ))}
                                   </div>
                                   
                                   <p className="text-gray-300 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                 </motion.div>
                               ))}
                             </div>
                           </div>
                     
                           {/* Call to Action */}
                           <motion.div 
                             initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.7 }}
                             className="relative"
                           >
                             <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-90 z-0"></div>
                             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                             
                             <div className="container mx-auto px-4 py-20 relative z-10">
                               <div className="max-w-3xl mx-auto text-center">
                                 <motion.h2 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   className="text-4xl md:text-5xl font-bold mb-6 text-white"
                                 >
                                   Ready to Experience Our Events?
                                 </motion.h2>
                                 <motion.p 
                                   initial={{ opacity: 0, y: 20 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   transition={{ delay: 0.1 }}
                                   className="text-xl text-gray-200 mb-10"
                                   >
                                     Join us for our upcoming events or contact us to discuss how we can make your next event extraordinary.
                                   </motion.p>
                                   <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                     <motion.button
                                       whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                                       whileTap={{ scale: 0.95 }}
                                       className="px-8 py-4 bg-white text-purple-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                                     >
                                       View Upcoming Events
                                     </motion.button>
                                     <motion.button
                                       whileHover={{ scale: 1.05 }}
                                       whileTap={{ scale: 0.95 }}
                                       className="px-8 py-4 bg-transparent text-white rounded-full font-bold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300"
                                     >
                                       Contact Us
                                     </motion.button>
                                   </div>
                                   
                                   <motion.div 
                                     initial={{ opacity: 0, y: 20 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                     transition={{ delay: 0.3 }}
                                     className="mt-12 flex flex-wrap justify-center gap-4"
                                   >
                                     <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                       <Music className="w-5 h-5 text-purple-400 mr-2" />
                                       <span className="text-gray-200">Premium Sound</span>
                                     </div>
                                     <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                       <Camera className="w-5 h-5 text-purple-400 mr-2" />
                                       <span className="text-gray-200">Professional Lighting</span>
                                     </div>
                                     <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                       <Users className="w-5 h-5 text-purple-400 mr-2" />
                                       <span className="text-gray-200">Experienced Team</span>
                                     </div>
                                   </motion.div>
                                 </div>
                               </div>
                             </motion.div>
                       
                           
                       
                           </motion.div>
                         );
                       }
                       
                     
