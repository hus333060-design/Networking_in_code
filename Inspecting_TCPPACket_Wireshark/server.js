//=> Inspecting TCP Data Packets in Wireshark
// WWhen we write data into a TCP socket using socket.write(), the data is sent through the TCP connection. We can inspect these TCP packets using Wireshark.

// 1. TCP Connection
// First, TCP performs a 3-way handshake to establish the connection.After the TCP connection is established, the browser sends the HTTP request to the server.
// 2. HTTP Response
// Suppose our Node.js server does:
// HTTP/1.1 200 OK\r\n
//  Content-Length: 5\r\n 
// Content-Type: text/plain\r\n
//  \r\n
//  Hello
// IMPORTANT   There are two main parts:
// HTTP Response
//       |
//       +---- Headers
//       |
//       +---- \r\n\r\n
//       |       |
//       |       +--> Headers END
//       |
//       +---- Body
//              |
//              +--> Hello

// "\r\n\r\n" tells the HTTP parser that the headers are finished and the body starts after this point.

// 3.TCP Packets vs HTTP Headers
// Wireshark shows TCP packets, not individual JavaScript socket.write() calls.
// For example, Wireshark may show:
// TCP  44   [ACK]
// TCP  61   [PSH, ACK]
// ACK and PSH, ACK are TCP-level information.
//       time          src             des             Pro  Len     Info 
// 156	13.811743100	192.168.1.17	192.168.1.17	TCP	 44 	4100 → 59259 [ACK] Seq=1 Ack=335 Win=2160896 Len=0

// 157	13.845193300	192.168.1.17	192.168.1.17	TCP	 61  	4100 → 59259 [PSH, ACK] Seq=1 Ack=335 Win=2160896 Len=17 [TCP PDU reassembled in 1322]

// 4. How fetch() works
// When we write: const res = await fetch(url);
// fetch() sends an HTTP request to the server. await fetch(url) waits until the HTTP response headers are received and a Response object can be returned.
// Now res contains information about the HTTP response, such as:
// res 
// |
//  -- status 
//  -- headers 
//  -- body

// 5.Why await res.json()?
// Suppose the server sends:
// HTTP Response
// Headers:
// Content-Type: application/json
// Body:
// {"name":"Anshu","age":22}

// now res object --- ke ander hai body par json() body ke data ko parse kardega await yaha par isliey res.json() ko body read + parse karne mein time lag sakta hai, to await wait karata hai jab tak kaam nhi hota next line par mat jaao.

import net from "node:net";
import { open } from "node:fs/promises";

const server=net.createServer(async(socket)=>{
    const fileHanle= await open("num.txt");
    const readStream=fileHanle.createReadStream();
    const {size}= await fileHanle.stat();
    
     socket.write("HTTP/1.1 200 OK\r\n");
     socket.write("Access-Control-Allow-origin: *\r\n");
     socket.write(`Content-Length:${size}\r\n`);
     socket.write("Content-Type: text/plain; charset=utf-8\r\n");
     socket.write("Content-Disposition: attachment; filename=notes.txt\r\n");
       socket.write("\r\n");
     readStream.pipe(socket);
   
});

server.listen(4100,()=>{
    console.log("Server connected on port");
    
})