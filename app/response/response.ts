import { gzipSync } from "zlib";

export class Response {
  public response!: string;
  public httpVersion: string = "HTTP/1.1";
  public statusCode: number = 200;
  public statusText: string = "OK";
  public headers: string[] = [];
  public body: string | Buffer = "";
  public gzip: boolean = false;
  constructor() {}

  public responseParser(statusText: string = "OK") {
    let headersDecoded =
      this.headers && this.headers.length
        ? `${this.headers.join("\r\n")}\r\n`
        : "";

    this.response = `${this.httpVersion} ${this.statusCode} ${statusText}\r\n${headersDecoded}\r\n`;
  }

  public send(statusText: string = "OK") {
    this.statusText = statusText;
    this.responseParser(this.statusText);
  }

  public setHeader(name: string, value: string) {
    this.headers.push(`${name}: ${value}`);
  }

  public setBody(body: string | Buffer) {
    this.body = this.gzip ? body : body;
    this.setHeader("Content-Type", "text/plain");
    this.setHeader("Content-Length", body.length.toString());
  }
}
