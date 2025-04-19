import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading"); // loading, success, error

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
				.then((res) => {
					setItem(res.data);
					setStatus("success");
				})
				.catch((err) => {
					console.error(err);
					setStatus("error");
					removeFromCart(itemKey);
					refresh();
				});
		}
	}, [status]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center p-6 animate-pulse">
				<div className="w-20 h-20 bg-purple-100 rounded-lg mr-4"></div>
				<div className="flex-1">
					<div className="h-5 bg-purple-100 rounded w-3/4 mb-3"></div>
					<div className="h-4 bg-purple-100 rounded w-1/2"></div>
				</div>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="p-4 bg-red-50 text-red-600 rounded-lg m-4 flex items-center">
				<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
				</svg>
				Failed to load product.
			</div>
		);
	}

	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="p-4 flex items-center gap-4 relative"
		>
			{/* Product Image with hover zoom effect */}
			<motion.div 
				whileHover={{ scale: 1.05 }}
				className="relative rounded-lg overflow-hidden border border-purple-100 shadow-sm"
			>
				<img
					src={item.image[0]}
					alt={item.name}
					className="w-24 h-24 object-cover"
				/>
				{qty > 1 && (
					<div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold rounded-bl-lg px-2 py-1">
						x{qty}
					</div>
				)}
			</motion.div>

			{/* Product Details */}
			<div className="flex-1 min-w-0">
				<h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
				<div className="flex items-center text-sm text-gray-500 mt-1">
					<span className="mr-2">Unit Price:</span>
					<span className="font-medium text-purple-700">Rs. {item.price.toFixed(2)}</span>
				</div>
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center gap-3">
				<div className="flex flex-col items-center">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-200"
						onClick={() => {
							addToCart(itemKey, 1);
							refresh();
						}}
					>
						<FaArrowUp size={12} />
					</motion.button>
					
					<div className="my-2 font-medium text-gray-800 min-w-[30px] text-center">
						{qty}
					</div>
					
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-200"
						onClick={() => {
							if (qty === 1) {
								removeFromCart(itemKey);
								refresh();
							} else {
								addToCart(itemKey, -1);
								refresh();
							}
						}}
					>
						<FaArrowDown size={12} />
					</motion.button>
				</div>

				{/* Total Price */}
				<div className="text-right min-w-[100px]">
					<div className="text-xs text-gray-500 mb-1">Subtotal</div>
					<div className="text-lg font-bold text-purple-700">
						Rs. {(item.price * qty).toFixed(2)}
					</div>
				</div>
			</div>

			{/* Remove Button */}
			<motion.button
				whileHover={{ scale: 1.1, backgroundColor: "#EF4444", color: "white" }}
				whileTap={{ scale: 0.9 }}
				onClick={() => {
					removeFromCart(itemKey);
					refresh();
				}}
				className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 transition-colors"
				aria-label="Remove item"
			>
				<FaTrash size={14} />
			</motion.button>
		</motion.div>
	);
}