// Create HTTP Client

// We use http.request() to create an HTTP client request.
// It returns a ClientRequest object.
// ClientRequest is a writable stream because we can write
// request-body data into it.

import http from "node:http";

const clientReq = http.request({
    hostname: "192.168.1.17",
    port: 4000,
    method: "POST"
});

clientReq.write("hii i knows u");

// IMPORTANT:
// We must call end() after writing the request body.
// It tells Node that the request body is complete.
clientReq.end();

// To receive the response from the server,
// listen for the "response" event.

clientReq.on("response", (res) => {

    // res is an IncomingMessage object.
    // It is a readable stream.

    res.on("data", (chunk) => {
        console.log(chunk.toString());
    });

    res.on("end", () => {
        console.log("Response completed");
    });
});