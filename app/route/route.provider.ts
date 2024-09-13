import { Req } from "../request/request";
import { router } from "../router";
import { RouteCompiler } from "./route-compiler";

export class Route {
  protected routeCompiler: RouteCompiler = new RouteCompiler();
  protected request: Req;
  public route: any;
  public parameters: any = {};
  constructor(request: Req) {
    this.request = request;

    this.match();
    this.routeHandler();
  }

  public match() {
    const method: string = this.request.method;

    this.route = Object.keys(router[method]).map((route: string) => {
      if (this.matches(route)) return route;
    });
  }

  public routeHandler() {
    if (router[this.request.method][this.route])
      return router[this.request.method][this.route](this.parameters);
    else
      return {
        statusCode: 404,
        statusText: "Not Found",
        headers: [],
        body: {},
      };
  }

  public matches(uri: string): boolean {
    console.log(this.request.url);

    const pattern = this.routeCompiler.compile(uri);
    const matches = this.request.url.match(pattern);

    console.log({ pattern, matches: matches });
    console.log({ matches: matches?.slice(1) });

    // let parameters = [];
    if (matches && matches.length) {
      this.parameters = this.matchToKeys(matches.slice(1), uri);
    }

    return Object.keys(this.parameters).length > 0 ? true : false;
  }

  protected post(uri: string) {
    const pattern = uri.replace("/{(w+)}/", "([^/]+)");
    return `#^${pattern}$#`;
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
