import { createReadStream, createWriteStream, statSync } from 'node:fs';
import net from 'node:net';
const ClientList=[];

// const server=net.createServer((socket)=>{
// socket.end("http\n\nhello bother"); 
// how it worked:- it is for chrome browser bcz inside the broswer code would be write if the req will be sent it will be start with http with \n \n , but in the firerfox it is not so over there it can send req by IP:Port_number

// Broswer uses of http 1.1 if we use invalid version it will redirect on the 1 ,so:-
//  socket.end("HTTP/1.1 \r\nhello bother");
//  // Note whenever broswer sends the tcp req with data using http . we can see:- by wireshake , alos like thata:-
//  socket.on("data",(chunk)=>{
//   console.log(chunk.toString());
  // data :- 
//   GET / HTTP/1.1
// Host: 10.10.18.78:4000
// Connection: keep-alive
// Cache-Control: max-age=0
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
// Accept-Encoding: gzip, deflate
// Accept-Language: en-US,en;q=0.9

//  })

// send the file and make for download socket aaya hai jab ham client/server connection bante hai to ek socket object banta hai yeh server bolta hai, jab bhi koi client connect kare, us client ke saath communication karne wala socket mujhe de dena aur socket dono direct me communication kar sakta hai like communication pipe
// const server=net.createServer((socket)=>{  
//     socket.write("HTTP/1.1 200 OK\r\n\r\n");  // yaha par socket client ko data send karta hai phir browser ek http req deta hai
// const readStream=createReadStream("C:/Users/Anil/Desktop/tet.txt"); // It reads file into chunks    
// readStream.pipe(socket); // now jo data read kiya usko socket object ke socket wale client ko de do.
// });

// for download file in client (brorser side) we have to give header as well as fileSize.

const server = net.createServer((socket) => {

   const filePath = "C:/Users/Anil/Desktop/tet.txt";
    const fileSize = statSync(filePath).size; // for sizeSize use build-in function startSync() form node:fs

    socket.write(
        "HTTP/1.1 200 OK\r\n" +
        `Content-Length: ${fileSize}\r\n` +
        "Content-Disposition: attachment; filename=\"tet.txt\"\r\n" +
        "Connection: close\r\n" +
        "\r\n"
    );

    const readStream = createReadStream(filePath);

    readStream.pipe(socket);
});
server.listen(4000,()=>{
    console.log("Server started on port 4000");
})