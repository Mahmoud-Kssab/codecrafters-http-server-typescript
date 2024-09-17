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
    res.setBody(req.parameters.str);
    res.send();
  });

  socket.on("data", (data) => {
    const response = server.handleRequest(data.toString());
    socket.write(Buffer.from(response));
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
