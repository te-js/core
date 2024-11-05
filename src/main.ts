import { a, button, div, h1, main, p } from "./core";
import Stateful from "./core/component/stateful";
import run from "./core/run";

class Main extends Stateful {
  async init() {
    super.init();
    console.log("init");
  }
  build() {
    return main(div(p("ciao mondo"), h1("example counter"), new Test()));
  }
}

class Test extends Stateful {
  counter = 0;
  loading = false;
  result: any[] = [];
  build() {
    return div(
      a({ href: "/asdfasdfasdf" }, "Google"),
      div(
        h1(
          {
            class: "prova",
          },
          `ciao ${this.counter}`,
          ...(this.result.map((e) => p(e["id"])) || "no data")
        ),
        this.loading && h1("Loading..."),
        button({ class: "counter", onclick: () => this.onclick() }, "+ 1")
      ),
      div(
        { class: "container" },
        ...Array.from({ length: this.counter }, (_, i) => i).map((e) =>
          div({ class: "box" }, p(e))
        )
      )
    );
  }
  async onclick() {
    this.set(() => (this.counter += 1));
  }
}

run(new Main());
