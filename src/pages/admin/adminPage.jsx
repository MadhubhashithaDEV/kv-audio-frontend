import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href = "/login";
    }
    axios.get("http://localhost:3000/api/users/",{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data);
      const user = res.data;
      if(user.role == "admin"){
        setUserValidated(true);        
      }else{
        window.location.href = "/";
      }
      
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false);
    })
  },[])
  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
    
      <div className="w-[300px] h-full bg-white shadow-2xl transform transition-all duration-300 hover:shadow-xl relative">
        <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-500">
          <h1 className="text-2xl font-bold text-white mb-2 animate-fade-in">
            KV Audio Admin
          </h1>
          <div className="h-1 w-20 bg-white/30 rounded animate-pulse"></div>
        </div>
        
        <nav className="space-y-3 p-4 mt-6">
          <button className="group w-full px-6 py-4 text-left rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <BsGraphDown className="text-2xl text-gray-600 group-hover:text-white transition-colors"/>
              <span className="text-gray-700 group-hover:text-white font-medium">Dashboard</span>
            </div>
          </button>

          <Link to="/admin/orders" 
            className="group w-full px-6 py-4 text-left rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 block">
            <div className="flex items-center gap-4">
              <FaRegBookmark className="text-2xl text-gray-600 group-hover:text-white transition-colors"/>
              <span className="text-gray-700 group-hover:text-white font-medium">Orders</span>
            </div>
          </Link>

          <Link to="/admin/items"
            className="group w-full px-6 py-4 text-left rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 block">
            <div className="flex items-center gap-4">
              <MdOutlineSpeaker className="text-2xl text-gray-600 group-hover:text-white transition-colors"/>
              <span className="text-gray-700 group-hover:text-white font-medium">Items</span>
            </div>
          </Link>

          <Link to="/admin/users" className="group w-full px-6 py-4 text-left rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg transform hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <FaRegUser className="text-2xl text-gray-600 group-hover:text-white transition-colors"/>
              <span className="text-gray-700 group-hover:text-white font-medium">Users</span>
            </div>
          </Link>
        </nav>

      
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden backdrop-blur-sm bg-white/80">
        <div className="h-20 bg-white/90 shadow-sm flex items-center justify-between px-8 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Welcome Back, Admin
          </h2>
        </div>
        
        <div className="p-8 overflow-auto h-[calc(100vh-80px)]">
          <div className="animate-fade-in-up">
          {userValidated &&<Routes path="/*">
              <Route path="/orders" element={<AdminOrdersPage/>}/>
              <Route path="/users" element={<AdminUsersPage/>}/>
              <Route path="/items" element={<AdminItemsPage/>}/>    
              <Route path="/items/add" element={<AddItemPage/>}/>
              <Route path="/items/edit" element={<UpdateItemPage/>}/>
            </Routes>}
          </div>
        </div>
      </div>
    </div>
  );
}