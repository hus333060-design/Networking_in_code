// creating web server
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";

const server=http.createServer( async (req,res)=>{
 // sending html by server
//  First way
//  res.end(`
//   <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <h1>Hello btoerhe</h1>
// </body>
// </html>  
//     `)

//  Second way
// const fileName = req.url;
// if(fileName === '/'){
//     const fileContant=await readFile("./index.html");
//     res.end(fileContant)
// }
// else{
//   const fileContant=await readFile(`.${fileName}`);
//    res.end(fileContant)
// }



// Thrid way by stream it won't create problem bcz it will read chunk to chunk so it won't be ceerate any overhead 
const fileName = req.url;
if(fileName === '/'){
    const fileContant=createReadStream("./public/index.html");
    // fileContant.on("data",(chunk)=>{
    //   res.write(chunk)
    // })
    fileContant.pipe(res);
    
}
else{
  const fileContant=createReadStream(`./public${fileName}`);
  fileContant.on("error",()=>{
    console.log(res.statusMessage);
    res.end("NOT FOUND");
    
  })
fileContant.pipe(res);
}

})

server.listen(4000,()=>{
    console.log("Server is stated on 4000 Port");
    
})