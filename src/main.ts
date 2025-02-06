import { button, Component, div, h1, main, p, route, TElement } from "./index";
import store from "./store";

// async function fetchPosts(): Promise<any[]> {
//   let result: any = await fetch("https://jsonplaceholder.typicode.com/posts");
//   result = await result.json();
//   setTimeout(() => {}, 1000);

//   return await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(result);
//     }, 1000);
//   });
// }

class Item extends Component {
  #toggle = this.state(false);
  constructor(private i: number) {
    super();
  }

  build() {
    return div(
      {
        onclick: () => this.#onToggle(),
        class: `${this.#toggle.value && "text-dark"}`,
      },
      this.i.toString()
    );
  }
  #onToggle() {
    this.#toggle.value = !this.#toggle.value;
  }
}

class Prova extends Component {
  private loading = this.state(false);
  private test = this.state<{ pr: { pro: number } }>({ pr: { pro: 0 } });
  constructor() {
    super();
  }
  build() {
    const myStore = store.watch(this);
    return main(
      "Main",
      this.loading.value ? "Loading..." : "Completed",
      p(this.test.pr.pro),
      JSON.stringify(myStore),
      // ...this.result.map(this.postItem),
      div(
        { class: "flex" },
        ...Array.from({ length: this.test.pr.pro }).map((_, i) => new Item(i))
      ),
      button({ class: "text-dark", onclick: () => this.onclick() }, "add"),
      button({ class: "text-dark", onclick: () => this.test.pr.pro++ }, "add")
    );
  }

  postItem(singlePost: any): TElement {
    return div({}, singlePost.userId);
  }

  onclick() {
    store.set((clone) => {
      clone.value++;
    });
  }
}

class Main extends Component {
  counter = this.state(0);
  prova = this.state(new Prova());
  constructor() {
    super();
    console.log("Main");
  }

  changeMode() {
    store.set((clone) => {
      clone.toggle = !clone.toggle;
    });
    document.body.classList.toggle("dark-theme");
  }

  build() {
    const myStore = store.watch(this);
    return main(
      div(
        button(
          {
            class: "text-dark",
            onclick: () => this.changeMode(),
          },
          myStore.toggle ? "dark" : "light"
        ),
        this.prova,
        button(
          { class: "text-dark", onclick: () => this.increment() },
          "Increment"
        ),
        p({ class: "prova" }, `ciao mondo ${this.counter.value}`),
        h1("example counter "),
        p("Store ", myStore.value),
        button(
          { class: "text-dark", onclick: () => this.modifyStore() },
          "Increment"
        ),
        // prova,
        p(store.watch(this).value),
        button(
          { class: "text-dark", onclick: () => this.decrement() },
          "Decrement"
        )
      )
    );
  }

  increment() {
    this.counter.value++;
  }
  decrement() {
    this.counter.value--;
  }
  modifyStore() {
    this.counter.value++;
  }
}

route({
  "/": () => new Main(),
  "/about": () => new Prova(),
});
