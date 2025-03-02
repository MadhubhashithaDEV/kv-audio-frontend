import { FaPlusCircle, FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate= useNavigate();

  useEffect(() => {
    
    if(!itemsLoaded){

      
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },

      }).then((res) => {
        console.log(res.data)
        setItems(res.data);
        setItemsLoaded(true);
      })
      .catch((err) =>{
        console.log(err);
      });
      
    }

  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if(window.confirm("Are you sure you want to delete this item?")){
    setItems(items.filter((item) => item.key !== key));
    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:3000/api/products/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      setItemsLoaded(false);
    })
    .catch((err) => {
      console.log(err);
    });
    }
  };
  return (
    <div className="w-full h-full p-8 flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100">
      {!itemsLoaded && <div className="border-4 my-4 border-b-green-700 border-b flex justify-center items-center rounded-full animate-spin w-[100px] h-[100px]"></div>}
      {itemsLoaded && (
        <div className="overflow-x-auto w-full max-w-7xl rounded-xl shadow-2xl">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Key</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Price</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Dimensions</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-100 uppercase tracking-wider">Availability</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.key} className="transition-all hover:bg-gray-50 hover:shadow-md">
                  <td className="p-4 text-sm text-gray-700 font-medium">{item.key}</td>
                  <td className="p-4 text-sm text-gray-700">{item.name}</td>
                  <td className="p-4 text-sm text-gray-700 font-semibold">${item.price}</td>
                  <td className="p-4 text-sm text-gray-700">{item.category}</td>
                  <td className="p-4 text-sm text-gray-700">{item.dimensions}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.availability 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/items/edit`, {state: item})}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.key)}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md"
                      >
                        <FaTrashAlt className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to="/admin/items/add">
        <FaPlusCircle className="text-[60px] fixed right-12 bottom-12 text-gray-800 hover:text-yellow-500 transition-colors duration-300 transform hover:scale-110 cursor-pointer shadow-lg rounded-full" />
      </Link>
    </div>
  );
  
}
