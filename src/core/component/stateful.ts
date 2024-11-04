import { sealed } from "./decorators";
import { Stateless } from "./stateless";

abstract class Stateful {
  constructor() {}

  @sealed
  public set(callback: () => void) {
    callback();
    // Get the parent and replace it with the new build()
    this.build();
  }
  public abstract build(): Stateless<Tag>;
}

export default Stateful;
