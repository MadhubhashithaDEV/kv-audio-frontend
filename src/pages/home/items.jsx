import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCart from "../../components/productCard"

export default function Items(){
 
  const [state,setState]= useState("Loading")//loading,success,error
  const [items,setItems]= useState([])

  useEffect(() => {
    if (state === "Loading") {
      axios
        .get("http://localhost:3000/api/products")
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.err || "Something went wrong, An error occurred"
          );
          setState("error");
        });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h2>
        
        {state === "Loading" && (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-blue-500 animate-spin rounded-full absolute top-0 left-0"></div>
            </div>
            <p className="ml-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {state === "error" && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Failed to load products. Please try again later.
                </p>
              </div>
            </div>
          </div>
        )}

        {state === "success" && items.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new arrivals.</p>
          </div>
        )}

        {state === "success" && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.key} className="transform transition duration-300 hover:scale-105">
                <ProductCart item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

