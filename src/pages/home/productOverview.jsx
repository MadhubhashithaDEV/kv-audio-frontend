import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Truck, Shield, ArrowLeft, Heart } from "lucide-react";
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
    <div className="w-full min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      {loadingStatus === "loading" && (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin"></div>
        </div>
      )}

      {loadingStatus === "error" && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full h-[60vh] flex flex-col justify-center items-center gap-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-3xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Error Loading Product</h1>
          <p className="text-gray-600 max-w-md">We couldn't load the product details. Please try again later.</p>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
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
          <motion.div variants={itemVariants} className="mb-6 text-sm text-gray-500">
            <a href="/" className="hover:text-accent">Home</a> / 
            <a href="/items" className="hover:text-accent"> Products</a> / 
            <span className="text-gray-700"> {product.name}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-3/5 bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1 bg-white p-4">
                <ImageSlider images={product.image} />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              variants={containerVariants}
              className="w-full lg:w-2/5 flex flex-col"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {product.category}
                </span>
                {product.inStock && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    In Stock
                  </span>
                )}
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
              >
                {product.name}
              </motion.h1>

              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="text-2xl font-bold text-accent mb-6"
              >
                Rs. {product.price.toFixed(2)}
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-gray-700 mb-6 leading-relaxed"
              >
                {product.description}
              </motion.p>

              <motion.div variants={itemVariants} className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Dimensions</h3>
                <p className="text-gray-600">{product.dimensions}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="flex-1 sm:flex-none border border-accent text-accent hover:bg-accent/5 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <Heart size={18} />
                  <span className="sm:hidden md:inline">Add to Wishlist</span>
                </button>
              </motion.div>

              <motion.div variants={containerVariants} className="border-t border-gray-200 pt-6 space-y-4">
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <Truck size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Free Delivery</h3>
                    <p className="text-sm text-gray-500">Free shipping on orders over Rs. 5000</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <Shield size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">2 Year Warranty</h3>
                    <p className="text-sm text-gray-500">Full coverage for peace of mind</p>
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
