import { DefaultComponent } from "./component/component";
import { convertElementToHTMLNMode, GLOBAL } from "./utils";

async function render<T extends DefaultComponent>(page: T) {
  console.log("dai", page);
  page.path = [0];
  const element = await page.flat();
  element.path = [0];
  element.setPath();
  const root = convertElementToHTMLNMode(element);
  document.body.innerHTML = "";
  document.body.appendChild(root);
}

// function getRoute(
//   paths: Record<string, (...params: any[]) => Component>,
//   location: string
// ) {
//   const locations = location.split("/");
// }

const route = (
  paths: Record<string, (...params: any[]) => DefaultComponent>
) => {
  const router = new Proxy(window.location, {
    get: (target, key, receiver) => {
      return Reflect.get(target, key, receiver);
    },
    set(target, p, newValue, receiver) {
      if (p === "pathname") {
        console.log("pages", newValue, GLOBAL("pages"));
        if (newValue in GLOBAL("pages")) {
          render(new (GLOBAL("pages").get(newValue)! as any)());
        }
        history.pushState({}, "", newValue);
        const locations = newValue.split("/");

        for (const location of locations) {
          if (location === "") continue;
          if (location in paths) {
            render(paths[location]());
          } else if (GLOBAL("pages").has(location)) {
            render(new (GLOBAL("pages").get(location)! as any)());
          }
        }

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
