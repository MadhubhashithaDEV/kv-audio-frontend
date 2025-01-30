import { useState } from "react";

export default function Testing(){

  const [count,setCount] = useState(0)

  return(
    <div className=" w-full h screnn ">
      <h1>{count} </h1>
      <button onClick={()=>{

        
        const newCount = count +1;
        setCount(newCount)
        console.log(count)
      }}>
       count

      </button>
    </div>
  )
}