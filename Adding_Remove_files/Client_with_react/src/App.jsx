import { useEffect } from 'react'

import { useState } from 'react';

function App() {

  const [itmes,setitems]=useState([]);
  const [progress, setProgress]=useState(0);
 async function getDirectoryItmes(){
  const res=await fetch('http://192.168.1.14:8000/');
  const data=await res.json();
  setitems(data);
  }
   useEffect(()=>{
    getDirectoryItmes();
   },[])
   async function handleChanger(e){
    const file=e.target.files[0];
   const xhr= new XMLHttpRequest();
    xhr.open("POST","http://192.168.1.14:8000/",true);
    xhr.setRequestHeader("filename",file.name);
    xhr.upload.addEventListener("progress", (e) => {
     const totalPercentage = `${((e.loaded / e.total) * 100).toFixed(2)}%`;
    console.log(totalPercentage);
      setProgress(totalPercentage);
          getDirectoryItmes();

});
    xhr.send(file);
   }
 
   async function handleDelete(filename){
    try{
     const data=await fetch('http://192.168.1.14:8000/delete',{
      method:"DELETE",
      body : filename,
     });
     const res=await data.text();
     console.log(res);
    }catch(err){
      console.log(err);
    }
    getDirectoryItmes();
   }
   
  return (
   <>
   <h1>My Files</h1>
   <p>Progress: {progress}</p>
   <input type="file" onChange={handleChanger} />
     {
      itmes.map((ele)=>{
       return (
      <li key={ele}>
        {ele} &nbsp; &nbsp;
        <a href={`http://192.168.1.14:8000/${ele}?action=open`}>Open</a>  &nbsp; &nbsp;
        <a href={`http://192.168.1.14:8000/${ele}?action=download`}>Downlaoad</a>
        <button onClick={()=> 
          handleDelete(ele)
        }>Delete</button>
      </li>
    );
      })
     }
   </>
  )
}

export default App
