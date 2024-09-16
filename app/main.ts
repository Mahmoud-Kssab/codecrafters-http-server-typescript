import * as net from "net";
import { Req } from "./request/request";
import { Response } from "./response/response";
import { Route } from "./route/route.provider";
import { HttpServer } from "./http-server";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  //   const route = new Route(new Req(data.toString()));
  console.log("server started");

  const server = new HttpServer();
  socket.on("data", (data) => {
    server.get("/echo/{str}", (req: Req, res: Response) => {
      console.log(
        "----------------------------------------------------------------11"
      );

      res.end("Hello, world!");
      socket.write(res.response);
    });

    server.handleRequest(data.toString());

    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
