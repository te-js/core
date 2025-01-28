class Router {
  public get search() {
    const variables = window.location.search
      .split("&")
      .map((x) => x.split("="));
    return variables;
  }
  constructor() {}
  // public setSearchParams(key: string, value: string) {
  //   // window.location.search += "&${}
  // }
}

export default Router;
