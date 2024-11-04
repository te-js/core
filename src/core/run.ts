import Stateful from "./component/stateful";
import { convertElementToHTMLNMode } from "./utils";

export default function run(page: Stateful) {
  const element = page.build();
  const root = convertElementToHTMLNMode(element);
  console.log(element);
  console.log(root);

  document.body.appendChild(root);
  // document.body.appendChild()
}
