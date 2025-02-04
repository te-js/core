import { Component } from "./component/component";

class Store<T extends object> {
  private listen: boolean = true;
  protected components: Set<Component> = new Set();

  constructor(protected value: T) {}

  read(): T {
    return this.value;
  }

  private proxy<T extends object>(value: T): T {
    return new Proxy(value, {
      get: (target, prop, receiver) => {
        const newValue = Reflect.get(target, prop, receiver);
        if (typeof newValue === "object" && newValue !== null) {
          return this.proxy(newValue);
        }
        return newValue;
      },
      set: (target, prop, newValue, receiver) => {
        const result = Reflect.set(target, prop, newValue, receiver);
        this.listen && this.notifyComponents();
        return result;
      },
    });
  }

  public watch(component: Component): T {
    this.components.add(component);
    return this.proxy(this.value);
  }

  public set(callback: (value: T) => void) {
    this.listen = false;
    callback(this.value);
    this.listen = true;
    // console.log(this.value);
    this.notifyComponents();
  }

  public unwatch(component: Component): void {
    this.components.delete(component);
  }

  private notifyComponents(): void {
    // console.log(this.components);
    for (const component of this.components) {
      component.rerender();
      // console.log(component);
    }
  }
}

export { Store };
