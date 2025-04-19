import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductImages(files);
    
    // Create preview URLs
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setPreviewImages(previews);
  };

  async function handleAddItem() {
    if (!productKey || !productName || !productPrice || !productDescription) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized");
        setIsLoading(false);
        return;
      }

      // Upload images
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);
      }

      const imageUrls = await Promise.all(promises);

      const result = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimentions: productDimensions,
          description: productDescription,
          images: imageUrls,
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
      toast.error(err.response?.data?.err || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        <div className="bg-indigo-700 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Key <span className="text-red-400">*</span>
                </label>
                <input
                  onChange={(e) => setProductKey(e.target.value)}
                  value={productKey}
                  type="text"
                  placeholder="Enter product key"
                  className="border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  type="text"
                  placeholder="Enter product name"
                  className="border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price (LKR) <span className="text-red-400">*</span>
                </label>
                <input
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={productPrice}
                  type="number"
                  placeholder="Enter price"
                  className="border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  onChange={(e) => setProductCategory(e.target.value)}
                  value={productCategory}
                  className="border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-700 text-white"
                >
                  <option value="audio">Audio</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Dimensions
                </label>
                <input
                  onChange={(e) => setProductDimensions(e.target.value)}
                  value={productDimensions}
                  type="text"
                  placeholder="e.g., 10cm x 5cm x 2cm"
                  className="border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  onChange={(e) => setProductDescription(e.target.value)}
                  value={productDescription}
                  placeholder="Enter product description"
                  className="border border-gray-600 p-2 rounded-md w-full h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none bg-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center hover:bg-gray-750 transition cursor-pointer bg-gray-750">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleImageChange}
                    className="hidden" 
                    id="product-images" 
                  />
                  <label htmlFor="product-images" className="cursor-pointer">
                    <div className="space-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-300">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {previewImages.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-2">Image Previews:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative h-24 rounded-md overflow-hidden border border-gray-600 bg-gray-700">
                    <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => navigate("/admin/items")}
              className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              disabled={isLoading}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
