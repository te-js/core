# Tee.js

Tee.js is a lightweight, component-based frontend framework inspired by modern UI libraries like React and Flutter, but built for simplicity and speed using plain TypeScript.

## 🚀 Features

- Virtual DOM with JSX-like builder syntax
- Stateful components with fine-grained reactivity
- Global reactive store
- Built-in async resolver (`Resolver`)
- Simple and declarative routing system
- Minimal and customizable rendering pipeline

---

## Installation

> (WIP - Add package manager or script info here)

```bash
npm install tee-js
````

---

## Basic Usage

### Create a Component

```ts
import { Component, div, button } from "tee-js";

class Counter extends Component {
  #count = this.state(0);

  build() {
    return div(
      button({ onclick: () => this.#count.value++ }, "+"),
      ` Count: ${this.#count.value} `,
      button({ onclick: () => this.#count.value-- }, "-")
    );
  }
}
```

---

## State Management

Each component has its own state:

```ts
this.state(initialValue);
```

Example:

```ts
#count = this.state(0);

#increment() {
  this.#count.value++;
}
```

You can also use the global reactive `store`:

```ts
const myStore = store.watch(this);
myStore.toggle = true;
```

---

## Async Data with Resolver

Use the `Resolver` to handle async data with built-in loading and builder callbacks.

```ts
new Resolver("postData", fetch("url").then(res => res.json()), {
  builder: (data) => div("Loaded", data.length),
  loading: () => div("Loading..."),
});
```

---

## Routing

Use the `route` function to declare your routes:

```ts
import { route } from "tee-js";

route({
  "/": () => new HomePage(),
  "/about": () => new AboutPage(),
});
```

---

## Example App

```ts
class App extends Component {
  build() {
    return div(
      new Resolver("posts", fetchPosts(), {
        builder: (posts) => div("Posts: ", posts.length),
        loading: () => div("Loading posts..."),
      }),
      new Counter()
    );
  }
}

route({
  "/": () => new App(),
});
```

---

## Folder Structure (Recommended)

```
src/
├── core/         # Internal framework logic
├── components/   # Your custom components
├── store.ts      # Shared reactive store
├── index.ts      # App entry and route definitions
```

---

## Core APIs

### Component Lifecycle

* `build()`: defines the UI
* `this.state(initialValue)`: reactive state per instance
* `store.watch(component)`: bind global store to component

### JSX-like DSL

* `div(...children)`
* `button(props, ...children)`
* Any HTML tag is a callable function

---

## Store Example

```ts
// store.ts
export default {
  toggle: false,
};
```

```ts
// In component
const myStore = store.watch(this);
if (myStore.toggle) { ... }
```

---

## Advanced

### pulse()

Batch DOM updates:

```ts
pulse(() => {
  this.#toggle.value = !this.#toggle.value;
}, [this]);
```

---

## Development

This framework is experimental and under active development. Contributions, ideas, and feedback are welcome!

