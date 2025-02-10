import { Resolver } from "./core/component/default/future";
import { pulse } from "./core/render";
import { button, Component, div, main, route } from "./index";
import store from "./store";

async function fetchPosts(): Promise<any[]> {
  let result: any = await fetch("https://jsonplaceholder.typicode.com/posts");
  result = await result.json();
  setTimeout(() => {}, 1000);

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
}

class CounterItem extends Component {
  #count = this.state(0);
  constructor(key?: string) {
    super(key);
  }
  build() {
    const myStore = store.watch(this);
    return div(
      div(
        { class: "box" },
        this.#button("-", () => this.#count.value--),
        ` ${this.#count.value} `,
        myStore.toggle,
        this.#button("+", () => this.#count.value++)
      )
    );
  }
  #button(label: string, action: () => void) {
    return button({ class: "text-dark", onclick: () => action() }, label);
  }
}

class Parent extends Component {
  #counter = this.state(0);

  constructor(key?: string) {
    super(key);
  }
  build() {
    return div(
      main(
        { class: "center" },
        button(
          { class: "text-dark", onclick: () => this.#counter.value++ },
          "add"
        ),
        this.#counter.value,
        new CounterItem("29"),
        new CounterItem("2")
      )
    );
  }
}

class Parent2 extends Component {
  #toggle = this.state(false);
  #counter = this.state(0);
  build() {
    return div(
      this.#toggleui(),
      new Resolver("myFuture", fetchPosts(), {
        builder: (value) => div("fatto ", value.length),
        loading: () => div("loading"),
      }),
      new Parent("pr")
    );
  }
  #toggleui() {
    const myStore = store.watch(this);
    return button(
      {
        class: "text-dark",
        onclick: () => this.#toggleValue(),
      },
      myStore.toggle ? "SIIII" : "NOOO"
    );
  }

  #toggleValue() {
    pulse(() => {
      this.#toggle.value = !this.#toggle.value;
      this.#counter.value++;
      const myStore = store.watch(this);
      myStore.toggle = !myStore.toggle;
    }, [this]);
  }
}

route({
  "/": () => new Parent2("prprprp"),
  "/about": () => new Parent2("prprprp"),
});
