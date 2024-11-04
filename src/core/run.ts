import Stateful from "./component/stateful";
import { convertElementToHTMLNMode } from "./utils";

export default function run(page: Stateful) {
  const element = page.build();
  element.path = [0];
  element.setPath();
  const root = convertElementToHTMLNMode(element);
  console.log(element);
  console.log(root);
  document.body.innerHTML = "";
  document.body.appendChild(root);
}
