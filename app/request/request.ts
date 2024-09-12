class Req {
  protected method;
  protected url;
  protected httpVersion;
  constructor(req: string) {
    this.method = req.split(" ")[0];
    this.url = req.split(" ")[1];
    this.httpVersion = req.split(" ")[2];
  }


  
}
