import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCart from "../../components/productCard"

export default function Items(){
 
  const [state,setState]= useState("Loading")//loading,success,error
  const [items,setItems]= useState([])

  useEffect(()=>{
    if(state === "Loading"){
      axios.get("http://localhost:3000/api/products").then((res)=>{
        console.log(res.data)
        setItems(res.data)
        setState("success")
      }).catch((err)=>{
        toast.error(err?.response?.data?.err|| "Something went wrong, An error occured")
        setState("error")
      })
    }
   
  },[])
  return(
    <div className="w-full h-full bg-red-400 flex flex-wrap justify-center pt-[50px] ">
      {
        state === "Loading" && 
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin ">
          </div>
        </div>
      }

    {
        state === "success" &&
        items.map((item)=>{
          return(
           <ProductCart key={item.key} item={item}/>
          )
        })
    }
     
    </div>
  )
}