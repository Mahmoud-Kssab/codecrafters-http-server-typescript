import { Req } from "../request/request";
import { router } from "../router";
import { Route } from "./route.provider";

class RouteCollection {
  protected routes: any = {
    GET: [],
    POST: [],
    // Other HTTP methods
  };

  protected request: Req;
  constructor(request: Req) {
    this.request = request;
  }

  public addAllRoutes(route: string) {
    router.forEach((route: Route) => {
      // Add routes to the routes collection based on their HTTP method
      this.add(route); // Example usage: route.get("/users/{id}/{name}/{age}") => this.add(route)
    });
    this.routes[this.request.method] = route; // Adds the route under its method
  }

  public add(route: Route) {
    this.routes[this.request.method] = route; // Adds the route under its method
  }

  public match() {
    const method = this.request.method;

    // Iterate over routes for the request's method
    return this.routes[method].forEach((route: Route) => {
      if (route.matches(this.request.url)) {
        return route; // Return the first matching route
      }
    });
  }
}
