import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {

  const location= useLocation()
  console.log(location)
  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimentions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const navigate = useNavigate()



  async function handleAddItem(){
    console.log(productKey,productName,productPrice,productCategory,productDimensions,productDescription)

    const token = localStorage.getItem("token");

      if(token){
        try{
        const result = await axios.put("http://localhost:3000/api/products/"+ productKey,
        {
          key : productKey,
          name : productName,
          price : productPrice,
          category : productCategory,
          dimentions : productDimensions,
          description : productDescription
        },
        {
          headers : {
            Authorization : "Bearer " + token
        
          },
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items/add")

        console.log(result)
      }catch(err){
        toast.error(err.response.data.err)
        
      }
      }else{
        toast.error("You are not authorized")
      }
    
  }
  return(
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Update Item</h1>
      <div className="w-[400px] border-2 p-4 flex flex-col items-center gap-4 rounded-md shadow-md">

        <input
        disabled
          onChange={(e) => setProductKey(e.target.value)}
          value={productKey}
          type="text"
          placeholder="Product Key"
          className="border p-2 rounded w-full"
        />
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded w-full"
        />
        <input
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          type="number"
          placeholder="Product Price"
          className="border p-2 rounded w-full"
        />
        <select
          onChange={(e) => setProductCategory(e.target.value)}
          value={productCategory}
          className="border p-2 rounded w-full"
        >
          <option value="audio">Audio</option>
          <option value="light">Light</option>
        </select>
        <input
          onChange={(e) => setProductDimensions(e.target.value)}
          value={productDimensions}
          type="text"
          placeholder="Product Dimensions"
          className="border p-2 rounded w-full"
        />
        <textarea
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          type="text"
          placeholder="Product Description"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddItem}
          className= "w-full p=2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
         Update
        </button>
        <button  onClick={()=>{navigate("/admin/items")}}  className="w-full p=2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
