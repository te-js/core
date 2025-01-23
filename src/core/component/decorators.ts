import { GLOBAL } from "../utils";
import { DefaultComponent } from "./component";

function sealed(_: any, __: string, descriptor: PropertyDescriptor): void {
  descriptor.writable = false;
}
function page(message: string) {
  // This is the decorator factory (outer function)
  return <T extends typeof DefaultComponent>(target: T) => {
    console.log(`Message: ${message}`);

    GLOBAL("pages").set(message, target);
  };
}
export { page, sealed };
