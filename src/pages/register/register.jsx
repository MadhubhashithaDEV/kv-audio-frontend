import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();


  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({ email, password, firstName, lastName, address, phone });
    axios.post("http://localhost:3000/api/users", {
      email : email,
      password : password,
      firstName : firstName,
      lastName : lastName,
      address  : address,
      phone : phone,
    }).then(() => {
      toast.success("Registration Success");
      navigate("/login")
    }).catch((err) => {
      toast.error(err?.response?.data?.err|| "Somthing Went Wrong, An Error Occured")
    })
  };

  return (
    <div className="bg-picture  min-h-screen flex items-center justify-center text-white">
      <form onSubmit={handleOnSubmit} className="backdrop-blur-xl p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="" className="w-24 h-24 object-cover mb-4" />
          <h2 className="text-2xl font-semibold">Register</h2>
        </div>
        
        <input type="text" 
        placeholder="First Name" 
        className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} />

        <input type="text" 
        placeholder="Last Name" 
        className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)} />

        <input type="text" 
        placeholder="Email"
         className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} />
         
        <input type="password" placeholder="Password" className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Address" className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Phone" className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
        
        <button className="w-full p-3 rounded-lg bg-yellow-500 text-white text-xl font-semibold hover:bg-yellow-600 transition">Register</button>
      </form>
    </div>
  );
}
