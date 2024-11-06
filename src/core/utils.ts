import { Tag } from "../types";
import Stateful from "./component/stateful";
import Component from "./component/stateless";

const GLOBALS = {
  component: 0,
  customId: 0,
};
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
  function dfs(node: Component<Tag>, htmlNode: HTMLElement) {
    for (let child of node.children) {
      if (child instanceof Component) {
        const childNode = document.createElement(child.tag);
        addProps(childNode, child.props);
        dfs(child, childNode);
        htmlNode.appendChild(childNode);
      } else if (child instanceof Stateful) {
        const build = child.build();
        const childNode = document.createElement(build.tag);
        addProps(childNode, build.props);
        dfs(build, childNode);
        htmlNode.appendChild(childNode);
      } else {
        htmlNode.append(child);
      }
    }
  }
  const root = document.createElement(element.tag);
  dfs(element, root);
  return root;
}

function addProps(element: HTMLElement, props: object) {
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on")) element.addEventListener(key.slice(2), value);
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
  GLOBAL,
  TODO,
  convertElementToHTMLNMode,
  customId,
  getElementFromPath,
  replaceHTMLElement,
};

