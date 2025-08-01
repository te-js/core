# Tee.js

A lightweight, component-based frontend framework built for learning and understanding how modern UI libraries work internally.

## About This Project

**Tee.js is a toy project created for educational purposes** to understand how real frameworks like React and Vue.js work under the hood. This framework implements core concepts found in modern frontend libraries, including:

- **Virtual DOM-like system** - A lightweight representation of the DOM tree
- **State Management** - Reactive state that triggers component re-renders
- **Diffing Algorithm** - Compares old and new virtual DOM trees to determine changes
- **Reconciliation** - Applies minimal patches to the real DOM for efficient updates
- **Component-based Architecture** - Encapsulated, reusable UI components

The goal is to demystify the "magic" behind modern frameworks by building simplified versions of their core features from scratch using plain TypeScript.

## Core Concepts

### Virtual DOM and Diffing

Tee.js maintains a virtual representation of your UI. When state changes occur:

1. A new virtual DOM tree is created
2. The diffing algorithm compares the old and new trees
3. A minimal set of patches (DOM operations) is generated
4. Only the necessary changes are applied to the real DOM

This approach minimizes expensive DOM manipulations and provides better performance than naive re-rendering.

### State Management and Reactivity

Components have reactive state that automatically triggers re-renders when modified. The framework tracks state changes and efficiently updates only the components that need to change.

### Component Reconciliation

The reconciliation process ensures that component instances are properly managed, maintaining local state across re-renders while updating the UI to reflect new data.

## Installation

```bash
npm install @marcomit/core
```

## Quick Start

### Basic Component

```typescript
import { Component, div, button } from "@marcomit/core";

class Counter extends Component {
  #count = this.state(0);

  build() {
    return div(
      { class: "counter" },
      button(
        { onclick: () => this.#count.value-- },
        "-"
      ),
      ` Count: ${this.#count.value} `,
      button(
        { onclick: () => this.#count.value++ },
        "+"
      )
    );
  }
}
```

### Setting Up Routes

```typescript
import { route } from "@marcomit/core";

route({
  "/": () => new HomePage(),
  "/about": () => new AboutPage(),
  "/counter": () => new Counter()
});
```

## Component System

### Creating Components

All components extend the base `Component` class and must implement a `build()` method:

```typescript
class MyComponent extends Component {
  build() {
    return div("Hello, Tee.js!");
  }
}
```

### Component State

Use the `state()` method to create reactive state:

```typescript
class TodoList extends Component {
  #todos = this.state([]);
  #newTodo = this.state("");

  build() {
    return div(
      input({
        value: this.#newTodo.value,
        onchange: (e) => this.#newTodo.value = e.target.value,
        placeholder: "Enter a todo..."
      }),
      button(
        { onclick: () => this.addTodo() },
        "Add Todo"
      ),
      ul(
        ...this.#todos.value.map((todo, index) =>
          li(
            todo,
            button(
              { onclick: () => this.removeTodo(index) },
              "Remove"
            )
          )
        )
      )
    );
  }

  addTodo() {
    if (this.#newTodo.value.trim()) {
      this.#todos.value.push(this.#newTodo.value);
      this.#newTodo.value = "";
    }
  }

  removeTodo(index) {
    this.#todos.value.splice(index, 1);
  }
}
```

### State Options

State can be configured with options:

```typescript
#searchQuery = this.state("", { searchParams: true });
```

## JSX-like Element Creation

Tee.js provides functions for all HTML elements:

```typescript
// Basic elements
div("Hello World")
span({ class: "highlight" }, "Important text")
p("A paragraph of text")

// With attributes
button({
  class: "btn btn-primary",
  onclick: () => console.log("Clicked!")
}, "Click me")

// Nested elements
div(
  { class: "container" },
  h1("My App"),
  p("Welcome to Tee.js"),
  div(
    { class: "actions" },
    button("Action 1"),
    button("Action 2")
  )
)
```

### Available Elements

All standard HTML elements are available: `div`, `span`, `p`, `h1`-`h6`, `button`, `input`, `form`, `table`, `img`, `a`, etc.

## Event Handling

Events are handled using the `on*` attribute pattern:

```typescript
button({
  onclick: (event) => this.handleClick(event),
  onmouseenter: () => this.onHover(),
  onmouseleave: () => this.onLeave()
}, "Interactive Button")

input({
  onchange: (e) => this.updateValue(e.target.value),
  onkeypress: (e) => {
    if (e.key === 'Enter') this.submit();
  }
})
```

## Global State Management

### Creating a Store

```typescript
// store.ts
import { Store } from "@marcomit/core";

interface AppState {
  user: string | null;
  theme: 'light' | 'dark';
  notifications: string[];
}

const store = new Store<AppState>({
  user: null,
  theme: 'light',
  notifications: []
});

export default store;
```

### Using Store in Components

```typescript
import store from './store';

class Header extends Component {
  build() {
    const appState = store.watch(this);
    
    return header(
      div(`Welcome, ${appState.user || 'Guest'}`),
      button(
        {
          onclick: () => {
            appState.theme = appState.theme === 'light' ? 'dark' : 'light';
          }
        },
        `Switch to ${appState.theme === 'light' ? 'dark' : 'light'} mode`
      )
    );
  }
}
```

### Batch Updates with Pulse

Use `pulse()` to batch multiple state updates:

```typescript
class ShoppingCart extends Component {
  #items = this.state([]);
  #total = this.state(0);

  addItem(item) {
    this.pulse(() => {
      this.#items.value.push(item);
      this.#total.value += item.price;
    });
  }
}
```

You can also use the global `pulse` function for cross-component updates:

```typescript
import { pulse } from "@marcomit/core";

pulse(() => {
  // Multiple state changes
  this.#loading.value = false;
  this.#data.value = newData;
  store.notifications.push("Data loaded");
}, [this, store]); // Dependencies that should re-render
```

## Async Data with Resolver

The `Resolver` component handles asynchronous operations with built-in loading and error states:

```typescript
import { Resolver } from "@marcomit/core";

class UserProfile extends Component {
  build() {
    return div(
      h1("User Profile"),
      new Resolver(
        "user-data", // unique key
        fetch(`/api/users/${this.userId}`).then(res => res.json()),
        {
          loading: () => div({ class: "spinner" }, "Loading user..."),
          error: (error) => div(
            { class: "error" },
            "Failed to load user: ",
            error.message
          ),
          builder: (user) => div(
            { class: "user-card" },
            h2(user.name),
            p(user.email),
            img({ src: user.avatar, alt: "Avatar" })
          )
        }
      )
    );
  }
}
```

## Routing

### Basic Routing

```typescript
import { route } from "@marcomit/core";

route({
  "/": () => new HomePage(),
  "/users": () => new UserList(),
  "/profile": () => new UserProfile(),
  "/settings": () => new Settings()
});
```

### Programmatic Navigation

Components have access to a router instance:

```typescript
class Navigation extends Component {
  navigateToProfile() {
    this.router.pathname = "/profile";
  }

  build() {
    return nav(
      button(
        { onclick: () => this.navigateToProfile() },
        "Go to Profile"
      )
    );
  }
}
```

### URL Search Parameters

Access search parameters through the router:

```typescript
class SearchResults extends Component {
  build() {
    const searchParams = this.router.search;
    const query = searchParams.find(([key]) => key === "q")?.[1] || "";
    
    return div(
      h1(`Results for: ${query}`),
      // ... render results
    );
  }
}
```

## Advanced Features

### Component References

Get direct access to DOM elements:

```typescript
import { Reference } from "@marcomit/core";

class FocusableInput extends Component {
  #inputRef = new Reference(null);

  componentDidMount() {
    this.#inputRef.target?.focus();
  }

  build() {
    return input({
      ref: this.#inputRef,
      placeholder: "This input will be focused"
    });
  }
}
```

### Component Keys

Use keys for component identity and state persistence:

```typescript
class TodoList extends Component {
  #todos = this.state([
    { id: 1, text: "Learn Tee.js" },
    { id: 2, text: "Build an app" }
  ]);

  build() {
    return ul(
      ...this.#todos.value.map(todo =>
        new TodoItem(todo.id.toString()) // Key ensures state persistence
      )
    );
  }
}
```

### Lifecycle Methods

```typescript
class DataComponent extends Component {
  init(callback) {
    // Called during initialization, before first render
    // Use for setup that shouldn't trigger re-renders
    super.init(() => {
      this.loadInitialData();
      callback();
    });
  }

  beforeMount() {
    // Called before component is added to DOM
    console.log("About to mount");
  }

  mounted() {
    // Called after component is added to DOM
    console.log("Component mounted");
  }

  afterMount() {
    // Called after mount process is complete
    console.log("Mount process finished");
  }

  unmount() {
    // Called when component is removed
    this.cleanup();
  }
}
```

## Example Application

Here's a complete example of a todo application:

```typescript
// store.ts
import { Store } from "@marcomit/core";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface AppState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

const store = new Store<AppState>({
  todos: [],
  filter: 'all'
});

export default store;
```

```typescript
// components/TodoApp.ts
import { Component, div, h1, input, button, ul, li, span } from "@marcomit/core";
import store from '../store';

class TodoItem extends Component {
  constructor(private todo: Todo) {
    super(todo.id.toString());
  }

  build() {
    const appState = store.watch(this);
    
    return li(
      { class: this.todo.completed ? "completed" : "" },
      input({
        type: "checkbox",
        checked: this.todo.completed,
        onchange: () => this.toggleTodo()
      }),
      span(this.todo.text),
      button(
        { onclick: () => this.removeTodo() },
        "Delete"
      )
    );
  }

  toggleTodo() {
    const appState = store.watch(this);
    const todo = appState.todos.find(t => t.id === this.todo.id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo() {
    const appState = store.watch(this);
    const index = appState.todos.findIndex(t => t.id === this.todo.id);
    if (index !== -1) {
      appState.todos.splice(index, 1);
    }
  }
}

class TodoApp extends Component {
  #newTodoText = this.state("");

  build() {
    const appState = store.watch(this);
    const filteredTodos = this.getFilteredTodos(appState.todos, appState.filter);

    return div(
      { class: "todo-app" },
      h1("Todo App"),
      
      // Add new todo
      div(
        { class: "add-todo" },
        input({
          value: this.#newTodoText.value,
          onchange: (e) => this.#newTodoText.value = e.target.value,
          onkeypress: (e) => {
            if (e.key === 'Enter') this.addTodo();
          },
          placeholder: "What needs to be done?"
        }),
        button(
          { onclick: () => this.addTodo() },
          "Add"
        )
      ),

      // Filter buttons
      div(
        { class: "filters" },
        button(
          {
            class: appState.filter === 'all' ? 'active' : '',
            onclick: () => appState.filter = 'all'
          },
          "All"
        ),
        button(
          {
            class: appState.filter === 'active' ? 'active' : '',
            onclick: () => appState.filter = 'active'
          },
          "Active"
        ),
        button(
          {
            class: appState.filter === 'completed' ? 'active' : '',
            onclick: () => appState.filter = 'completed'
          },
          "Completed"
        )
      ),

      // Todo list
      ul(
        { class: "todo-list" },
        ...filteredTodos.map(todo => new TodoItem(todo))
      ),

      // Stats
      div(
        { class: "stats" },
        `${appState.todos.filter(t => !t.completed).length} items left`
      )
    );
  }

  addTodo() {
    const text = this.#newTodoText.value.trim();
    if (text) {
      const appState = store.watch(this);
      appState.todos.push({
        id: Date.now(),
        text,
        completed: false
      });
      this.#newTodoText.value = "";
    }
  }

  getFilteredTodos(todos, filter) {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
}

// main.ts
import { route } from "@marcomit/core";
import TodoApp from "./components/TodoApp";

route({
  "/": () => new TodoApp()
});
```

## Best Practices

### Component Organization
- Keep components small and focused on a single responsibility
- Use descriptive names for components and state variables
- Group related components in folders

### State Management
- Use local component state for UI-specific data
- Use global store for application-wide state
- Minimize the number of watchers on global state

### Performance
- Use component keys for list items to help with reconciliation
- Batch related state updates using `pulse()`
- Avoid creating new objects/arrays in render methods

### Error Handling
- Use `Resolver` for async operations that might fail
- Provide meaningful error messages to users
- Handle edge cases in your components

## Development Setup

```bash
# Clone your project
git clone <your-repo>
cd tee-js

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── core/              # Framework internals
│   ├── component/     # Component system
│   ├── render.ts      # Diffing and reconciliation
│   ├── store.ts       # State management
│   └── route.ts       # Routing system
├── components/        # Your app components
├── store.ts          # Global application state
└── main.ts           # Application entry point
```

## Limitations

As an educational project, Tee.js has some limitations compared to production frameworks:

- No server-side rendering support
- Limited performance optimizations
- Basic error boundaries
- Simplified event system
- No built-in testing utilities

## Learning Resources

This framework demonstrates several important concepts:

- **Virtual DOM**: How frameworks minimize expensive DOM operations
- **Reactive State**: Automatic UI updates when data changes
- **Component Lifecycle**: Managing component creation, updates, and cleanup
- **Reconciliation**: Efficiently updating the UI with minimal changes
- **State Management**: Sharing data between components

## Contributing

This is a learning project, but contributions that help others understand framework internals are welcome!

## License

BSD 3-Clause License - see LICENSE file for details.
