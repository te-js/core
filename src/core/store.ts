import { Component } from "./component/component";

class Store<T extends object> {
  protected components: Set<Component> = new Set();

  constructor(protected value: T) {}

  read(): T {
    return this.value;
  }

  private proxy<T extends object>(value: T): T {
    return new Proxy(value, {
      get: (target, prop, receiver) => {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "object" && value !== null) {
          return this.proxy(value);
        }
        return value;
      },
      set: (target, prop, newValue, receiver) => {
        const result = Reflect.set(target, prop, newValue, receiver);
        this.notifyComponents();
        return result;
      },
    });
  }

  watch(component: Component): T {
    this.components.add(component);
    return this.proxy(this.value);
  }

  unwatch(component: Component): void {
    this.components.delete(component);
  }

  private notifyComponents(): void {
    console.log("PR");
    for (const component of this.components) {
      // if (component instanceof Component) {
      component.rerender();
      console.log(component);
      // }
    }
  }
}

export { Store };
