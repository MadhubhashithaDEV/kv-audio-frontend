import { useState } from "react";
import "./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

/
function handleOnSubmit(e){
      e.preventDefault()
      console.log(email,password)

      axios.post("http://localhost:3000/api/users/login",
            {
                  email : email,
                  password : password
            }
      ).then((res)=>{

            toast.success("login success")
            console.log(res)


            const user = res.data.user
            if(user.role === "admin"){
                  navigate("/admin/")
            }else{
                  navigate("/")     
            }

      }).catch((err)=>{
            
            console.log(err)
            toast.error(err.response.data.error)
      })
}

  return(
    <div className="bg-picture w-full h-screen flex justify-center items-center">

      <form onSubmit={handleOnSubmit}>
      <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
            <img src="/logo.png" alt="" className="w-[100px] h-[100px] top-1 object-cover"/>

            <input type="text" placeholder="email" className="w-[300px] h-[50px] rounded-md bg-white/30 text-white text-xl p-2  mt-[20px]"
            
            value={email}
            onChange={(e)=>{
                  setEmail(e.target.value)

            }}/>

            

            <input type="password" placeholder="passwword" className="w-[300px] h-[50px] rounded-md bg-white/30 text-white text-xl p-2  mt-[20px]"
             
             value={password}
             onChange={(e)=>{
                  setPassword(e.target.value)
            }}/>


            <button className="w-[300px] h-[50px] rounded-md bg-yellow-500 text-white text-2xl p-2 m-[20px]">Login</button>

      </div>

      </form>
    </div>
  )

}