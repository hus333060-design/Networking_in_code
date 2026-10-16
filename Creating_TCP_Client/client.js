import { log } from 'node:console';
import net from 'node:net';

const socket=net.createConnection({host:"192.168.1.17",port:4000});
let i=1;
const obj={
    name:"",
    msg:"",
    id:i++,

}
socket.on("connect", () => {
    console.log("Connected to server");;
    console.log("What is your name?");  
    process.stdin.on("data",(input)=>{ 
   obj.name = input.toString().trim();
   console.log("Enter your message:");
   process.stdin.once("data",()=>{
    obj.msg=input.toString().trim();
     socket.write(JSON.stringify(obj));
   })
  })

  
});


socket.on("data",(chunk)=>{
    console.log(chunk.toString());
    
})
