class Router {
  public get search() {
    const variables = window.location.search
      .split("&")
      .map((x) => x.split("="));
    return variables;
  }
  constructor() {}
}

export default Router;
