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

class Item extends Component {
  #toggle = this.state(false);
  constructor(
    protected key: string,
    private i: number,
    private change: () => void
  ) {
    super(key);
  }

  build() {
    return div(
      {
        onclick: () => this.#click(),
        class: `${this.#toggle.value && "text-dark"}`,
      },
      this.i.toString()
    );
  }

  #click() {
    this.#toggle.value = !this.#toggle.value;
    this.change();
  }
}

class Prova extends Component {
  private counter = this.state(0);
  build() {
    const myStore = store.watch(this);
    return main(
      "Main",
      JSON.stringify(myStore),
      div(
        { class: "flex" },
        ...Array.from({ length: this.counter.value }).map(
          (_, i) => new Item(i.toString(), i, this.#change)
        )
      ),
      button({ class: "text-dark", onclick: () => this.onclick() }, "add"),
      button(
        { class: "text-dark", onclick: () => this.toggleDarkMode() },
        myStore.toggle ? "light" : "dark"
      )
    );
  }

  toggleDarkMode() {
    store.set((clone) => {
      clone.toggle = !clone.toggle;
    });
    document.body.classList.toggle("dark-theme");
  }

  onclick() {
    console.log(this.path);
    this.counter.value++;
  }

  #change() {
    console.log(this.path);
  }
}

class FutureTest extends Component {
  #data = this.state<{ data: any }>({ data: null });
  #loading = this.state(false);
  // #error = this.state<{ error: any }>({ error: null });
  constructor(protected key: string) {
    super(key);
    this.init(() => this.#onInit());
  }

  #onInit() {
    this.#loading.value = true;
    fetchPosts()
      .then((data) => {
        console.log(data);
        this.#data.data = data;
      })
      .finally(() => (this.#loading.value = false));
  }
  build() {
    return div(
      this.#loading.value ? "Loading..." : "Completed",
      " ",
      // JSON.stringify(this.#data.data)
      this.#data.data?.length || "No data"
    );
  }
}

class Main extends Component {
  counter = this.state(0);
  constructor() {
    super();
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
      new FutureTest("future"),
      div(myStore.toggle, " ", myStore.value),
      new Prova("prova")
    );
  }
}

route({
  "/": () => new Main(),
  "/about": () => new Prova("prova"),
});
