function sealed(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  descriptor.writable = false;
}
export { sealed };
