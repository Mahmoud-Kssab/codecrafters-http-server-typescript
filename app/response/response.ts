import { HttpBase } from "../share/http-base";

export class Response {
  public response!: string;
  public httpVersion: string = "HTTP1.1";
  public statusCode: number = 200;
  public statusText: string = "OK";
  public headers!: string[];
  public body!: string[];
  constructor() {}

  public send(
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

    return this.response;
  }

  public end(statusText: string): string {
    this.statusText = statusText;
    return this.send(
      this.httpVersion,
      this.statusCode,
      this.statusText,
      this.headers,
      this.body
    );
  }
}
