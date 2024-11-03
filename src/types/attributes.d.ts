// Define ARIA attributes
type AriaAttributes = {
  "aria-activedescendant"?: string; // ID of the currently active descendant
  "aria-atomic"?: "true" | "false"; // Indicates whether assistive technologies should present the entire region or just the changed elements
  "aria-autocomplete"?: "none" | "inline" | "list" | "both"; // Indicates whether input completion suggestions are available
  "aria-busy"?: "true" | "false"; // Indicates whether the element is currently being updated
  "aria-checked"?: "true" | "false" | "mixed"; // Indicates the current "checked" state of checkboxes and radio buttons
  "aria-controls"?: string; // ID of the element that controls the current element
  "aria-describedby"?: string; // ID of the element that describes the current element
  "aria-disabled"?: "true" | "false"; // Indicates that the element is perceivable but disabled
  "aria-expanded"?: "true" | "false"; // Indicates whether an element is expanded or collapsed
  "aria-haspopup"?: "true" | "false" | "menu" | "listbox" | "tree" | "grid"; // Indicates the presence of a popup element
  "aria-hidden"?: "true" | "false"; // Indicates whether an element is visible or not
  "aria-invalid"?: "true" | "false" | "grammar" | "spelling"; // Indicates the validation state of an element
  "aria-label"?: string; // Defines a string value that labels the current element
  "aria-labelledby"?: string; // ID of the element that labels the current element
  "aria-level"?: number; // Defines the hierarchical level of an element
  "aria-live"?: "off" | "polite" | "assertive"; // Indicates that an element will be updated and describes the type of updates
  "aria-modal"?: "true" | "false"; // Indicates whether an element is modal
  "aria-multiselectable"?: "true" | "false"; // Indicates whether a listbox allows multiple items to be selected
  "aria-orientation"?: "horizontal" | "vertical"; // Defines the orientation of a user interface element
  "aria-placeholder"?: string; // Provides a placeholder for user input
  "aria-pressed"?: "true" | "false" | "mixed"; // Indicates the current "pressed" state of toggle buttons
  "aria-readonly"?: "true" | "false"; // Indicates that the element is not editable
  "aria-relevant"?: "additions" | "removals" | "text"; // Indicates what notifications the user agent should deliver to the user
  "aria-required"?: "true" | "false"; // Indicates that user input is required on the element
  "aria-roledescription"?: string; // Defines a human-readable description for the role of an element
  "aria-selected"?: "true" | "false"; // Indicates the current "selected" state of elements
  "aria-setsize"?: number; // Defines the number of items in a set of related elements
  "aria-sort"?: "ascending" | "descending" | "none"; // Indicates that the element is sorted in a certain order
  "aria-valuemax"?: number; // Defines the maximum allowed value for a range widget
  "aria-valuemin"?: number; // Defines the minimum allowed value for a range widget
  "aria-valuenow"?: number; // Defines the current value for a range widget
  "aria-valuetext"?: string; // Defines the text alternative for the current value of a range widget
};

type HtmlAttributes = {
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
    href: string; // Link to another document
    target?: string; // Where to open the linked document
    rel?: string; // Relationship with the linked document
  } & HtmlAttributes; // Include all standard attributes

  img: {
    src: string; // Image source URL
    alt?: string; // Alternative text
    width?: number; // Image width
    height?: number; // Image height
  } & HtmlAttributes; // Include all standard attributes

  button: {
    type?: "button" | "submit" | "reset"; // Button type
    disabled?: boolean; // Disable button
  } & HtmlAttributes; // Include all standard attributes

  div: HtmlAttributes; // No specific attributes, just standard

  span: HtmlAttributes; // No specific attributes, just standard

  input: {
    type: string; // Type of the input (text, number, etc.)
    value?: string; // Current value of the input
    placeholder?: string; // Placeholder text
    disabled?: boolean; // Disable input
    required?: boolean; // Required input
  } & HtmlAttributes; // Include all standard attributes

  textarea: {
    value?: string; // Current value of the textarea
    rows?: number; // Number of visible text lines
    cols?: number; // Number of visible character columns
    placeholder?: string; // Placeholder text
    disabled?: boolean; // Disable textarea
    required?: boolean; // Required textarea
  } & HtmlAttributes; // Include all standard attributes

  select: {
    value?: string; // Current selected value
    multiple?: boolean; // Allow multiple selections
    disabled?: boolean; // Disable select
  } & HtmlAttributes; // Include all standard attributes

  form: {
    action?: string; // URL for form submission
    method?: "GET" | "POST"; // Form submission method
    target?: string; // Where to send the form data
  } & HtmlAttributes; // Include all standard attributes

  // Add more elements as needed...
};

type Merge<T1, T2> = T1 & T2;

type IntrinsicAttributes<T extends Tag> = AriaAttributes &
  HtmlAttributes &
  ElementAttributes[T];
