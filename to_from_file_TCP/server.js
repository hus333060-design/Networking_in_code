import { createReadStream, createWriteStream } from 'node:fs';
import net from 'node:net';
const ClientList=[]


// uploaded file client to server
// const server=net.createServer((socket)=>{
//     ClientList.push(socket);
//     console.log("client:- ",ClientList.length);
//     const writeStram=createWriteStream("num.txt");
//     socket.on("data",(chunk)=>{
//     writeStram.write(chunk)
//     })
//     socket.pipe(writeStram)
// });    

// uploaded file server to client
const server=net.createServer((socket)=>{
   ClientList.push(socket);
   process.stdin.on("data",(input)=>{
     const inp=input.toString().trim();
     const readStream=createReadStream("C:/Users/Anil/Desktop/tet.txt");
     if(inp=="send"){
      readStream.pipe(socket);
      readStream.on("end",()=>{
        console.log("File Sent");
        
      })
     }

   })

})
server.listen(4000,()=>{
    console.log("Server started on port 4000");
})



// Swding data for all clients by terminal
process.stdin.on("data",(inp)=>{
   ClientList.forEach((socket)=>{
     socket.write(inp.toString());
    })
    
})



