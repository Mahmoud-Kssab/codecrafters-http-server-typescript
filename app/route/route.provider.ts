import { Req } from "../request/request";
import { router } from "../router";
import { RouteCompiler } from "./route-compiler";

export class Route {
  protected routeCompiler: RouteCompiler = new RouteCompiler();
  protected method!: string;
  protected url!: string;
  public route!: string;
  public parameters: any = {};
  public routes: any = {
    get: {},
    post: {},
  };

  constructor() {}

  public match(method: string, url: string) {
    Object.keys(this.routes[method.toLowerCase()]).forEach((route: string) => {
      if (this.matches(route, url)) {
        this.route = route;
        return;
      }
    });

    return this.route;
  }

  // public routeHandler() {
  //   if (router[this.method][this.route])
  //     return router[this.method][this.route](this.parameters);
  //   // TODO: make it with NotFoundError handler
  //   else
  //     return {
  //       statusCode: 404,
  //       statusText: "Not Found",
  //       headers: [],
  //       body: {},
  //     };
  // }

  public matches(route: string, url: string): boolean {
    const pattern = this.routeCompiler.compile(route);
    const matches = url.match(pattern);

    console.log({ pattern, matchesss: matches });
    console.log({ matches: matches?.slice(1) });

    if (matches && matches?.slice(1).length) {
      this.parameters = this.matchToKeys(matches.slice(1), route);
    }

    return matches && matches?.length > 0 ? true : false;
  }

  public matchToKeys(values: string[], uri: string) {
    let parameters: any = {};

    console.log({ values });

    // Get parameter names from the compiled route
    const keys: string[] = this.getVariableNames(uri);

    // Combine parameter names with extracted values
    keys.forEach((key, index) => {
      parameters[key] = values[index] ? values[index] : null;
    });

    return parameters;
  }

  public getVariableNames(uri: string) {
    const pattern = /{(\w+)}/g;

    // Array to hold the names of variables
    const variableNames = [];

    // Match the pattern against the route and iterate over all matches
    let match;
    while ((match = pattern.exec(uri)) !== null) {
      // match[1] contains the variable name (excluding curly braces)
      variableNames.push(match[1]);
    }

    console.log({ variableNames });

    return variableNames;
  }
}
