import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					"http://localhost:3000/api/orders/",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(res.data);
				setOrders(res.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};
		if (loading) {
			fetchOrders();
		}
	}, [loading]);

	function handleOrderStatusChange(orderId, status) {
        const token = localStorage.getItem("token");
        
        axios.put(
            "http://localhost:3000/api/orders/status/" + orderId,
            {
                status: status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(()=>{
            console.log("Order status updated");
            setModalOpened(false);
            setLoading(true);
        }).catch((err)=>{
            console.error(err);
            setLoading(true);
        })
    }

    const getStatusBadge = (status) => {
        switch(status.toLowerCase()) {
            case 'approved':
                return <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Approved</span>;
            case 'rejected':
                return <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">Rejected</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">Pending</span>;
            default:
                return <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full">{status}</span>;
        }
    };

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 p-6">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-purple-400 border-b border-gray-700 pb-4">
					Booking Management
				</h1>
				
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<BiLoaderAlt className="animate-spin text-4xl text-purple-500" />
						<p className="ml-3 text-gray-400">Loading bookings...</p>
					</div>
				) : (
					<div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-700">
								<thead className="bg-gray-700">
									<tr>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Days</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Starting Date</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ending Date</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Amount</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order Date</th>
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{orders.length === 0 ? (
										<tr>
											<td colSpan="9" className="px-6 py-12 text-center text-gray-400">
												No bookings found
											</td>
										</tr>
									) : (
										orders.map((order) => (
											<tr
												key={order._id}
												className="hover:bg-gray-700 transition-colors"
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm">{order.orderId}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">{order.email}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">{order.days}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													{new Date(order.startingDate).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													{new Date(order.endingDate).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-400">
													${order.totalAmount.toFixed(2)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													{getStatusBadge(order.status)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													{new Date(order.orderDate).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm">
													<button 
														onClick={() => {
															setActiveOrder(order);
															setModalOpened(true);
														}}
														className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
														title="View Details"
													>
														<FaEye />
													</button>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>

			{modalOpened && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
					<div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
						<div className="relative p-6">
							<button 
								className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
								onClick={() => setModalOpened(false)}
							>
								<IoMdCloseCircleOutline className="text-2xl" />
							</button>
							
							<h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-gray-700 pb-3">
								Booking Details
							</h2>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div>
									<h3 className="text-lg font-semibold mb-3 text-gray-300">Booking Information</h3>
									<div className="space-y-2 text-sm">
										<p className="flex justify-between">
											<span className="text-gray-400">Order ID:</span>
											<span className="font-medium">{activeOrder.orderId}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Email:</span>
											<span className="font-medium">{activeOrder.email}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Days:</span>
											<span className="font-medium">{activeOrder.days}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Starting Date:</span>
											<span className="font-medium">{new Date(activeOrder.startingDate).toLocaleDateString()}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Ending Date:</span>
											<span className="font-medium">{new Date(activeOrder.endingDate).toLocaleDateString()}</span>
										</p>
									</div>
								</div>
								
								<div>
									<h3 className="text-lg font-semibold mb-3 text-gray-300">Payment Information</h3>
									<div className="space-y-2 text-sm">
										<p className="flex justify-between">
											<span className="text-gray-400">Total Amount:</span>
											<span className="font-medium text-purple-400">${activeOrder.totalAmount.toFixed(2)}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Status:</span>
											<span>{getStatusBadge(activeOrder.status)}</span>
										</p>
										<p className="flex justify-between">
											<span className="text-gray-400">Order Date:</span>
											<span className="font-medium">{new Date(activeOrder.orderDate).toLocaleDateString()}</span>
										</p>
									</div>
								</div>
							</div>
							
							{activeOrder.status.toLowerCase() === 'pending' && (
								<div className="flex justify-center gap-4 my-6">
									<button 
										onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")}
										className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
									>
										<FaCheck /> Approve
									</button>
									<button 
										onClick={() => handleOrderStatusChange(activeOrder.orderId, "Rejected")}
										className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
									>
										<FaTimes /> Reject
									</button>
								</div>
							)}
							
							<div className="mt-6">
								<h3 className="text-lg font-semibold mb-3 text-gray-300">Ordered Items</h3>
								<div className="bg-gray-900 rounded-lg overflow-hidden">
									<table className="min-w-full divide-y divide-gray-700">
										<thead className="bg-gray-700">
											<tr>
												<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
												<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
												<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Qty</th>
												<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-700">
											{activeOrder.orderedItems.map((item) => (
												<tr key={item.product.key} className="hover:bg-gray-800 transition-colors">
													<td className="px-4 py-3 whitespace-nowrap">
														<img
															src={item.product.image}
															alt={item.product.name}
															className="w-12 h-12 object-cover rounded"
														/>
													</td>
													<td className="px-4 py-3 whitespace-nowrap text-sm">{item.product.name}</td>
													<td className="px-4 py-3 whitespace-nowrap text-sm">{item.quantity}</td>
													<td className="px-4 py-3 whitespace-nowrap text-sm text-purple-400">${item.product.price}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
