import { button, div, h1, h2, link, p, section } from "./core";
import Stateful from "./core/component/stateful";
import run from "./core/run";

class Test extends Stateful {
  counter = 0;
  build() {
    return div(
      link({ rel: "stylesheet", href: "style.css" }),
      div(
        { class: "center" },
        h1(
          {
            class: "prova",
          },
          `ciao ${this.counter}`
        ),
        button({ class: "counter", onclick: () => this.onclick() }, "+ 1")
      )
    );
  }
  onclick() {
    console.log(this.counter);
    this.set(() => this.counter++);
  }
}
class Test2 extends Stateful {
  build() {
    return section(div(), h2());
  }
}
function prova() {
  return div({ class: "counter" }, 1, p("p"));
}

run(new Test());
