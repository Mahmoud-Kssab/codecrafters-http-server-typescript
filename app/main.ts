import { Buffer } from "buffer";
import * as net from "net";
import { Req } from "./request/request";
import { Response } from "./response/response";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("server started");
  socket.on("data", (data) => {
    const request = data.toString();

    // new Req(request);

    // new Response('HTTP/1.1', 200, ['Content-Type', 'application/json'])
    const path = request.split(' ')[1];
    const response = path === '/' ? 'HTTP/1.1 200 OK\r\n\r\n' : 'HTTP/1.1 404 Not Found\r\n\r\n';
    socket.write(response);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
