import * as net from "net";

import { Req } from "./request/request";
import { HttpServer } from "./http-server";
import { Response } from "./response/response";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("server started");

  const server = new HttpServer();
  socket.on("data", (data) => {
    server.get("/", (req: Req, res: Response) => {
      res.setHeader("Content-Type", "text/plain");
      console.log({ x: req.header("User-Agent") });

      res.setHeader("Content-Length", `${req.header("User-Agent").length}`);
      res.send();
      console.log({ res: res.response });

      socket.write(Buffer.from(res.response));
    });

    server.get("/user-agent", (req: Req, res: Response) => {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Length", `${req.header("User-Agent").length}`);

      res.send();
      console.log({ res: res.response });

      socket.write(Buffer.from(res.response));
    });

    server.get("/echo/{str}", (req: Req, res: Response) => {
      res.headers = req.headers;
      res.body = req.body;
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Length", `${req.header("User-Agent").length}`);
      res.send();
      socket.write(Buffer.from(res.response));
    });

    server.handleRequest(data.toString());
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
