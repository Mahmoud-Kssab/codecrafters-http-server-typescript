import { HttpBase } from "../share/http-base";

export class Response {
  protected response!: string;
  constructor(
    httpVersion: string,
    statusCode: number,
    statusText: string,
    headers: string[],
    body: string
  ) {

    this.response = `${httpVersion} ${statusCode} ${statusText}\r\n${headers.join("\r\n")}\r\n${body}\r\n`;

    console.log({
      response: this.response,
    });
  }
}
