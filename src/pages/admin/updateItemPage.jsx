import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [productKey, setProductKey] = useState(location.state.key);
	const [productName, setProductName] = useState(location.state.name);
	const [productPrice, setProductPrice] = useState(location.state.price);
	const [productCategory, setProductCategory] = useState(
		location.state.category
	);
	const [productDimensions, setProductDimensions] = useState(
		location.state.dimensions
	);
	const [productDescription, setProductDescription] = useState(
		location.state.description
	);
	const [productImages, setProductImages] = useState([]);

	async function handleUpdateItem() {
		let updatingImages = location.state.image;

		if (productImages.length > 0) {
			const promises = [];

			for (let i = 0; i < productImages.length; i++) {
				console.log(productImages[i]);
				const promise = mediaUpload(productImages[i]);
				promises.push(promise);
			}

			updatingImages = await Promise.all(promises);
		}

		const token = localStorage.getItem("token");

		if (token) {
			try {
				const result = await axios.put(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
					{
						name: productName,
						price: productPrice,
						category: productCategory,
						dimensions: productDimensions,
						description: productDescription,
						image: updatingImages
					},
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				toast.success(result.data.message);
				navigate("/admin/items");
			} catch (err) {
				toast.error(err.response.data.error);
			}
		} else {
			toast.error("You are not authorized to add items");
		}
	}

	return (
		<div className="w-full min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
			<h1 className="text-2xl font-bold mb-6 text-blue-400">Update Item</h1>
			<div className="w-full max-w-md bg-gray-800 border border-gray-700 p-6 flex flex-col items-center gap-4 rounded-lg shadow-lg">
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Key</label>
					<input
						disabled
						type="text"
						placeholder="Product Key"
						value={productKey}
						onChange={(e) => setProductKey(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
					<input
						type="text"
						placeholder="Product Name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Price</label>
					<input
						type="number"
						placeholder="Product Price"
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
					<select
						value={productCategory}
						onChange={(e) => setProductCategory(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="audio">Audio</option>
						<option value="lights">Lights</option>
					</select>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Dimensions</label>
					<input
						type="text"
						placeholder="Product Dimensions"
						value={productDimensions}
						onChange={(e) => setProductDimensions(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Description</label>
					<textarea
						placeholder="Product Description"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
					/>
				</div>
				
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-400 mb-1">Product Images</label>
					<div className="relative border-2 border-dashed border-gray-600 rounded-md p-4 hover:border-blue-400 transition-colors">
						<input
							type="file"
							multiple
							onChange={(e) => {
								setProductImages(e.target.files);
							}}
							className="w-full opacity-0 absolute inset-0 cursor-pointer"
						/>
						<div className="text-center">
							<svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
								<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<p className="mt-1 text-sm text-gray-400">
								Click to upload or drag and drop
							</p>
							<p className="text-xs text-gray-500">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>
					{productImages.length > 0 && (
						<p className="mt-2 text-sm text-green-400">{productImages.length} file(s) selected</p>
					)}
				</div>
				
				<div className="w-full flex flex-col gap-3 mt-4">
					<button
						onClick={handleUpdateItem}
						className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
					>
						Update Item
					</button>
					<button
						onClick={() => navigate("/admin/items")}
						className="w-full p-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
