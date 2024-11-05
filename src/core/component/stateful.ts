import {
  convertElementToHTMLNMode,
  getElementFromPath,
  replaceHTMLElement,
} from "../utils";
import { sealed } from "./decorators";
import { Stateless } from "./stateless";

abstract class Stateful {
  private _path: number[] = [];
  public get path() {
    return this._path;
  }
  public set path(path: number[]) {
    this._path = path;
  }

  constructor() {}

  @sealed
  public setPath(path: number[]) {
    this.path = path;
  }

  @sealed
  public set(callback: () => void) {
    const element = getElementFromPath(this.path);
    // console.log(element, convertElementToHTMLNMode(this.build()));
    callback();
    replaceHTMLElement(this._path, convertElementToHTMLNMode(this.build()));
  }
  public abstract build(): Stateless<Tag>;
}

export default Stateful;
