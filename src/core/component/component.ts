// import { Tag } from "../../types";
import { Reference } from "../reference";
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
  public path: number[] = [];
  public router: Router = new Router();
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
  public flat(): TNode<Tag> {
    function dfs(current: Component | TNode<Tag> | BaseTypes) {
      current instanceof Component ? current.headFlat() : current;
      if (current instanceof TNode) {
        for (const child of current.children) {
          dfs(child);
        }
      }
    }

    const flatComponent = this.headFlat();
    dfs(this); // Note: result is unused
    console.log(flatComponent);
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

  public state<T>(value: T, options?: StateOptions) {
    return new Proxy<ProxyRef<T>>(
      (typeof value === "object" ? value : { value }) as ProxyRef<T>,
      {
        set: (target: ProxyRef<T>, p: string | symbol, newValue: any) => {
          const res = Reflect.set(target, p, newValue);
          if (options?.searchParams) {
            window.location.search;
          }
          console.log("pr", newValue);
          this.rerender();
          return res;
        },
      }
    );
  }

  public ref() {
    return new Reference(null);
  }

  @sealed
  public set(callback: () => void) {
    callback();
    this.rerender();
  }
  public async rerender() {
    diffing(this.path, convertElementToHTMLNMode(await this.flat()));
  }
  public abstract build(): Component | TNode<Tag>;
}

export { Component };

