import { htmlTags } from "../tags";
import { BaseComponent } from "./base-component";
import { DefaultComponent } from "./component";
import Component from "./default/default-component";

type BaseElement<T extends Tag> =
  | BaseComponent<T>
  | DefaultComponent
  | BaseTypes;

export function $<T extends Tag>(
  tag: T,
  props: IntrinsicAttributes<T>,
  ...children: BaseElement<T>[]
): BaseComponent<T> {
  return new BaseComponent<T>(tag, props, ...children);
}

type BaseComponentBuilder = {
  (
    props?: BaseComponent<Tag>["props"],
    ...children: BaseElement<Tag>[]
  ): BaseComponent<Tag>;
  (...children: BaseElement<Tag>[]): BaseComponent<Tag>;
};
const components = Object.fromEntries(
  htmlTags.map((tag) => [
    tag,
    (<T extends Tag>(...args: (BaseElement<T> | IntrinsicAttributes<T>)[]) => {
      if (
        args[0] instanceof DefaultComponent ||
        args[0] instanceof BaseComponent ||
        args[0] instanceof Component
      ) {
        return $(tag, {}, ...(args as BaseElement<T>[]));
      } else if (typeof args[0] === "object") {
        const [props = {}, ...children] = args;
        return $(tag, { ...props }, ...(children as BaseElement<T>[]));
      } else {
        return $(tag, {}, ...(args as BaseElement<T>[]));
      }
    }) as BaseComponentBuilder,
  ])
) as Record<Tag, BaseComponentBuilder>;

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
