import { createClient } from "@supabase/supabase-js"

const annon_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieHlya21xemh4ZnV0Z3RmZGNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTk1NzcsImV4cCI6MjA1Nzg3NTU3N30.Nv9AWMAZow4hVOFKULgASioJSBbLm8vOz8mzZHE-H-0"
const supabase_Url="https://kbxyrkmqzhxfutgtfdcn.supabase.co"

const supabase = createClient(supabase_Url, annon_key)

export  default function mediaUpload(file){

return new Promise((resolve,reject)=>{

       if (file === null){
              reject("no file selected")
       }
        
      const timestamp = new Date().getTime();
      const fileName = timestamp+ file.name;

      supabase.storage.from("images").upload(fileName,file,{
            cacheControl: "3600",
              upsert: false,
      }).then((res)=>{
              const publicUrl = supabase.storage.from("images").getPublicUrl(fileName ).data.publicUrl;  
              resolve(publicUrl) 
      }).catch((err)=>{
              reject("Error uploadnig file")
      })
      
       })

}