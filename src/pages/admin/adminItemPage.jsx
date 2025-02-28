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
    <div className=" w-ful h-full p-4 flex flex-col  items-center  bg-gray-100">
      {!itemsLoaded&&<div className="border-4 my-4 border-b-green-700 border-b flex justify-center items-center rounded-full  animate-spin w-[100px] h-[100px]"></div>}
      {itemsLoaded&&<div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="p-3">Key</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Dimensions</th>
              <th className="p-3">Availability</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-3">{item.key}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.dimensions}</td>
                <td className="p-3 text-green-600 font-semibold">
                  {item.availability ? "Available" : "Not Available"}
                </td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={()=>{
                      navigate(`/admin/items/edit`,{state:item})
                    }}className="bg-blue-600 text-white hover:text-white px-3 py-1 rounded transition">
                  
                    <FaEdit className="inline mr-1"/>Edit
                    </button>
                  <button
                    onClick={() => handleDelete(item.key)}
                    className="bg-red-600 hover:text-white text-white px-3 py-1 rounded transition"
                  >
                    <FaTrashAlt className="inline mr-1" />Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      <Link to="/admin/items/add">
        <FaPlusCircle className="text-[50px] fixed right-10 bottom-10 text-gray-700 hover:text-yellow-300 cursor-pointer" />
      </Link>
    </div>
  );
}
