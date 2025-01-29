import { page } from "./core/component/decorators";
import {
  button,
  Component,
  div,
  h1,
  input,
  main,
  p,
  route,
  Store,
} from "./index";

interface IStore {
  value: number;
  toggle: boolean;
  pr?: string;
}

const store = new Store<IStore>({ value: 0, toggle: false });

@page("/")
class Main extends Component {
  value = store.watch(this);
  counter = this.state(0);
  build() {
    return main(
      div(
        p({ class: "prova" }, `ciao mondo ${this.value.value}`),
        h1("example counter ", store.read().toggle ? "yes" : "no"),
        button({ onclick: () => this.modifyStore() }, "Increment"),
        p(this.counter.value),
        TestState(this.counter)
      )
    );
  }
  modifyStore() {
    // this.value.toggle = !this.value.toggle;
  }
}

function TestState({ value }: { value: number }) {
  return button({ onclick: () => value++ }, `DAI ${value}`);
}

@page("/about")
class Test extends Component {
  counter = this.state(0);
  testo = this.state("");
  loading = false;
  result: any[] = [];
  value = store.read();
  build() {
    return div(
      h1(this.value.value),
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
          oninput: (e: Event) => {
            this.testo.value = (e.target as HTMLInputElement).value;
          },
        }),
        button({ class: "counter", onclick: this.onclick.bind(this) }, "+ 1"),
        button({ class: "counter", onclick: this.decrease.bind(this) }, "- 1")
      ),
      p({}, this.testo.value, " ", this.value.value),
      div({ class: "container" }, ...boxes(this.counter.value))
    );
  }
  async onclick() {
    // this.value.value++;
    this.counter.value += 1;
  }
  decrease() {
    this.counter.value--;
  }
}

function boxes(length: number) {
  return Array.from({ length }, (_, i) => i).map((e) =>
    div({ class: "box" }, e)
  );
}

class Counter extends Component {
  counter = this.state(0);
  name = this.state("");
  reference = this.ref();
  async build() {
    return div(
      { onload: () => {} },
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
      )
      // JSON.stringify(this.router.search)
    );
  }
}

@page("/counter")
class Counter2 extends Component {
  build() {
    return div(main(div(h1(new Counter()))));
  }
}

route({
  "/": () => new Main(),
  "/about": () => new Test(),
  "/counter": () => new Counter2(),
});
