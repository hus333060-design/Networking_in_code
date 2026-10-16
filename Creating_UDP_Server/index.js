// => Networking Capabilities of Node JS
//    It has many built-in modules for creating networking appplications like dgram for UDP, net for TCP, http for HTTP, https for HTTPS, dns.

// => Creating UDP server 
// UDP :- Protocol
// UDP Server = Program that uses UDP

import dgram from 'node:dgram'; // datagram module and udp is a also datagram protocol.

const socket=dgram.createSocket("udp4");  // it will create upd server and it return a socket object
// console.log(socket); // it is an event emiiter. It is a node.js mechansim From which an object triggers a event that we can lister this event like by on() :- linten it 
// and upd4 means it will work using ipv4 .




// To start server
// socket.bind();
 // to start on specif port we have to do:-
// socket.bind(3000,()=>{
//   console.log(socket.address());
  
// });

socket.on("message",(a,b)=>{
  // console.log(a);  // it won't have data until any client is attached on this socket. when client has been attached so a will have data of which come from client-side. it is basically buffer like this of hii,there = <Buffer 68 69 69 2c 74 68 65 72 65 2e>
  console.log(a.toString());
  
  console.log(b); // It is info of clenit device :- { address: '10.207.24.84', family: 'IPv4', port: 44269, size: 10 }
  
});

// so server has been created but it won't be understandle by browser bcz it works only using tcp.
// solution we have to use that software who can understand udp.

// TO send res on the client server 
socket.send("hello brother",4000,192.0.0.4); // 4000 is a client port server.now server is act as client and client is acting as a server.
// // To listening on server
// socket.on("listening",()=>{
//   console.log(socket.address());  // it return these things:- { address: '0.0.0.0', family: 'IPv4', port: 56437 }
  
  
// })




// => we can make run both client and server at same device.
// sending messsage from socket.send(); and don't use bind() here bcz it will make it server.
// use bind() on the another node.js file who is server over there we will use socket.on() to view mmesaage and address of the from there we are getting data(client).
