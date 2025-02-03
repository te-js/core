import { button, Component, div, h1, main, p, route, Store } from "./index";

interface IStore {
  value: number;
  toggle: boolean;
  pr?: string;
}

const store = new Store<IStore>({ value: 0, toggle: false });

async function fetchPosts() {
  let result: any = await fetch("https://jsonplaceholder.typicode.com/posts");
  result = await result.json();
  return result;
}
class Prova extends Component {
  private counter = this.state(store.read());
  build() {
    return main("Main", JSON.stringify(this.counter));
  }
}
const pr = new Prova();
class Main extends Component {
  // value = store.watch(this);
  counter = this.state(0);
  build() {
    return main(
      div(
        pr,
        // new Future(fetchPosts(), {
        //   loading: () => p("loading..."),
        //   builder: (value) => p(JSON.stringify(value)),
        //   error: (error) => p(error.message),
        // }),
        button({ onclick: () => this.increment() }, "Increment"),
        p({ class: "prova" }, `ciao mondo ${this.counter.value}`),
        h1("example counter "),
        p("Store ", store.read().value),
        button({ onclick: () => this.modifyStore() }, "Increment"),
        // prova,
        p(this.counter.value),
        button({ onclick: () => this.decrement() }, "Decrement")
      )
    );
  }

  increment() {
    this.set(() => {
      store.watch(this).value++;
      this.counter.value++;
    });
    console.log("ddidididdi");
  }
  decrement() {
    store.watch(this).value--;
    // this.counter.value--;
  }
  modifyStore() {
    this.counter.value++;
    // this.value.toggle = !this.value.toggle;
  }
}

route({
  "/": () => new Main(),
  "/about": () => new Prova(),
});
