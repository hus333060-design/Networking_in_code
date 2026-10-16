const input=document.querySelector("input");

input.addEventListener("change",async (eve)=>{
//  console.log(eve.target.files);
const file = eve.target.files[0];

// const res= await fetch("http://192.168.1.14:8000/",{
//     method: "POST",
//     body:file,
//     headers:{
//         filename: file.name
//     }
// });

    // if you want to show progess you can't show using fetch have to use xhr
    const xhr= new XMLHttpRequest();
    xhr.open("POST","http://192.168.1.14:8000/",true);
    xhr.setRequestHeader("filename",file.name);
    xhr.upload.addEventListener("progress",(e)=>{
        // console.log(e);
        const totalPercentage=(`${(e.target/ e.target).toFixed(2) *100}%`);
        
        
    })
    xhr.send(file);
// const data=await res.text();
// console.log(data);
 
})