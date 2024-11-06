import { Stateful } from "./component/stateful";
import { convertElementToHTMLNMode } from "./utils";

function render(page: Stateful) {
  page.path = [0];
  const element = page.build();
  element.path = [0];
  element.setPath();
  const root = convertElementToHTMLNMode(element);
  document.body.innerHTML = "";
  document.body.appendChild(root);
}

const route = (paths: Record<string, (...params: any[]) => Stateful>) => {
  const router = new Proxy(window.location, {
    get: (target, key, receiver) => {
      return Reflect.get(target, key, receiver);
    },
    set(target, p, newValue, receiver) {
      if (p === "pathname") {
        history.pushState({}, "", newValue);
        if (newValue in paths) {
          render(paths[newValue]());
        }
        return true;
      }
      return Reflect.set(target, p, newValue, receiver);
    },
  });
  router.pathname = window.location.pathname;
  return router;
};

export { route };
