import Stateful from "./component/stateful";
import Stateless from "./component/stateless";

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

function customId() {
  return GLOBAL("customId", (old) => old + 1);
}

function convertElementToHTMLNMode<T extends Tag>(element: Stateless<T>) {
  function dfs(node: Stateless<Tag>, htmlNode: HTMLElement) {
    for (let child of node.children) {
      if (child instanceof Stateless) {
        const childNode = document.createElement(child.tag);
        dfs(child, childNode);
        htmlNode.appendChild(childNode);
      } else if (child instanceof Stateful) {
        const build = child.build();
        const childNode = document.createElement(build.tag);
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

export { GLOBAL, TODO, convertElementToHTMLNMode, customId };
