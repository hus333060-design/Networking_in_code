
import dgram from "node:dgram";
import { createReadStream, createWriteStream } from "node:fs";
const socket=dgram.createSocket("udp4");
const writeStram=createWriteStream('num.txt')

socket.on("message", (msg,remoteAdd)=>{
  writeStram.write(msg)
})

socket.bind(3000);

