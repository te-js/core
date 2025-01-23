// import { Tag } from "../../types";
import { Reference } from "../reference";
import Router from "../router";
import { convertElementToHTMLNMode, replaceHTMLElement } from "../utils";
import { BaseComponent } from "./base-component";
import { sealed } from "./decorators";
import Component from "./default/default-component";

type ProxyRef<T> = T extends object ? T : { value: T };
interface StateOptions {
  searchParams?: boolean;
}

abstract class DefaultComponent extends Component {
  private _path: number[] = [];
  public router: Router = new Router();
  static from(component: object) {
    return component;
  }
  private async headFlat(): Promise<BaseComponent<Tag>> {
    let current = await this.build();
    while (current instanceof DefaultComponent) {
      current = await current.build();
    }
    return current;
  }
  public async flat(): Promise<BaseComponent<Tag>> {
    async function dfs(current: DefaultComponent | BaseComponent<Tag>) {
      current instanceof DefaultComponent ? await current.headFlat() : current;
      // newCurrent.children.forEach(console.log);
    }
    const flatComponent = await this.headFlat();
    await dfs(this);
    return flatComponent;
  }

  public get path() {
    return this._path;
  }
  public init(): void | Promise<void> {}
  public set path(path: number[]) {
    this._path = path;
  }

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
          this.refresh();
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
    this.refresh();
  }
  public async refresh() {
    replaceHTMLElement(
      this._path,
      convertElementToHTMLNMode(await this.flat())
    );
  }
  public abstract build():
    | DefaultComponent
    | BaseComponent<Tag>
    | Promise<DefaultComponent>
    | Promise<BaseComponent<Tag>>;
}

export { DefaultComponent };
