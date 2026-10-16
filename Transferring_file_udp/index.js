// Transferring file using udp protocol
import { readFile } from 'node:fs/promises';
import dgram from 'node:dgram';
import { createReadStream } from 'node:fs';
const socket=dgram.createSocket("udp4");

// const data = await readFile("C:/Users/Anil/Desktop/tet.txt", "utf8");  // //you can when buffer gets big you can'y write it, solution:-Streams over there we take a data into chcuks

const ReadStream = createReadStream("C:/Users/Anil/Desktop/tet.txt",{highWaterMark:1000});  

ReadStream.on("data",(chunks)=>{
socket.send(chunks, 3000, "192.168.1.17");
})




