export class HttpBase {
  public startLine: string;
  public headers: string[];
  public body: string;

  // GET /index.html HTTP/1.1\r\nHost: localhost:4221\r\nUser-Agent: curl/7.64.1\r\nAccept: */*\r\n\r\n

  constructor(request: string) {
    const requestParts = request.split("\r\n");
    this.startLine = requestParts[0];
    this.headers = requestParts.slice(1, requestParts.length - 2);
    this.body = requestParts[-1];
  }
}
