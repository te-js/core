import { customId } from "../utils";
import Component from "./stateful";

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
}

export default Stateless;
