import { HttpBase } from "../share/http-base";

export class Req extends HttpBase {
  public method!: string;
  public url!: string;
  public httpVersion!: string;
  constructor(request: string) {
    super(request);
    const startLine = this.startLine.split(" ");
    this.url = startLine[1];
    this.method = startLine[0];
    this.httpVersion = startLine[2];
    // console.log({ startLine: this.startLine, httpVersion: this.httpVersion, url: this.url, method: this.method});
  }

  public header(header: string) {
    const headerLine = this.headers.find((line) => line.startsWith(header));
    if (headerLine) {
      const [key, value] = headerLine.split(": ");
      return value.trim();
    }
    return "";
  }
}
