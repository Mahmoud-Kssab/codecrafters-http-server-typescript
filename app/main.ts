import { Buffer } from "buffer";
import * as net from "net";
import { Req } from "./request/request";
import { Response } from "./response/response";
import { Route } from "./route/route.provider";
import { router } from "./router";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("server started");
  socket.on("data", (data) => {
    const route = new Route(new Req(data.toString()));
    const response = route.routeHandler();

    console.log({ responseeeee: response });

    const res = new Response(
      "HTTP/1.1",
      response.statusCode,
      response.statusText,
      response.headers,
      response.body
    );

    console.log({ response: res.response });

    socket.write(res.response);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
