import { page } from "./core/component/decorators";
import {
  $,
  a,
  BaseComponent,
  button,
  DefaultComponent,
  div,
  h1,
  input,
  main,
  p,
  route,
} from "./index";

@page("/")
class Main extends DefaultComponent {
  build() {
    return main(
      div(p({ class: "" }, "ciao mondo"), h1("example counter"), new Test())
    );
  }
}

@page("/about")
class Test extends DefaultComponent {
  counter = this.state(0);
  loading = false;
  result: any[] = [];
  build() {
    return div(
      a({ href: "/about" }, "Google"),
      div(
        $("a", { href: "" }),
        h1(
          {
            class: "prova",
          },
          `ciao ${this.counter.value}`,
          ...(this.result.map((e) => p(e["id"])) || "no data")
        ),
        a({ href: "" }, ""),
        this.loading && h1("Loading..."),
        button({ class: "counter", onclick: this.onclick.bind(this) }, "+ 1")
      ),
      div({ class: "container" }, ...boxes(this.counter.value))
    );
  }
  async onclick() {
    this.counter.value += 1;
  }
}

function boxes(length: number): BaseComponent<Tag>[] {
  return Array.from({ length }, (_, i) => i).map((e) =>
    div({ class: "box" }, e)
  );
}

class Counter extends DefaultComponent {
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
        type: "text",
        style: "color=black",
        value: this.name.value,
      }),
      p(this.reference.target?.tagName || "NO reference"),
      button(
        {
          class: "capisci dai",
          onclick: (e: MouseEvent) => {
            console.log(e);
          },
        },
        "+ 1"
      ),
      JSON.stringify(this.router.search)
    );
  }
}

@page("/counter")
class Counter2 extends DefaultComponent {
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
