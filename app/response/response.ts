export class Response {
  public response!: string;
  public httpVersion: string = "HTTP/1.1";
  public statusCode: number = 200;
  public statusText: string = "OK";
  public headers: string[] = [];
  public body: string = "";
  constructor() {}

  public responseParser(
    httpVersion: string = "HTTP/1.1",
    statusCode: number = 200,
    statusText: string = "OK",
    headers: string[],
    body: string
  ): string {
    let headersDecoded =
      headers && headers.length ? `${headers.join("\r\n")}\r\n` : "";

    this.response = `${httpVersion} ${statusCode} ${statusText}\r\n${headersDecoded}\r\n${this.body}`;

    return this.response;
  }

  public send(statusText: string = "OK"): string {
    console.log({ h: this.headers });

    this.statusText = statusText;
    return this.responseParser(
      this.httpVersion,
      this.statusCode,
      this.statusText,
      this.headers,
      this.body
    );
  }

  public setHeader(name: string, value: string) {
    this.headers.push(`${name}: ${value}`);
  }

  public setBody(body: string) {
    this.setHeader("Content-Type", "text/plain");
    this.setHeader("Content-Length", body.length.toString());
    this.body = body;
  }
}
