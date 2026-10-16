// 



import { open, readdir, readFile } from "node:fs/promises";
import http from "node:http";
import mime from "mime-types";

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    serveDirectory(req, res);
  } else {
    try {
      const [url, queryString] = req.url.split("?");

      const queryParams = {};
      queryString.split("&").forEach((pair) => {
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
});

async function serveDirectory(req, res) {
  const [url, queryParam] = req.url.split("?");

  const dirContent = await readdir(`./storage${decodeURIComponent(url)}`);
  let dynamicHTML = "";

  dirContent.forEach((item) => {
    dynamicHTML += `${item} <a href=".${url === "/" ? "" : url}/${item}?action=open">Open</a> <a href=".${url === "/" ? "" : url}/${item}?action=download">Download</a><br>`;
  });

  const htmlBoilerplate = await readFile("./boilerplate.html", "utf-8");
  res.end(htmlBoilerplate.replace("dynamicHTML", dynamicHTML));
}

server.listen(80, "0.0.0.0", () => {
  console.log("Server Started.");
});