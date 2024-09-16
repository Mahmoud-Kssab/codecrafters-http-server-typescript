import { Req } from "./request/request";
import { Response } from "./response/response";
import { Route } from "./route/route.provider";

export class HttpServer {
  public server: any;
  public route: Route = new Route();

  //   public routes: Route = new Route(this.request);
  constructor() {}

  get(path: string, handler: CallableFunction) {
    this.route.routes.get[path] = handler;
  }

  // Method to handle incoming requests
  handleRequest(data: string) {
    const req = new Req(data);
    // Find matching route handler
    const route = this.route.match(req.method, req.url);
    const res = new Response();
    if (route) {
      this.route.routes.get[route](req, res);
    } else {
      res.statusCode = 404;
      res.send("Not Found");
    }
  }
}
