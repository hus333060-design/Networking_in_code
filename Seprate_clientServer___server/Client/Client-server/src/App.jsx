import { useEffect } from 'react'

import { useState } from 'react';

function App() {
  const [itmes,setitems]=useState([]);
 async function getDirectoryItmes(){
  const res=await fetch('http://192.168.1.14:8000/');
  const data=await res.json();
  setitems(data);
  }
   useEffect(()=>{
    getDirectoryItmes();
   },[])
  return (
   <>
   <h1>My Files</h1>
     {
      itmes.map((ele)=>{
        console.log(ele);
       return (
      <li key={ele}>
        {ele} &nbsp; &nbsp;
        <a href={`http://192.168.1.14:8000/${ele}?action=open`}>Open</a>  &nbsp; &nbsp;
        <a href={`http://192.168.1.14:8000/${ele}?action=download`}>Downlaoad</a>
      </li>
    );
      })
     }
   </>
  )
}

export default App
