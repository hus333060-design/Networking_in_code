import net from "node:net";
import {open} from "node:fs/promises"
import { stream } from "undici-types";

const server=net.createServer(async (socket)=>{
const file = await open("C:\\Users\\Anil\\Desktop\\test.pdf");
const readStream=file.createReadStream();
  const { size } = await file.stat();

 socket.write("HTTP/1.1 200 OK\r\n");
 socket.write(`Content-Length:${size}\r\n`);
 socket.write("Content-Type: application/pdf\r\n");
socket.write("Content-Disposition: attachment; filename=\"notes.pdf\"\r\n");
  socket.write("\r\n");
//  readStream.pipe(socket); // it sends the data into socket with max speed to controlling flow of data we don't use it.
// 1. pause and resume
// readStream.on("data",(chunk)=>{
//     socket.write(chunk);
//     readStream.pause();
//     setTimeout(()=>{
//      readStream.resume();
//     },200)
 
// })
 // 2. When client do pause and resume
 readStream.pipe(socket);

 readStream.on("pause",()=>{
    console.log("downloading pause by browser");
 })

  readStream.on("resume",()=>{
    console.log("downloading reusme by browser");
    
 })


readStream.on("end", async () => {
    await file.close();
});
});
server.listen(5000,()=>{
    console.log("Server Connected on 5000");
    
})