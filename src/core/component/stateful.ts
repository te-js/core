import { sealed } from "./decorators";
import { Stateless } from "./stateless";

abstract class Stateful {
  constructor() {}

  @sealed
  public set(callback: () => void) {
    callback();
    this.build();
  }
  public abstract build(): Stateless<Tag>;
}

export default Stateful;
