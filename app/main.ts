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

  const httpServer = new HttpServer();
  httpServer.get("/", (req: Req, res: Response) => {
    res.send();
    console.log({ res: res.response });
  });

  httpServer.get("/echo/{str}", (req: Req, res: Response) => {
    const comm = gzipSync(req.parameters.str);
    res.setBody(comm);
    res.send();
  });

  socket.on("data", async (data) => {
    const res = httpServer.handleRequest(data.toString());

    socket.write(res.response);

    console.log({ bb: res.body.toString("hex") });

    socket.write(res.body);

    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
