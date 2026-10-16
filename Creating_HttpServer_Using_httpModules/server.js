// Creating Http Server Using http Modules

import { createWriteStream } from "node:fs";
import http from "node:http"  // Moduled

// const server=http.createServer();

// server.on("connection",(socket)=>{   we don't use connection connection enerally
//   console.log(socket);
//   socket.end("HTTP\n\nHello brother");
// });

// here request is readable stream and response is writrable
// server.on("request",(request,response)=>{ 
// // to set header -- use SetHeader() function here
// response.setHeader("Content-Length","13")
//   response.write("hello brother"); // to write there
// //   response.end();
// })

// we can put server.on("request") callback function in the createserver() it will be work same.
const server=http.createServer((request,response)=>{ 
  //  console.log("Method:", request.method);
  //   console.log("Headers:", request.headers);
    
// response.setHeader("Content-Length","13")
  // response.write("hello brother"); 
  // request.on("data",(chunk)=>{
  //    console.log(chunk);// it doesn't showing bcz when we put data event on the request stream so it show request's body data not with hedaers.
  // })

  // let's html file it will send req to by post method
  // if (request.method === "POST") {
  //       const file = createWriteStream("upload.txt");
  //       request.on("data", (chunk) => {
  //           console.log("Received chunk:", chunk.length);
  //       });
  //       request.pipe(file);
  //       request.on("end", () => {
  //           console.log("Request body completely received");
  //       });
      // }

      // let's access server using fetch()
       response.setHeader("Access-Control-Allow-Origin", "*");
       if (request.method === "POST") {
        const file = createWriteStream("upload.txt");
        request.on("data", (chunk) => {
            console.log("Received chunk:", chunk.toString());
        });
        request.pipe(file);
      
      }
      else{
  response.setHeader("Content-Type", "application/json");
   response.end(JSON.stringify({
            message: "Hello from server"
        }));
      }


});

server.listen(5000,()=>{
    console.log("Server stated on 5000 port");
    
})