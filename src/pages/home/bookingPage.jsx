import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar, Clock, ShoppingCart, CreditCard, Music, ChevronRight } from "lucide-react";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart() {
        setCart(loadCart());
        calculateTotal();
    }

    function calculateTotal() {
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
            .then((res) => {
                setTotal(res.data.total);
            }).catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        calculateTotal();
    }, [startingDate, endingDate]);

    function handleBookingCreation() {
        setIsLoading(true);
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            localStorage.removeItem("cart");
            toast.success("Booking Created Successfully");
            setCart(loadCart());
            setIsLoading(false);
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to create booking");
            setIsLoading(false);
        });
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 text-gray-700"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl font-bold text-indigo-700 mb-2 flex items-center justify-center">
                        <Music className="mr-3 h-8 w-8 text-indigo-600" />
                        <span>KV Audio Booking</span>
                    </h1>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Select your dates and confirm your equipment rental
                    </p>
                </motion.div>

                {/* Booking Progress */}
                <motion.div 
                    variants={itemVariants}
                    className="mb-10 hidden sm:block"
                >
                    <div className="flex items-center justify-between max-w-xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                                <ShoppingCart className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-sm font-medium text-indigo-700">Cart</span>
                        </div>
                        <div className="flex-1 h-1 bg-indigo-300 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-sm font-medium text-indigo-700">Dates</span>
                        </div>
                        <div className="flex-1 h-1 bg-indigo-300 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-600">Payment</span>
                        </div>
                    </div>
                </motion.div>

                {/* Date Selection Card */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                    <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center">
                        <Calendar className="mr-2 h-6 w-6 text-indigo-600" />
                        Select Rental Period
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-gray-700 font-medium flex items-center mb-2">
                                    <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                                    Starting Date
                                </span>
                                <input
                                    type="date"
                                    value={startingDate}
                                    onChange={(e) => setStartingDate(e.target.value)}
                                    className="w-full bg-blue-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-700"
                                />
                            </label>
                        </div>
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-gray-700 font-medium flex items-center mb-2">
                                    <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                                    Ending Date
                                </span>
                                <input
                                    type="date"
                                    value={endingDate}
                                    onChange={(e) => setEndingDate(e.target.value)}
                                    className="w-full bg-blue-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-gray-700"
                                />
                            </label>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-indigo-100 rounded-lg border border-indigo-200">
                        <p className="text-gray-700 font-medium flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                            Total Rental Period: 
                            <span className="ml-2 font-bold text-indigo-700">{daysBetween} day{daysBetween !== 1 ? 's' : ''}</span>
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8 hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="bg-indigo-500 p-6 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Your Equipment
                        </h2>
                    </div>

                    {cart.orderedItems.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                <ShoppingCart className="h-10 w-10 text-indigo-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">Add some audio equipment to your cart to create a booking.</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg flex items-center mx-auto"
                                onClick={() => window.history.back()}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Browse Equipment
                            </motion.button>
                        </div>
                    ) : (
                        <div>
                            <div className="divide-y divide-gray-200">
                                {cart.orderedItems.map((item, index) => (
                                    <motion.div 
                                        key={item.key}
                                        whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                                        className={`transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                    >
                                        <BookingItem itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="p-4 bg-indigo-50 border-t border-gray-200">
                                <p className="text-sm text-gray-700 text-center">
                                    <span className="inline-block mr-2 text-green-500">✓</span>
                                    All items are available for your selected dates
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Summary and Checkout */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                    <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
                        <CreditCard className="mr-2 h-6 w-6 text-indigo-600" />
                        Order Summary
                    </h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-gray-700">
                            <span>Equipment Rental</span>
                            <span>Rs. {(total * 0.9).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-700">
                            <span>Service Fee</span>
                            <span>Rs. {(total * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold">
                            <span className="text-gray-800">Total Amount</span>
                            <span className="text-2xl text-indigo-700">Rs. {total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading || cart.orderedItems.length === 0}
                            onClick={handleBookingCreation}
                            className={`w-full py-4 rounded-lg font-medium text-white 
                                ${cart.orderedItems.length === 0 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-md hover:shadow-lg'} 
                                transition-all duration-300 flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Confirm Booking
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </motion.button>
                        <p className="text-xs text-gray-500 text-center mt-4">
                            By confirming, you agree to our terms and conditions for equipment rental
                        </p>
                    </div>
                </motion.div>

                {/* Additional Information */}
            
                <motion.div 
                    variants={itemVariants}
                    className="mt-8 text-center text-gray-600 text-sm"
                >
                    <p>Need help with your booking? Contact our support team at support@kvaudio.com</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                            24/7 Support
                        </span>
                        <span className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1 text-indigo-500" />
                            Secure Payment
                        </span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-indigo-500" />
                            Flexible Dates
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
