import { DefaultComponent } from "./component/component";

class Store<
  T extends object,
  M extends Record<string, (value: T, ...args: any) => T>
> {
  protected components: Set<DefaultComponent> = new Set();

  constructor(protected value: T, protected modifiers: M) {}

  // Returns the current state
  read(): T {
    return this.value;
  }

  watch(component: DefaultComponent): T {
    this.components.add(component);
    return this.read();
  }

  unwatch(component: DefaultComponent): void {
    this.components.delete(component);
  }

  write<K extends keyof M>(modifier: K, ...args: Parameters<M[K]> | []): void {
    this.value = this.modifiers[modifier](this.value, ...args);
    this.notifyDefaultComponents();
  }

  protected notifyDefaultComponents(): void {
    for (const component of this.components) {
      if (component instanceof DefaultComponent) {
        component.rerender();
      }
    }
  }
}

export default Store;
