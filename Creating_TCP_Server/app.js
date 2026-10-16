// // Creating A TCP Server

// import net from 'node:net';

// const server=net.createServer();    // by this we can create server of tcp
// // server.listen(4000);  // it will start server

// // server.on("listening",()=>{
// //     console.log("Server started on port 4000");
    
// // })

// // we don't need to write server.on() we can write this way as well
// server.listen(4000,()=>{
//     console.log("Server started on port 4000");
// })

// /// Note :- when you send data from client it won't show in terimal go out wireshake , over you can see connection is creting by 3 way handshakaing and whatever you are sending data from client also see over three.

// // But you want to see sever we need to socker jo endtoend commuication banege but here socker is not soket is not noraml it works like duplex stream like on it we can write and read.

// // whenever connection happen:-
// server.on("connection",(socket)=>{
//     socket.on("data",(chunk)=>{
//         console.log(chunk.toString() );
//         socket.write("HTTP\n\nGot you message"); // to send req to client
//         socket.end(); 
//     })
//      console.log(socket.remoteAddress); // client IP
// console.log(socket.remotePort);    // client port
     
//     console.log("connection establised");
    
// })

// // Broser can also a potentail bcz it also use tcp protocol.


