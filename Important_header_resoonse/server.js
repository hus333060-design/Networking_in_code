// 1. Content-lenght :- It is reponse header that tells browser how much bytes will send,
// like we will Content-Length: 2 it will send 2 to client if you give less and more than file it will show nothing or or can be disconnect to server

// 2. Content-Type:- It is use to tell which file is being send what encoding client will be use. 

// 3.Content-Disposition : attachement:   it is for downloand not opening file and also tell broswer what will be name of downloading file 
import { createReadStream} from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
    // 1. File open
    const file = await open("C:\\Users\\Anil\\Desktop\\tet.txt");
    // 2. File ka ReadStream
    const readStream = file.createReadStream();
    // 3. File ka actual size
    const { size } = await file.stat();
    // 4. HTTP status line
    socket.write("HTTP/1.1 200 OK\r\n");
    // 5. Browser ko body ka exact size batana
    socket.write(`Content-Length: ${size}\r\n`);
    // 6. Browser ko batana ki body plain text hai
    socket.write("Content-Type: text/plain; charset=utf-8\r\n");
     // to downlaond and naming of file
     socket.write("Content-Disposition:attachment; filename=notes.txt")

    // 8. Headers khatam
    socket.write("\r\n");
    // 9. Ab actual file data send
    readStream.pipe(socket);
});
server.listen(5000,()=>{
    console.log("server connected on 5000 port");
    
})