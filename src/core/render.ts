import { getElementFromPath } from "./utils";

type Patch = {
  action: "remove" | "add" | "replace" | "update";
  path: number[];
  node?: HTMLElement;
  attributes?: Record<string, string>;
};

// function diffTrees(tree1: HTMLElement, tree2: HTMLElement): Patch[] {
//   const patches: Patch[] = [];

//   function traverse(
//     node1: HTMLElement | null,
//     node2: HTMLElement | null,
//     path: number[]
//   ) {
//     if (!node1 && node2) {
//       // HTMLElement exists in tree2 but not in tree1
//       patches.push({ action: "add", path, node: node2 });
//       return;
//     }

//     if (node1 && !node2) {
//       // HTMLElement exists in tree1 but not in tree2
//       patches.push({ action: "remove", path });
//       return;
//     }

//     if (node1 instanceof HTMLElement && node2 instanceof HTMLElement) {
//       // Compare node types (tag names)
//       if (node1.tagName !== node2.tagName) {
//         patches.push({ action: "replace", path, node: node2 });
//         return;
//       }

//       // Compare attributes
//       const attributes1 = node1.getAttributeNames();
//       const attributes2 = node2.getAttributeNames();

//       const updatedAttributes: Record<string, string> = {};

//       // Check for added or updated attributes
//       for (const attr of attributes2) {
//         const value1 = node1.getAttribute(attr);
//         const value2 = node2.getAttribute(attr);
//         if (value1 !== value2) {
//           updatedAttributes[attr] = value2 || "";
//         }
//       }

//       // Check for removed attributes
//       for (const attr of attributes1) {
//         if (!attributes2.includes(attr)) {
//           updatedAttributes[attr] = "";
//         }
//       }

//       if (Object.keys(updatedAttributes).length > 0) {
//         patches.push({ action: "update", path, attributes: updatedAttributes });
//       }

//       // Compare innerHTML
//       if (node1.innerHTML !== node2.innerHTML) {
//         patches.push({
//           action: "update",
//           path,
//           attributes: { innerHTML: node2.innerHTML },
//         });
//       }

//       // Compare children
//       const maxChildren = Math.max(
//         node1.childNodes.length,
//         node2.childNodes.length
//       );
//       for (let i = 0; i < maxChildren; i++) {
//         const child1 = node1.childNodes[i] as HTMLElement | null;
//         const child2 = node2.childNodes[i] as HTMLElement | null;

//         traverse(
//           child1 instanceof HTMLElement ? child1 : null,
//           child2 instanceof HTMLElement ? child2 : null,
//           [...path, i]
//         );
//       }
//     }
//   }

//   traverse(tree1, tree2, []);
//   return patches;
// }

// function applyPatches(tree: HTMLElement, patches: Patch[]): HTMLElement {
//   function findNode(root: HTMLElement, path: number[]): HTMLElement | null {
//     const segments = path.slice(0, path.length - 1);
//     let current: HTMLElement = root;

//     for (const segment of segments) {
//       if (!current.childNodes[segment]) return null;
//       current = current.childNodes[segment] as HTMLElement;
//     }
//     return current;
//   }

//   for (const patch of patches) {
//     const { action, path, node, attributes } = patch;
//     const targetNode = findNode(tree, path);
//     if (!targetNode) continue;

//     switch (action) {
//       case "add":
//         if (node) {
//           targetNode.appendChild(node);
//         }
//         break;

//       case "remove":
//         targetNode.remove();
//         break;

//       case "replace":
//         if (node) {
//           targetNode.replaceWith(node);
//         }
//         break;

//       case "update":
//         if (attributes) {
//           for (const [attr, value] of Object.entries(attributes)) {
//             if (attr === "innerHTML") {
//             } else if (value === "") {
//               targetNode.removeAttribute(attr);
//             } else {
//               targetNode.setAttribute(attr, value);
//             }
//           }
//         }
//         break;
//     }
//   }

//   return tree;
// }
function diffTrees(tree1: HTMLElement, tree2: HTMLElement): Patch[] {
  const patches: Patch[] = [];

  function traverse(
    node1: ChildNode | null,
    node2: ChildNode | null,
    path: number[]
  ) {
    if (!node1 && node2) {
      // Node exists in tree2 but not in tree1
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
      // Node exists in tree1 but not in tree2
      patches.push({ action: "remove", path });
      return;
    }

    if (node1 && node2) {
      // Handle Text Nodes
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

      // Handle Element Nodes
      if (
        node1.nodeType === Node.ELEMENT_NODE &&
        node2.nodeType === Node.ELEMENT_NODE
      ) {
        const el1 = node1 as HTMLElement;
        const el2 = node2 as HTMLElement;

        // Compare tag names
        if (el1.tagName !== el2.tagName) {
          patches.push({ action: "replace", path, node: el2 });
          return;
        }

        // Compare attributes
        const attributes1 = el1.getAttributeNames();
        const attributes2 = el2.getAttributeNames();
        const updatedAttributes: Record<string, string> = {};

        // Check for added or updated attributes
        for (const attr of attributes2) {
          const value1 = el1.getAttribute(attr);
          const value2 = el2.getAttribute(attr);
          if (value1 !== value2) {
            updatedAttributes[attr] = value2 || "";
          }
        }

        // Check for removed attributes
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

        // Traverse children
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
            targetNode.nodeType === Node.TEXT_NODE &&
            attributes.textContent
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
  applyPatches(oldTree, diffTrees(oldTree, newTree));
}

export default diffing;
