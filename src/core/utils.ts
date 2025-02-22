import { TNode } from "./component/base-component.js";
import { Component } from "./component/component.js";
import { Reference } from "./reference.js";

const GLOBALS = {
  component: 0,
  customId: 0,
  cached: new Map<number[], TNode<Tag> | Component>(),
  states: new Map<string, any>(),
  currentPath: <number[]>[],
  reactive: true,
  pages: new Map<string, typeof Component>(),
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

function convertElementToHTMLNMode<T extends Tag>(element: TNode<T>) {
  function dfs(node: TNode<Tag>, htmlNode: HTMLElement, path: number[]) {
    for (let i = 0; i < node.children.length; i++) {
      const newPath = [...path, i];

      const child = node.children[i];
      if (GLOBAL("cached").has(newPath)) {
        console.log("cached");
        let element = GLOBAL("cached").get(newPath);
        if (!element) throw new Error("Bad state. no element");
        while (element instanceof Component) {
          element.beforeMount();
          const temp = element;
          element = element.build();
          temp.mounted();
        }
        htmlNode.appendChild(document.createElement(element!.tag));
        continue;
      }
      if (child instanceof TNode) {
        const childNode = document.createElement(child.tag);
        addProps(newPath, childNode, child.props);
        dfs(child, childNode, newPath);
        htmlNode.appendChild(childNode);
      } else if (child instanceof Component) {
        const build = child.flat();
        const childNode = document.createElement(build.tag);
        addProps(newPath, childNode, build.props);
        dfs(build, childNode, newPath);
        htmlNode.appendChild(childNode);
      } else {
        if (typeof child === "object") htmlNode.append(JSON.stringify(child));
        else htmlNode.append(String(child));
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
          }
          break;
      }
    } else if (key.startsWith("on")) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else element.setAttribute(key, value);
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

