import { a, button, div, h1, input, main, p, route, Stateful } from "./index";

class Main extends Stateful {
  async init() {
    super.init();
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
      a({ href: "/about" }, "Google"),
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

class Counter extends Stateful {
  counter = this.state(0, { searchParams: true });
  name = this.state("");
  reference = this.ref();
  async build() {
    return div(
      { cache: true },
      p(this.name.value),
      p(this.counter.value),
      input({
        cache: true,
        ref: this.reference,
        type: "text",
        style: "color=black",
        value: this.name.value,
        oninput: (e: any) => {
          // this.name.value = e.target.value;
          console.log(e.target.value);

          this.name.value = e.target.value;
        },
      }),
      p(this.reference.target?.tagName || "NO reference"),
      button({ onclick: () => this.click() }, "+ 1")
    );
  }
  click() {
    this.counter.value++;
  }
}

class Counter2 extends Stateful {
  counter = this.state(0);
  name = this.state("");
  build() {
    return div(main(div(h1(new Counter()))));
  }
}

route({
  "/": () => new Main(),
  "/about": () => new Test(),
  "/counter": () => new Counter2(),
});
