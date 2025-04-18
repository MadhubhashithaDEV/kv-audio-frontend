import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const params = useParams();
  const key = params.key;
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/" + key)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("loaded");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setLoadingStatus("error");
      });
  }, [key]);

  const handleAddToCart = () => {
    addToCart(product.key, quantity);
    toast.success("Added to Cart");
    console.log(loadCart());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-200">
      {loadingStatus === "loading" && (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-sky-400 rounded-full animate-spin"></div>
        </div>
      )}

      {loadingStatus === "error" && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full h-[60vh] flex flex-col justify-center items-center gap-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center">
            <span className="text-red-400 text-3xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-100">Error Loading Product</h1>
          <p className="text-gray-400 max-w-md">We couldn't load the product details. Please try again later.</p>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </motion.div>
      )}

      {loadingStatus === "loaded" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-6 text-sm text-gray-400">
            <a href="/" className="hover:text-sky-400">Home</a> / 
            <a href="/items" className="hover:text-sky-400"> Products</a> / 
            <span className="text-gray-300"> {product.name}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-3/5 bg-gray-800 rounded-2xl shadow-lg shadow-black/30 overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-800 p-4">
                <ImageSlider images={product.image} />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              variants={containerVariants}
              className="w-full lg:w-2/5 flex flex-col"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-sky-400/20 text-sky-300 text-xs font-medium rounded-full">
                  {product.category}
                </span>
                {product.inStock && (
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-medium rounded-full">
                    In Stock
                  </span>
                )}
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                {product.name}
              </motion.h1>

              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(24 reviews)</span>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="text-2xl font-bold text-sky-300 mb-6"
              >
                Rs. {product.price.toFixed(2)}
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                {product.description}
              </motion.p>

              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="text-sm font-medium text-gray-200 mb-2">Dimensions</h3>
                <p className="text-gray-400">{product.dimensions}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-medium text-white">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-sky-500 hover:bg-sky-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </motion.div>

              <motion.div variants={containerVariants} className="border-t border-gray-700 pt-6 space-y-4">
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <Truck size={20} className="text-sky-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-200">Free Delivery</h3>
                    <p className="text-sm text-gray-400">Free shipping on orders over Rs. 5000</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <Shield size={20} className="text-sky-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-200">2 Year Warranty</h3>
                    <p className="text-sm text-gray-400">Full coverage for peace of mind</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
