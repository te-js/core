// import { Tag } from "../../types";
import { Reference } from "../reference";
import { convertElementToHTMLNMode, replaceHTMLElement } from "../utils";
import { Component } from "./stateless";

type ProxyRef<T> = T extends object ? T : { value: T };
interface StateOptions {
  searchParams?: boolean;
}

abstract class Stateful {
  private _path: number[] = [];
  public get path() {
    return this._path;
  }
  public async init() {}
  public set path(path: number[]) {
    this._path = path;
  }

  constructor() {
    this.init();
  }

  // @sealed
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

  // @sealed
  public set(callback: () => void) {
    callback();
    this.refresh();
  }
  public async refresh() {
    replaceHTMLElement(
      this._path,
      convertElementToHTMLNMode(await this.build())
    );
  }
  public abstract build(): Component<Tag> | Promise<Component<Tag>>;
}

export { Stateful };

