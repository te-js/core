import { getElementFromPath } from "./utils";

type Patch = {
  action: "remove" | "add" | "replace" | "update";
  path: number[];
  node?: HTMLElement;
  attributes?: Record<string, string>;
};

function diffTrees(tree1: HTMLElement, tree2: HTMLElement): Patch[] {
  const patches: Patch[] = [];

  function traverse(
    node1: ChildNode | null,
    node2: ChildNode | null,
    path: number[]
  ) {
    if (!node1 && node2) {
      if (node2.nodeType === Node.ELEMENT_NODE) {
        patches.push({ action: "add", path, node: node2 as HTMLElement });
      } else if (node2.nodeType === Node.TEXT_NODE) {
        patches.push({
          action: "add",
          path,
          node: document.createTextNode(node2.nodeValue || "") as any,
        });
      }
      return;
    }

    if (node1 && !node2) {
      patches.push({ action: "remove", path });
      return;
    }

    if (node1 && node2) {
      if (
        node1.nodeType === Node.TEXT_NODE &&
        node2.nodeType === Node.TEXT_NODE
      ) {
        if (node1.nodeValue !== node2.nodeValue) {
          patches.push({
            action: "update",
            path,
            attributes: { textContent: node2.nodeValue || "" },
          });
        }
        return;
      }
      if (
        node1.nodeType === Node.ELEMENT_NODE &&
        node2.nodeType === Node.ELEMENT_NODE
      ) {
        const el1 = node1 as HTMLElement;
        const el2 = node2 as HTMLElement;

        if (el1.tagName !== el2.tagName) {
          patches.push({ action: "replace", path, node: el2 });
          return;
        }

        const attributes1 = el1.getAttributeNames();
        const attributes2 = el2.getAttributeNames();
        const updatedAttributes: Record<string, string> = {};

        for (const attr of attributes2) {
          const value1 = el1.getAttribute(attr);
          const value2 = el2.getAttribute(attr);
          if (value1 !== value2) {
            updatedAttributes[attr] = value2 || "";
          }
        }

        for (const attr of attributes1) {
          if (!attributes2.includes(attr)) {
            updatedAttributes[attr] = "";
          }
        }

        if (Object.keys(updatedAttributes).length > 0) {
          patches.push({
            action: "update",
            path,
            attributes: updatedAttributes,
          });
        }

        const maxChildren = Math.max(
          el1.childNodes.length,
          el2.childNodes.length
        );
        for (let i = 0; i < maxChildren; i++) {
          traverse(el1.childNodes[i] || null, el2.childNodes[i] || null, [
            ...path,
            i,
          ]);
        }
      }
    }
  }

  traverse(tree1, tree2, []);
  return patches;
}
function applyPatches(tree: HTMLElement, patches: Patch[]): HTMLElement {
  function findNode(root: HTMLElement, path: number[]): ChildNode | null {
    let current: ChildNode = root;

    for (const segment of path) {
      if (!current.childNodes[segment]) return null;
      current = current.childNodes[segment];
    }
    return current;
  }

  for (const patch of patches) {
    const { action, path, node, attributes } = patch;
    const targetNode = findNode(tree, path);

    switch (action) {
      case "add":
        if (node) {
          const parent = findNode(tree, path.slice(0, -1)) as HTMLElement;
          if (parent) {
            parent.appendChild(node);
          }
        }
        break;

      case "remove":
        if (targetNode) {
          targetNode.remove();
        }
        break;

      case "replace":
        if (node && targetNode) {
          targetNode.replaceWith(node);
        }
        break;

      case "update":
        if (attributes && targetNode) {
          if (
            targetNode.nodeType === Node.TEXT_NODE
            //  &&
            // attributes.textContent
          ) {
            targetNode.nodeValue = attributes.textContent;
          } else if (targetNode instanceof HTMLElement) {
            for (const [attr, value] of Object.entries(attributes)) {
              if (value === "") {
                targetNode.removeAttribute(attr);
              } else {
                targetNode.setAttribute(attr, value);
              }
            }
          }
        }
        break;
    }
  }

  return tree;
}

function diffing(path: number[], newTree: HTMLElement): void {
  const oldTree = getElementFromPath(path);
  console.log("old", oldTree);
  applyPatches(oldTree, diffTrees(oldTree, newTree));
  console.log("new", newTree);
}

export default diffing;
