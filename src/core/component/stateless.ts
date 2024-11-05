import { customId } from "../utils";
import { default as Component, default as Stateful } from "./stateful";

export class Stateless<T extends Tag> {
  tag: T;
  id: string;
  path: number[];
  children: (Stateless<Tag> | Component | any)[];
  props: Partial<IntrinsicAttributes<T>>;
  constructor(
    tag: T,
    props: Partial<IntrinsicAttributes<T>>,
    ...children: (Stateless<Tag> | Component | any)[]
  ) {
    this.tag = tag;
    this.id = customId().toString();
    this.path = [];
    this.props = props;
    this.children = children;
  }
  public setPath() {
    function dfs(current: Stateless<T> | Stateful | any, path: number[]) {
      let child;
      if (current instanceof Stateful) {
        current.path = path;
        console.log(current, path);
        
        child = current.build();
      } else if (current instanceof Stateless) {
        child = current;
      } else return;
      child!.path = path;
      for (let i = 0; i < child!.children.length; i++) {
        dfs(child!.children[i], [...path, i]);
      }
    }
    dfs(this, this.path);
  }
}

export default Stateless;
