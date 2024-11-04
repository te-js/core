import { htmlTags } from "../tags";
import Stateful from "./stateful";
import Stateless from "./stateless";

type BaseElement = Stateful | any;

function baseComponent<T extends Tag>(
  tag: T,
  props: IntrinsicAttributes<T>,
  ...children: BaseElement[]
): Stateless<T> {
  return new Stateless(tag, props, ...children);
}
type ComponentBuilder = {
  (props?: Stateless<Tag>["props"], ...children: BaseElement[]): Stateless<Tag>;
  (...children: BaseElement[]): Stateless<Tag>;
};
const components = Object.fromEntries(
  htmlTags.map((tag) => [
    tag,
    ((...args: any[]) => {
      if (args[0] instanceof Stateful || args[0] instanceof Stateless) {
        return baseComponent(tag, {}, ...args);
      } else if (typeof args[0] === "object") {
        const [props = {}, ...children] = args;
        return baseComponent(tag, { ...props }, ...children);
      } else {
        return baseComponent(tag, {}, ...args);
      }
    }) as ComponentBuilder,
  ])
) as Record<Tag, ComponentBuilder>;

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
