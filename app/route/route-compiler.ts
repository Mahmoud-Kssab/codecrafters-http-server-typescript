export class RouteCompiler {
  public compile(uri: string) {
    const pattern = uri.replace(/{\w+}/g, "([^/]+)");
    return `^${pattern}$`;
  }
}
