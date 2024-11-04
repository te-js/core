import { div, h1, h2, p, section } from "./core";
import Stateful from "./core/component/stateful";
import run from "./core/run";

class Test extends Stateful {
  build() {
    return div("prova", h1(), prova(), new Test2());
  }
}
class Test2 extends Stateful {
  build() {
    return section(div(), h2());
  }
}

function prova() {
  return div(1, p("p"));
}

run(new Test());
