// // Creating A TCP Server

import net from 'node:net';
const ClientList=[]

const server=net.createServer((socket)=>{
    ClientList.push(socket);
    console.log("client:- ",ClientList.length);
    socket.id=ClientList.length;
    socket.on("data",(chunk)=>{
        socket.user=chunk.toString();
     ClientList.forEach((client)=>{
        if(client.id !== socket.id){
     client.write(obj);
        }
    })
    })
});    

server.listen(4000,()=>{
    console.log("Server started on port 4000");
})



// Swding data for all clients by terminal
process.stdin.on("data",(inp)=>{
    // console.log(inp); 
   ClientList.forEach((socket)=>{
     socket.write(inp.toString());
    })
    
})



