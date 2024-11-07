// declare global {
type AriaAttributes = {
  "aria-activedescendant"?: string;
  "aria-atomic"?: "true" | "false";
  "aria-autocomplete"?: "none" | "inline" | "list" | "both";
  "aria-busy"?: "true" | "false";
  "aria-checked"?: "true" | "false" | "mixed";
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-disabled"?: "true" | "false";
  "aria-expanded"?: "true" | "false";
  "aria-haspopup"?: "true" | "false" | "menu" | "listbox" | "tree" | "grid";
  "aria-hidden"?: "true" | "false";
  "aria-invalid"?: "true" | "false" | "grammar" | "spelling";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-level"?: number;
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-modal"?: "true" | "false";
  "aria-multiselectable"?: "true" | "false";
  "aria-orientation"?: "horizontal" | "vertical";
  "aria-placeholder"?: string;
  "aria-pressed"?: "true" | "false" | "mixed";
  "aria-readonly"?: "true" | "false";
  "aria-relevant"?: "additions" | "removals" | "text";
  "aria-required"?: "true" | "false";
  "aria-roledescription"?: string;
  "aria-selected"?: "true" | "false";
  "aria-setsize"?: number;
  "aria-sort"?: "ascending" | "descending" | "none";
  "aria-valuemax"?: number;
  "aria-valuemin"?: number;
  "aria-valuenow"?: number;
  "aria-valuetext"?: string;
};

type HtmlAttributes = {
  // Custom props
  cache?: boolean;
  ref?: HTMLElement;
  accept?: string; // file input types
  "accept-charset"?: string; // form character set
  accesskey?: string; // accessibility keyboard shortcuts
  action?: string; // form action URL
  align?: string; // deprecated (alignment)
  alt?: string; // alternative text for images
  async?: boolean; // async script loading
  autocapitalize?: string; // text capitalization
  autocomplete?: string; // form auto-completion
  autofocus?: boolean; // automatic focus on page load
  autoplay?: boolean; // media autoplay
  background?: string; // deprecated (background image)
  bgcolor?: string; // deprecated (background color)
  border?: string | number; // deprecated (border)
  buffered?: boolean; // media buffering
  capture?: boolean | string; // input media capture
  challenge?: string; // keygen challenge
  charset?: string; // character set for scripts
  checked?: boolean; // checkbox or radio button
  cite?: string; // citation for quotes
  class?: string; // CSS class
  code?: string; // object code
  codebase?: string; // object codebase
  color?: string; // font color
  cols?: number; // textarea columns
  colspan?: number; // table cell column span
  content?: string; // meta content
  contenteditable?: "true" | "false"; // content editable toggle
  contextmenu?: string; // custom context menu
  controls?: boolean; // media controls
  coords?: string; // image map coordinates
  crossorigin?: "anonymous" | "use-credentials"; // CORS settings for resources
  csp?: string; // Content Security Policy
  // "data-*"?: string; // custom data attributes
  [key: `data-${string}`]: any | undefined;
  datetime?: string; // datetime value
  decoding?: "async" | "auto" | "sync"; // image decoding hint
  default?: boolean; // default media track
  defer?: boolean; // defer script execution
  dir?: "ltr" | "rtl" | "auto"; // text direction
  dirname?: string; // form input direction name
  disabled?: boolean; // disable form elements
  download?: boolean | string; // download link
  draggable?: boolean; // draggable element
  dropzone?: string; // drop target for dragged data
  enctype?: string; // form encoding type
  enterkeyhint?: string; // hint for enter key action
  for?: string; // label target ID
  form?: string; // form association
  formaction?: string; // form action override
  formenctype?: string; // form encoding override
  formmethod?: string; // form method override
  formnovalidate?: boolean; // form validation override
  formtarget?: string; // form target override
  headers?: string; // table cell header IDs
  height?: number | string; // element height
  hidden?: boolean; // hidden element
  high?: number; // range high value
  href?: string; // link URL
  hreflang?: string; // link language
  "http-equiv"?: string; // meta HTTP headers
  icon?: string; // link icon
  id?: string; // element ID
  importance?: "auto" | "high" | "low"; // resource load importance
  integrity?: string; // subresource integrity
  intrinsicsize?: string; // intrinsic image size
  inputmode?: string; // input mode hint
  is?: string; // custom element type
  ismap?: boolean; // image map indicator
  itemprop?: string; // microdata property
  keytype?: string; // keygen type
  kind?: string; // media track kind
  label?: string; // media track label
  lang?: string; // element language
  language?: string; // deprecated (script language)
  loading?: "lazy" | "eager"; // lazy-loading for images
  list?: string; // datalist ID
  loop?: boolean; // media loop
  low?: number; // range low value
  manifest?: string; // deprecated (cache manifest)
  max?: number; // maximum value
  maxlength?: number; // maximum text length
  minlength?: number; // minimum text length
  media?: string; // media query
  method?: "GET" | "POST"; // form submission method
  min?: number; // minimum value
  multiple?: boolean; // multiple selection
  muted?: boolean; // media muted
  name?: string; // form control name
  novalidate?: boolean; // form validation toggle
  open?: boolean; // open details
  optimum?: number; // range optimum value
  pattern?: string; // input pattern
  ping?: string; // link ping URL(s)
  placeholder?: string; // input placeholder text
  poster?: string; // video poster image
  preload?: "none" | "metadata" | "auto"; // media preload setting
  radiogroup?: string; // radio button group name
  readonly?: boolean; // read-only input
  referrerpolicy?: string; // referrer policy
  rel?: string; // link relationship
  required?: boolean; // required field
  reversed?: boolean; // reversed ordered list
  rows?: number; // textarea rows
  rowspan?: number; // table cell row span
  sandbox?: string; // iframe security sandbox
  scope?: string; // table header scope
  scoped?: boolean; // scoped CSS (deprecated)
  selected?: boolean; // default option selection
  shape?: string; // area shape
  size?: number; // control size
  sizes?: string; // responsive image sizes
  slot?: string; // web component slot
  span?: number; // colspan/rowspan in table cells
  spellcheck?: boolean; // spellcheck toggle
  src?: string; // resource URL
  srcdoc?: string; // iframe source document
  srclang?: string; // media track language
  srcset?: string; // responsive image set
  start?: number; // ordered list start number
  step?: number; // step for numeric inputs
  style?: string; // inline CSS styles
  summary?: string; // table summary
  tabindex?: number; // tab order
  target?: string; // browsing context target
  title?: string; // element tooltip
  translate?: "yes" | "no"; // translation toggle
  type?: string; // type of element (e.g., input, button)
  usemap?: string; // image map URL
  value?: string | number; // input value
  width?: number | string; // element width
  wrap?: "hard" | "soft" | "off"; // textarea wrap setting
};

type ElementAttributes = {
  a: {
    href: string;
    target?: string;
    rel?: string;
  } & Partial<HtmlAttributes>;

  img: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  } & Partial<HtmlAttributes>;

  button: {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  } & Partial<HtmlAttributes>;

  input: {
    type: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
  } & Partial<HtmlAttributes>;

  textarea: {
    value?: string;
    rows?: number;
    cols?: number;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
  } & Partial<HtmlAttributes>;

  select: {
    value?: string;
    multiple?: boolean;
    disabled?: boolean;
  } & Partial<HtmlAttributes>;

  form: {
    action?: string;
    method?: "GET" | "POST";
    target?: string;
  } & Partial<HtmlAttributes>;

  // Additional elements

  div: Partial<HtmlAttributes>;
  span: Partial<HtmlAttributes>;

  h1: Partial<HtmlAttributes>;
  h2: Partial<HtmlAttributes>;
  h3: Partial<HtmlAttributes>;
  h4: Partial<HtmlAttributes>;
  h5: Partial<HtmlAttributes>;
  h6: Partial<HtmlAttributes>;

  p: Partial<HtmlAttributes>;
  ul: Partial<HtmlAttributes>;
  ol: Partial<HtmlAttributes>;
  li: Partial<HtmlAttributes>;

  table: Partial<HtmlAttributes>;
  tr: Partial<HtmlAttributes>;
  th: Partial<HtmlAttributes>;
  td: Partial<HtmlAttributes>;
  tbody: Partial<HtmlAttributes>;
  thead: Partial<HtmlAttributes>;

  // Additional embedded content elements
  audio: {
    src?: string;
    controls?: boolean;
  } & Partial<HtmlAttributes>;

  video: {
    src?: string;
    controls?: boolean;
    width?: number;
    height?: number;
  } & Partial<HtmlAttributes>;

  // Miscellaneous elements
  canvas: {
    width?: number;
    height?: number;
  } & Partial<HtmlAttributes>;

  script: {
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
  } & Partial<HtmlAttributes>;
  object: Partial<HtmlAttributes>;
  cite: Partial<HtmlAttributes>;
  code: Partial<HtmlAttributes>;
  label: Partial<HtmlAttributes>;
  slot: Partial<HtmlAttributes>;
  style: Partial<HtmlAttributes>;
  summary: Partial<HtmlAttributes>;
  title: Partial<HtmlAttributes>;
  menu: Partial<HtmlAttributes>;
  address: Partial<HtmlAttributes>;
  abbr: Partial<HtmlAttributes>;
  article: Partial<HtmlAttributes>;
  aside: Partial<HtmlAttributes>;
  b: Partial<HtmlAttributes>;
  base: Partial<HtmlAttributes>;
  bdi: Partial<HtmlAttributes>;
  bdo: Partial<HtmlAttributes>;
  blockquote: Partial<HtmlAttributes>;
  body: Partial<HtmlAttributes>;
  br: Partial<HtmlAttributes>;
  caption: Partial<HtmlAttributes>;
  col: Partial<HtmlAttributes>;
  // Content sectioning elements
  nav: Partial<HtmlAttributes>;
  section: Partial<HtmlAttributes>;
  header: Partial<HtmlAttributes>;
  footer: Partial<HtmlAttributes>;
  main: Partial<HtmlAttributes>;
  figure: Partial<HtmlAttributes>;
  figcaption: Partial<HtmlAttributes>;

  // Inline text semantics
  em: Partial<HtmlAttributes>;
  strong: Partial<HtmlAttributes>;
  small: Partial<HtmlAttributes>;
  s: Partial<HtmlAttributes>;
  q: Partial<HtmlAttributes>;
  dfn: Partial<HtmlAttributes>;
  samp: Partial<HtmlAttributes>;
  kbd: Partial<HtmlAttributes>;
  sup: Partial<HtmlAttributes>;
  sub: Partial<HtmlAttributes>;
  u: Partial<HtmlAttributes>;
  mark: Partial<HtmlAttributes>;
  ruby: Partial<HtmlAttributes>;
  rt: Partial<HtmlAttributes>;
  rp: Partial<HtmlAttributes>;

  // Embedded content elements
  iframe: {
    src?: string;
    width?: number;
    height?: number;
    sandbox?: string;
  } & Partial<HtmlAttributes>;
  embed: {
    src: string;
    type?: string;
    width?: number;
    height?: number;
  } & Partial<HtmlAttributes>;
  map: Partial<HtmlAttributes>;
  area: {
    alt: string;
    coords: string;
    href?: string;
    target?: string;
  } & Partial<HtmlAttributes>;

  // Form-related elements
  optgroup: {
    label: string;
    disabled?: boolean;
  } & Partial<HtmlAttributes>;
  option: {
    value: string;
    selected?: boolean;
    disabled?: boolean;
  } & Partial<HtmlAttributes>;
  fieldset: {
    disabled?: boolean;
    form?: string;
    name?: string;
  } & Partial<HtmlAttributes>;
  legend: Partial<HtmlAttributes>;

  // Scripting
  noscript: Partial<HtmlAttributes>;

  // Structural/miscellaneous elements
  details: {
    open?: boolean;
  } & Partial<HtmlAttributes>;
  dialog: {
    open?: boolean;
  } & Partial<HtmlAttributes>;
  colgroup: Partial<HtmlAttributes>;
  data: {
    value: string;
  } & Partial<HtmlAttributes>;
  datalist: Partial<HtmlAttributes>;
  dd: Partial<HtmlAttributes>;
  del: {
    cite?: string;
    datetime?: string;
  } & Partial<HtmlAttributes>;
  dl: Partial<HtmlAttributes>;
  dt: Partial<HtmlAttributes>;
  head: Partial<HtmlAttributes>;
  hgroup: Partial<HtmlAttributes>;
  hr: Partial<HtmlAttributes>;
  html: Partial<HtmlAttributes>;
  i: Partial<HtmlAttributes>;
  ins: {
    cite?: string;
    datetime?: string;
  } & Partial<HtmlAttributes>;
  link: {
    href: string;
    rel: string;
    type?: string;
    media?: string;
    integrity?: string;
    crossorigin?: "anonymous" | "use-credentials";
  } & Partial<HtmlAttributes>;
  meta: {
    name?: string;
    content?: string;
    charset?: string;
    "http-equiv"?: string;
  } & Partial<HtmlAttributes>;
  meter: {
    value: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
  } & Partial<HtmlAttributes>;
  output: {
    for?: string;
    form?: string;
    name?: string;
  } & Partial<HtmlAttributes>;
  picture: Partial<HtmlAttributes>;
  pre: Partial<HtmlAttributes>;
  progress: {
    value?: number;
    max?: number;
  } & Partial<HtmlAttributes>;
  source: {
    src?: string;
    type?: string;
    srcset?: string;
    sizes?: string;
    media?: string;
  } & Partial<HtmlAttributes>;
  template: Partial<HtmlAttributes>;
  track: {
    kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
    src: string;
    srclang?: string;
    label?: string;
    default?: boolean;
  } & Partial<HtmlAttributes>;
  wbr: Partial<HtmlAttributes>;
  search: Partial<HtmlAttributes>;
  tfoot: Partial<HtmlAttributes>;
  time: {
    datetime?: string;
  } & Partial<HtmlAttributes>;
  var: Partial<HtmlAttributes>;
} & {
  [K in Tag]?: Partial<HtmlAttributes>;
};

type Tag = keyof HTMLElementTagNameMap;

type IntrinsicAttributes<T extends Tag> = AriaAttributes & ElementAttributes[T];
// }
// export type { IntrinsicAttributes, Tag };
