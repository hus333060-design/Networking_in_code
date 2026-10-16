// HTTP Response & Headers using Node.js net

// 1. HTTP Response
// Jab browser/client server ko request bhejta hai, server uske response mein HTTP response bhejta hai.
// HTTP Response
//      |
//      +---- Status Line
//      |
//      +---- Response Headers
//      |
//      +---- Empty Line
//      |
//      +---- Response Body


// a. Status Line:- Status line HTTP response ki first line hoti hai
// HTTP/1.1 200 OK
// Iske 3 parts hain:
// HTTP/1.1    200    OK
//    |          |      |
// Version    Status   Reason
//            Code     Phrase

// HTTP version :- Ye batata hai ki response kis HTTP version ke according hai.
// Status Code  :- Status code server ke response ka result batata hai.
// Common status code:-
// 200 → OK / Request successful 201 → Created etc more.

// b. HTTP Response Headers:- Headers response ke baare mein additional information/instructions provide karte hain.
// General format:
// Header-Name: Header-Value

// -> Access-Control-Allow-Origin: * 
// -- Ye CORS (Cross-Origin Resource Sharing) response header hai. Ye browser ko batata hai ki response ko kaunse origin ke JavaScript code ke saath share karna allowed hai.

// * ka meaning broadly: Any origin
// Example: fornted :- http://localhost:3000  and banked :- http://localhost:4000
// Ye different origins hain because ports different hain.
// to server is reponse header se fornted Access-Control-Allow-Origin: *  (iska mtlb hai haa cross origin access allow hai )

// -> Access-Control-Expose-Headers
// isse ham broswer ko batate hai ki jo addtional header reposnse kiya hai na brorwer-side js usko (client ki js) kar sake.
// client-side :-
// fetch("http://localhost:4000") .then(res => { console.log(res.headers.get("X-User-Id")); });
// yeh access kar sakta hai .


// Note:- \r\n in HTTP

// HTTP/1.x messages mein lines ko separate karne ke liye: r\n use hota hai.
// Example:"HTTP/1.1 200 OK\r\n"
// Headers bhi \r\n se separate hote hain:

// c . Response Body :- Headers ke baad actual data ko response body kehte hain
// socket.write("HTTP/1.1 200 okay\n\nhello"); hello is here response body
import net from 'node:net';

// Header contains infromation about data it is use in the to send res to browser 
const server=net.createServer((socket)=>{
//    socket.write("HTTP/1.1 200 okay\n\nhello");
    // header reponse
   //1. Access-Control-Allow-Origin: * :- It tells a browser that JavaScript running on any origin is allowed to access this response
//  socket.write(
//     "HTTP/1.1 200 OK\r\n" +
//     "Access-Control-Allow-Origin: *\r\n" +
//     "\r\n" +
//     "hello"
// );

//2.access-control-expose-headers:-  that tells browsers which headers are safe to expose to client-side JavaScript (like fetch or XMLHttpRequest) during a cross-origin (CORS) request.
  socket.write(
    "HTTP/1.1 200 OK\r\n" +
    "Access-Control-Allow-Origin: *\r\n"  + 
    "Access-Control-Expose-Headers: *\r\n" + 
    "\r\n" +
    "hello"
);
   
   socket.end();
})

server.listen(4000,()=>{
    console.log("Server started on port 4000");
})