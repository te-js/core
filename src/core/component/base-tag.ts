import { htmlTags } from "../tags";
import { TNode } from "./base-component";
import { Component } from "./component";

type BaseElement<T extends Tag> = TNode<T> | Component | BaseTypes;

export function $<T extends Tag>(
  tag: T,
  props: IntrinsicAttributes<T>,
  ...children: BaseElement<T>[]
): TNode<T> {
  return new TNode<T>(tag, props, ...children);
}

type TNodeBuilder = {
  (props?: TNode<Tag>["props"], ...children: BaseElement<Tag>[]): TNode<Tag>;
  (...children: BaseElement<Tag>[]): TNode<Tag>;
};
const components = Object.fromEntries(
  htmlTags.map((tag) => [
    tag,
    (<T extends Tag>(...args: (BaseElement<T> | IntrinsicAttributes<T>)[]) => {
      if (args[0] instanceof Component || args[0] instanceof TNode) {
        return $(tag, {}, ...(args as BaseElement<T>[]));
      } else if (typeof args[0] === "object") {
        const [props = {}, ...children] = args;
        return $(tag, { ...props }, ...(children as BaseElement<T>[]));
      } else {
        return $(tag, {}, ...(args as BaseElement<T>[]));
      }
    }) as TNodeBuilder,
  ])
) as Record<Tag, TNodeBuilder>;


export const {
  a,
  abbr,
  address,
  area,
  article,
  aside,
  audio,
  b,
  base,
  bdi,
  bdo,
  blockquote,
  body,
  br,
  button,
  canvas,
  caption,
  cite,
  code,
  col,
  colgroup,
  data,
  datalist,
  dd,
  del,
  details,
  dfn,
  dialog,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  hr,
  html,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  label,
  legend,
  li,
  link,
  main,
  map,
  mark,
  menu,
  meta,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  option,
  output,
  p,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  ruby,
  s,
  samp,
  script,
  section,
  select,
  slot,
  small,
  source,
  span,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  textarea,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  track,
  u,
  ul,
  video,
  wbr,
} = components;
