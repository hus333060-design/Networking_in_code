import http from "node:http";

const server=http.createServer((req,res)=>{
req.on("data",(chunk)=>{
console.log(chunk.toString());
})
res.write("Hii from server i am your brother");
});

server.listen(4000,()=>{
    console.log("Server has been connected on 4000 Port");
    
})