const sampleArr = [
  {
    key : "001",
    name : "Product 1",
    price : 100,
    category : "audio",
    dimentions : "10x10x10",
    description : "This is a product",
    availability: true,
    image:["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"]
  },
  {
    key : "002",
    name : "Product 2",
    price : 200,
    category : "audio",
    dimentions : "10x10x10",
    description : "This is a product",
    availability: true,
    image:["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"]
  },
  {
    key : "003",
    name : "Product 3",
    price : 300,
    category : "audio",
    dimentions : "10x10x10",
    description : "This is a product",
    availability: true,
    image:["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"]
  },
  {
    key : "004",
    name : "Product 4",
    price : 400,
    category : "audio",
    dimentions : "10x10x10",
    description : "This is a product",
    availability: true,
    image:["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"]
    
  },
  {
    key : "004",
    name : "Product 4",
    price : 400,
    category : "audio",
    dimentions : "10x10x10",
    description : "This is a product",
    availability: true,
    image:["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"]
    
  }
  ]


import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function AdminItemsPage(){
const[items,setItems] = useState(sampleArr) 
  return(
    <div className='w-full h-full relative'>
      <table>

        <thead>
          <th>Key</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Dimentions</th>
          <th>Availability</th>
        </thead>
        <tbody>
          {
            items.map((item) =>{
              console.log(item)
              return(
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.dimentions}</td>
                <td>{item.availability ? "Available" : "Not Available"}</td>
              </tr>
              )
          })
        }
        </tbody>
      </table>
      <Link to="/admin/items/add">
     <FaPlusCircle className="text-[50px] absolute right-10 bottom-10 hover:text-yellow-300"/>
     </Link>
    </div>
  )
}