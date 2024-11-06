import { IntrinsicAttributes, Tag } from "../../types";
import { customId } from "../utils";
import { Stateful } from "./stateful";

class Component<T extends Tag> {
  tag: T;
  id: string;
  path: number[];
  children: (Component<Tag> | Stateful | any)[];
  props: IntrinsicAttributes<T>;
  constructor(
    tag: T,
    props: IntrinsicAttributes<T>,
    ...children: (Component<Tag> | Stateful | any)[]
  ) {
    this.tag = tag;
    this.id = customId().toString();
    this.path = [];
    this.props = props;
    this.children = children;
  }
  public setPath() {
    function dfs(current: Component<T> | Stateful | any, path: number[]) {
      let child;
      if (current instanceof Stateful) {
        current.path = path;
        console.log(current, path);

        child = current.build();
      } else if (current instanceof Component) {
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

export { Component };
