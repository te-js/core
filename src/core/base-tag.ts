import Component from "./component";

function baseComponent<T extends Tag>(
  tag: Tag,
  props: string,
  ...children: Component[]
) {
  return new Component(tag, children);
}
