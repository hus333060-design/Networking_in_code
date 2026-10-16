import net from 'node:net';
import { createReadStream, createWriteStream } from 'node:fs';

const socket = net.createConnection({
    host: "10.10.18.78",
    port: 4000
});

socket.on("connect", () => {
    console.log("Connected to server");
});

// uopload file client to server

// process.stdin.on("data", (input) => {
//     const inputStr = input.toString().trim();
//     if (inputStr === "send") {
//         const readStream = createReadStream("C:/Users/Anil/Desktop/tet.txt");
//         readStream.pipe(socket);
//         readStream.on("end", () => {
//             console.log("File sent");
//         });
//     }
// });
// socket.on("data", (chunk) => {
//     console.log(chunk.toString());
// });

// download file
const writeStream=createWriteStream("num.txt");

socket.pipe(writeStream);

