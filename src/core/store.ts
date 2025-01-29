import { Component } from "./component/component";

class Store<T extends object> {
  protected components: Set<Component> = new Set();

  constructor(protected value: T) {}

  // Returns the current state
  read(): T {
    return this.value;
  }

  private proxy<T extends object>(value: T): T {
    return new Proxy(value, {
      set: (target, p, newValue, receiver) => {
        const newStore = Reflect.set(target, p, newValue, receiver);
        this.notifyComponents();
        return newStore;
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
    for (const component of this.components) {
      if (component instanceof Component) {
        component.rerender();
      }
    }
  }
}

export { Store };
