import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const requestParser = (request: Buffer) => {
  const requestInArray = request.toString();

  //   console.log(requestInArray);

  const requestParts = requestInArray.split("\r\n");

  const startLine = requestParts[0].split(" ");
  const requestBody = requestParts[-1];

  const method = startLine[0];
  const url = startLine[1];
  const protocol = startLine[2];

  return { method, url, protocol };
};

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  console.log("server started");
  socket.on("data", (data) => {
    const { method, url, protocol } = requestParser(data);
    const response =
      url === "/"
        ? "HTTP/1.1 200 OK\r\n\r\n"
        : "HTTP/1.1 404 Not Found\r\n\r\n";

    socket.write(response);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
