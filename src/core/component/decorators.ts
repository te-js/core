import { GLOBAL } from "../utils";
import { Component } from "./component";

function sealed(_: any, __: string, descriptor: PropertyDescriptor): void {
  descriptor.writable = false;
}
function page(message: string) {
  return <T extends typeof Component>(target: T) => {
    GLOBAL("pages").set(message, target);
  };
}
export { page, sealed };
