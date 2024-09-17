import * as fs from "fs";
import * as net from "net";
import { join } from "path";
import { gzip } from "node-gzip";
import { program } from "commander";

import { Req } from "./request/request";
import { HttpServer } from "./http-server";
import { Response } from "./response/response";
import { gzipSync } from "zlib";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

program.option("--directory").parse(process.argv);
const options = program.opts();

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("server started");

  const server = new HttpServer();
  server.get("/", (req: Req, res: Response) => {
    res.send();
    console.log({ res: res.response });
  });

  server.get("/user-agent", (req: Req, res: Response) => {
    res.setBody(req.header("User-Agent"));
    console.log({ body: req.body });
    res.send();
    console.log({ res: res.response });
  });

  server.get("/echo/{str}", (req: Req, res: Response) => {
    const acceptEncoding = req.header("Accept-Encoding");

    if (acceptEncoding && acceptEncoding.includes("gzip")) {
      res.setHeader("Content-Encoding", "gzip");
      const compressedStr = gzipSync(req.parameters.str);
      res.setBody(compressedStr);
      res.send();
    } else {
      res.setBody(req.parameters.str);
      res.send();
    }
  });

  server.get("/files/{filename}", (req: Req, res: Response) => {
    try {
      const body = fs.readFileSync(
        join(program.args[0], req.parameters.filename),
        {
          encoding: "utf8",
        }
      );
      res.setHeader("Content-Type", "application/octet-stream");
      res.setBody(body);
      res.send("OK");
    } catch (error) {
      console.log({ error });

      res.statusCode = 404;
      res.send("Not Found");
    }
  });

  server.post("/files/{filename}", (req: Req, res: Response) => {
    fs.writeFileSync(
      join(program.args[0], req.parameters.filename),
      req.body,
      "utf8"
    );

    res.statusCode = 201;
    res.send("Created");
  });

  socket.on("data", async (data) => {
    const response = server.handleRequest(data.toString());
    console.log({ response });

    socket.write(response);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
