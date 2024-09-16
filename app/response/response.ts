export class Response {
  public response!: string;
  public httpVersion: string = "HTTP/1.1";
  public statusCode: number = 200;
  public statusText: string = "OK";
  public headers!: string[];
  public body!: string[];
  constructor() {}

  public requestParser(
    httpVersion: string,
    statusCode: number,
    statusText: string,
    headers: string[],
    body: string[]
  ): string {
    let headersDecoded =
      headers && headers.length ? `${headers.join("\r\n")}\r\n` : "";
    let bodyDecoded =
      body && Object.values(body).length
        ? `${Object.values(body).join("\r\n")}`
        : "";

    this.response = `${httpVersion} ${statusCode} ${statusText}\r\n${headersDecoded}\r\n${bodyDecoded}`;

    console.log(this.response);

    return this.response;
  }

  public send(statusText: string = "OK"): string {
    this.statusText = statusText;
    return this.requestParser(
      this.httpVersion,
      this.statusCode,
      this.statusText,
      this.headers,
      this.body
    );
  }
}
