import { HttpBase } from "../share/http-base";

export class Response {
  public response!: string;
  constructor(
    httpVersion: string,
    statusCode: number,
    statusText: string,
    headers: string[],
    body: string[]
  ) {
    console.log({ body222: body, headers });

    let headersDecoded =
      headers && headers.length ? `${headers.join("\r\n")}\r\n` : "";
    let bodyDecoded =
      body && Object.values(body).length
        ? `${Object.values(body).join("\r\n")}`
        : "";

    console.log({ headersDecoded });

    this.response = `${httpVersion} ${statusCode} ${statusText}\r\n${headersDecoded}\r\n${bodyDecoded}`;
  }
}
