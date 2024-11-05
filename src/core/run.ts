import Stateful from "./component/stateful";
import router from "./router";
import { convertElementToHTMLNMode } from "./utils";

export default function run(page: Stateful) {
  router.pathname = window.location.pathname;
  page.path = [0];
  const element = page.build();
  element.path = [0];
  element.setPath();
  const root = convertElementToHTMLNMode(element);
  document.body.innerHTML = "";
  document.body.appendChild(root);
}
