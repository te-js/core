import diffing from "../render";
import Router from "../router";
import { convertElementToHTMLNMode } from "../utils";
import { TNode } from "./base-component";
import { sealed } from "./decorators";
import DefaultComponent from "./default/default-component";

type ProxyRef<T> = T extends object ? T : { value: T };
interface StateOptions {
  searchParams?: boolean;
}

abstract class Component extends DefaultComponent {
  public router: Router = new Router();
  private render: boolean = true;
  static from(component: object) {
    return component;
  }
  private headFlat(): TNode<Tag> {
    let current = this.build();
    while (current instanceof Component) {
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
    function dfs(current: Component | TNode<Tag> | BaseTypes) {
      current = current instanceof Component ? current.headFlat() : current;
      if (current instanceof TNode) {
        for (const child of current.children) {
          dfs(child);
        }
      }
    }

    const flatComponent = this.headFlat();
    dfs(flatComponent);
    return flatComponent;
  }

  protected init(): void | Promise<void> {}

  protected unmount(): void | Promise<void> {}
  constructor() {
    super();
    this.init();
  }

  @sealed
  public setPath(path: number[]) {
    this.path = path;
  }

  public set(callback: () => void) {
    this.render = false;
    callback();
    this.render = true;
    this.rerender();
  }

  public state<T>(value: T, options?: StateOptions) {
    return new Proxy<ProxyRef<T>>(
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
          // if (options?.searchParams) {
          //   window.location.search;
          // }
          this.rerender();
          return res;
        },
      }
    );
  }

  public rerender() {
    if (!this.render) return;
    diffing(this.path, convertElementToHTMLNMode(this.flat()));
  }

  public abstract build(): Component | TNode<Tag>;
}

export { Component };
