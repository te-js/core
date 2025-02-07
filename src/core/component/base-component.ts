// import { IntrinsicAttributes, Tag } from "../../types";
import { customId } from "../utils";
import { Component } from "./component";
import DefaultComponent from "./default/default-component";

class TNode<T extends Tag> extends DefaultComponent {
  tag: T;
  id: string;
  path: number[];
  children: (TNode<Tag> | Component | BaseTypes)[];
  props: IntrinsicAttributes<T>;
  constructor(
    tag: T,
    props: IntrinsicAttributes<T>,
    ...children: (TNode<Tag> | Component | BaseTypes)[]
  ) {
    super();
    this.tag = tag;
    this.id = customId().toString();
    this.path = [];
    this.props = props;
    this.children = children;
  }
  public setPath(parentPath: number[] | null = null) {
    function dfs<T1 extends Tag>(
      current: TNode<T1> | Component | BaseTypes,
      path: number[]
    ) {
      let child;
      if (current instanceof Component) {
        current.path = path;
        child = current.build();
        while (child instanceof Component) {
          child = child.build();
        }
      } else if (current instanceof TNode) {
        child = current;
      } else return;
      child!.path = path;
      for (let i = 0; i < child!.children.length; i++) {
        dfs(child!.children[i], [...path, i]);
      }
    }
    if (parentPath) this.path = parentPath;
    dfs(this, this.path);
  }
}

export { TNode };
