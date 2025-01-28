import { page } from "./core/component/decorators";
import Store from "./core/state-management";
import {
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
const store = new Store(
  { value: 0 },
  {
    increment: (value) => {
      value.value++;
      return value;
    },
    decrement: (value) => {
      value.value--;
      return value;
    },
  }
);

@page("/")
class Main extends DefaultComponent {
  build() {
    const value = store.watch(this);
    return main(
      div(
        p({ class: "prova" }, `ciao mondo ${value.value}`),
        h1("example counter"),
        button({ onclick: () => this.modifyStore() }, "Increment"),
        new Test()
      )
    );
  }
  modifyStore() {
    store.write("increment");
  }
}

@page("/about")
class Test extends DefaultComponent {
  counter = this.state(0);
  testo = this.state("");
  loading = false;
  result: any[] = [];
  build() {
    return div(
      div(
        h1(
          {
            class: "prova",
          },
          `ciao ${this.counter.value}`
        ),
        input({
          type: "text",
          class: "bg-red",
          onchange: (e: Event) => {
            // this.counter.value = (e.target as HTMLInputElement).value;
            console.log((e.target as HTMLInputElement).value);
            this.testo.value = (e.target as HTMLInputElement).value;
          },
        }),
        button({ class: "counter", onclick: this.onclick.bind(this) }, "+ 1"),
        button({ class: "counter", onclick: this.decrease.bind(this) }, "- 1")
      ),
      p({}, this.testo.value),
      div({ class: "container" }, ...boxes(this.counter.value))
    );
  }
  async onclick() {
    this.counter.value += 1;
  }
  decrease() {
    this.counter.value--;
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
