import { Req } from "./request/request";
import { Response } from "./response/response";
import { Route } from "./route/route.provider";

export class HttpServer {
  public server: any;
  public route: Route = new Route();

  constructor() {}

  public get(path: string, handler: CallableFunction) {
    this.route.routes.get[path] = handler;
  }

  public post(path: string, handler: CallableFunction) {
    this.route.routes.post[path] = handler;
  }

  // Method to handle incoming requests
  public handleRequest(data: string) {
    const req = new Req(data);

    const { route, parameters } = this.route.match(req.method, req.url);

    const res = new Response();
    if (route) {
      req.parameters = parameters;
      this.route.routes[req.method.toLocaleLowerCase()][route](req, res);
    } else {
      res.statusCode = 404;
      res.send("Not Found");
    }

    return res.response;
  }
}
