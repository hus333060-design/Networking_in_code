import { open, readdir, readFile } from "node:fs/promises";
import http from "node:http";
import mime from "mime-types";
import { createReadStream, createWriteStream } from "node:fs";

const server = http.createServer(async (req, res) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "filename");
  if(req.method=== "GET"){
if (req.url === "/") {
    serveDirectory(req, res);
  } 

  else {
    try {
      const [url, queryString] = req.url.split("?");
      const queryParams = {};
      queryString?.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        queryParams[key] = value;
      });

      const fileHandle = await open(`./storage${decodeURIComponent(url)}`);
      const stats = await fileHandle.stat();
      if (stats.isDirectory()) {
        serveDirectory(req, res);
      } else {
        const readStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime.contentType(url.slice(url.lastIndexOf("/") + 1)));
        res.setHeader("Content-Length", stats.size);
        if (queryParams.action === "download") {
          console.log("hello");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="${url.slice(1)}"`,
          );
        }
        readStream.pipe(res);
      }
    } catch (err) {
      console.log(err);
      res.end("Not found.");
    }
  }



  }
  else if (req.method === "OPTIONS") {
    res.end();
}
  else if(req.method=== "POST"){
    const writeableStream=createWriteStream(`${req.headers.filename}`);
    req.on("data",(chunk)=>{
    writeableStream.write(chunk);
    })
req.on("end", () => {
    writeableStream.end();
    res.end("File uploaded");
});
  }
});

async function serveDirectory(req, res) {
  const [url] = req.url.split("?");

  const dirContent = await readdir(`./storage${decodeURIComponent(url)}`);
  // let dynamicHTML = "";
  // dirContent.forEach((item) => {
  //   dynamicHTML += `${item} <a href=".${url === "/" ? "" : url}/${item}?action=open">Open</a> <a href=".${url === "/" ? "" : url}/${item}?action=download">Download</a><br>`;
  // });
  
  // const htmlBoilerplate = await readFile("./Public/index.html", "utf-8");
  // res.end(htmlBoilerplate.replace("{{FILES}}", dynamicHTML ));
  // we don't generate dynammix Html generally we give res with all directory in json.format.
  res.setHeader("Content-Type","application/json")
 res.end(JSON.stringify(dirContent));
}

server.listen(8000, () => {
  console.log("Server Started.");
});