import { convertElementToHTMLNMode, replaceHTMLElement } from "../utils";
import { sealed } from "./decorators";
import { Stateless } from "./stateless";

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

  @sealed
  public setPath(path: number[]) {
    this.path = path;
  }

  @sealed
  public set(callback: () => void) {
    callback();
    this.refresh();
  }
  public refresh() {
    replaceHTMLElement(this._path, convertElementToHTMLNMode(this.build()));
  }
  public abstract build(): Stateless<Tag>;
}

export default Stateful;
