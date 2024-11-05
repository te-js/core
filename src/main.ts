import { a, button, div, h1, main, p } from "./core";
import Stateful from "./core/component/stateful";
import run from "./core/run";

class Main extends Stateful {
  build() {
    return main(div(p("ciao mondo"), h1("example counter"), new Test()));
  }
}

class Test extends Stateful {
  counter = "ciao";
  result = {};
  build() {
    return div(
      // link({ rel: "stylesheet", href: "style.css" }),
      a({ href: "https://google.com" }, "Google"),
      div(
        h1(
          {
            class: "prova",
          },
          `ciao ${this.counter}`,
          JSON.stringify(this.result)
        ),
        button({ class: "counter", onclick: () => this.onclick() }, "+ 1")
      )
    );
  }
  onclick() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.set(() => (this.result = json));
      });
    this.set(() => (this.counter += "a"));
  }
}

run(new Main());
