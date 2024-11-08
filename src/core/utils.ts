import { Stateful } from "./component/stateful.js";
import { Component } from "./component/stateless.js";
import { Reference } from "./reference.js";

const GLOBALS = {
  component: 0,
  customId: 0,
  cached: new Map<number[], Component<Tag> | Stateful>(),
  currentPath: <number[]>[],
};
const customProps = new Set(["ref", "cache"]);
const TODO = new Error("TODO");
function GLOBAL<T extends keyof typeof GLOBALS>(
  state: T,
  value?:
    | (typeof GLOBALS)[T]
    | ((old: (typeof GLOBALS)[T]) => (typeof GLOBALS)[T])
) {
  if (value) {
    if (typeof value === "function") GLOBALS[state] = value(GLOBALS[state]);
    else GLOBALS[state] = value;
  }
  return GLOBALS[state];
}

const customId = () => GLOBAL("customId", (old) => old + 1);

function convertElementToHTMLNMode<T extends Tag>(element: Component<T>) {
  async function dfs(
    node: Component<Tag>,
    htmlNode: HTMLElement,
    path: number[]
  ) {
    for (let i = 0; i < node.children.length; i++) {
      const newPath = [...path, i];

      const child = node.children[i];
      if (GLOBAL("cached").has(newPath)) {
        console.log("cached");
        let element = GLOBAL("cached").get(newPath);
        if (!element) throw new Error("Bad state. no element");
        while (element instanceof Stateful) element = await element.build();
        htmlNode.appendChild(document.createElement(element!.tag));
        continue;
      }
      if (child instanceof Component) {
        const childNode = document.createElement(child.tag);
        addProps(newPath, childNode, child.props);
        dfs(child, childNode, newPath);
        htmlNode.appendChild(childNode);
      } else if (child instanceof Stateful) {
        const build = await child.build();
        const childNode = document.createElement(build.tag);
        addProps(newPath, childNode, build.props);
        dfs(build, childNode, newPath);
        htmlNode.appendChild(childNode);
      } else {
        htmlNode.append(child);
      }
    }
  }
  const root = document.createElement(element.tag);
  dfs(element, root, []);
  return root;
}

function addProps(
  path: number[],
  element: HTMLElement,
  props: Record<string, any>
) {
  for (const [key, value] of Object.entries(props)) {
    if (customProps.has(key)) {
      switch (key) {
        case "ref":
          const ref = (props as any)["ref"];
          if (ref instanceof Reference) {
            ref.target = element;
          }
          (props as any)["ref"] = element;
          break;
        case "cache":
          if (!GLOBAL("cached").has(path)) {
            console.log("to cache", element);

            // GLOBAL("cached").set(path, element);
          }

          break;
      }
    } else if (key.startsWith("on"))
      element.addEventListener(key.slice(2), value);
    else element.setAttribute(key, value);
  }
}

function getElementFromPath(path: number[]) {
  let node = document.body;
  for (const i of path) {
    node = node.childNodes[i] as HTMLElement;
  }

  return node;
}

function replaceHTMLElement(path: number[], element: HTMLElement) {
  let node = document.body;
  for (let i = 0; i < path.length - 1; i++) {
    node = node.childNodes[path[i]] as HTMLElement;
  }

  node.replaceChild(
    element,
    node.childNodes[path[path.length - 1]] as HTMLElement
  );
}

export {
  convertElementToHTMLNMode,
  customId,
  getElementFromPath,
  GLOBAL,
  replaceHTMLElement,
  TODO,
};

