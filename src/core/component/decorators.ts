function sealed(_: any, __: string, descriptor: PropertyDescriptor): void {
  descriptor.writable = false;
}
export { sealed };
