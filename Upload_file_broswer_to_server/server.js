// Upload File: Browser → Server
// Browser se file upload karne ke liye HTML form use kar sakte hain:-
// <form action="http://192.168.1.17:5000/" method="post" enctype="multipart/form-data" > <input type="file" name="file"> <button type="submit">Upload</button> </form>

// => enctype="multipart/form-data"
// multipart/form-data browser ko batata hai ki form data ko multipart format mein send karna hai.
//  Note :- choose the file and upload it it will auto send to server of socket.

// => Boundry :- Browser multipart parts ko separate karne ke liye boundary use karta hai.
// Example:
// ------WebKitFormBoundaryABC123
// Closing boundary:
// ------WebKitFormBoundaryABC123--
// -> ABC123 dynamic hota hai, isliye har request mein boundary different ho sakti hai.

// => Network chunks
// Server ko complete request ek hi chunk mein milna zaroori nahi hai.
// Data aise aa sakta hai:
// Chunk 1
// Chunk 2
//    -
//    -



// notice whenever data come in the last it will be write :- ------WebKitFormBoundarycRBrmiD3jsesAYsC--   (After boundyc  the character is dynamic it will be change when you send any other file)

// data is coming in the form of chunks this thing (------WebKitFormBoundarycRBrmiD3jsesAYsC-- ) come into the last chunk.


import { createWriteStream } from "node:fs";
import net from "node:net";

const server=net.createServer((socket)=>{
const writeStream=createWriteStream("nums.txt");
socket.write("HTTP/1.1 200 OK\r\n");
socket.write("\r\n");
socket.on("data",(chunk)=>{
    writeStream.write(chunk.toString());
    if (/WebKitFormBoundaryc.+--/.test(chunk.toString())) {  // it is not gurnetted it is a correc condition always because it data can be come into chunks so imagine chunks contains only to ------WebKitFormBoundarycRB it is not valid in this condition
    socket.end("Got the data");
}
    
})

})

server.listen(5000,()=>{
    console.log("Server is connected on 5000 Port");
    
})