class DefaultComponent {
  public path: number[] = [];
  public key: string;
  constructor() {
    this.key = Math.random().toString(36).substring(7);
  }

  // build()
}
export default DefaultComponent;
