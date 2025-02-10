import diffing from "../render";
import Router from "../router";
import { convertElementToHTMLNMode, GLOBAL } from "../utils";
import { TNode } from "./base-component";
import { sealed } from "./decorators";
import DefaultComponent from "./default/default-component";

type ProxyRef<T> = T extends object ? T : { value: T };
interface StateOptions {
  searchParams?: boolean;
}

abstract class Component extends DefaultComponent {
  public router: Router = new Router();
  private reactive: boolean = true;
  private stateCache: Map<string, any> = new Map();
  private stateKeys: Map<string, string> = new Map();

  constructor(key?: string) {
    super(key);
    const cacheKey = this.getCacheKey();
    const cachedState = GLOBAL("states").get(cacheKey);
    if (cachedState) {
      this.stateCache = new Map(cachedState.values);
      this.stateKeys = new Map(cachedState.keys);
    }
  }

  private getCacheKey(): string {
    return `${this.constructor.name}_${this.key || ""}`;
  }

  static from(component: object) {
    return component;
  }

  private headFlat(): TNode<Tag> {
    let current = this.build();
    while (current instanceof Component) {
      current.path = this.path;
      current = current.build();
    }
    return current;
  }
  public beforeMount() {
    throw new Error("Method not implemented.");
  }
  public mounted() {
    throw new Error("Method not implemented.");
  }
  public afterMount() {
    throw new Error("Method not implemented.");
  }
  public flat(): TNode<Tag> {
    function dfs(
      current: Component | TNode<Tag> | BaseTypes,
      parentPath: number[]
    ) {
      if (current instanceof Component) {
        current.path = parentPath;
        current = DefaultComponent.withParentKey(current.key!, () => {
          return (current as Component).headFlat();
        });
      }
      if (current instanceof TNode) {
        current.path = parentPath;
        for (let i = 0; i < current.children.length; i++) {
          const child = current.children[i];
          dfs(child, [...parentPath, i]);
        }
      }
    }

    const flatComponent = DefaultComponent.withParentKey(this.key!, () => {
      return this.headFlat();
    });
    dfs(flatComponent, this.path);
    return flatComponent;
  }

  protected init(callback: () => void): void | Promise<void> {
    this.reactive = false;
    callback();
    this.reactive = true;
  }

  protected unmount(): void | Promise<void> {
    GLOBAL("states").delete(this.getCacheKey());
  }

  @sealed
  public setPath(path: number[]) {
    this.path = path;
  }

  public pulse(callback: () => void) {
    this.reactive = false;
    callback();
    this.reactive = true;
    this.rerender();
  }

  public state<T>(value: T, options?: StateOptions) {
    const propertyKey =
      new Error().stack?.split("\n")[2]?.match(/at.*?\.(\w+)/)?.[1] ||
      Math.random().toString(36).substring(7);

    let stateKey = this.stateKeys.get(propertyKey);
    if (!stateKey) {
      stateKey = Math.random().toString(36).substring(7);
      this.stateKeys.set(propertyKey, stateKey);
    }

    if (this.stateCache.has(stateKey)) {
      value = this.stateCache.get(stateKey);
    }

    const proxy = new Proxy<ProxyRef<T>>(
      (typeof value === "object" ? value : { value }) as ProxyRef<T>,
      {
        get: (target: ProxyRef<T>, p: string | symbol) => {
          const newValue = Reflect.get(target, p);
          if (typeof newValue === "object" && newValue !== null) {
            return this.state(newValue, options);
          }
          return newValue;
        },
        set: (target: ProxyRef<T>, p: string | symbol, newValue: any) => {
          const res = Reflect.set(target, p, newValue);
          this.stateCache.set(stateKey, target);
          GLOBAL("states").set(this.getCacheKey(), {
            values: Array.from(this.stateCache.entries()),
            keys: Array.from(this.stateKeys.entries()),
          });

          this.rerender();
          return res;
        },
      }
    );

    if (!this.stateCache.has(stateKey)) {
      this.stateCache.set(
        stateKey,
        typeof value === "object" ? value : { value }
      );
      GLOBAL("states").set(this.getCacheKey(), {
        values: Array.from(this.stateCache.entries()),
        keys: Array.from(this.stateKeys.entries()),
      });
    }

    return proxy;
  }

  public rerender() {
    if (!GLOBAL("reactive")) return;
    if (!this.reactive) return;
    const build = this.flat();
    build.setPath(this.path);
    diffing(this.path, convertElementToHTMLNMode(build));
  }

  public abstract build(): Component | TNode<Tag>;
}

export { Component };
