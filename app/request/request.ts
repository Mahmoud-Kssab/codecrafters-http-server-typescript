import { HttpBase } from "../share/http-base";

export class Req extends HttpBase {
  protected method!: string;
  protected url!: string;
  protected httpVersion!: string;
  constructor(request: string) {
    super(request);
    const startLine = this.startLine.split(" ");
    this.url = startLine[1];
    this.method = startLine[0];
    this.httpVersion = startLine[2];
    console.log({ startLine: this.startLine, httpVersion: this.httpVersion, url: this.url, method: this.method});
  }
}
