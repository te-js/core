import { button, div } from "../../..";
import store from "../../../store";
import { Component } from "../component";

// interface FutureProps<T> {
//   builder: (value: T) => TElement;
//   error?: (error: Error) => TElement;
//   loading?: () => TElement;
// }

// interface IState<T> {
//   error: Error | null;
//   loading: boolean;
//   data: T | null;
// }

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

class Future extends Component {
  private result: any[] = this.state([]);
  private loading = this.state(false);

  constructor() {
    super();
  }

  init() {
    return;
  }

  mounted() {
    console.log("mounted");
  }

  build() {
    const myStore = store.watch(this);
    return div(
      myStore.value,
      JSON.stringify(this.result),
      this.loading.value ? "Loading..." : "Completed",
      button({ class: "text-dark", onclick: () => this.onclick() }, "reset")
    );
  }

  onclick() {
    store.set((clone) => (clone.value = 0));
  }
}

export { Future };
