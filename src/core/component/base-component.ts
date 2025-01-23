// import { IntrinsicAttributes, Tag } from "../../types";
import { customId } from "../utils";
import { DefaultComponent } from "./component";
import Component from "./default/default-component";

class BaseComponent<T extends Tag> extends Component {
  tag: T;
  id: string;
  path: number[];
  children: (BaseComponent<Tag> | DefaultComponent | BaseTypes)[];
  props: IntrinsicAttributes<T>;
  constructor(
    tag: T,
    props: IntrinsicAttributes<T>,
    ...children: (BaseComponent<Tag> | DefaultComponent | BaseTypes)[]
  ) {
    super();
    this.tag = tag;
    this.id = customId().toString();
    this.path = [];
    this.props = props;
    this.children = children;
  }
  public setPath() {
    async function dfs<T1 extends Tag>(
      current: BaseComponent<T1> | DefaultComponent | BaseTypes,
      path: number[]
    ) {
      let child;
      if (current instanceof DefaultComponent) {
        current.path = path;
        child = await current.build();
        while (child instanceof DefaultComponent) {
          child = await child.build();
        }
      } else if (current instanceof BaseComponent) {
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

export { BaseComponent };
