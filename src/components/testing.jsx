import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function Testing(){

  const[file,setFile]= useState(null)

  async function uploadFile(){
    console.log(file)
    mediaUpload(file).then((url)=>{
      console.log(url)
    })
  } 

  return(

    <div className="w-full h-screen bg-primary flex justify-center items-center">


      <input type="file"  onChange={(e)=>{setFile(e.target.files[0])}}/>

      <button onClick={uploadFile} className="bg-accent text-white p-2 rounded-md">upload</button>

    </div>

  )
}