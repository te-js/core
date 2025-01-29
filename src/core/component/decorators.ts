import { GLOBAL } from "../utils";
import { DefaultComponent } from "./component";

function sealed(_: any, __: string, descriptor: PropertyDescriptor): void {
  descriptor.writable = false;
}
function page(message: string) {
  return <T extends typeof DefaultComponent>(target: T) => {
    GLOBAL("pages").set(message, target);
  };
}
export { page, sealed };
