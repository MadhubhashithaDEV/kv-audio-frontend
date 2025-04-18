import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function ProductCard({ item }) {
  return (
    <motion.div
      className="w-[300px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden relative flex flex-col items-center p-6 text-center transition-transform duration-300 border border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Availability Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
            item.availability
              ? "bg-emerald-900 text-emerald-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {item.availability ? "In Stock" : "In Stock"}
        </span>
      </div>

      {/* Image container with fixed size */}
      <div className="w-full h-[180px] flex items-center justify-center overflow-hidden rounded-xl mb-4 bg-gray-800 shadow-inner border border-gray-700">
        <img
          src={item.image[0]}
          alt={item.name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Category */}
      <p className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider mb-1">
        {item.category}
      </p>

      {/* Name */}
      <h2 className="text-xl font-bold text-gray-100 leading-tight mb-1">
        {item.name}
      </h2>

      {/* Price */}
      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        Rs. {item.price}
      </p>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-2">
        {item.description}
      </p>

      {/* Dimensions */}
      <div className="text-xs text-gray-400 mb-4">
        <span className="font-semibold">Dimensions:</span>{" "}
        <span className="bg-gray-700 px-2 py-0.5 rounded-md text-gray-200">
          {item.dimensions}
        </span>
      </div>

      {/* View Button */}
      <Link
        to={`/product/${item.key}`}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded-full font-medium flex justify-center items-center gap-2 transition-all shadow-md border border-indigo-500"
      >
        <Eye size={16} />
        View Details
      </Link>
    </motion.div>
  );
}
