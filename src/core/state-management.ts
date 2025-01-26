import Component from "./component/default/default-component";

class Store<T extends object> {
  protected components: Set<Component> = new Set();
  constructor(protected value: T) {}

  read() {
    return this.value;
  }
  watch<T extends Component>(component: T) {
    this.components.add(component);
  }
  unwatch<T extends Component>(component: T) {
    this.components.delete(component);
  }
  write() {}
}

export default Store;
