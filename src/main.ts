import { button, Component, div, main, route } from "./index";

class CounterItem extends Component {
  #count = this.state(0);

  constructor(protected key: string) {
    super(key);
  }

  build() {
    return div(
      div(
        { class: "box" },
        `Counter ${this.key}: ${this.#count.value}`,
        button(
          {
            onclick: () => this.#count.value++,
            class: "text-dark",
          },
          "Increment"
        )
      )
    );
  }
}

class Parent extends Component {
  #parentCount = this.state(0);

  build() {
    return main(
      { class: "center" },
      div(
        "Parent count: ",
        this.#parentCount.value,
        button(
          {
            onclick: () => this.#parentCount.value++,
            class: "text-dark",
          },
          "Increment Parent (Will Rerender)"
        )
      ),
      // These counters should maintain their state even when parent rerenders
      new CounterItem("counter1"),
      new CounterItem("counter2")
    );
  }
}

route({
  "/": () => new Parent(),
});
